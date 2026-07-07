import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Database, Palette, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getComponent, type SiteComponent } from '../../api/components';
import { useEditorStore } from '../../stores/editorStore';
import { CollectionDataGrid } from './CollectionDataGrid';
import { LeftPanel }    from '../editor/left/LeftPanel';
import { Canvas }       from '../editor/canvas/Canvas';
import { Inspector }    from '../editor/right/Inspector';
import { ImportModal }  from '../editor/ImportModal';
import { BreadcrumbBar } from '../editor/BreadcrumbBar';
import { ComponentEditorTopBar } from '../editor/ComponentEditorTopBar';

type Tab = 'data' | 'design';

export default function ComponentDetailPage() {
  const { siteId, componentId } = useParams<{ siteId: string; componentId: string }>();
  const navigate = useNavigate();

  const [component, setComponent] = useState<SiteComponent | null>(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('data');
  const [importOpen,  setImportOpen]  = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [autoSaving,  setAutoSaving]  = useState(false);

  const initComponent = useEditorStore(s => s.initComponent);
  const elements       = useEditorStore(s => s.elements);
  const isDirty         = useEditorStore(s => s.isDirty);
  const save             = useEditorStore(s => s.save);
  const selectedId       = useEditorStore(s => s.selectedId);
  const editingId         = useEditorStore(s => s.editingId);
  const undo               = useEditorStore(s => s.undo);
  const redo                = useEditorStore(s => s.redo);
  const removeElement        = useEditorStore(s => s.removeElement);
  const duplicateElement      = useEditorStore(s => s.duplicateElement);
  const selectElement           = useEditorStore(s => s.selectElement);
  const setEditingId              = useEditorStore(s => s.setEditingId);

  useEffect(() => {
    if (!siteId || !componentId) return;
    getComponent(siteId, componentId)
      .then(c => { setComponent(c); initComponent(siteId, componentId, c); })
      .catch(() => { toast.error('Component not found'); navigate(`/sites/${siteId}`); })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, componentId]);

  // Auto-save 1.5s after any change, mirroring the page editor's behavior.
  useEffect(() => {
    if (!isDirty) return;
    const t = setTimeout(async () => {
      setAutoSaving(true);
      try { await save(); } catch { toast.error('Auto-save failed — check your connection'); }
      finally { setAutoSaving(false); }
    }, 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, isDirty]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (activeTab !== 'design') return;
    const active = e.target as HTMLElement;
    const inField = active?.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(active?.tagName ?? '');
    const meta = e.metaKey || e.ctrlKey;

    if (meta && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (meta && e.key.toLowerCase() === 's') { e.preventDefault(); save().then(() => toast.success('Saved')); return; }
    if (inField) return;
    if (e.key === 'Escape') { selectElement(null); setEditingId(null); return; }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && !editingId) { e.preventDefault(); removeElement(selectedId); return; }
    if (meta && e.key.toLowerCase() === 'd' && selectedId) { e.preventDefault(); duplicateElement(selectedId); return; }
  }, [activeTab, selectedId, editingId, undo, redo, save, removeElement, duplicateElement, selectElement, setEditingId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (loading || !component || !siteId) {
    return (
      <AdminLayout title="Loading…" crumbs={[{ label: 'Workspace', to: `/sites/${siteId}` }]}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
          <Loader2 size={22} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
        </div>
      </AdminLayout>
    );
  }

  // ── Design tab: full-viewport canvas chrome, same as the page editor ───────
  if (activeTab === 'design') {
    return (
      <div className="l-app" style={{ height: '100vh' }}>
        <ComponentEditorTopBar
          onOpenImport={() => setImportOpen(true)}
          onBack={() => setActiveTab('data')}
          previewMode={previewMode}
          onTogglePreview={() => { setPreviewMode(p => !p); selectElement(null); setEditingId(null); }}
          autoSaving={autoSaving}
        />
        <div className="l-workspace">
          {!previewMode && <LeftPanel />}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            {!previewMode && <BreadcrumbBar />}
            <Canvas previewMode={previewMode} />
          </div>
          {!previewMode && <Inspector />}
        </div>
        {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}
      </div>
    );
  }

  // ── Data tab: normal admin chrome ───────────────────────────────────────────
  return (
    <AdminLayout
      title={component.name}
      crumbs={[{ label: 'Workspace', to: `/sites/${siteId}` }, { label: component.name }]}
    >
      <div className="page-head">
        <div><h1>{component.name}</h1></div>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab('data')} className="tab" data-active={true}>
          <Database size={14} /> Data
        </button>
        <button onClick={() => setActiveTab('design')} className="tab" data-active={false}>
          <Palette size={14} /> Design
        </button>
      </div>

      {component.collectionId ? (
        <CollectionDataGrid siteId={siteId} collectionId={component.collectionId} />
      ) : (
        <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
          <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No data table linked</p>
          <p style={{ maxWidth: 320, margin: '0 auto' }}>This component isn't linked to a data table, so there's nothing to show here. You can still design it.</p>
        </div>
      )}
    </AdminLayout>
  );
}
