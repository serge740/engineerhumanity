import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Plus, Trash2, Pencil, GripVertical, Loader2, BookOpen, Upload,
} from 'lucide-react';
import {
  getStories, createStory, updateStory, deleteStory, reorderStories,
  type Story, type StoryGroup, type StorySection, type CreateStoryData,
} from '../../api/stories';
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

const GROUP_TABS: { v: StoryGroup; l: string }[] = [
  { v: 'success', l: 'Success Stories' },
  { v: 'success-summary', l: 'Success Summaries' },
  { v: 'testimony', l: 'Testimonials' },
];

function resolveImage(image: string | null) {
  if (!image) return undefined;
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
}

// ── Add / edit modal ─────────────────────────────────────────────────────────

function StoryFormModal({ siteId, group, story, onClose, onSave }: {
  siteId: string;
  group: StoryGroup;
  story?: Story;
  onClose: () => void;
  onSave: (data: CreateStoryData) => Promise<void>;
}) {
  const isSummary = group === 'success-summary';
  const [name, setName] = useState(story?.name ?? '');
  const [role, setRole] = useState(story?.role ?? '');
  const [image, setImage] = useState<string | undefined>(story?.image ?? undefined);
  const [summary, setSummary] = useState(story?.summary ?? '');
  const [storyText, setStoryText] = useState(story?.story ?? '');
  const [intro, setIntro] = useState(story?.intro ?? '');
  const [sections, setSections] = useState<StorySection[]>(story?.sections ?? []);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSave({
        group,
        name: name.trim(),
        role: isSummary ? undefined : (role.trim() || undefined),
        image: isSummary ? undefined : image,
        summary: isSummary ? undefined : (summary.trim() || undefined),
        story: isSummary ? (storyText.trim() || undefined) : undefined,
        intro: isSummary ? undefined : (intro.trim() || undefined),
        sections: isSummary ? undefined : sections.filter(s => s.title.trim() || s.content.trim()),
      });
      onClose();
    } catch {
      toast.error('Failed to save story');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={story ? 'Edit entry' : 'New entry'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflowY: 'auto' }}>
          <div className="field">
            <label className="field__label">Name *</label>
            <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} className="input" />
          </div>

          {isSummary ? (
            <div className="field">
              <label className="field__label">Story (short quote)</label>
              <textarea value={storyText} onChange={e => setStoryText(e.target.value)} rows={5}
                className="input" style={{ height: 'auto', resize: 'vertical' }} />
            </div>
          ) : (
            <>
              <div className="field">
                <label className="field__label">Photo</label>
                <ImageCellPicker siteId={siteId} value={image} onChange={setImage} />
              </div>
              <div className="field">
                <label className="field__label">Role / caption</label>
                <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Alum / Beneficiary" className="input" />
              </div>
              <div className="field">
                <label className="field__label">Card summary</label>
                <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3}
                  className="input" style={{ height: 'auto', resize: 'vertical' }} />
              </div>
              <div className="field">
                <label className="field__label">Modal intro paragraph</label>
                <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={4}
                  className="input" style={{ height: 'auto', resize: 'vertical' }} />
              </div>
              <div className="field">
                <label className="field__label">Sections</label>
                {sections.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8, padding: 8, border: '1px solid var(--border)', borderRadius: 'var(--r-sm)' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        type="text"
                        value={s.title}
                        onChange={e => setSections(ss => ss.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                        placeholder="Section title"
                        className="input"
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={() => setSections(ss => ss.filter((_, idx) => idx !== i))} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <textarea
                      value={s.content}
                      onChange={e => setSections(ss => ss.map((x, idx) => idx === i ? { ...x, content: e.target.value } : x))}
                      placeholder="Section content"
                      rows={3}
                      className="input"
                      style={{ height: 'auto', resize: 'vertical' }}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => setSections(ss => [...ss, { title: '', content: '' }])} className="btn btn--ghost btn--sm">
                  <Plus size={12} /> Add section
                </button>
              </div>
            </>
          )}
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!name.trim() || saving} className="btn btn--primary">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            {story ? 'Save changes' : 'Add entry'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function StoryCard({ group, story, onEdit, onDelete }: {
  group: StoryGroup; story: Story; onEdit: () => void; onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: story.id });
  const src = resolveImage(story.image);
  const isSummary = group === 'success-summary';

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
        {!isSummary && (
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-sunk)', border: '1px solid var(--border)' }}>
            {src && <img src={src} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {story.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isSummary ? (story.story ?? '') : (story.role ?? '')}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, padding: '8px 12px' }}>
        <button onClick={onEdit} className="icon-btn" style={{ border: 'none' }}><Pencil size={13} /></button>
        <button onClick={onDelete} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}><Trash2 size={13} /></button>
      </div>
    </div>
  );
}

