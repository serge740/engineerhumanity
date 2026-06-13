import { useState } from 'react';
import { useEditorStore } from '../../../stores/editorStore';
import { SECTIONS } from '../data/sections';

const CATEGORY_COLORS: Record<string, string> = {
  Marketing:    '#6366f1',
  Navigation:   '#0ea5e9',
  Content:      '#10b981',
  'Social Proof': '#f59e0b',
  Forms:        '#ec4899',
};

const ISearch = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IPlus = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export function SectionsPanel() {
  const [q, setQ]     = useState('');
  const addChild      = useEditorStore(s => s.addChild);

  const filtered = SECTIONS.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.category.toLowerCase().includes(q.toLowerCase())
  );

  const categories = [...new Set(filtered.map(s => s.category))];

  return (
    <div className="l-panel-scroll">
      {/* Search */}
      <div className="l-lib-search">
        <ISearch />
        <input
          placeholder="Search sections…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '20px 16px', fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
          No sections match "{q}"
        </div>
      )}

      {categories.map(cat => (
        <div key={cat}>
          <div className="l-sect-head">{cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px 8px' }}>
            {filtered.filter(s => s.category === cat).map(section => (
              <div
                key={section.id}
                onClick={() => addChild(null, section.make())}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                  border: '1px solid #e9e9ee', background: '#fff',
                  transition: 'all 0.15s',
                }}
                className="l-section-card"
                title={section.description}
              >
                {/* Color swatch */}
                <div style={{
                  width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                  background: `${CATEGORY_COLORS[cat] ?? '#6366f1'}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 12, height: 8, borderRadius: 2, background: CATEGORY_COLORS[cat] ?? '#6366f1', opacity: 0.7 }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1f2024', lineHeight: 1.3 }}>
                    {section.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {section.description}
                  </div>
                </div>

                <div style={{ color: '#6366f1', flexShrink: 0, opacity: 0.6 }}>
                  <IPlus />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: '8px 16px 16px', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
        Click any section to insert it at the bottom of the page.
      </div>
    </div>
  );
}
