import toast from 'react-hot-toast';
import { useEditorStore } from '../../stores/editorStore';
import { ShortcutsModal } from './ShortcutsModal';
import { useState } from 'react';

// ── Icons (mirrors EditorTopBar's icon set) ────────────────────────────────────
const IBack   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IFrame  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5 2v12M11 2v12M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.3"/></svg>;
const IUndo   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5.5 6H10a3 3 0 010 6H6.5M5.5 6l2-2M5.5 6l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IRedo   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10.5 6H6a3 3 0 100 6h3.5M10.5 6l-2-2M10.5 6l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IImport = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const IEye    = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/></svg>;
const IEyeOff = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M6.5 6.6A3.5 3.5 0 0011.4 11M4.5 4.6C2.9 5.6 1.5 8 1.5 8S4 12.5 8 12.5c1.2 0 2.3-.3 3.2-.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 3.5c.7 0 1.3.1 1.9.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const IHelp   = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M6.5 6c0-1 .7-1.5 1.5-1.5s1.5.6 1.5 1.5c0 .8-.5 1.2-1 1.5S8 8.2 8 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="11" r=".7" fill="currentColor"/></svg>;

interface Props {
  onOpenImport:    () => void;
  onBack:          () => void;
  previewMode:     boolean;
  onTogglePreview: () => void;
  autoSaving:      boolean;
}

// Mirrors EditorTopBar's structure but scoped to component-template editing:
// no Publish (components don't publish independently) and Back returns to the
// Data tab instead of navigating away, since Design is just a tab on the same view.
export function ComponentEditorTopBar({ onOpenImport, onBack, previewMode, onTogglePreview, autoSaving }: Props) {
  const componentMeta  = useEditorStore(s => s.componentMeta);
  const componentView  = useEditorStore(s => s.componentView);
  const isDirty  = useEditorStore(s => s.isDirty);
  const isSaving = useEditorStore(s => s.isSaving);
  const canUndo  = useEditorStore(s => s.canUndo);
  const canRedo  = useEditorStore(s => s.canRedo);

  const undo = useEditorStore(s => s.undo);
  const redo = useEditorStore(s => s.redo);
  const save = useEditorStore(s => s.save);
  const switchComponentView = useEditorStore(s => s.switchComponentView);

  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const handleSave = async () => {
    await save();
    toast.success('Saved');
  };

  return (
    <>
      <div className="l-toolbar">
        <button className="l-tool-btn" title="Back to Data tab" onClick={onBack} style={{ color: 'var(--text-2)' }}>
          <IBack />
        </button>

        <div className="l-brand">
          <div className="l-logo"><IFrame /></div>
          {componentMeta?.name || 'Component'}
        </div>

        <div className="l-tb-sep" />

        {componentMeta?.type === 'dynamic' && (
          <>
            <div className="l-tb-group" style={{ background: 'var(--surface-2, #f3f4f6)', borderRadius: 8, padding: 2, gap: 0 }}>
              <button
                className="l-tool-btn"
                title="Design the repeating card"
                onClick={() => switchComponentView('card')}
                style={componentView === 'card' ? { background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', borderRadius: 6, fontWeight: 600 } : { color: 'var(--text-2)' }}
              >
                Card
              </button>
              <button
                className="l-tool-btn"
                title="Design the click-through detail modal"
                onClick={() => switchComponentView('modal')}
                style={componentView === 'modal' ? { background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', borderRadius: 6, fontWeight: 600 } : { color: 'var(--text-2)' }}
              >
                Modal
              </button>
            </div>
            <div className="l-tb-sep" />
          </>
        )}

        <div className="l-tb-group">
          <button className="l-tool-btn" title="Undo (Ctrl+Z)"   disabled={!canUndo} onClick={undo}><IUndo /></button>
          <button className="l-tool-btn" title="Redo (Ctrl+⇧Z)" disabled={!canRedo} onClick={redo}><IRedo /></button>
        </div>

        <button className="l-tool-btn" title="Keyboard shortcuts (?)" onClick={() => setShortcutsOpen(true)}>
          <IHelp />
        </button>

        <div className="l-tb-sep" />

        {!previewMode && (
          <button className="l-btn-ghost" onClick={onOpenImport} title="Import an HTML file into the canvas">
            <IImport /> Import HTML
          </button>
        )}

        {(autoSaving || isSaving) && (
          <span style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, border: '1.5px solid #d1d5db', borderTopColor: '#6366f1', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
            Auto-saving…
          </span>
        )}
        {!autoSaving && !isSaving && !isDirty && !previewMode && componentMeta && (
          <span style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>✓ Saved</span>
        )}
        {!autoSaving && !isSaving && isDirty && !previewMode && (
          <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>● Unsaved</span>
        )}

        <div style={{ flex: 1 }} />

        <button
          className={previewMode ? 'l-btn-primary' : 'l-btn-ghost'}
          onClick={onTogglePreview}
          title={previewMode ? 'Exit preview mode' : 'Preview the card design'}
          style={previewMode ? { background: '#059669', borderColor: '#059669' } : undefined}
        >
          {previewMode ? <IEyeOff /> : <IEye />}
          {previewMode ? 'Exit Preview' : 'Preview'}
        </button>

        {!previewMode && (
          <button
            className="l-btn-ghost"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            style={{ opacity: (!isDirty || isSaving) ? 0.4 : 1 }}
          >
            Save
          </button>
        )}
      </div>

      {shortcutsOpen && <ShortcutsModal onClose={() => setShortcutsOpen(false)} />}
    </>
  );
}
