import { useEffect, useRef } from 'react';
import { useEditorStore, findById } from '../../stores/editorStore';
import { getAncestorChain } from './utils/treeHelpers';

interface Props {
  x:        number;
  y:        number;
  targetId: string;
  onClose:  () => void;
}

export function ContextMenu({ x, y, targetId, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  const elements        = useEditorStore(s => s.elements);
  const selectElement   = useEditorStore(s => s.selectElement);
  const duplicateElement = useEditorStore(s => s.duplicateElement);
  const removeElement   = useEditorStore(s => s.removeElement);
  const moveElement     = useEditorStore(s => s.moveElement);
  const wrapElement     = useEditorStore(s => s.wrapElement);

  // Close on outside click or Escape
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const found      = findById(elements, targetId);
  const ancestors  = getAncestorChain(elements, targetId) ?? [];
  const parentEl   = ancestors.length > 0 ? ancestors[ancestors.length - 1] : null;
  const currentIdx = found?.idx ?? 0;
  const siblings   = found?.siblings ?? [];
  const isFirst    = currentIdx === 0;
  const isLast     = currentIdx === siblings.length - 1;
  const parentId   = parentEl?.id ?? null;

  const run = (fn: () => void) => { fn(); onClose(); };

  const ITEM_STYLE: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '7px 14px', fontSize: 13, cursor: 'pointer',
    color: '#374151', userSelect: 'none', whiteSpace: 'nowrap',
    borderRadius: 0,
  };

  const DISABLED_STYLE: React.CSSProperties = {
    ...ITEM_STYLE, color: '#d1d5db', cursor: 'not-allowed',
  };

  const SEP = () => <div style={{ height: 1, background: '#f3f4f6', margin: '2px 0' }} />;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed', left: x, top: y, zIndex: 9999,
        background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,.13)', padding: '4px 0',
        minWidth: 180,
      }}
    >
      {/* Select parent */}
      {parentEl ? (
        <div style={ITEM_STYLE} onClick={() => run(() => selectElement(parentEl.id))}
          onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ fontSize: 11, opacity: 0.5 }}>↑</span> Select parent <code style={{ fontSize: 10, background: '#f3f4f6', borderRadius: 3, padding: '1px 5px', marginLeft: 'auto' }}>{parentEl.tag}</code>
        </div>
      ) : (
        <div style={DISABLED_STYLE}>↑ Select parent</div>
      )}

      <SEP />

      {/* Move up */}
      <div
        style={isFirst ? DISABLED_STYLE : ITEM_STYLE}
        onClick={isFirst ? undefined : () => run(() => moveElement(targetId, parentId, currentIdx - 1))}
        onMouseEnter={e => { if (!isFirst) e.currentTarget.style.background = '#f9fafb'; }}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        ↑ Move up
      </div>

      <div
        style={isLast ? DISABLED_STYLE : ITEM_STYLE}
        onClick={isLast ? undefined : () => run(() => moveElement(targetId, parentId, currentIdx + 1))}
        onMouseEnter={e => { if (!isLast) e.currentTarget.style.background = '#f9fafb'; }}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        ↓ Move down
      </div>

      <SEP />

      {/* Duplicate */}
      <div style={ITEM_STYLE} onClick={() => run(() => duplicateElement(targetId))}
        onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        ⧉ Duplicate
      </div>

      {/* Wrap in div */}
      <div style={ITEM_STYLE} onClick={() => run(() => wrapElement(targetId))}
        onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        ◻ Wrap in div
      </div>

      <SEP />

      {/* Delete */}
      <div
        style={{ ...ITEM_STYLE, color: '#dc2626' }}
        onClick={() => run(() => removeElement(targetId))}
        onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        🗑 Delete
      </div>
    </div>
  );
}
