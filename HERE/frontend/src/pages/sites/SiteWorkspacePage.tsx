import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, MoreVertical, Copy, Globe, Eye, EyeOff,
  Loader2, X, FileText, Image, Upload, Check,
  ExternalLink, Settings, Home, Download, Code, Boxes, Users, Calendar, BookOpen,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { getSite, updateSite, type Site } from '../../api/sites';
import { downloadSiteZip } from '../../api/export';
import {
  getPages, createPage, updatePage, deletePage,
  duplicatePage, publishPage, unpublishPage,
  type PageSummary, type CreatePageData,
} from '../../api/pages';
import { getAssets, uploadAsset, deleteAsset, formatBytes, type SiteAsset } from '../../api/assets';
import { getComponents, createDynamicComponent, deleteComponent, type SiteComponent } from '../../api/components';
import { Modal } from '../../components/ui/Modal';
import TeamManagementTab from '../team/TeamManagementTab';
import EventsManagementTab from '../events/EventsManagementTab';
import StoriesManagementTab from '../stories/StoriesManagementTab';

type Tab = 'pages' | 'components' | 'team' | 'events' | 'stories' | 'assets' | 'settings';

function timeAgo(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return 'just now';
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}

// ── Dropdown menu (small floating menu, styled inline like the reference's own) ─

