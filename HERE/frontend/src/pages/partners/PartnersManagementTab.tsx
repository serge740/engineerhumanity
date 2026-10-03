import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil, GripVertical, Loader2, Handshake, ExternalLink, Upload } from 'lucide-react';
import {
  getPartners, createPartner, updatePartner, deletePartner, reorderPartners,
  type Partner, type CreatePartnerData,
} from '../../api/partners';
import { ImageCellPicker } from '../components/ImageCellPicker';
import { Modal } from '../../components/ui/Modal';
import { PartnersImportJsonModal } from './PartnersImportJsonModal';
import {
  DndContext, PointerSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

function resolveImage(image: string | null) {
  if (!image) return undefined;
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
}

function isWebUrl(value: string) {
  return /^https?:\/\/\S+$/i.test(value.trim());
}

// ── Add / Edit modal ─────────────────────────────────────────────────────────

function PartnerFormModal({ siteId, partner, onClose, onSave }: {
  siteId: string;
  partner?: Partner;
  onClose: () => void;
  onSave: (data: CreatePartnerData) => Promise<void>;
}) {
  const [name, setName] = useState(partner?.name ?? '');
  const [link, setLink] = useState(partner?.link ?? '');
  const [image, setImage] = useState<string | undefined>(partner?.image ?? undefined);
  const [description, setDescription] = useState(partner?.description ?? '');
  const [saving, setSaving] = useState(false);

  const linkValid = isWebUrl(link);
  const canSave = !!name.trim() && linkValid && !saving;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        link: link.trim(),
        image,
        description: description.trim() || undefined,
      });
      onClose();
    } catch {
      toast.error('Failed to save partner');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={partner ? 'Edit partner' : 'New partner'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label className="field__label">Logo</label>
            <ImageCellPicker siteId={siteId} value={image} onChange={setImage} />
          </div>
          <div className="field">
            <label className="field__label">Name *</label>
            <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} className="input" />
          </div>
          <div className="field">
            <label className="field__label">Website *</label>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="https://www.example.org/"
              className="input" />
            {link && !linkValid && (
              <span style={{ fontSize: 11, color: 'var(--danger)' }}>Must start with http:// or https://</span>
            )}
          </div>
          <div className="field">
            <label className="field__label">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={8}
              placeholder="Shown in the modal when a visitor clicks this partner's logo…"
              className="input" style={{ height: 'auto', resize: 'vertical' }} />
          </div>
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!canSave} className="btn btn--primary">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            {partner ? 'Save changes' : 'Add partner'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function PartnerCard({ partner, onEdit, onDelete }: {
  partner: Partner; onEdit: () => void; onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: partner.id });
  const src = resolveImage(partner.image);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="panel"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
        <span {...attributes} {...listeners} style={{ color: 'var(--fg-subtle)', cursor: 'grab', display: 'flex' }}>
          <GripVertical size={14} />
        </span>
        <div style={{
          width: 64, height: 44, borderRadius: 6, overflow: 'hidden', flexShrink: 0,
          background: 'var(--bg-sunk)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {src && <img src={src} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {partner.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {partner.link}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px 12px', gap: 2 }}>
        {partner.link && (
          <a href={partner.link} target="_blank" rel="noreferrer" className="icon-btn" style={{ border: 'none' }}>
            <ExternalLink size={13} />
          </a>
        )}
        <button onClick={onEdit} className="icon-btn" style={{ border: 'none' }}><Pencil size={13} /></button>
        <button onClick={onDelete} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}><Trash2 size={13} /></button>
      </div>
    </div>
  );
}

// ── Main tab ──────────────────────────────────────────────────────────────────

export default function PartnersManagementTab({ siteId }: { siteId: string }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
  const [showImport, setShowImport] = useState(false);

  const load = () => {
    setLoading(true);
    getPartners(siteId)
      .then(setPartners)
      .catch(() => toast.error('Failed to load partners'))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [siteId]);

  const handleSave = async (data: CreatePartnerData) => {
    if (editing) {
      const updated = await updatePartner(siteId, editing.id, data);
      setPartners(list => list.map(x => (x.id === updated.id ? updated : x)));
      toast.success('Partner updated');
    } else {
      const created = await createPartner(siteId, data);
      setPartners(list => [...list, created]);
      toast.success('Partner added');
    }
  };

  const handleDelete = async (partner: Partner) => {
    try {
      await deletePartner(siteId, partner.id);
      setPartners(list => list.filter(x => x.id !== partner.id));
      toast.success(`"${partner.name}" removed`);
    } catch {
      toast.error('Failed to remove partner');
    } finally {
      setDeleteTarget(null);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const list = [...partners];
    const from = list.findIndex(i => i.id === active.id);
    const to = list.findIndex(i => i.id === over.id);
    if (from === -1 || to === -1) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setPartners(list);
    reorderPartners(siteId, list.map((p, idx) => ({ id: p.id, order: idx })))
      .catch(() => toast.error('Failed to reorder'));
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}><Loader2 size={18} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {partners.length} partner{partners.length !== 1 ? 's' : ''} · shown in the footer in this order
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowImport(true)} className="btn btn--sm">
            <Upload size={13} /> Import (JSON)
          </button>
          <button onClick={() => { setEditing(undefined); setShowForm(true); }} className="btn btn--primary btn--sm">
            <Plus size={13} /> Add partner
          </button>
        </div>
      </div>

      {partners.length === 0 ? (
        <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
          <Handshake size={26} style={{ color: 'var(--fg-subtle)', marginBottom: 8 }} strokeWidth={1.5} />
          <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No partners yet</p>
          <p>Add the first partner — the footer's "Our Partners" block stays hidden until there is one.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={partners.map(p => p.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {partners.map(partner => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onEdit={() => { setEditing(partner); setShowForm(true); }}
                  onDelete={() => setDeleteTarget(partner)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <PartnerFormModal
          siteId={siteId}
          partner={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {showImport && (
        <PartnersImportJsonModal
          siteId={siteId}
          onClose={() => setShowImport(false)}
          onImported={load}
        />
      )}

      {deleteTarget && (
        <Modal title={`Remove "${deleteTarget.name}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This removes them from the footer.</p>
          </div>
          <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setDeleteTarget(null)} className="btn btn--ghost">Cancel</button>
            <button onClick={() => handleDelete(deleteTarget)} className="btn" style={{ background: 'var(--danger)', color: 'white', borderColor: 'transparent' }}>
              Remove
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
