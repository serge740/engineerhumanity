import { useEffect } from 'react';
import { useEditorStore } from '../../../stores/editorStore';
import type { ToolMode } from '../../../stores/editorStore';

// ── SVG icons ─────────────────────────────────────────────────────────────────
const ISelect  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2.5l9.5 4-4 1.2-1.2 4L3 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
const IFrame   = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M2 5h12M2 11h12M5 2v12M11 2v12" stroke="currentColor" strokeWidth="1"/></svg>;
const IRect    = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>;
const IEllipse = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="8" rx="5.5" ry="4.5" stroke="currentColor" strokeWidth="1.3"/></svg>;
const ILine    = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const IText    = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M8 4v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M5.5 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;

const TOOLS: { mode: ToolMode; label: string; key: string; icon: React.ReactElement }[] = [
  { mode: 'select',  label: 'Select',    key: 'V', icon: <ISelect /> },
  { mode: 'frame',   label: 'Frame',     key: 'F', icon: <IFrame /> },
  { mode: 'rect',    label: 'Rectangle', key: 'R', icon: <IRect /> },
  { mode: 'ellipse', label: 'Ellipse',   key: 'E', icon: <IEllipse /> },
  { mode: 'line',    label: 'Line',      key: 'L', icon: <ILine /> },
  { mode: 'text',    label: 'Text',      key: 'T', icon: <IText /> },
];

export function ToolSidebar() {
  const toolMode    = useEditorStore(s => s.toolMode);
  const setToolMode = useEditorStore(s => s.setToolMode);

  // Keyboard shortcuts (V / F / R / E / L / T)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(t.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key.toLowerCase()) {
        case 'v': setToolMode('select');  break;
        case 'f': setToolMode('frame');   break;
        case 'r': setToolMode('rect');    break;
        case 'e': setToolMode('ellipse'); break;
        case 'l': setToolMode('line');    break;
        case 't': setToolMode('text');    break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setToolMode]);

  return (
    <div style={{
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      background: '#fff',
      border: '1px solid #e9e9ee',
      borderRadius: 10,
      padding: '4px',
      boxShadow: '0 4px 16px rgba(0,0,0,.10)',
      userSelect: 'none',
    }}>
      {TOOLS.map(tool => {
        const active = toolMode === tool.mode;
        return (
          <button
            key={tool.mode}
            title={`${tool.label}  (${tool.key})`}
            onClick={() => setToolMode(tool.mode)}
            style={{
              width: 32,
              height: 32,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              background: active ? '#6366f1' : 'transparent',
              color: active ? '#fff' : '#374151',
              transition: 'background 0.1s, color 0.1s',
            }}
          >
            {tool.icon}
          </button>
        );
      })}

      {/* Divider + tool label */}
      <div style={{ height: 1, background: '#f0f0f4', margin: '2px 0' }} />
      <div style={{
        fontSize: 9, fontWeight: 600, color: '#9ca3af',
        textAlign: 'center', letterSpacing: '0.04em', padding: '2px 0 1px',
        textTransform: 'uppercase',
      }}>
        {TOOLS.find(t => t.mode === toolMode)?.key}
      </div>
    </div>
  );
}
