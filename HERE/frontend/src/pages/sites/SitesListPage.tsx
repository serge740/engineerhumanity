import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Globe, MoreVertical, Trash2, Pencil,
  ExternalLink, FileText, Puzzle, Image,
  Loader2, X, Check, Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { getSites, createSite, deleteSite, updateSite, type Site, type CreateSiteData } from '../../api/sites';

// ── Shared input style ────────────────────────────────────────────────────────

const inp = `w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px]
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  placeholder:text-slate-300 transition-shadow`;

// ── Create Site Modal ─────────────────────────────────────────────────────────

function CreateSiteModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (d: CreateSiteData) => Promise<void>;
}) {
  const [name,    setName]    = useState('');
  const [domain,  setDomain]  = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try { await onCreate({ name: name.trim(), domain: domain.trim() || undefined }); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">Create a new site</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Set up your site to start building pages</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handle} className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
              Site name <span className="text-red-400">*</span>
            </label>
            <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. My Portfolio" className={inp} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
              Domain <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={domain} onChange={e => setDomain(e.target.value)}
                placeholder="example.com"
                className={`${inp} pl-10 font-mono`} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!name.trim() || loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-[13px]
                font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Create site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Confirm Delete ────────────────────────────────────────────────────────────

function ConfirmDelete({ site, onClose, onConfirm }: {
  site: Site; onClose: () => void; onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-[15px] font-bold text-slate-900 mb-1">Delete "{site.name}"?</h2>
        <p className="text-[13px] text-slate-500 mb-6">
          This permanently deletes the site, all pages, components, and assets. Cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100">Cancel</button>
          <button onClick={async () => { setLoading(true); try { onConfirm(); } finally { setLoading(false); } }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-[13px] font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete site
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Site Card ─────────────────────────────────────────────────────────────────

const siteGradients = [
  'from-blue-500 to-blue-700', 'from-violet-500 to-violet-700',
  'from-emerald-500 to-emerald-700', 'from-rose-500 to-rose-700',
  'from-amber-500 to-amber-600', 'from-cyan-500 to-cyan-700',
];

function SiteCard({ site, onClick, onDelete, onStartRename }: {
  site: Site; onClick: () => void;
  onDelete: () => void; onStartRename: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false); };
    if (menuOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  const pages      = site._count?.pages      ?? 0;
  const components = site._count?.components ?? 0;
  const assets     = site._count?.assets     ?? 0;
  const gradient   = siteGradients[site.name.charCodeAt(0) % siteGradients.length];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300
      hover:shadow-lg hover:shadow-blue-100/40 transition-all duration-200 overflow-hidden flex flex-col">

      {/* Colour strip */}
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <button onClick={onClick}
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient}
              flex items-center justify-center text-white font-bold text-base shadow-md`}>
            {site.name.charAt(0).toUpperCase()}
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
              site.published
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                : 'text-slate-500 bg-slate-100 border border-slate-200'
            }`}>
              {site.published ? '● Live' : '○ Draft'}
            </span>

            <div className="relative" ref={ref}>
              <button onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-9 w-44 bg-white border border-slate-200
                  rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                  <button onClick={() => { onStartRename(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50">
                    <Pencil className="w-3.5 h-3.5" /> Rename
                  </button>
                  {site.domain && (
                    <a href={`https://${site.domain}`} target="_blank" rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50">
                      <ExternalLink className="w-3.5 h-3.5" /> Visit site
                    </a>
                  )}
                  <div className="border-t border-slate-100 my-1" />
                  <button onClick={() => { onDelete(); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-red-600 hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name / domain */}
        <button onClick={onClick} className="text-left flex-1">
          <p className="text-[14px] font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug">{site.name}</p>
          <p className="text-[12px] text-slate-400 font-mono mt-0.5 truncate">
            {site.domain ?? 'No domain'}
          </p>
        </button>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[12px] text-slate-400">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />{pages}</span>
          <span className="flex items-center gap-1.5"><Puzzle className="w-3.5 h-3.5" />{components}</span>
          <span className="flex items-center gap-1.5"><Image className="w-3.5 h-3.5" />{assets}</span>
          <span className="ml-auto text-[11px] text-slate-300">
            {new Date(site.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Inline rename card ────────────────────────────────────────────────────────

function RenameCard({ site, onSave, onCancel }: {
  site: Site; onSave: (v: string) => void; onCancel: () => void;
}) {
  const [val, setVal] = useState(site.name);
  return (
    <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 shadow-sm">
      <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest mb-3">Rename site</p>
      <input autoFocus value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSave(val); if (e.key === 'Escape') onCancel(); }}
        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] font-bold
          focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3" />
      <div className="flex gap-2">
        <button onClick={() => onSave(val)} disabled={!val.trim()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 text-white text-[12px] font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Check className="w-3.5 h-3.5" /> Save
        </button>
        <button onClick={onCancel} className="px-3.5 py-1.5 text-[12px] text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function SitesListPage() {
  const navigate = useNavigate();
  const [sites,        setSites]       = useState<Site[]>([]);
  const [loading,      setLoading]     = useState(true);
  const [showCreate,   setShowCreate]  = useState(false);
  const [deleteTarget, setDeleteTarget]= useState<Site | null>(null);
  const [renamingId,   setRenamingId]  = useState<string | null>(null);

  const load = async () => {
    try { setSites(await getSites()); } catch { toast.error('Failed to load sites'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (data: CreateSiteData) => {
    try {
      const site = await createSite(data);
      toast.success(`"${site.name}" created`);
      setShowCreate(false);
      navigate(`/sites/${site.id}`);
    } catch (e: any) { toast.error(e?.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (site: Site) => {
    try { await deleteSite(site.id); toast.success(`"${site.name}" deleted`); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
  };

  const handleRename = async (site: Site, newName: string) => {
    if (!newName.trim() || newName === site.name) { setRenamingId(null); return; }
    try { await updateSite(site.id, { name: newName.trim() }); toast.success('Renamed'); setRenamingId(null); load(); }
    catch { toast.error('Failed to rename'); }
  };

  return (
    <AdminLayout title="Sites" crumbs={[{ label: 'Sites' }]}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900">My Sites</h1>
            {!loading && (
              <p className="text-[13px] text-slate-400 mt-0.5">
                {sites.length} site{sites.length !== 1 ? 's' : ''}
                {sites.filter(s => s.published).length > 0 &&
                  ` · ${sites.filter(s => s.published).length} live`}
              </p>
            )}
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-[13px]
              font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> New site
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : sites.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-20 px-6 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 mb-1">No sites yet</h3>
            <p className="text-[13px] text-slate-500 max-w-xs mx-auto mb-5">
              Create your first site to start building pages and publishing content.
            </p>
            <button onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white
                text-[13px] font-semibold rounded-xl hover:bg-blue-700 shadow-sm">
              <Plus className="w-4 h-4" /> Create your first site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {sites.map(site =>
              renamingId === site.id ? (
                <RenameCard key={site.id} site={site}
                  onSave={(v) => handleRename(site, v)}
                  onCancel={() => setRenamingId(null)} />
              ) : (
                <SiteCard key={site.id} site={site}
                  onClick={() => navigate(`/sites/${site.id}`)}
                  onDelete={() => setDeleteTarget(site)}
                  onStartRename={() => setRenamingId(site.id)} />
              )
            )}

            {/* New site tile */}
            <button onClick={() => setShowCreate(true)}
              className="group bg-white rounded-2xl border-2 border-dashed border-slate-200
                hover:border-blue-400 hover:bg-blue-50/30 transition-all
                flex flex-col items-center justify-center gap-2.5 min-h-[190px]">
              <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-blue-100
                flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-[13px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                New site
              </span>
            </button>
          </div>
        )}
      </div>

      {showCreate && <CreateSiteModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
      {deleteTarget && <ConfirmDelete site={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => handleDelete(deleteTarget)} />}
    </AdminLayout>
  );
}
