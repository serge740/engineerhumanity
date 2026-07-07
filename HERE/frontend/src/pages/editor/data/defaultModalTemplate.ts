import type { PageElement } from '../../../api/pages';
import type { ComponentField } from '../../../api/components';

let __uid = 0;
function freshId(): string {
  return 'dm-' + Date.now().toString(36) + '-' + (++__uid);
}

// Builds a good-looking, fully editable starting point for a dynamic
// component's detail-modal content, using {{field}} tokens instead of
// resolved values. Reuses the same slot-detection heuristic as the runtime
// auto-generated fallback (buildGenericDetailModalContent in
// backend/src/common/collection-expansion.ts and its frontend mirror):
// first image -> avatar, first text -> name, second text -> subtitle, first
// textarea -> description, everything else -> pills. The admin can freely
// restyle/rearrange/add elements starting from this tree — it's just a
// seed, not a fixed algorithm.
export function buildDefaultModalTemplate(schema: ComponentField[]): PageElement[] {
  const consumed = new Set<string>();
  const pick = (predicate: (f: ComponentField) => boolean): ComponentField | undefined => {
    const f = schema.find(f => !consumed.has(f.key) && predicate(f));
    if (f) consumed.add(f.key);
    return f;
  };

  const avatarField     = pick(f => f.type === 'image');
  const nameField       = pick(f => f.type === 'text');
  const subtitleField   = pick(f => f.type === 'text');
  const descriptionField = pick(f => f.type === 'textarea');
  const pillFields      = schema.filter(f => !consumed.has(f.key));

  const children: PageElement[] = [];

  if (avatarField || nameField || subtitleField) {
    children.push({
      id: freshId(), tag: 'div',
      style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', marginBottom: '18px' },
      children: [
        ...(avatarField ? [{
          id: freshId(), tag: 'img', src: `{{${avatarField.key}}}`, alt: nameField ? `{{${nameField.key}}}` : avatarField.label,
          style: { width: '72px', height: '72px', minWidth: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1' },
        } as PageElement] : []),
        {
          id: freshId(), tag: 'div', style: { display: 'flex', flexDirection: 'column', gap: '4px' },
          children: [
            ...(nameField ? [{ id: freshId(), tag: 'h3', text: `{{${nameField.key}}}`, style: { margin: '0', fontSize: '20px', fontWeight: '700', color: '#111827' } } as PageElement] : []),
            ...(subtitleField ? [{ id: freshId(), tag: 'p', text: `{{${subtitleField.key}}}`, style: { margin: '0', fontSize: '13px', color: '#6b7280' } } as PageElement] : []),
          ],
        },
      ],
    });
  }

  if (descriptionField) {
    children.push({
      id: freshId(), tag: 'div',
      style: { background: '#f3f4f6', borderLeft: '4px solid #10b981', borderRadius: '8px', padding: '16px 18px', marginBottom: '16px' },
      children: [
        { id: freshId(), tag: 'div', text: descriptionField.label, style: { fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' } },
        { id: freshId(), tag: 'p', text: `{{${descriptionField.key}}}`, style: { margin: '0', fontSize: '13px', color: '#4b5563', lineHeight: '1.6', whiteSpace: 'pre-wrap' } },
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
          ? { id: freshId(), tag: 'a', href: `{{${f.key}}}`, text: `{{${f.key}}}`, style: { fontSize: '13px', fontWeight: '700', color: '#111827', wordBreak: 'break-all', textDecoration: 'none' } }
          : { id: freshId(), tag: 'div', text: `{{${f.key}}}`, style: { fontSize: '13px', fontWeight: '700', color: '#111827' } };
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