function DropdownMenu({ items, danger, onDangerClick, dangerLabel }: {
  items: { icon: React.FC<any>; label: string; fn: () => void }[];
  danger?: boolean; dangerLabel?: string; onDangerClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState<{ top: number; right: number } | null>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Rendered in a portal (see below) so a clipping ancestor — e.g. the
  // `.panel` list this row lives in, which uses `overflow: hidden` for its
  // rounded corners — can never hide the menu. Position is computed from the
  // trigger button's real screen coordinates instead of relying on CSS
  // `position: absolute` inside that (clipped) container.
  const openMenu = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener('mousedown', h);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', h);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  return (
    <>
      <button ref={btnRef} onClick={() => (open ? setOpen(false) : openMenu())} className="icon-btn" style={{ border: 'none' }}>
        <MoreVertical size={15} />
      </button>
      {open && pos && createPortal(
        <div ref={menuRef} style={{
          position: 'fixed', top: pos.top, right: pos.right, width: 180,
          background: 'var(--bg-elev)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 1000,
        }}>
          {items.map(({ icon: Icon, label, fn }) => (
            <button key={label} onClick={() => { fn(); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--fg-muted)', textAlign: 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-sunk)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
          {danger && (
            <>
              <div style={{ borderTop: '1px solid var(--border)' }} />
              <button onClick={() => { onDangerClick?.(); setOpen(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--danger)', textAlign: 'left' }}
              >
                <Trash2 size={13} /> {dangerLabel ?? 'Delete'}
              </button>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}

// ── Create Page Modal ────────────────────────────────────────────────────────

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
      <form onSubmit={handle}>
        <div className="modal__body">
          <div className="field">
            <label className="field__label">Page title</label>
            <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. About Us" className="input" />
            {slug && (
              <p style={{ marginTop: 6, fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)' }}>
                URL: <span style={{ color: 'var(--fg-muted)' }}>/{slug}</span>
              </p>
            )}
          </div>
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!title.trim() || loading} className="btn btn--primary">
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
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
  return (
    <div className="activity-row" style={{ cursor: 'pointer' }} onClick={onEdit}>
      <div className="activity-icon" data-kind={page.published ? 'in' : undefined}>
        <FileText size={13} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="activity-row__title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {page.title}
          {page.isLanding && <span className="badge badge--accent">Landing</span>}
        </div>
        <div className="activity-row__meta" style={{ fontFamily: 'var(--font-mono)' }}>
          /{page.slug} · v{page.version} · {timeAgo(page.updatedAt)}
        </div>
      </div>

      <span className={page.published ? 'badge badge--success' : 'badge'}>
        {page.published ? 'Published' : 'Draft'}
      </span>

      <div className="btn-group" onClick={e => e.stopPropagation()}>
        <button onClick={onEdit} className="btn btn--ghost btn--sm">
          <Pencil size={12} /> Edit
        </button>
        <DropdownMenu
          items={[
            { icon: Pencil, label: 'Rename', fn: onRename },
            { icon: page.published ? EyeOff : Eye, label: page.published ? 'Unpublish' : 'Publish', fn: onTogglePublish },
            { icon: Copy, label: 'Duplicate', fn: onDuplicate },
            { icon: Home, label: page.isLanding ? 'Landing page ✓' : 'Set as landing', fn: onSetLanding },
          ]}
          danger dangerLabel="Delete" onDangerClick={onDelete}
        />
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {pages.length} page{pages.length !== 1 ? 's' : ''}
          {published > 0 && <span style={{ color: 'var(--success)', marginLeft: 8, fontWeight: 600 }}>{published} published</span>}
        </p>
        <button onClick={() => setShowCreate(true)} className="btn btn--primary btn--sm">
          <Plus size={13} /> New page
        </button>
      </div>

      {pages.length === 0 ? (
        <TabEmpty icon={FileText} title="No pages yet" sub="Create your first page to start building"
          action="Create page" onAction={() => setShowCreate(true)} />
      ) : (
        <div className="panel">
          {pages.map(p =>
            renaming?.id === p.id ? (
              <div key={p.id} className="activity-row">
                <input autoFocus value={renameVal} onChange={e => setRenameVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRename(p, renameVal); if (e.key === 'Escape') setRenaming(null); }}
                  className="input" style={{ flex: 1, fontWeight: 600 }} />
                <button onClick={() => handleRename(p, renameVal)} className="icon-btn" style={{ color: 'var(--success)', border: 'none' }}><Check size={15} /></button>
                <button onClick={() => setRenaming(null)} className="icon-btn" style={{ border: 'none' }}><X size={15} /></button>
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
        <Modal title={`Delete "${deleteTarget.title}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This permanently deletes the page and all its content.</p>
          </div>
          <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setDeleteTarget(null)} className="btn btn--ghost">Cancel</button>
            <button onClick={() => handleDelete(deleteTarget)} className="btn" style={{ background: 'var(--danger)', color: 'white', borderColor: 'transparent' }}>
              Delete page
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Create Component Modal ───────────────────────────────────────────────────

function CreateComponentModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try { await onCreate(name.trim()); } finally { setLoading(false); }
  };

  return (
    <Modal title="New component" subtitle="A reusable card with its own data table (e.g. Team, Testimonials)" onClose={onClose}>
      <form onSubmit={handle}>
        <div className="modal__body">
          <div className="field">
            <label className="field__label">Component name</label>
            <input autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Team" className="input" />
          </div>
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!name.trim() || loading} className="btn btn--primary">
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            Create component
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Components Tab ───────────────────────────────────────────────────────────

function ComponentsTab({ siteId }: { siteId: string }) {
  const navigate = useNavigate();
  const [components,   setComponents]   = useState<SiteComponent[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [showCreate,    setShowCreate]    = useState(false);
  const [deleteTarget,  setDeleteTarget]  = useState<SiteComponent | null>(null);

  const load = async () => {
    try { setComponents(await getComponents(siteId)); } catch { toast.error('Failed to load components'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [siteId]);

  const handleCreate = async (name: string) => {
    try {
      const c = await createDynamicComponent(siteId, name);
      toast.success('Component created');
      setShowCreate(false);
      navigate(`/sites/${siteId}/components/${c.id}`);
    } catch (e: any) { toast.error(e?.response?.data?.message || 'Failed to create component'); }
  };

  const handleDelete = async (c: SiteComponent) => {
    try { await deleteComponent(siteId, c.id); toast.success(`"${c.name}" deleted`); setDeleteTarget(null); load(); }
    catch (e: any) { toast.error(e?.response?.data?.message || 'Failed'); }
  };

  if (loading) return <TabLoader />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {components.length} component{components.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => setShowCreate(true)} className="btn btn--primary btn--sm">
          <Plus size={13} /> New component
        </button>
      </div>

      {components.length === 0 ? (
        <TabEmpty icon={Boxes} title="No components yet"
          sub="Build a reusable card (e.g. a Team member) backed by its own data table"
          action="Create component" onAction={() => setShowCreate(true)} />
      ) : (
        <div className="panel">
          {components.map(c => (
            <div key={c.id} className="activity-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/sites/${siteId}/components/${c.id}`)}>
              <div className="activity-icon"><Boxes size={13} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="activity-row__title">{c.name}</div>
                <div className="activity-row__meta">{c.type === 'dynamic' ? 'Data-driven card' : 'Static component'}</div>
              </div>
              <div className="btn-group" onClick={e => e.stopPropagation()}>
                <button onClick={() => navigate(`/sites/${siteId}/components/${c.id}`)} className="btn btn--ghost btn--sm">
                  <Pencil size={12} /> Open
                </button>
                <button onClick={() => setDeleteTarget(c)} className="icon-btn" style={{ border: 'none', color: 'var(--fg-subtle)' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && <CreateComponentModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}

      {deleteTarget && (
        <Modal title={`Delete "${deleteTarget.name}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This permanently deletes the component and its data table.</p>
          </div>
          <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setDeleteTarget(null)} className="btn btn--ghost">Cancel</button>
            <button onClick={() => handleDelete(deleteTarget)} className="btn" style={{ background: 'var(--danger)', color: 'white', borderColor: 'transparent' }}>
              Delete component
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Assets Tab ─────────────────────────────────────────────────────────────────

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>{assets.length} asset{assets.length !== 1 ? 's' : ''}</p>
        <button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn btn--primary btn--sm">
          {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          Upload
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,.woff,.woff2,.ttf,.otf" style={{ display: 'none' }} onChange={handleUpload} />
      </div>

      {assets.length === 0 ? (
        <div onClick={() => fileRef.current?.click()} className="empty"
          style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)', cursor: 'pointer' }}>
          <Upload size={30} style={{ color: 'var(--fg-subtle)', marginBottom: 10 }} />
          <p style={{ fontWeight: 600, color: 'var(--fg)' }}>Drop files or click to upload</p>
          <p>Images (PNG, JPG, SVG, WebP) and fonts</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {images.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Images · {images.length}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                {images.map(a => (
                  <div key={a.id} style={{ position: 'relative', background: 'var(--bg-sunk)', borderRadius: 'var(--r-md)', overflow: 'hidden', aspectRatio: '1', border: '1px solid var(--border)' }}>
                    <img src={a.url.startsWith('http') ? a.url : `${apiBase}${a.url}`} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', opacity: 0, transition: 'opacity .15s, background .15s',
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 6, gap: 4,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(0,0,0,.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '0'; e.currentTarget.style.background = 'rgba(0,0,0,0)'; }}
                    >
                      <button onClick={() => { deleteAsset(siteId, a.id).then(() => { toast.success('Deleted'); load(); }); }}
                        style={{ padding: 6, background: 'var(--danger)', color: '#fff', border: 'none', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
                        <Trash2 size={12} />
                      </button>
                      <p style={{ color: '#fff', fontSize: 10, margin: 0, textAlign: 'right', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {fonts.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Fonts · {fonts.length}
              </p>
              <div className="panel">
                {fonts.map(a => (
                  <div key={a.id} className="activity-row">
                    <div className="activity-icon" style={{ fontWeight: 700, fontSize: 12 }}>Aa</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="activity-row__title">{a.name}</div>
                      <div className="activity-row__meta">{formatBytes(a.size)}</div>
                    </div>
                    <button onClick={() => { deleteAsset(siteId, a.id).then(() => { toast.success('Deleted'); load(); }); }} className="icon-btn" style={{ border: 'none' }}>
                      <Trash2 size={14} />
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
    <div className="field">
      <label className="field__label">{label}</label>
      {children}
    </div>
  );

  return (
    <form onSubmit={handle} style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="panel" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={13} /> General
        </p>
        <Field label="Site name"><input type="text" value={name} onChange={e => setName(e.target.value)} className="input" /></Field>
        <Field label="Domain (optional)">
          <div style={{ position: 'relative' }}>
            <Globe size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-subtle)' }} />
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com"
              className="input" style={{ paddingLeft: 30, fontFamily: 'var(--font-mono)' }} />
          </div>
        </Field>
      </div>

      <div className="panel" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe size={13} /> SEO
        </p>
        <Field label="Site title"><input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="My Site" className="input" /></Field>
        <Field label="Meta description">
          <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Describe your site…" rows={3}
            className="input" style={{ height: 'auto', padding: '8px 10px', resize: 'none' }} />
        </Field>
      </div>

      <div className="panel" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Code size={13} /> Global CSS
        </p>
        <textarea value={css} onChange={e => setCss(e.target.value)}
          placeholder=":root { --primary: #3b82f6; }" rows={7}
          style={{
            width: '100%', borderRadius: 'var(--r-sm)', padding: '10px 12px', fontSize: 12,
            fontFamily: 'var(--font-mono)', resize: 'vertical', background: '#0f172a', color: '#34d399', border: 0,
          }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" disabled={saving} className="btn btn--primary">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          Save settings
        </button>
      </div>
    </form>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function TabLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
      <Loader2 size={20} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
    </div>
  );
}

function TabEmpty({ icon: Icon, title, sub, action, onAction }: {
  icon: React.FC<any>; title: string; sub: string; action: string; onAction: () => void;
}) {
  return (
    <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
      <Icon size={30} style={{ color: 'var(--fg-subtle)', marginBottom: 10 }} strokeWidth={1.5} />
      <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{title}</p>
      <p style={{ maxWidth: 280, margin: '0 auto 16px' }}>{sub}</p>
      <button onClick={onAction} className="btn btn--primary btn--sm" style={{ margin: '0 auto' }}>
        <Plus size={13} /> {action}
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const tabs: { id: Tab; icon: React.FC<any>; label: string }[] = [
  { id: 'pages',      icon: FileText, label: 'Pages'      },
  // { id: 'components', icon: Boxes,    label: 'Components' },
  { id: 'team',       icon: Users,    label: 'Team'       },
  { id: 'events',     icon: Calendar, label: 'Events'     },
  { id: 'stories',    icon: BookOpen, label: 'Stories'    },
  { id: 'assets',     icon: Image,    label: 'Assets'     },
  // { id: 'settings',   icon: Settings, label: 'Settings'   },
];

export default function SiteWorkspacePage() {
  const { siteId }  = useParams<{ siteId: string }>();
  const navigate    = useNavigate();
  const [site,        setSite]        = useState<Site | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [activeTab,   setActiveTab]   = useState<Tab>('pages');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!siteId) return;
    getSite(siteId).then(setSite).catch(() => { toast.error('Site not found'); navigate('/sites'); }).finally(() => setLoading(false));
  }, [siteId]);

  if (loading) return (
    <AdminLayout title="Loading…" crumbs={[{ label: 'Workspace' }]}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <Loader2 size={22} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} />
      </div>
    </AdminLayout>
  );

  if (!site) return null;

  return (
    <AdminLayout
      title={site.name}
      siteName={site.name}
      crumbs={[{ label: 'Workspace' }]}
    >
      <div className="page-head">
        <div>
          <h1>{site.name}</h1>
          <div className="page-head__sub" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {site.domain ? (
              <a href={`https://${site.domain}`} target="_blank" rel="noreferrer"
                style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                {site.domain} <ExternalLink size={11} />
              </a>
            ) : (
              <span>No domain configured</span>
            )}
            <span className={site.published ? 'badge badge--success' : 'badge'}>
              {site.published ? 'Live' : 'Draft'}
            </span>
          </div>
        </div>
        <div className="page-head__actions">
          <button
            onClick={async () => {
              setDownloading(true);
              try {
                await downloadSiteZip(site.id, site.name);
                toast.success('Download started');
              } catch {
                toast.error('Export failed — please try again');
              } finally {
                setDownloading(false);
              }
            }}
            disabled={downloading}
            className="btn"
            title="Download all pages as a self-contained ZIP"
          >
            {downloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
            {downloading ? 'Exporting…' : 'Download site'}
          </button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="tab" data-active={activeTab === id}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'pages'       && <PagesTab       siteId={site.id} />}
      {activeTab === 'components'  && <ComponentsTab  siteId={site.id} />}
      {activeTab === 'team'        && <TeamManagementTab siteId={site.id} />}
      {activeTab === 'events'      && <EventsManagementTab siteId={site.id} />}
      {activeTab === 'stories'     && <StoriesManagementTab siteId={site.id} />}
      {activeTab === 'assets'      && <AssetsTab      siteId={site.id} />}
      {activeTab === 'settings'    && <SettingsTab    site={site} onUpdate={setSite} />}
    </AdminLayout>
  );
}
