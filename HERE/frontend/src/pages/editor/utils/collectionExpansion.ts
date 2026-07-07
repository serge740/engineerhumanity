import type { PageElement } from '../../../api/pages';
import type { SiteCollection, CollectionItem } from '../../../api/collections';
import type { SiteComponent } from '../../../api/components';

// Client-side preview port of backend/src/common/collection-expansion.ts. This
// is preview-only — the source of truth for actual published/exported output
// is the backend's copy, run at publish/export time from live data. Keep the
// substitution behavior (same {{key}} regex, same clone-then-substitute order)
// identical to avoid "looks right in the editor, different once published" bugs.

interface CollectionRef {
  collectionId: string;
  componentId:  string;
  limit?:       number;
  detailModal?: boolean;
}

let __uid = 0;
function freshId(): string {
  return 'prev-' + Date.now().toString(36) + '-' + (++__uid);
}

const TOKEN_RE = /\{\{\s*(\w+)\s*\}\}/g;

function substituteTokens(value: string, data: Record<string, unknown>): string {
  return value.replace(TOKEN_RE, (_m, key: string) => {
    const v = data[key];
    return v === undefined || v === null ? '' : String(v);
  });
}

// Deep-clones with fresh ids and substitutes {{tokens}}. When `interactive` is
// false (normal editing), also forces pointerEvents:'none' on every node so a
// rendered card instance can never itself become the click/selection target
// in the canvas — clicks fall through to the real `_collection` marker. When
// `interactive` is true (Preview mode / the component Design tab's own
// preview), pointer events are left alone so things like the detail-modal
// trigger button are actually clickable and testable in the editor.
function cloneForPreview(el: PageElement, data: Record<string, unknown>, interactive: boolean): PageElement {
  const clone: PageElement = {
    ...el, id: freshId(),
    style: interactive ? { ...(el.style ?? {}) } : { ...(el.style ?? {}), pointerEvents: 'none' },
  };
  for (const [k, v] of Object.entries(clone)) {
    if (k === 'children' || k === 'style' || k === 'id') continue;
    if (typeof v === 'string') (clone as Record<string, unknown>)[k] = substituteTokens(v, data);
  }
  if (Array.isArray(el.children)) {
    clone.children = el.children.map(c => cloneForPreview(c, data, interactive));
  }
  return clone;
}

function isCollectionRef(val: unknown): val is CollectionRef {
  return (
    !!val && typeof val === 'object' &&
    typeof (val as Record<string, unknown>).collectionId === 'string' &&
    typeof (val as Record<string, unknown>).componentId === 'string'
  );
}

// Finds the first <a> in a card instance (depth-first) and tags it with
// `_modalTarget` — mirrors backend/src/common/collection-expansion.ts exactly.
function attachModalTrigger(nodes: PageElement[], modalId: string): { nodes: PageElement[]; found: boolean } {
  let found = false;
  function visit(el: PageElement): PageElement {
    if (!found && el.tag === 'a') {
      found = true;
      return { ...el, _modalTarget: modalId };
    }
    if (Array.isArray(el.children)) {
      return { ...el, children: el.children.map(visit) };
    }
    return el;
  }
  return { nodes: nodes.map(visit), found };
}

