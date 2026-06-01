import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '../../stores/editorStore';

// ── Icons ─────────────────────────────────────────────────────────────────────
const IBack   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IFrame  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5 2v12M11 2v12M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3"/></svg>;
const IUndo   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5.5 6H10a3 3 0 010 6H6.5M5.5 6l2-2M5.5 6l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IRedo   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10.5 6H6a3 3 0 100 6h3.5M10.5 6l-2-2M10.5 6l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IImport = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const IShare  = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="11.5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3"/><circle cx="4.5" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/><circle cx="11.5" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.3"/><path d="M6 7l4-2M6 9l4 2" stroke="currentColor" strokeWidth="1.3"/></svg>;

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  onOpenImport: () => void;
  siteId: string;
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
export function EditorTopBar({ onOpenImport, siteId }: Props) {
  const pageMeta = useEditorStore(s => s.pageMeta);
  const slug     = useEditorStore(s => s.slug);
  const isDirty  = useEditorStore(s => s.isDirty);
  const isSaving = useEditorStore(s => s.isSaving);
  const canUndo  = useEditorStore(s => s.canUndo);
  const canRedo  = useEditorStore(s => s.canRedo);

  const undo    = useEditorStore(s => s.undo);
  const redo    = useEditorStore(s => s.redo);
  const save    = useEditorStore(s => s.save);
  const publish = useEditorStore(s => s.publish);
  const navigate = useNavigate();

  const handleSave = async () => {
    await save();
    toast.success('Saved');
  };

  const handlePublish = async () => {
    await publish();
    toast.success('Published!');
  };

  const handleBack = async () => {
    if (isDirty) await save().catch(() => {});
    navigate(`/sites/${siteId}`);
  };

  return (
    <div className="l-toolbar">
      {/* Back button */}
      <button
        className="l-tool-btn"
        title="Back to workspace"
        onClick={handleBack}
        style={{ color: 'var(--text-2)' }}
      >
        <IBack />
      </button>

      {/* Brand */}
      <div className="l-brand">
        <div className="l-logo"><IFrame /></div>
        {pageMeta?.title || slug || 'Builder'}
      </div>

      <div className="l-tb-sep" />

      {/* Undo / Redo */}
      <div className="l-tb-group">
        <button className="l-tool-btn" title="Undo (Ctrl+Z)"   disabled={!canUndo} onClick={undo}><IUndo /></button>
        <button className="l-tool-btn" title="Redo (Ctrl+⇧Z)" disabled={!canRedo} onClick={redo}><IRedo /></button>
      </div>

      <div className="l-tb-sep" />

      {/* Import HTML */}
      <button className="l-btn-ghost" onClick={onOpenImport} title="Import an HTML file into the canvas">
        <IImport /> Import HTML
      </button>

      {/* Dirty indicator */}
      {isDirty && !isSaving && (
        <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>● Unsaved</span>
      )}
      {isSaving && (
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Saving…</span>
      )}

      <div style={{ flex: 1 }} />

      {/* Avatars (decorative) */}
      <div style={{ display: 'flex' }}>
        {([['#6366f1','S'],['#10b981','K'],['#f59e0b','M']] as const).map(([bg, init]) => (
          <div key={init} style={{
            width: 26, height: 26, borderRadius: '50%', border: '2px solid #fff',
            marginLeft: -7, display: 'grid', placeItems: 'center',
            background: bg, color: '#fff', fontSize: 11, fontWeight: 650,
          }}>{init}</div>
        ))}
      </div>

      {/* Save */}
      <button
        className="l-btn-ghost"
        onClick={handleSave}
        disabled={!isDirty || isSaving}
        style={{ opacity: (!isDirty || isSaving) ? 0.4 : 1 }}
      >
        Save
      </button>

      {/* Publish */}
      <button
        className={pageMeta?.published ? 'l-btn-ghost' : 'l-btn-primary'}
        onClick={handlePublish}
        style={pageMeta?.published ? { color: '#059669', borderColor: '#6ee7b7' } : undefined}
      >
        <IShare />
        {pageMeta?.published ? 'Update' : 'Publish'}
      </button>
    </div>
  );
}
