import { useEditorStore } from '../../stores/editorStore';
import { getAncestorChain } from './utils/treeHelpers';

const HIDDEN_TAGS = new Set(['style', 'link', 'script', 'meta', 'noscript', 'template']);

export function BreadcrumbBar() {
  const elements      = useEditorStore(s => s.elements);
  const selectedId    = useEditorStore(s => s.selectedId);
  const selectElement = useEditorStore(s => s.selectElement);

  if (!selectedId) return null;

  const chain = getAncestorChain(elements, selectedId) ?? [];

  // Find the selected element itself
  const findEl = (els: typeof elements, id: string): typeof elements[0] | null => {
    for (const e of els) {
      if (e.id === id) return e;
      if (e.children?.length) { const r = findEl(e.children, id); if (r) return r; }
    }
    return null;
  };
  const selectedEl = findEl(elements, selectedId);
  if (!selectedEl) return null;

  // Full chain including the selected element, filtering hidden tags
  const fullChain = [...chain, selectedEl].filter(el => !HIDDEN_TAGS.has(el.tag));
  if (fullChain.length === 0) return null;

  return (
    <div style={{
      height: 28, display: 'flex', alignItems: 'center', padding: '0 12px',
      gap: 2, fontSize: 11, background: '#f9fafb',
      borderBottom: '1px solid #e9e9ee', overflow: 'hidden',
      flexShrink: 0,
    }}>
      {fullChain.map((el, i) => {
        const isSelected = el.id === selectedId;
        return (
          <span key={el.id} style={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
            {i > 0 && <span style={{ color: '#d1d5db', fontSize: 10, flexShrink: 0 }}>›</span>}
            <button
              onClick={() => selectElement(el.id)}
              style={{
                border: 'none', cursor: 'pointer', borderRadius: 3,
                padding: '1px 6px', fontFamily: 'monospace', fontSize: 11,
                fontWeight: isSelected ? 700 : 500,
                background: isSelected ? '#eef2ff' : 'transparent',
                color: isSelected ? '#4f46e5' : '#6b7280',
                flexShrink: 0,
              }}
            >
              {el.tag}
              {el.class ? <span style={{ opacity: 0.6, fontWeight: 400 }}>.{el.class.split(' ')[0]}</span> : null}
            </button>
          </span>
        );
      })}
    </div>
  );
}
