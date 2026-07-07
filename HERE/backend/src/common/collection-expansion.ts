// Shared by public.service.ts (live page serving) and export.service.ts (static export)
// so both surfaces expand `_collection` marker nodes identically.

export interface PageElement {
  id: string;
  tag: string;
  children?: PageElement[];
  [key: string]: unknown;
}

export interface CollectionFieldDef {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface CollectionForExpansion {
  id: string;
  fields: CollectionFieldDef[];
  items: { data: Record<string, unknown> }[];
}

export interface ComponentForExpansion {
  id: string;
  html: PageElement[];
  modalHtml?: PageElement[] | null;
}

interface CollectionRef {
  collectionId: string;
  componentId: string;
  limit?: number;
  // When true, the card's first <a> opens a <dialog> with every field of that
  // row instead of navigating. See ElementView.tsx (React paths) and this
  // file's buildAttrs-side counterpart in export.service.ts (static export)
  // for how `_modalTarget`/`_modalClose` actually get wired up to work.
  detailModal?: boolean;
}

let __uid = 0;
function freshId(): string {
  return 'ce-' + Date.now().toString(36) + '-' + (++__uid);
}

function cloneWithFreshIds(el: PageElement): PageElement {
  const clone: PageElement = { ...el, id: freshId() };
  if (Array.isArray(el.children)) {
    clone.children = el.children.map(cloneWithFreshIds);
  }
  return clone;
}

const TOKEN_RE = /\{\{\s*(\w+)\s*\}\}/g;

function substituteTokens(value: string, data: Record<string, unknown>): string {
  return value.replace(TOKEN_RE, (_m, key: string) => {
    const v = data[key];
    return v === undefined || v === null ? '' : String(v);
  });
}

function substituteInNode(el: PageElement, data: Record<string, unknown>): PageElement {
  const out: PageElement = { ...el };
  for (const [k, v] of Object.entries(out)) {
    if (k === 'children') continue;
    if (typeof v === 'string') out[k] = substituteTokens(v, data);
  }
  if (Array.isArray(out.children)) {
    out.children = out.children.map(c => substituteInNode(c, data));
  }
  return out;
}

function isCollectionRef(val: unknown): val is CollectionRef {
  return (
    !!val &&
    typeof val === 'object' &&
    typeof (val as Record<string, unknown>).collectionId === 'string' &&
    typeof (val as Record<string, unknown>).componentId === 'string'
  );
}

// Finds the first <a> in a card instance (depth-first) and tags it with
// `_modalTarget` so ElementView.tsx / export.service.ts know to open the
// dialog instead of (or before) navigating. Returns null if no <a> exists.
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
// shell: centering/backdrop CSS and the close button are always
// framework-controlled so the admin can't accidentally break the close
// behavior, regardless of what they design inside.
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
      // Attribute selector (not `#id`) since these elements are only ever
      // findable via `data-el-id` in the React-rendered editor/public-page
      // paths — a literal `id` attribute isn't rendered there.
      { id: freshId(), tag: 'style', text: `[data-el-id="${modalId}"]::backdrop { background: rgba(15,23,42,0.6); }` },
      { id: freshId(), tag: 'div', style: { padding: '32px', position: 'relative', boxSizing: 'border-box' }, children },
    ],
  };
}

// Builds the generic "more detail" content for one collection item, laid out
// like a profile card: a ringed circular avatar (first image field), a
// name/subtitle heading (first two text fields), a highlighted description
// block (first long-text field), then any remaining fields as a grid of
// small info pills. Works for any collection schema — nothing here is
// specific to a particular template. This is the fallback used only when the
// component has no custom `modalHtml` designed yet.
function buildGenericDetailModalContent(
  fields: CollectionFieldDef[],
  data: Record<string, unknown>,
): PageElement[] {
  const consumed = new Set<string>();
  const hasValue = (f: CollectionFieldDef) => {
    const v = data[f.key];
    return v !== undefined && v !== null && v !== '';
  };
  const pick = (predicate: (f: CollectionFieldDef) => boolean): CollectionFieldDef | undefined => {
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
      children: pillFields.map((f, i) => ({
        id: freshId(), tag: 'div',
        style: { background: pillColors[i % pillColors.length], borderRadius: '8px', padding: '12px 14px' },
        children: [
          { id: freshId(), tag: 'div', text: f.label, style: { fontSize: '11px', color: '#6b7280', marginBottom: '4px' } },
          f.type === 'url'
            ? { id: freshId(), tag: 'a', href: String(data[f.key]), text: String(data[f.key]), style: { fontSize: '13px', fontWeight: '700', color: '#111827', wordBreak: 'break-all', textDecoration: 'none' } }
            : { id: freshId(), tag: 'div', text: String(data[f.key]), style: { fontSize: '13px', fontWeight: '700', color: '#111827' } },
        ],
      })),
    });
  }

  return children;
}

/**
 * Recursively expands `_collection` marker nodes into one cloned+substituted
 * instance of the bound component's html per collection item. Never mutates
 * inputs, never throws — a missing/unbound reference or a self-referential
 * template both resolve to an empty (no-op) expansion.
 */
export function expandCollectionNodes(
  tree: PageElement[],
  collectionsById: Map<string, CollectionForExpansion>,
  componentsById: Map<string, ComponentForExpansion>,
  visiting: Set<string> = new Set(),
): PageElement[] {
  return tree.map(el => expandNode(el, collectionsById, componentsById, visiting));
}

function expandNode(
  el: PageElement,
  collectionsById: Map<string, CollectionForExpansion>,
  componentsById: Map<string, ComponentForExpansion>,
  visiting: Set<string>,
): PageElement {
  const ref = el._collection;

  if (isCollectionRef(ref)) {
    const collection = collectionsById.get(ref.collectionId);
    const component = componentsById.get(ref.componentId);

    if (!collection || !component || visiting.has(ref.componentId)) {
      return { ...el, children: [] };
    }

    const items = typeof ref.limit === 'number' ? collection.items.slice(0, ref.limit) : collection.items;
    const nextVisiting = new Set(visiting);
    nextVisiting.add(ref.componentId);

    const expandedChildren = items.flatMap(item => {
      const clones = component.html.map(cloneWithFreshIds);
      const substituted = clones.map(c => substituteInNode(c, item.data));
      const recursed = expandCollectionNodes(substituted, collectionsById, componentsById, nextVisiting);

      if (!ref.detailModal || recursed.length === 0) return recursed;

      const modalId = `${recursed[0].id}-modal`;
      const { nodes: withTrigger, found } = attachModalTrigger(recursed, modalId);
      if (!found) return recursed; // no button to attach to — leave the card as-is

      const hasCustomModal = Array.isArray(component.modalHtml) && component.modalHtml.length > 0;
      const contentChildren = hasCustomModal
        ? (component.modalHtml as PageElement[]).map(n => substituteInNode(cloneWithFreshIds(n), item.data))
        : buildGenericDetailModalContent(collection.fields, item.data);

      return [...withTrigger, wrapInDialogShell(modalId, contentChildren)];
    });

    return { ...el, children: expandedChildren };
  }

  if (Array.isArray(el.children)) {
    return { ...el, children: expandCollectionNodes(el.children, collectionsById, componentsById, visiting) };
  }

  return el;
}