// ── Group section ─────────────────────────────────────────────────────────────

function GroupSection({ siteId, group }: { siteId: string; group: StoryGroup }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Story | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Story | null>(null);

  const load = () => {
    setLoading(true);
    getStories(siteId, group).then(setStories).catch(() => toast.error('Failed to load stories')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [siteId, group]);

  const handleSave = async (data: CreateStoryData) => {
    if (editing) {
      const updated = await updateStory(siteId, editing.id, data);
      setStories(s => s.map(x => (x.id === updated.id ? updated : x)));
      toast.success('Entry updated');
    } else {
      const created = await createStory(siteId, data);
      setStories(s => [...s, created]);
      toast.success('Entry added');
    }
  };

  const handleDelete = async (story: Story) => {
    try {
      await deleteStory(siteId, story.id);
      setStories(s => s.filter(x => x.id !== story.id));
      toast.success(`"${story.name}" removed`);
    } catch {
      toast.error('Failed to remove entry');
    } finally {
      setDeleteTarget(null);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const list = [...stories];
    const from = list.findIndex(i => i.id === active.id);
    const to = list.findIndex(i => i.id === over.id);
    if (from === -1 || to === -1) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setStories(list);
    reorderStories(siteId, list.map((s, idx) => ({ id: s.id, order: idx })))
      .catch(() => toast.error('Failed to reorder'));
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}><Loader2 size={18} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {stories.length} entr{stories.length !== 1 ? 'ies' : 'y'}
        </p>
        <button onClick={() => { setEditing(undefined); setShowForm(true); }} className="btn btn--primary btn--sm">
          <Plus size={13} /> Add entry
        </button>
      </div>

      {stories.length === 0 ? (
        <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
          <BookOpen size={26} style={{ color: 'var(--fg-subtle)', marginBottom: 8 }} strokeWidth={1.5} />
          <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No entries yet</p>
          <p>Add the first entry to this list</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={stories.map(s => s.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {stories.map(story => (
                <StoryCard
                  key={story.id}
                  group={group}
                  story={story}
                  onEdit={() => { setEditing(story); setShowForm(true); }}
                  onDelete={() => setDeleteTarget(story)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <StoryFormModal
          siteId={siteId}
          group={group}
          story={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <Modal title={`Remove "${deleteTarget.name}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This removes it from the public page.</p>
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

export default function StoriesManagementTab({ siteId }: { siteId: string }) {
  const [group, setGroup] = useState<StoryGroup>('success');
  const [importGroup, setImportGroup] = useState<StoryGroup | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div className="tabs">
          {GROUP_TABS.map(t => (
            <button key={t.v} onClick={() => setGroup(t.v)} className="tab" data-active={group === t.v}>
              {t.l}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {GROUP_TABS.map(t => (
            <button key={t.v} onClick={() => setImportGroup(t.v)} className="btn btn--sm">
              <Upload size={13} /> Import {t.l} (JSON)
            </button>
          ))}
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