// Wraps modal content (either the generic auto-built content below, or the
// admin's own custom-designed `modalHtml`) in the system-managed <dialog>
// shell. Mirrors backend/src/common/collection-expansion.ts.
function wrapInDialogShell(modalId: string, contentChildren: PageElement[]): PageElement {
  const children: PageElement[] = [
    {
      id: freshId(), tag: 'button', text: '✕', _modalClose: true,
      style: { position: 'absolute', top: '14px', right: '14px', border: 'none', background: '#f3f4f6', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', lineHeight: '1', zIndex: '1' },
    },
    ...contentChildren,
  ];

  return {
    id: modalId, tag: 'dialog',
    style: {
      border: 'none', borderRadius: '16px', padding: '0', maxWidth: '460px', width: '90%',
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: '0',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    },
    children: [
      // Attribute selector (not `#id`) — ElementView.tsx never renders a real
      // `id` HTML attribute, only `data-el-id`.
      { id: freshId(), tag: 'style', text: `[data-el-id="${modalId}"]::backdrop { background: rgba(15,23,42,0.6); }` },
      { id: freshId(), tag: 'div', style: { padding: '32px', position: 'relative', boxSizing: 'border-box' }, children },
    ],
  };
}

// Builds the generic "more detail" content for one collection item, laid out
// like a profile card: a ringed circular avatar (first image field), a
// name/subtitle heading (first two text fields), a highlighted description
// block (first long-text field), then any remaining fields as a grid of
// small info pills. Mirrors backend/src/common/collection-expansion.ts. This
// is the fallback used only when the component has no custom `modalHtml`
// designed yet.
function buildGenericDetailModalContent(
  fields: { key: string; label: string; type: string }[],
  data: Record<string, unknown>,
): PageElement[] {
  const consumed = new Set<string>();
  const hasValue = (f: { key: string }) => {
    const v = data[f.key];
    return v !== undefined && v !== null && v !== '';
  };
  const pick = (predicate: (f: { type: string }) => boolean) => {
    const f = fields.find(f => !consumed.has(f.key) && hasValue(f) && predicate(f));
    if (f) consumed.add(f.key);
    return f;
  };

  const avatarField      = pick(f => f.type === 'image');
  const nameField        = pick(f => f.type === 'text');
  const subtitleField    = pick(f => f.type === 'text');
  const descriptionField = pick(f => f.type === 'textarea');
  const pillFields       = fields.filter(f => !consumed.has(f.key) && hasValue(f));

  const children: PageElement[] = [];

  if (avatarField) {
    children.push({
      id: freshId(), tag: 'div', style: { display: 'flex', justifyContent: 'center', marginBottom: '16px' },
      children: [{
        id: freshId(), tag: 'img', src: String(data[avatarField.key]), alt: nameField ? String(data[nameField.key]) : avatarField.label,
        style: { width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1' },
      }],
    });
  }

  if (nameField || subtitleField) {
    children.push({
      id: freshId(), tag: 'div', style: { textAlign: avatarField ? 'center' : 'left', marginBottom: '18px' },
      children: [
        ...(nameField ? [{ id: freshId(), tag: 'h3', text: String(data[nameField.key]), style: { margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#111827' } }] : []),
        ...(subtitleField ? [{ id: freshId(), tag: 'p', text: String(data[subtitleField.key]), style: { margin: '0', fontSize: '13px', color: '#6b7280' } }] : []),
      ],
    });
  }

  if (descriptionField) {
    children.push({
      id: freshId(), tag: 'div',
      style: { background: '#f3f4f6', borderLeft: '4px solid #10b981', borderRadius: '8px', padding: '16px 18px', marginBottom: '16px' },
      children: [
        { id: freshId(), tag: 'div', text: descriptionField.label, style: { fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' } },
        { id: freshId(), tag: 'p', text: String(data[descriptionField.key]), style: { margin: '0', fontSize: '13px', color: '#4b5563', lineHeight: '1.6', whiteSpace: 'pre-wrap' } },
      ],
    });
  }

  if (pillFields.length > 0) {
    const pillColors = ['#eff6ff', '#f0fdf4', '#fef3c7', '#fdf2f8'];
    children.push({
      id: freshId(), tag: 'div',
      style: { display: 'grid', gridTemplateColumns: pillFields.length === 1 ? '1fr' : 'repeat(2, 1fr)', gap: '10px' },
      children: pillFields.map((f, i) => {
        const valueNode: PageElement = f.type === 'url'
          ? { id: freshId(), tag: 'a', href: String(data[f.key]), text: String(data[f.key]), style: { fontSize: '13px', fontWeight: '700', color: '#111827', wordBreak: 'break-all', textDecoration: 'none' } }
          : { id: freshId(), tag: 'div', text: String(data[f.key]), style: { fontSize: '13px', fontWeight: '700', color: '#111827' } };
        return {
          id: freshId(), tag: 'div',
          style: { background: pillColors[i % pillColors.length], borderRadius: '8px', padding: '12px 14px' },
          children: [
            { id: freshId(), tag: 'div', text: f.label, style: { fontSize: '11px', color: '#6b7280', marginBottom: '4px' } } as PageElement,
            valueNode,
          ],
        };
      }),
    });
  }

  return children;
}

export function expandCollectionNodesForPreview(
  tree: PageElement[],
  collectionsById: Map<string, SiteCollection>,
  componentsById: Map<string, SiteComponent>,
  interactive: boolean = false,
  visiting: Set<string> = new Set(),
): PageElement[] {
  return tree.map(el => expandNode(el, collectionsById, componentsById, interactive, visiting));
}

function expandNode(
  el: PageElement,
  collectionsById: Map<string, SiteCollection>,
  componentsById: Map<string, SiteComponent>,
  interactive: boolean,
  visiting: Set<string>,
): PageElement {
  const ref = (el as Record<string, unknown>)._collection;

  if (isCollectionRef(ref)) {
    const collection = collectionsById.get(ref.collectionId);
    const component  = componentsById.get(ref.componentId);

    if (!collection || !component || visiting.has(ref.componentId)) {
      return { ...el, children: [] };
    }

    const items: CollectionItem[] = typeof ref.limit === 'number'
      ? (collection.items ?? []).slice(0, ref.limit)
      : (collection.items ?? []);
    const nextVisiting = new Set(visiting);
    nextVisiting.add(ref.componentId);

    const templateNodes = (Array.isArray(component.html) ? component.html : []) as PageElement[];
    const expandedChildren = items.flatMap(item => {
      const clones = templateNodes.map(t => cloneForPreview(t, item.data, interactive));
      const recursed = expandCollectionNodesForPreview(clones, collectionsById, componentsById, interactive, nextVisiting);

      if (!ref.detailModal || recursed.length === 0) return recursed;

      const modalId = `${recursed[0].id}-modal`;
      const { nodes: withTrigger, found } = attachModalTrigger(recursed, modalId);
      if (!found) return recursed;

      const modalTemplateNodes = (Array.isArray(component.modalHtml) ? component.modalHtml : []) as PageElement[];
      const contentChildren = modalTemplateNodes.length > 0
        ? modalTemplateNodes.map(t => cloneForPreview(t, item.data, interactive))
        : buildGenericDetailModalContent(collection.fields, item.data);

      return [...withTrigger, wrapInDialogShell(modalId, contentChildren)];
    });

    return { ...el, children: expandedChildren };
  }

  if (Array.isArray(el.children)) {
    return { ...el, children: expandCollectionNodesForPreview(el.children, collectionsById, componentsById, interactive, visiting) };
  }

  return el;
}

// Scans a tree for every distinct { collectionId, componentId } pair referenced
// by a `_collection` marker, so the caller knows exactly what to fetch.
export function collectCollectionRefs(tree: PageElement[]): CollectionRef[] {
  const found = new Map<string, CollectionRef>();
  function visit(el: PageElement) {
    const ref = (el as Record<string, unknown>)._collection;
    if (isCollectionRef(ref)) found.set(`${ref.collectionId}:${ref.componentId}`, ref);
    if (Array.isArray(el.children)) el.children.forEach(visit);
  }
  tree.forEach(visit);
  return Array.from(found.values());
}
