import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, MoreVertical, Copy, Globe, Eye, EyeOff,
  Loader2, X, FileText, Puzzle, Image, Upload, Check,
  ExternalLink, Settings, Code, Home,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { getSite, updateSite, type Site } from '../../api/sites';
import {
  getPages, createPage, updatePage, deletePage,
  duplicatePage, publishPage, unpublishPage,
  type PageSummary, type CreatePageData,
} from '../../api/pages';
import { getComponents, createComponent, deleteComponent, type SiteComponent } from '../../api/components';
import { getAssets, uploadAsset, deleteAsset, formatBytes, type SiteAsset } from '../../api/assets';

type Tab = 'pages' | 'components' | 'assets' | 'settings';

function timeAgo(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return 'just now';
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}

// ── Shared Modal Shell ────────────────────────────────────────────────────────

function Modal({ title, subtitle, onClose, children }: {
  title: string; subtitle?: string; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
            {subtitle && <p className="text-[12px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Create Page Modal ─────────────────────────────────────────────────────────

function CreatePageModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (data: CreatePageData) => Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try { await onCreate({ title: title.trim() }); } finally { setLoading(false); }
  };

  return (
    <Modal title="New page" subtitle="Give your page a name to get started" onClose={onClose}>
      <form onSubmit={handle} className="p-6 space-y-4">
        <div>
          <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Page title</label>
          <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. About Us"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder:text-slate-300" />
          {slug && (
            <p className="mt-1.5 text-[11px] text-slate-400 font-mono">
              URL: <span className="text-slate-600">/{slug}</span>
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-[13px] text-slate-500 hover:text-slate-800 font-medium rounded-xl hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={!title.trim() || loading}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-[13px]
              font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            Create page
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Page Row ──────────────────────────────────────────────────────────────────

function PageRow({ page, onEdit, onDuplicate, onDelete, onTogglePublish, onRename, onSetLanding }: {
  page: PageSummary; onEdit: () => void; onDuplicate: () => void;
  onDelete: () => void; onTogglePublish: () => void; onRename: () => void;
  onSetLanding: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    if (open) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  return (
    <div className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl
      px-4 py-3 hover:border-slate-300 hover:shadow-sm transition-all">
      <div className={`w-2 h-2 rounded-full shrink-0 ${page.published ? 'bg-emerald-500' : 'bg-amber-400'}`} />

      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold text-slate-900 truncate">{page.title}</p>
          {page.isLanding && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 shrink-0">
              Landing
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400 font-mono mt-0.5">/{page.slug}</p>
      </div>

      <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
        <span>v{page.version}</span>
        <span>{timeAgo(page.updatedAt)}</span>
        <span className={`font-semibold px-2 py-0.5 rounded-md ${
          page.published ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
        }`}>
          {page.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onEdit}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600
            bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
          <Pencil className="w-3 h-3" /> Edit
        </button>
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(o => !o)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
          {open && (
            <div className="absolute right-0 top-9 w-44 bg-white border border-slate-200
              rounded-xl shadow-xl z-20 py-1 overflow-hidden">
              {[
                { icon: Pencil,  label: 'Rename',    fn: onRename },
                { icon: page.published ? EyeOff : Eye, label: page.published ? 'Unpublish' : 'Publish', fn: onTogglePublish },
                { icon: Copy,    label: 'Duplicate', fn: onDuplicate },
                { icon: Home,    label: page.isLanding ? 'Landing page ✓' : 'Set as landing', fn: onSetLanding },
              ].map(({ icon: Icon, label, fn }) => (
                <button key={label} onClick={() => { fn(); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              ))}
              <div className="border-t border-slate-100 my-1" />
              <button onClick={() => { onDelete(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-red-600 hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Pages Tab ─────────────────────────────────────────────────────────────────

function PagesTab({ siteId }: { siteId: string }) {
  const navigate = useNavigate();
  const [pages,       setPages]       = useState<PageSummary[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [showCreate,  setShowCreate]  = useState(false);
  const [deleteTarget,setDeleteTarget]= useState<PageSummary | null>(null);
  const [renaming,    setRenaming]    = useState<PageSummary | null>(null);
  const [renameVal,   setRenameVal]   = useState('');

  const load = async () => {
    try { setPages(await getPages(siteId)); } catch { toast.error('Failed to load pages'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [siteId]);

  const handleCreate = async (data: CreatePageData) => {
    try {
      const p = await createPage(siteId, data);
      toast.success('Page created');
      setShowCreate(false);
      navigate(`/sites/${siteId}/editor/${p.slug}`);
    } catch (e: any) { toast.error(e?.response?.data?.message || 'Failed to create page'); }
  };

  const handleDelete = async (p: PageSummary) => {
    try { await deletePage(siteId, p.slug); toast.success(`"${p.title}" deleted`); setDeleteTarget(null); load(); }
    catch (e: any) { toast.error(e?.response?.data?.message || 'Failed'); }
  };

  const handleToggle = async (p: PageSummary) => {
    try {
      p.published ? await unpublishPage(siteId, p.slug) : await publishPage(siteId, p.slug);
      toast.success(p.published ? 'Unpublished' : 'Published'); load();
    } catch { toast.error('Failed'); }
  };

  const handleSetLanding = async (p: PageSummary) => {
    if (p.isLanding) return; // already landing
    try {
      await updatePage(siteId, p.slug, { isLanding: true });
      toast.success(`"${p.title}" is now the landing page`);
      load();
    } catch { toast.error('Failed to set landing page'); }
  };

  const handleRename = async (p: PageSummary, title: string) => {
    if (!title.trim() || title === p.title) { setRenaming(null); return; }
    try { await updatePage(siteId, p.slug, { title: title.trim() }); toast.success('Renamed'); setRenaming(null); load(); }
    catch { toast.error('Failed to rename'); }
  };

  const published = pages.filter(p => p.published).length;

  if (loading) return <TabLoader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-slate-500">
          {pages.length} page{pages.length !== 1 ? 's' : ''}
          {published > 0 && <span className="text-emerald-600 ml-2 font-medium">{published} published</span>}
        </p>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white text-[12px]
            font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New page
        </button>
      </div>

      {pages.length === 0 ? (
        <TabEmpty icon={FileText} title="No pages yet" sub="Create your first page to start building"
          action="Create page" onAction={() => setShowCreate(true)} />
      ) : (
        <div className="space-y-2">
          {pages.map(p =>
            renaming?.id === p.id ? (
              <div key={p.id} className="flex items-center gap-2 bg-white border border-blue-400 rounded-xl px-4 py-3">
                <input autoFocus value={renameVal} onChange={e => setRenameVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRename(p, renameVal); if (e.key === 'Escape') setRenaming(null); }}
                  className="flex-1 text-[13px] font-semibold outline-none bg-transparent" />
                <button onClick={() => handleRename(p, renameVal)} className="text-emerald-500 hover:text-emerald-600 p-1"><Check className="w-4 h-4" /></button>
                <button onClick={() => setRenaming(null)} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <PageRow key={p.id} page={p}
                onEdit={() => navigate(`/sites/${siteId}/editor/${p.slug}`)}
                onDuplicate={async () => { await duplicatePage(siteId, p.slug); toast.success('Duplicated'); load(); }}
                onDelete={() => setDeleteTarget(p)}
                onTogglePublish={() => handleToggle(p)}
                onRename={() => { setRenaming(p); setRenameVal(p.title); }}
                onSetLanding={() => handleSetLanding(p)}
              />
            )
          )}
        </div>
      )}

      {showCreate && <CreatePageModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-900 mb-1">Delete "{deleteTarget.title}"?</h2>
            <p className="text-[13px] text-slate-500 mb-6">This permanently deletes the page and all its content.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-[13px] text-slate-500 hover:text-slate-800 font-medium rounded-xl hover:bg-slate-100">Cancel</button>
              <button onClick={() => handleDelete(deleteTarget)}
                className="px-4 py-2 bg-red-600 text-white text-[13px] font-semibold rounded-xl hover:bg-red-700 transition-colors">
                Delete page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Components Tab ────────────────────────────────────────────────────────────

function ComponentsTab({ siteId }: { siteId: string }) {
  const [items,      setItems]      = useState<SiteComponent[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name,  setName]  = useState('');
  const [tag,   setTag]   = useState('div');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { setItems(await getComponents(siteId)); } catch { toast.error('Failed to load'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [siteId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await createComponent(siteId, { name: name.trim(), tag: tag || 'div' });
      toast.success('Component created'); setShowCreate(false); setName(''); setTag('div'); load();
    } catch (e: any) { toast.error(e?.response?.data?.message || 'Failed'); } finally { setSaving(false); }
  };

  if (loading) return <TabLoader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-slate-500">{items.length} component{items.length !== 1 ? 's' : ''}</p>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-xl hover:bg-blue-700 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New component
        </button>
      </div>

      {items.length === 0 ? (
        <TabEmpty icon={Puzzle} title="No components yet" sub="Create reusable HTML components for your pages"
          action="Create component" onAction={() => setShowCreate(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map(c => (
            <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3
              hover:border-slate-300 hover:shadow-sm transition-all">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <Code className="w-4 h-4 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-900">{c.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">&lt;{c.tag}&gt;</p>
              </div>
              <button onClick={async () => { await deleteComponent(siteId, c.id); toast.success('Deleted'); load(); }}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <Modal title="New component" subtitle="A reusable HTML element for your pages" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate} className="p-6 space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Name</label>
              <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Navigation"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">HTML tag</label>
              <select value={tag} onChange={e => setTag(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500">
                {['nav','header','footer','section','aside','div','article'].map(t => (
                  <option key={t} value={t}>&lt;{t}&gt;</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-[13px] text-slate-500 hover:text-slate-800 font-medium rounded-xl hover:bg-slate-100">Cancel</button>
              <button type="submit" disabled={!name.trim() || saving}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-sm">
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />} Create
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ── Assets Tab ────────────────────────────────────────────────────────────────

function AssetsTab({ siteId }: { siteId: string }) {
  const [assets,    setAssets]    = useState<SiteAsset[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const apiBase = import.meta.env.VITE_API_URL ?? '';

  const load = async () => {
    try { setAssets(await getAssets(siteId)); } catch { toast.error('Failed to load assets'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [siteId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        await uploadAsset(siteId, f, f.type.startsWith('font') ? 'font' : 'image');
      }
      toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded`);
      load();
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const images = assets.filter(a => a.type === 'image');
  const fonts  = assets.filter(a => a.type === 'font');

  if (loading) return <TabLoader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-slate-500">{assets.length} asset{assets.length !== 1 ? 's' : ''}</p>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white text-[12px]
            font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-sm">
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          Upload
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,.woff,.woff2,.ttf,.otf" className="hidden" onChange={handleUpload} />
      </div>

      {assets.length === 0 ? (
        <div onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl
            border-2 border-dashed border-slate-200 cursor-pointer
            hover:border-blue-400 hover:bg-blue-50/30 transition-all">
          <Upload className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-[14px] font-semibold text-slate-500">Drop files or click to upload</p>
          <p className="text-[12px] text-slate-400 mt-1">Images (PNG, JPG, SVG, WebP) and fonts</p>
        </div>
      ) : (
        <div className="space-y-6">
          {images.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Images · {images.length}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map(a => (
                  <div key={a.id} className="group relative bg-slate-100 rounded-xl overflow-hidden aspect-square border border-slate-200">
                    <img src={`${apiBase}${a.url}`} alt={a.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all
                      flex flex-col items-end justify-end p-2 gap-1 opacity-0 group-hover:opacity-100">
                      <button onClick={() => { deleteAsset(siteId, a.id).then(() => { toast.success('Deleted'); load(); }); }}
                        className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <p className="text-white text-[10px] truncate w-full text-right leading-tight">{a.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {fonts.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Fonts · {fonts.length}
              </p>
              <div className="space-y-2">
                {fonts.map(a => (
                  <div key={a.id} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                      <span className="text-[13px] font-bold text-violet-600">Aa</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-900 truncate">{a.name}</p>
                      <p className="text-[11px] text-slate-400">{formatBytes(a.size)}</p>
                    </div>
                    <button onClick={() => { deleteAsset(siteId, a.id).then(() => { toast.success('Deleted'); load(); }); }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────────────────────

function SettingsTab({ site, onUpdate }: { site: Site; onUpdate: (s: Site) => void }) {
  const [name,      setName]      = useState(site.name);
  const [domain,    setDomain]    = useState(site.domain ?? '');
  const [metaTitle, setMetaTitle] = useState(site.metadata?.title ?? '');
  const [metaDesc,  setMetaDesc]  = useState(site.metadata?.description ?? '');
  const [css,       setCss]       = useState(site.globalCSS ?? '');
  const [saving,    setSaving]    = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const updated = await updateSite(site.id, {
        name: name.trim(), domain: domain.trim() || undefined,
        metadata: { title: metaTitle.trim(), description: metaDesc.trim() },
        globalCSS: css,
      });
      onUpdate(updated); toast.success('Settings saved');
    } catch (e: any) { toast.error(e?.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );

  const input = "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form onSubmit={handle} className="max-w-lg space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Settings className="w-3.5 h-3.5" /> General
        </p>
        <Field label="Site name"><input type="text" value={name} onChange={e => setName(e.target.value)} className={input} /></Field>
        <Field label="Domain (optional)">
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com"
              className={`${input} pl-10 font-mono`} />
          </div>
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" /> SEO
        </p>
        <Field label="Site title"><input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="My Site" className={input} /></Field>
        <Field label="Meta description">
          <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Describe your site…" rows={3} className={`${input} resize-none`} />
        </Field>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Code className="w-3.5 h-3.5" /> Global CSS
        </p>
        <textarea value={css} onChange={e => setCss(e.target.value)}
          placeholder=":root { --primary: #3b82f6; }" rows={7}
          className="w-full rounded-xl px-3.5 py-3 text-[12px] font-mono resize-y
            focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-[#0f172a] text-emerald-400 border-0" />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-[13px]
            font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-sm">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save settings
        </button>
      </div>
    </form>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function TabLoader() {
  return (
    <div className="flex items-center justify-center py-16 text-slate-400">
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
}

function TabEmpty({ icon: Icon, title, sub, action, onAction }: {
  icon: React.FC<any>; title: string; sub: string; action: string; onAction: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-slate-50/70 rounded-2xl border-2 border-dashed border-slate-200 text-center">
      <Icon className="w-10 h-10 text-slate-300 mb-3" strokeWidth={1.5} />
      <p className="text-[14px] font-semibold text-slate-600 mb-1">{title}</p>
      <p className="text-[12px] text-slate-400 mb-4 max-w-xs">{sub}</p>
      <button onClick={onAction}
        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-xl hover:bg-blue-700 shadow-sm">
        <Plus className="w-3.5 h-3.5" /> {action}
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const tabs: { id: Tab; icon: React.FC<any>; label: string }[] = [
  { id: 'pages',      icon: FileText, label: 'Pages'      },
  { id: 'components', icon: Puzzle,   label: 'Components' },
  { id: 'assets',     icon: Image,    label: 'Assets'     },
  { id: 'settings',   icon: Settings, label: 'Settings'   },
];

const siteGradients = [
  'from-blue-500 to-blue-700',
  'from-violet-500 to-violet-700',
  'from-emerald-500 to-emerald-700',
  'from-rose-500 to-rose-700',
  'from-amber-500 to-amber-600',
];

export default function SiteWorkspacePage() {
  const { siteId }  = useParams<{ siteId: string }>();
  const navigate    = useNavigate();
  const [site,      setSite]      = useState<Site | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('pages');

  useEffect(() => {
    if (!siteId) return;
    getSite(siteId).then(setSite).catch(() => { toast.error('Site not found'); navigate('/sites'); }).finally(() => setLoading(false));
  }, [siteId]);

  if (loading) return (
    <AdminLayout title="Loading…" crumbs={[{ label: 'Workspace' }]}>
      <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
    </AdminLayout>
  );

  if (!site) return null;

  const gradient = siteGradients[site.name.charCodeAt(0) % siteGradients.length];

  return (
    <AdminLayout
      title={site.name}
      siteName={site.name}
      crumbs={[{ label: 'Workspace' }]}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Site header ───────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient}
                flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                {site.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-[16px] font-bold text-slate-900 leading-tight">{site.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {site.domain ? (
                    <a href={`https://${site.domain}`} target="_blank" rel="noreferrer"
                      className="text-[12px] text-slate-400 font-mono hover:text-blue-600 flex items-center gap-1 transition-colors">
                      {site.domain} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[12px] text-slate-400">No domain configured</span>
                  )}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    site.published
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : 'text-slate-500 bg-slate-100 border border-slate-200'
                  }`}>
                    {site.published ? '● Live' : '○ Draft'}
                  </span>
                </div>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${
              site.published
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-slate-500 bg-slate-100 border-slate-200'
            }`}>
              {site.published ? '● Live' : '○ Draft'}
            </span>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────── */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1 mb-6 shadow-sm">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 flex-1 justify-center px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" /> <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab content ───────────────────────────────── */}
        {activeTab === 'pages'      && <PagesTab      siteId={site.id} />}
        {activeTab === 'components' && <ComponentsTab siteId={site.id} />}
        {activeTab === 'assets'     && <AssetsTab     siteId={site.id} />}
        {activeTab === 'settings'   && <SettingsTab   site={site} onUpdate={setSite} />}
      </div>
    </AdminLayout>
  );
}
