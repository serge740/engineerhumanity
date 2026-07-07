import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEditorStore } from '../../../stores/editorStore';
import { COMPONENT_TEMPLATES, type ComponentTemplate } from '../data/componentTemplates';
import { getCollection, updateCollection } from '../../../api/collections';

const CATEGORY_COLORS: Record<string, string> = {
  Card:        '#6366f1',
  Testimonial: '#f59e0b',
  Pricing:     '#10b981',
};

const ISearch = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

// Inserts a predefined design's markup, then ensures the linked Collection has
// matching columns for every {{token}} the template uses — only adding keys
// that don't already exist, never touching the user's existing columns/labels.
async function ensureFields(siteId: string, collectionId: string, template: ComponentTemplate) {
  const collection = await getCollection(siteId, collectionId);
  const existingKeys = new Set(collection.fields.map(f => f.key));
  const missing = template.fields.filter(f => !existingKeys.has(f.key));
  if (missing.length === 0) return 0;
  await updateCollection(siteId, collectionId, { fields: [...collection.fields, ...missing] });
  return missing.length;
}

export function TemplatesPanel() {
  const [q, setQ] = useState('');
  const siteId        = useEditorStore(s => s.siteId);
  const componentMeta  = useEditorStore(s => s.componentMeta);
  const addChild       = useEditorStore(s => s.addChild);
  const bumpFieldsVersion = useEditorStore(s => s.bumpFieldsVersion);

  const filtered = COMPONENT_TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(q.toLowerCase()) ||
    t.category.toLowerCase().includes(q.toLowerCase())
  );
  const categories = [...new Set(filtered.map(t => t.category))];

  const handleInsert = async (template: ComponentTemplate) => {
    addChild(null, template.make());

    const collectionId = componentMeta?.collectionId;
    if (!siteId || !collectionId) return;
    try {
      const added = await ensureFields(siteId, collectionId, template);
      if (added > 0) {
        toast.success(`Added ${added} column${added !== 1 ? 's' : ''} to your data table`);
        bumpFieldsVersion();
      }
    } catch {
      toast.error('Inserted the design, but failed to update your data columns — add them manually on the Data tab');
    }
  };

  return (
    <div className="l-panel-scroll">
      <div className="l-lib-search">
        <ISearch />
        <input
          placeholder="Search designs…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '20px 16px', fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
          No designs match "{q}"
        </div>
      )}

      {categories.map(cat => (
        <div key={cat}>
          <div className="l-sect-head">{cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px 8px' }}>
            {filtered.filter(t => t.category === cat).map(template => (
              <div
                key={template.id}
                onClick={() => handleInsert(template)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                  border: '1px solid #e9e9ee', background: '#fff',
                }}
                title={template.description}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                  background: `${CATEGORY_COLORS[cat] ?? '#6366f1'}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 14, height: 10, borderRadius: 2, background: CATEGORY_COLORS[cat] ?? '#6366f1', opacity: 0.7 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1f2024' }}>{template.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {template.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: '10px 8px 0', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
        Tip: pick a design to start from, then use the Layout section in the
        Inspector (Direction, Align, Gap) to restructure it however you like.
      </div>
    </div>
  );
}
