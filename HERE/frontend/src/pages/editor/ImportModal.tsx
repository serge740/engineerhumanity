import React, { useRef, useState } from 'react';
import { parseHTML } from './utils/htmlImport';
import { useEditorStore } from '../../stores/editorStore';
import type { PageElement } from '../../api/pages';

interface Props {
  onClose: () => void;
}

export function ImportModal({ onClose }: Props) {
  const setElements = useEditorStore(s => s.setElements);
  const elements    = useEditorStore(s => s.elements);

  const htmlRef = useRef<HTMLInputElement>(null);
  const cssRef  = useRef<HTMLInputElement>(null);

  const [htmlName, setHtmlName] = useState('');
  const [cssName,  setCssName ] = useState('');
  const [preview,  setPreview ] = useState('');
  const [parsed,   setParsed  ] = useState<PageElement[] | null>(null);
  const [mode,     setMode    ] = useState<'replace' | 'append'>('replace');
  const [error,    setError   ] = useState('');

  const readFile = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload  = () => res(r.result as string);
      r.onerror = () => rej(r.error);
      r.readAsText(file);
    });

  const handleHtmlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setHtmlName(file.name);
    setError('');
    try {
      const html = await readFile(file);
      setPreview(html.slice(0, 2000));
      const cssFile = cssRef.current?.files?.[0];
      const css = cssFile ? await readFile(cssFile) : undefined;
      const els = parseHTML(html, css);
      setParsed(els);
    } catch {
      setError('Failed to read file.');
    }
  };

  const handleCssChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setCssName(file.name);
    const htmlFile = htmlRef.current?.files?.[0];
    if (!htmlFile) return;
    try {
      const [html, css] = await Promise.all([readFile(htmlFile), readFile(file)]);
      const els = parseHTML(html, css);
      setParsed(els);
    } catch {
      setError('Failed to read CSS file.');
    }
  };

  const handleImport = () => {
    if (!parsed) return;
    if (mode === 'replace') {
      setElements(parsed, true);
    } else {
      setElements([...elements, ...parsed], true);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#fff', borderRadius: 14,
        width: 560, maxHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,.2)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Import HTML</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
              Converts every HTML element into an editable layer
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af', lineHeight: 1 }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 22px', overflowY: 'auto', flex: 1 }}>
          {/* HTML file */}
          <label style={{ display: 'block', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>HTML file <span style={{ color: '#ef4444' }}>*</span></div>
            <div style={{
              border: '2px dashed #d1d5db', borderRadius: 8, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              background: htmlName ? '#eef2ff' : '#fafafa',
              borderColor: htmlName ? '#6366f1' : '#d1d5db',
            }}>
              <span style={{ fontSize: 22 }}>📄</span>
              <span style={{ fontSize: 13, color: htmlName ? '#4f46e5' : '#6b7280' }}>
                {htmlName || 'Click to select .html file'}
              </span>
              <input ref={htmlRef} type="file" accept=".html,.htm" style={{ display: 'none' }} onChange={handleHtmlChange} />
            </div>
          </label>

          {/* CSS file */}
          <label style={{ display: 'block', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>CSS file <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></div>
            <div style={{
              border: '2px dashed #d1d5db', borderRadius: 8, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              background: cssName ? '#f0fdf4' : '#fafafa',
              borderColor: cssName ? '#10b981' : '#d1d5db',
            }}>
              <span style={{ fontSize: 22 }}>🎨</span>
              <span style={{ fontSize: 13, color: cssName ? '#059669' : '#6b7280' }}>
                {cssName || 'Click to select .css file'}
              </span>
              <input ref={cssRef} type="file" accept=".css" style={{ display: 'none' }} onChange={handleCssChange} />
            </div>
          </label>

          {/* Import mode */}
          {parsed && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Import mode</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['replace','append'] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    padding: '6px 14px', border: '1.5px solid', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    background: mode === m ? '#eef2ff' : '#fff',
                    borderColor: mode === m ? '#6366f1' : '#d1d5db',
                    color: mode === m ? '#4f46e5' : '#374151',
                  }}>
                    {m === 'replace' ? 'Replace canvas' : 'Append to canvas'}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                {parsed.length} element{parsed.length !== 1 ? 's' : ''} will be imported
              </div>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Preview</div>
              <pre style={{
                background: '#1e293b', color: '#94a3b8', padding: '12px', borderRadius: 8,
                fontSize: 11, fontFamily: 'monospace', overflowX: 'auto', maxHeight: 160,
                margin: 0,
              }}>
                {preview}{preview.length >= 2000 ? '\n… (truncated)' : ''}
              </pre>
            </div>
          )}

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#dc2626', marginTop: 10 }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: 14, fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
            ℹ Inline styles are preserved exactly. External CSS linked by URL will load when the page is published.
            Internal &lt;style&gt; tags are captured and applied in the canvas.
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid #f0f0f4', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!parsed}
            style={{
              padding: '8px 18px', background: parsed ? '#6366f1' : '#a5b4fc',
              border: 'none', borderRadius: 6, cursor: parsed ? 'pointer' : 'not-allowed',
              color: '#fff', fontSize: 13, fontWeight: 600,
            }}
          >
            Import {parsed ? `(${parsed.length} elements)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
