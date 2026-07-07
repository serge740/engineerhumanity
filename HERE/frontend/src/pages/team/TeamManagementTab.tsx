import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil, GripVertical, Loader2, Users, ExternalLink, Upload } from 'lucide-react';
import {
  getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMembers,
  type TeamMember, type TeamGroup, type BoardRole, type ManagementCategory,
  type CreateTeamMemberData,
} from '../../api/team';
import { ImageCellPicker } from '../components/ImageCellPicker';
import { Modal } from '../../components/ui/Modal';
import { ImportJsonModal } from './ImportJsonModal';
import {
  DndContext, PointerSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

const BOARD_ROLES: { v: BoardRole; l: string }[] = [
  { v: 'chair', l: 'Chair' },
  { v: 'vice-chair', l: 'Vice Chair' },
  { v: 'executive', l: 'Executive' },
  { v: 'member', l: 'Member' },
];

const MANAGEMENT_CATEGORIES: { v: ManagementCategory; l: string }[] = [
  { v: 'leadership', l: 'Leadership' },
  { v: 'operations', l: 'Operations' },
  { v: 'programs', l: 'Programs' },
  { v: 'projects', l: 'Projects' },
];

function resolveImage(image: string | null) {
  if (!image) return undefined;
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
}

// ── Add / Edit modal ─────────────────────────────────────────────────────────

function MemberFormModal({ siteId, group, member, onClose, onSave }: {
  siteId: string;
  group: TeamGroup;
  member?: TeamMember;
  onClose: () => void;
  onSave: (data: CreateTeamMemberData) => Promise<void>;
}) {
  const [name, setName] = useState(member?.name ?? '');
  const [title, setTitle] = useState(member?.title ?? '');
  const [credentials, setCredentials] = useState(member?.credentials ?? '');
  const [image, setImage] = useState<string | undefined>(member?.image ?? undefined);
  const [linkedIn, setLinkedIn] = useState(member?.linkedIn ?? '');
  const [bio, setBio] = useState(member?.bio ?? '');
  const [role, setRole] = useState<BoardRole>(member?.role ?? 'member');
  const [category, setCategory] = useState<ManagementCategory>(member?.category ?? 'operations');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;
    setSaving(true);
    try {
      await onSave({
        group,
        name: name.trim(),
        title: title.trim(),
        credentials: credentials.trim() || undefined,
        image,
        linkedIn: linkedIn.trim() || undefined,
        bio: bio.trim() || undefined,
        role: group === 'board' ? role : undefined,
        category: group === 'management' ? category : undefined,
      });
      onClose();
    } catch {
      toast.error('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={member ? 'Edit team member' : 'New team member'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label className="field__label">Photo</label>
            <ImageCellPicker siteId={siteId} value={image} onChange={setImage} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="field" style={{ flex: 2 }}>
              <label className="field__label">Name *</label>
              <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} className="input" />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label className="field__label">Credentials</label>
              <input type="text" value={credentials} onChange={e => setCredentials(e.target.value)} placeholder="e.g. MBA" className="input" />
            </div>
          </div>
          <div className="field">
            <label className="field__label">Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Board Chair" className="input" />
          </div>
          <div className="field">
            <label className="field__label">{group === 'board' ? 'Role' : 'Category'}</label>
            {group === 'board' ? (
              <select value={role} onChange={e => setRole(e.target.value as BoardRole)} className="select">
                {BOARD_ROLES.map(r => <option key={r.v} value={r.v}>{r.l}</option>)}
              </select>
            ) : (
              <select value={category} onChange={e => setCategory(e.target.value as ManagementCategory)} className="select">
                {MANAGEMENT_CATEGORIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
              </select>
            )}
          </div>
          <div className="field">
            <label className="field__label">LinkedIn URL</label>
            <input type="text" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} placeholder="https://www.linkedin.com/in/…" className="input" />
          </div>
          <div className="field">
            <label className="field__label">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={6} placeholder="Full biography shown in the profile modal…"
              className="input" style={{ height: 'auto', resize: 'vertical' }} />
          </div>
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!name.trim() || !title.trim() || saving} className="btn btn--primary">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            {member ? 'Save changes' : 'Add member'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function MemberCard({ member, onEdit, onDelete }: {
  member: TeamMember; onEdit: () => void; onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: member.id });
  const src = resolveImage(member.image);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1,
      }}
      className="panel"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
        <span {...attributes} {...listeners} style={{ color: 'var(--fg-subtle)', cursor: 'grab', display: 'flex' }}>
          <GripVertical size={14} />
        </span>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          background: 'var(--bg-sunk)', border: '1px solid var(--border)',
        }}>
          {src && <img src={src} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {member.name}{member.credentials ? `, ${member.credentials}` : ''}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {member.title}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <span className="badge badge--accent" style={{ textTransform: 'capitalize' }}>
          {(member.role ?? member.category ?? '').replace('-', ' ')}
        </span>
        <div style={{ display: 'flex', gap: 2 }}>
          {member.linkedIn && (
            <a href={member.linkedIn} target="_blank" rel="noreferrer" className="icon-btn" style={{ border: 'none' }}>
              <ExternalLink size={13} />
            </a>
          )}
          <button onClick={onEdit} className="icon-btn" style={{ border: 'none' }}><Pencil size={13} /></button>
          <button onClick={onDelete} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );
}

