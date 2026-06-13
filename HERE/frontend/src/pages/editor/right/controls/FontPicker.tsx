import { useState, useRef, useEffect } from 'react';
import { useEditorStore, uid } from '../../../../stores/editorStore';
import type { PageElement } from '../../../../api/pages';

const FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway',
  'Playfair Display', 'Merriweather', 'DM Sans', 'Nunito', 'Poppins',
  'Source Sans 3', 'Ubuntu', 'Oswald', 'Noto Sans', 'Fira Sans',
  'Work Sans', 'Quicksand', 'Libre Baskerville', 'IBM Plex Sans',
  'Josefin Sans', 'Mulish', 'Barlow', 'Outfit', 'Space Grotesk',
  'Lexend', 'Plus Jakarta Sans', 'Bricolage Grotesque', 'Instrument Serif',
];

const injected = new Set<string>();

function injectGoogleFont(fontName: string, addChildFn: (parentId: string | null, el: PageElement) => void, elements: PageElement[]) {
  if (injected.has(fontName)) return;
  injected.add(fontName);

  const slug = fontName.replace(/ /g, '+');
  const href = `https://fonts.googleapis.com/css2?family=${slug}:wght@400;600;700&display=swap`;

  // Inject into document head immediately so the canvas shows the font
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);

  // Also add a <link> to the element tree so it's saved and published
  const alreadyInTree = elements.some(el => el.tag === 'link' && (el as Record<string,string>).href === href);
  if (!alreadyInTree) {
    addChildFn(null, { id: uid(), tag: 'link', rel: 'stylesheet', href } as PageElement);
  }
}

interface Props {
  elId:  string;
  value: string | undefined;
}

export function FontPicker({ elId, value }: Props) {
  const [open,   setOpen]   = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  const elements       = useEditorStore(s => s.elements);
  const capture        = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const removeStyle    = useEditorStore(s => s.removeStyle);
  const addChild       = useEditorStore(s => s.addChild);

  // Extract font name from CSS value like "'Open Sans', sans-serif"
  const currentFont = value
    ? value.replace(/['"]/g, '').split(',')[0].trim()
    : '';

  const filtered = FONTS.filter(f => f.toLowerCase().includes(search.toLowerCase()));

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const select = (font: string) => {
    capture();
    injectGoogleFont(font, addChild, elements);
    patchStyleLive(elId, 'fontFamily', `'${font}', sans-serif`);
    setOpen(false);
    setSearch('');
  };

  const clear = () => {
    capture();
    removeStyle(elId, 'fontFamily');
    setOpen(false);
  };

  return (
    <div ref={dropRef} style={{ position: 'relative', flex: 1 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 8px',
          fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 4, background: '#fff',
          fontFamily: currentFont ? `'${currentFont}', sans-serif` : 'inherit',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {currentFont || '— inherit —'}
        </span>
        <span style={{ fontSize: 9, color: '#9ca3af', flexShrink: 0 }}>▾</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          background: '#fff', border: '1px solid #e9e9ee', borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,.12)', marginTop: 2, overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6' }}>
            <input
              autoFocus
              value={search}
              placeholder="Search fonts…"
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 7px', fontSize: 11, boxSizing: 'border-box' }}
            />
          </div>

          {/* Font list */}
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            <div
              onClick={clear}
              style={{ padding: '6px 12px', fontSize: 11, color: '#9ca3af', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              — inherit —
            </div>
            {filtered.map(font => (
              <div
                key={font}
                onClick={() => select(font)}
                style={{
                  padding: '6px 12px', fontSize: 13, cursor: 'pointer',
                  fontFamily: `'${font}', sans-serif`,
                  background: font === currentFont ? '#eef2ff' : 'transparent',
                  color: font === currentFont ? '#4f46e5' : '#374151',
                  fontWeight: font === currentFont ? 600 : 400,
                }}
                onMouseEnter={e => { if (font !== currentFont) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (font !== currentFont) e.currentTarget.style.background = 'transparent'; }}
              >
                {font}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '8px 12px', fontSize: 11, color: '#9ca3af' }}>No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
