import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEditorStore } from '../../stores/editorStore';
import { getPage, getPages } from '../../api/pages';
import { EditorTopBar } from './EditorTopBar';
import { LeftPanel }    from './left/LeftPanel';
import { Canvas }       from './canvas/Canvas';
import { Inspector }    from './right/Inspector';
import { ImportModal }  from './ImportModal';

export default function EditorPage() {
  const { siteId, slug } = useParams<{ siteId: string; slug: string }>();
  const navigate = useNavigate();

  const init         = useEditorStore(s => s.init);
  const pageMeta     = useEditorStore(s => s.pageMeta);
  const elements     = useEditorStore(s => s.elements);
  const isDirty      = useEditorStore(s => s.isDirty);
  const selectedId   = useEditorStore(s => s.selectedId);
  const editingId    = useEditorStore(s => s.editingId);

  const undo              = useEditorStore(s => s.undo);
  const redo              = useEditorStore(s => s.redo);
  const save              = useEditorStore(s => s.save);
  const removeElement     = useEditorStore(s => s.removeElement);
  const duplicateElement  = useEditorStore(s => s.duplicateElement);
  const selectElement     = useEditorStore(s => s.selectElement);
  const setEditingId      = useEditorStore(s => s.setEditingId);
  const setZoom           = useEditorStore(s => s.setZoom);

  const [importOpen, setImportOpen] = useState(false);

  // ── Load page ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!siteId || !slug) return;
    (async () => {
      try {
        const [page, pages] = await Promise.all([getPage(siteId, slug), getPages(siteId)]);
        init(siteId, slug, page, pages);
      } catch {
        toast.error('Failed to load editor');
        navigate(`/sites/${siteId}`);
      }
    })();
  }, [siteId, slug]);

  // ── Auto-save ──────────────────────────────────────────────────────────────
  // Watch `elements` (not just isDirty) so every edit resets the 2s debounce timer.
  useEffect(() => {
    if (!isDirty) return;
    const t = setTimeout(() => {
      save().catch(() => toast.error('Auto-save failed — check your connection'));
    }, 2000);
    return () => clearTimeout(t);
  }, [elements, isDirty]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  const handleKey = useCallback((e: KeyboardEvent) => {
    const active = e.target as HTMLElement;
    const inField = active?.isContentEditable ||
      ['INPUT','TEXTAREA','SELECT'].includes(active?.tagName ?? '');

    const meta = e.metaKey || e.ctrlKey;

    // Always active
    if (meta && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      e.shiftKey ? redo() : undo();
      return;
    }
    if (meta && e.key.toLowerCase() === 's') {
      e.preventDefault();
      save().then(() => toast.success('Saved'));
      return;
    }

    if (inField) return;

    if (e.key === 'Escape') {
      selectElement(null);
      setEditingId(null);
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && !editingId) {
      e.preventDefault();
      removeElement(selectedId);
      return;
    }
    if (meta && e.key.toLowerCase() === 'd' && selectedId) {
      e.preventDefault();
      duplicateElement(selectedId);
      return;
    }
    if (meta && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      setZoom(Math.min(4, useEditorStore.getState().zoom * 1.25));
      return;
    }
    if (meta && e.key === '-') {
      e.preventDefault();
      setZoom(Math.max(0.1, useEditorStore.getState().zoom * 0.8));
      return;
    }
    if (meta && e.key === '0') {
      e.preventDefault();
      setZoom(1);
      return;
    }
  }, [selectedId, editingId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (!pageMeta) {
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg, #f3f4f6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#9ca3af' }}>
          <div style={{ width: 32, height: 32, border: '3px solid #e9e9ee', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 13 }}>Loading editor…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="l-app" style={{ height: '100vh' }}>
      <EditorTopBar onOpenImport={() => setImportOpen(true)} siteId={siteId!} />

      <div className="l-workspace">
        <LeftPanel />
        <Canvas />
        <Inspector />
      </div>

      {importOpen && (
        <ImportModal onClose={() => setImportOpen(false)} />
      )}
    </div>
  );
}