// ── Group section (Board or Management) ─────────────────────────────────────

function GroupSection({ siteId, group }: { siteId: string; group: TeamGroup }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  const load = () => {
    setLoading(true);
    getTeamMembers(siteId, group).then(setMembers).catch(() => toast.error('Failed to load team members')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [siteId, group]);

  const handleSave = async (data: CreateTeamMemberData) => {
    if (editing) {
      const updated = await updateTeamMember(siteId, editing.id, data);
      setMembers(m => m.map(x => (x.id === updated.id ? updated : x)));
      toast.success('Team member updated');
    } else {
      const created = await createTeamMember(siteId, data);
      setMembers(m => [...m, created]);
      toast.success('Team member added');
    }
  };

  const handleDelete = async (member: TeamMember) => {
    try {
      await deleteTeamMember(siteId, member.id);
      setMembers(m => m.filter(x => x.id !== member.id));
      toast.success(`"${member.name}" removed`);
    } catch {
      toast.error('Failed to remove team member');
    } finally {
      setDeleteTarget(null);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const list = [...members];
    const from = list.findIndex(i => i.id === active.id);
    const to = list.findIndex(i => i.id === over.id);
    if (from === -1 || to === -1) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setMembers(list);
    reorderTeamMembers(siteId, list.map((m, idx) => ({ id: m.id, order: idx })))
      .catch(() => toast.error('Failed to reorder'));
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}><Loader2 size={18} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {members.length} member{members.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => { setEditing(undefined); setShowForm(true); }} className="btn btn--primary btn--sm">
          <Plus size={13} /> Add member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
          <Users size={26} style={{ color: 'var(--fg-subtle)', marginBottom: 8 }} strokeWidth={1.5} />
          <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No members yet</p>
          <p>Add the first {group === 'board' ? 'board' : 'management team'} member</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={members.map(m => m.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {members.map(member => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={() => { setEditing(member); setShowForm(true); }}
                  onDelete={() => setDeleteTarget(member)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <MemberFormModal
          siteId={siteId}
          group={group}
          member={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <Modal title={`Remove "${deleteTarget.name}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This removes them from the public team page.</p>
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

// ── Main tab ──────────────────────────────────────────────────────────────────

export default function TeamManagementTab({ siteId }: { siteId: string }) {
  const [group, setGroup] = useState<TeamGroup>('board');
  const [importGroup, setImportGroup] = useState<TeamGroup | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div className="tabs">
          <button onClick={() => setGroup('board')} className="tab" data-active={group === 'board'}>
            Board Members
          </button>
          <button onClick={() => setGroup('management')} className="tab" data-active={group === 'management'}>
            Management Team
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setImportGroup('board')} className="btn btn--sm">
            <Upload size={13} /> Import Board Members (JSON)
          </button>
          <button onClick={() => setImportGroup('management')} className="btn btn--sm">
            <Upload size={13} /> Import Management Team (JSON)
          </button>
        </div>
      </div>
      <GroupSection key={`${group}-${refreshTick}`} siteId={siteId} group={group} />

      {importGroup && (
        <ImportJsonModal
          siteId={siteId}
          group={importGroup}
          onClose={() => setImportGroup(null)}
          onImported={() => setRefreshTick(t => t + 1)}
        />
      )}
    </div>
  );
}
