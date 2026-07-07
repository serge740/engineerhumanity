import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Plus, Trash2, Pencil, GripVertical, Loader2, Calendar, Upload, X, ArrowUp, ArrowDown,
} from 'lucide-react';
import {
  getEvents, createEvent, updateEvent, deleteEvent, reorderEvents,
  type SiteEvent, type EventStatus, type EventHighlight, type EventContact,
  type CreateEventData,
} from '../../api/events';
import { uploadAsset } from '../../api/assets';
import { Modal } from '../../components/ui/Modal';
import { ImportJsonModal } from './ImportJsonModal';
import {
  DndContext, PointerSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

const ICON_OPTIONS = ['star', 'users', 'graduation', 'tools', 'heart', 'chart'];

function resolveImage(image: string) {
  if (!image) return '';
  return image.startsWith('http') ? image : `${BACKEND_URL}${image}`;
}

// ── Image gallery editor ─────────────────────────────────────────────────────

function ImageGalleryEditor({ siteId, images, onChange }: {
  siteId: string; images: string[]; onChange: (images: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const f of Array.from(files)) {
        const asset = await uploadAsset(siteId, f, 'image');
        uploaded.push(asset.url);
      }
      onChange([...images, ...uploaded]);
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8, marginBottom: 8 }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-sunk)' }}>
            <img src={resolveImage(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 3, background: 'linear-gradient(rgba(0,0,0,.35), transparent 30%, transparent 70%, rgba(0,0,0,.35))' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => remove(i)} style={{ background: 'rgba(0,0,0,.6)', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', padding: 2 }}>
                  <X size={11} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={{ background: 'rgba(0,0,0,.6)', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', padding: 2, opacity: i === 0 ? 0.4 : 1 }}>
                  <ArrowUp size={11} />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} style={{ background: 'rgba(0,0,0,.6)', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer', padding: 2, opacity: i === images.length - 1 ? 0.4 : 1 }}>
                  <ArrowDown size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleUpload} />
      <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} className="btn btn--sm" style={{ borderStyle: 'dashed', color: 'var(--accent)' }}>
        {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
        {uploading ? 'Uploading…' : 'Add photos'}
      </button>
    </div>
  );
}

// ── Add / edit modal ─────────────────────────────────────────────────────────

function EventFormModal({ siteId, status, event, onClose, onSave }: {
  siteId: string;
  status: EventStatus;
  event?: SiteEvent;
  onClose: () => void;
  onSave: (data: CreateEventData) => Promise<void>;
}) {
  const [title, setTitle] = useState(event?.title ?? '');
  const [date, setDate] = useState(event?.date ?? '');
  const [time, setTime] = useState(event?.time ?? '');
  const [location, setLocation] = useState(event?.location ?? '');
  const [attendees, setAttendees] = useState(event?.attendees ?? '');
  const [description, setDescription] = useState(event?.description ?? '');
  const [paragraphs, setParagraphs] = useState<string[]>(event?.paragraphs ?? []);
  const [highlights, setHighlights] = useState<EventHighlight[]>(event?.highlights ?? []);
  const [images, setImages] = useState<string[]>(event?.images ?? []);
  const [contacts, setContacts] = useState<EventContact[]>(event?.contacts ?? []);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !location.trim()) return;
    setSaving(true);
    try {
      await onSave({
        status,
        title: title.trim(),
        date: date.trim(),
        time: status === 'upcoming' ? (time.trim() || undefined) : undefined,
        location: location.trim(),
        attendees: status === 'past' ? (attendees.trim() || undefined) : undefined,
        description,
        paragraphs: paragraphs.filter(p => p.trim()),
        highlights: highlights.filter(h => h.label.trim()),
        images,
        contacts: status === 'upcoming' ? contacts.filter(c => c.label.trim() || c.email.trim()) : undefined,
      });
      onClose();
    } catch {
      toast.error('Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={event ? 'Edit event' : 'New event'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflowY: 'auto' }}>
          <div className="field">
            <label className="field__label">Title *</label>
            <input autoFocus type="text" value={title} onChange={e => setTitle(e.target.value)} className="input" />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div className="field" style={{ flex: 1 }}>
              <label className="field__label">Date *</label>
              <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. June 20, 2026" className="input" />
            </div>
            {status === 'upcoming' && (
              <div className="field" style={{ flex: 1 }}>
                <label className="field__label">Time</label>
                <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 10:00 AM – 2:00 PM" className="input" />
              </div>
            )}
            {status === 'past' && (
              <div className="field" style={{ flex: 1 }}>
                <label className="field__label">Attendees</label>
                <input type="text" value={attendees} onChange={e => setAttendees(e.target.value)} placeholder="e.g. 200+" className="input" />
              </div>
            )}
          </div>

          <div className="field">
            <label className="field__label">Location *</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="input" />
          </div>

          <div className="field">
            <label className="field__label">Description (HTML allowed)</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="input" style={{ height: 'auto', resize: 'vertical' }} />
          </div>

          <div className="field">
            <label className="field__label">Body paragraphs (HTML allowed)</label>
            {paragraphs.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <textarea
                  value={p}
                  onChange={e => setParagraphs(ps => ps.map((x, idx) => idx === i ? e.target.value : x))}
                  rows={2}
                  className="input"
                  style={{ height: 'auto', resize: 'vertical', flex: 1 }}
                />
                <button type="button" onClick={() => setParagraphs(ps => ps.filter((_, idx) => idx !== i))} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setParagraphs(ps => [...ps, ''])} className="btn btn--ghost btn--sm">
              <Plus size={12} /> Add paragraph
            </button>
          </div>

          <div className="field">
            <label className="field__label">Highlights</label>
            {highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input
                  type="text"
                  value={h.label}
                  onChange={e => setHighlights(hs => hs.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))}
                  placeholder="Label"
                  className="input"
                  style={{ flex: 1 }}
                />
                <select
                  value={h.icon}
                  onChange={e => setHighlights(hs => hs.map((x, idx) => idx === i ? { ...x, icon: e.target.value } : x))}
                  className="select"
                  style={{ width: 130 }}
                >
                  {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <button type="button" onClick={() => setHighlights(hs => hs.filter((_, idx) => idx !== i))} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setHighlights(hs => [...hs, { label: '', icon: 'star' }])} className="btn btn--ghost btn--sm">
              <Plus size={12} /> Add highlight
            </button>
          </div>

          {status === 'upcoming' && (
            <div className="field">
              <label className="field__label">Contacts</label>
              {contacts.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input
                    type="text"
                    value={c.label}
                    onChange={e => setContacts(cs => cs.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))}
                    placeholder="Label"
                    className="input"
                    style={{ flex: 1 }}
                  />
                  <input
                    type="email"
                    value={c.email}
                    onChange={e => setContacts(cs => cs.map((x, idx) => idx === i ? { ...x, email: e.target.value } : x))}
                    placeholder="email@example.org"
                    className="input"
                    style={{ flex: 1 }}
                  />
                  <button type="button" onClick={() => setContacts(cs => cs.filter((_, idx) => idx !== i))} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => setContacts(cs => [...cs, { label: '', email: '' }])} className="btn btn--ghost btn--sm">
                <Plus size={12} /> Add contact
              </button>
            </div>
          )}

          <div className="field">
            <label className="field__label">Photos</label>
            <ImageGalleryEditor siteId={siteId} images={images} onChange={setImages} />
          </div>
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={!title.trim() || !date.trim() || !location.trim() || saving} className="btn btn--primary">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            {event ? 'Save changes' : 'Add event'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

function EventCard({ event, onEdit, onDelete }: {
  event: SiteEvent; onEdit: () => void; onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: event.id });
  const cover = event.images[0];

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
        <div style={{ width: 48, height: 48, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-sunk)', border: '1px solid var(--border)' }}>
          {cover && <img src={resolveImage(cover)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {event.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {event.date} · {event.location}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <span className="badge">{event.images.length} photo{event.images.length !== 1 ? 's' : ''}</span>
        <div style={{ display: 'flex', gap: 2 }}>
          <button onClick={onEdit} className="icon-btn" style={{ border: 'none' }}><Pencil size={13} /></button>
          <button onClick={onDelete} className="icon-btn" style={{ border: 'none', color: 'var(--danger)' }}><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );
}

// ── Status section (Upcoming or Past) ────────────────────────────────────────

function StatusSection({ siteId, status }: { siteId: string; status: EventStatus }) {
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SiteEvent | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<SiteEvent | null>(null);

  const load = () => {
    setLoading(true);
    getEvents(siteId, status).then(setEvents).catch(() => toast.error('Failed to load events')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [siteId, status]);

  const handleSave = async (data: CreateEventData) => {
    if (editing) {
      const updated = await updateEvent(siteId, editing.id, data);
      setEvents(e => e.map(x => (x.id === updated.id ? updated : x)));
      toast.success('Event updated');
    } else {
      const created = await createEvent(siteId, data);
      setEvents(e => [...e, created]);
      toast.success('Event added');
    }
  };

  const handleDelete = async (event: SiteEvent) => {
    try {
      await deleteEvent(siteId, event.id);
      setEvents(e => e.filter(x => x.id !== event.id));
      toast.success(`"${event.title}" removed`);
    } catch {
      toast.error('Failed to remove event');
    } finally {
      setDeleteTarget(null);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const list = [...events];
    const from = list.findIndex(i => i.id === active.id);
    const to = list.findIndex(i => i.id === over.id);
    if (from === -1 || to === -1) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setEvents(list);
    reorderEvents(siteId, list.map((e, idx) => ({ id: e.id, order: idx })))
      .catch(() => toast.error('Failed to reorder'));
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}><Loader2 size={18} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {events.length} event{events.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => { setEditing(undefined); setShowForm(true); }} className="btn btn--primary btn--sm">
          <Plus size={13} /> Add event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="empty" style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-md)' }}>
          <Calendar size={26} style={{ color: 'var(--fg-subtle)', marginBottom: 8 }} strokeWidth={1.5} />
          <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No {status} events yet</p>
          <p>Add the first {status} event</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={events.map(e => e.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={() => { setEditing(event); setShowForm(true); }}
                  onDelete={() => setDeleteTarget(event)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <EventFormModal
          siteId={siteId}
          status={status}
          event={editing}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <Modal title={`Remove "${deleteTarget.title}"?`} onClose={() => setDeleteTarget(null)}>
          <div className="modal__body">
            <p style={{ fontSize: 12, color: 'var(--fg-muted)' }}>This removes it from the public events page.</p>
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

export default function EventsManagementTab({ siteId }: { siteId: string }) {
  const [status, setStatus] = useState<EventStatus>('upcoming');
  const [importStatus, setImportStatus] = useState<EventStatus | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div className="tabs">
          <button onClick={() => setStatus('upcoming')} className="tab" data-active={status === 'upcoming'}>
            Upcoming Events
          </button>
          <button onClick={() => setStatus('past')} className="tab" data-active={status === 'past'}>
            Past Events
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setImportStatus('upcoming')} className="btn btn--sm">
            <Upload size={13} /> Import Upcoming Events (JSON)
          </button>
          <button onClick={() => setImportStatus('past')} className="btn btn--sm">
            <Upload size={13} /> Import Past Events (JSON)
          </button>
        </div>
      </div>
      <StatusSection key={`${status}-${refreshTick}`} siteId={siteId} status={status} />

      {importStatus && (
        <ImportJsonModal
          siteId={siteId}
          status={importStatus}
          onClose={() => setImportStatus(null)}
          onImported={() => setRefreshTick(t => t + 1)}
        />
      )}
    </div>
  );
}
