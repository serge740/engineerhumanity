import { useEffect, useState } from 'react';
import { useEditorStore } from '../../../stores/editorStore';
import { getCollection, type SiteCollection } from '../../../api/collections';

// Lists the fields of the component's linked data table as {{key}} tokens the
// user can copy into any text/attribute field in the Inspector — this is the
// entire "variables" UI: no binding step, just visibility into what's available.
export function VariablesPanel() {
  const siteId        = useEditorStore(s => s.siteId);
  const componentMeta = useEditorStore(s => s.componentMeta);
  const collectionId  = componentMeta?.collectionId ?? null;
  const fieldsVersion = useEditorStore(s => s.fieldsVersion);

  const [collection, setCollection] = useState<SiteCollection | null>(null);
  const [loading, setLoading]       = useState(true);
  const [copiedKey, setCopiedKey]   = useState<string | null>(null);

  useEffect(() => {
    if (!siteId || !collectionId) { setCollection(null); setLoading(false); return; }
    setLoading(true);
    getCollection(siteId, collectionId)
      .then(setCollection)
      .catch(() => setCollection(null))
      .finally(() => setLoading(false));
  // fieldsVersion isn't read here, but bumping it (e.g. after TemplatesPanel
  // merges new columns into this same collection) should force a refetch.
  }, [siteId, collectionId, fieldsVersion]);

  const copy = (key: string) => {
    navigator.clipboard.writeText(`{{${key}}}`).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(k => (k === key ? null : k)), 1200);
    });
  };

  if (loading) {
    return <div style={{ padding: '12px 16px', fontSize: 11, color: '#9ca3af' }}>Loading…</div>;
  }

  const fields = collection?.fields ?? [];

  return (
    <div className="l-panel-scroll">
      <div className="l-sect-head">Data columns</div>
      <div style={{ padding: '4px 8px 10px', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
        Type any of these into a text field or an image/link URL in the Inspector.
        They'll be replaced with real data from each row when this card repeats.
      </div>

      {fields.length === 0 ? (
        <div style={{ padding: '8px 16px', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
          No columns yet. Add columns on the Data tab first.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
          {fields.map(f => (
            <button
              key={f.key}
              onClick={() => copy(f.key)}
              title="Copy to clipboard"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                border: '1px solid #e9e9ee', borderRadius: 6, padding: '6px 10px',
                background: copiedKey === f.key ? '#eef2ff' : '#fff', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{f.label}</div>
                <code style={{ fontSize: 11, color: '#6366f1' }}>{'{{' + f.key + '}}'}</code>
              </span>
              <span style={{ fontSize: 10, color: copiedKey === f.key ? '#4f46e5' : '#9ca3af', flexShrink: 0 }}>
                {copiedKey === f.key ? 'Copied!' : 'Copy'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
