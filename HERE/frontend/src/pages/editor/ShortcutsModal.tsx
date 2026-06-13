import { useEffect } from 'react';

const SHORTCUTS = [
  { keys: 'Ctrl + Z',           action: 'Undo' },
  { keys: 'Ctrl + Shift + Z',   action: 'Redo' },
  { keys: 'Ctrl + S',           action: 'Save' },
  { keys: 'Ctrl + D',           action: 'Duplicate selected element' },
  { keys: 'Delete / Backspace', action: 'Delete selected element' },
  { keys: 'Escape',             action: 'Deselect / exit text edit' },
  { keys: 'Double-click',       action: 'Edit element text inline' },
  { keys: 'Space + Drag',       action: 'Pan canvas' },
  { keys: 'Ctrl + Scroll',      action: 'Zoom in / out' },
  { keys: 'Ctrl + =',           action: 'Zoom in' },
  { keys: 'Ctrl + −',           action: 'Zoom out' },
  { keys: 'Ctrl + 0',           action: 'Reset zoom to 100%' },
  { keys: 'Right-click',        action: 'Open context menu on element' },
];

interface Props { onClose: () => void; }

export function ShortcutsModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 14, padding: '28px 32px',
          width: 480, maxWidth: '90vw', boxShadow: '0 8px 40px rgba(0,0,0,.18)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 18, lineHeight: 1, padding: 4 }}
          >✕</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {SHORTCUTS.map(({ keys, action }) => (
              <tr key={keys} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '8px 0', width: '45%' }}>
                  <code style={{
                    fontSize: 11, fontWeight: 600, background: '#f3f4f6',
                    border: '1px solid #e5e7eb', borderRadius: 5,
                    padding: '3px 8px', color: '#374151', whiteSpace: 'nowrap',
                  }}>{keys}</code>
                </td>
                <td style={{ padding: '8px 0 8px 12px', fontSize: 13, color: '#6b7280' }}>
                  {action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: 16, fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>
          Press Escape or click outside to close
        </p>
      </div>
    </div>
  );
}
