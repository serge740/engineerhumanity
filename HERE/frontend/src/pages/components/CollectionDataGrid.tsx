import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Copy, GripVertical, Loader2, Settings2 } from 'lucide-react';
import {
  getCollection, updateCollection, createCollectionItem, updateCollectionItem,
  deleteCollectionItem, reorderCollectionItems,
  type SiteCollection, type CollectionItem,
} from '../../api/collections';
import type { ComponentField, ComponentFieldType } from '../../api/components';
import { ImageCellPicker } from './ImageCellPicker';
import { Modal } from '../../components/ui/Modal';
import {
  DndContext, PointerSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const FIELD_TYPES: { v: ComponentFieldType; l: string }[] = [
  { v: 'text',     l: 'Text' },
  { v: 'textarea', l: 'Long text' },
  { v: 'image',    l: 'Image' },
  { v: 'url',      l: 'Link URL' },
  { v: 'color',    l: 'Color' },
  { v: 'number',   l: 'Number' },
];

function toCamelKey(label: string): string {
  const words = label.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (!words.length) return 'field';
  const key = words
    .map((w, i) => (i === 0 ? w.charAt(0).toLowerCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('')
    .replace(/[^a-zA-Z0-9_]/g, '');
  return key || 'field';
}

function uniqueKey(base: string, existing: Set<string>): string {
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}${i}`)) i++;
  return `${base}${i}`;
}

// ── Add / edit column modal ──────────────────────────────────────────────────

function ColumnModal({ field, existingKeys, onSave, onDelete, onClose }: {
  field?: ComponentField;
  existingKeys: Set<string>;
  onSave: (f: ComponentField) => void;
  onDelete?: () => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState(field?.label ?? '');
  const [type, setType]   = useState<ComponentFieldType>(field?.type ?? 'text');
  const [required, setRequired] = useState(!!field?.required);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const key = field?.key ?? uniqueKey(toCamelKey(label), existingKeys);
    onSave({ key, label: label.trim(), type, required });
    onClose();
  };

  return (
    <Modal title={field ? 'Edit column' : 'New column'} subtitle={field ? `key: ${field.key}` : 'Add a new column to this data table'} onClose={onClose}>
      <form onSubmit={handleSave}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label className="field__label">Column label</label>
            <input
              autoFocus
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="e.g. Description"
              className="input"
            />
          </div>
          <div className="field">
            <label className="field__label">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as ComponentFieldType)}
              className="select"
            >
              {FIELD_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-muted)' }}>
            <input type="checkbox" className="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} />
            Required
          </label>
        </div>
        <div className="modal__foot">
          {onDelete ? (
            <button type="button" onClick={() => { onDelete(); onClose(); }} className="btn btn--danger" style={{ border: 'none', background: 'none' }}>
              Delete column
            </button>
          ) : <span />}
          <button type="submit" disabled={!label.trim()} className="btn btn--primary">
            {field ? 'Save' : 'Add column'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Cell ─────────────────────────────────────────────────────────────────────

function Cell({ siteId, field, value, onChange }: {
  siteId: string; field: ComponentField; value: unknown; onChange: (v: unknown) => void;
}) {
  if (field.type === 'image') {
    return <ImageCellPicker siteId={siteId} value={value as string | undefined} onChange={onChange} />;
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        defaultValue={(value as string) ?? ''}
        onBlur={e => onChange(e.target.value)}
        rows={2}
        className="input"
        style={{ height: 'auto', resize: 'none', border: '1px solid transparent', background: 'transparent' }}
        onFocus={e => { e.currentTarget.style.border = '1px solid var(--border)'; e.currentTarget.style.background = 'var(--panel)'; }}
      />
    );
  }
  if (field.type === 'color') {
    return (
      <input type="color" defaultValue={(value as string) || '#000000'} onBlur={e => onChange(e.target.value)}
        style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', cursor: 'pointer' }} />
    );
  }
  return (
    <input
      type={field.type === 'number' ? 'number' : 'text'}
      defaultValue={(value as string | number) ?? ''}
      onBlur={e => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      placeholder={field.placeholder}
      className="input"
      style={{ border: '1px solid transparent', background: 'transparent' }}
      onFocus={e => { e.currentTarget.style.border = '1px solid var(--border)'; e.currentTarget.style.background = 'var(--panel)'; }}
    />
  );
}

// ── Add row modal ────────────────────────────────────────────────────────────

function AddRowModal({ siteId, fields, onCreate, onClose }: {
  siteId: string;
  fields: ComponentField[];
  onCreate: (data: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
}) {
  const [data, setData]   = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const setField = (key: string, v: unknown) => setData(d => ({ ...d, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onCreate(data);
      onClose();
    } catch {
      toast.error('Failed to add row');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="New row" subtitle="Fill in the fields for this item" onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fields.map(f => (
            <div key={f.key} className="field">
              <label className="field__label">{f.label}{f.required ? ' *' : ''}</label>
              {f.type === 'image' ? (
                <ImageCellPicker siteId={siteId} value={data[f.key] as string | undefined} onChange={v => setField(f.key, v)} />
              ) : f.type === 'textarea' ? (
                <textarea
                  value={(data[f.key] as string) ?? ''}
                  onChange={e => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={3}
                  className="input"
                  style={{ height: 'auto', resize: 'vertical' }}
                />
              ) : f.type === 'color' ? (
                <input
                  type="color"
                  value={(data[f.key] as string) || '#000000'}
                  onChange={e => setField(f.key, e.target.value)}
                  style={{ width: 40, height: 32, borderRadius: 'var(--r-sm)', border: '1px solid var(--border)', cursor: 'pointer' }}
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={(data[f.key] as string | number) ?? ''}
                  onChange={e => setField(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                  placeholder={f.placeholder}
                  className="input"
                />
              )}
            </div>
          ))}
        </div>
        <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} className="btn btn--ghost">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn--primary">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />} Add row
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Row ──────────────────────────────────────────────────────────────────────

function Row({ siteId, item, fields, gridCols, onPatch, onDuplicate, onDelete }: {
  siteId: string; item: CollectionItem; fields: ComponentField[]; gridCols: string;
  onPatch: (data: Record<string, unknown>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const [data, setData] = useState(item.data);

  useEffect(() => { setData(item.data); }, [item.data]);

  const setField = (key: string, v: unknown) => {
    const next = { ...data, [key]: v };
    setData(next);
    onPatch(next);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform), transition, gridTemplateColumns: gridCols, opacity: isDragging ? 0.5 : 1,
        display: 'grid', alignItems: 'center', gap: 8, padding: '6px 8px', borderBottom: '1px solid var(--border)',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-sunk)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <span {...attributes} {...listeners} style={{ color: 'var(--fg-subtle)', cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GripVertical size={14} />
      </span>
      {fields.map(f => (
        <Cell key={f.key} siteId={siteId} field={f} value={data[f.key]} onChange={v => setField(f.key, v)} />
      ))}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
        <button onClick={onDuplicate} title="Duplicate row" className="icon-btn" style={{ border: 'none', width: 26, height: 26 }}>
          <Copy size={13} />
        </button>
        <button onClick={onDelete} title="Delete row" className="icon-btn" style={{ border: 'none', width: 26, height: 26, color: 'var(--danger)' }}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Grid ─────────────────────────────────────────────────────────────────────

export function CollectionDataGrid({ siteId, collectionId }: { siteId: string; collectionId: string }) {
  const [collection, setCollection] = useState<SiteCollection | null>(null);
  const [loading, setLoading]       = useState(true);
  const [openHeader, setOpenHeader] = useState<'new' | string | null>(null);
  const [showAddRow, setShowAddRow] = useState(false);
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const load = () => {
    setLoading(true);
    getCollection(siteId, collectionId).then(setCollection).catch(() => toast.error('Failed to load data')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [siteId, collectionId]);

  const fields = collection?.fields ?? [];
  const items  = collection?.items ?? [];
  const gridCols = `28px repeat(${Math.max(fields.length, 1)}, minmax(160px, 1fr)) 76px`;

  const saveFields = async (nextFields: ComponentField[]) => {
    const updated = await updateCollection(siteId, collectionId, { fields: nextFields });
    setCollection(updated);
  };

  const handleAddColumn = (f: ComponentField) => {
    saveFields([...fields, f]).catch(() => toast.error('Failed to add column'));
  };
  const handleEditColumn = (key: string, f: ComponentField) => {
    saveFields(fields.map(x => (x.key === key ? f : x))).catch(() => toast.error('Failed to update column'));
  };
  const handleDeleteColumn = (key: string) => {
    saveFields(fields.filter(x => x.key !== key)).catch(() => toast.error('Failed to delete column'));
  };

  const handleAddRow = async (data: Record<string, unknown>) => {
    const item = await createCollectionItem(siteId, collectionId, data);
    setCollection(c => (c ? { ...c, items: [...(c.items ?? []), item] } : c));
  };

  const handlePatchRow = (itemId: string, data: Record<string, unknown>) => {
    // optimistic local update + debounced persist
    setCollection(c => c ? { ...c, items: (c.items ?? []).map(i => i.id === itemId ? { ...i, data } : i) } : c);
    clearTimeout(saveTimers.current[itemId]);
    saveTimers.current[itemId] = setTimeout(() => {
      updateCollectionItem(siteId, collectionId, itemId, { data }).catch(() => toast.error('Failed to save row'));
    }, 500);
  };

  const handleDuplicateRow = async (item: CollectionItem) => {
    try {
      const copy = await createCollectionItem(siteId, collectionId, { ...item.data });
      setCollection(c => (c ? { ...c, items: [...(c.items ?? []), copy] } : c));
    } catch {
      toast.error('Failed to duplicate row');
    }
  };

  const handleDeleteRow = async (itemId: string) => {
    if (!window.confirm('Delete this row?')) return;
    try {
      await deleteCollectionItem(siteId, collectionId, itemId);
      setCollection(c => (c ? { ...c, items: (c.items ?? []).filter(i => i.id !== itemId) } : c));
    } catch {
      toast.error('Failed to delete row');
    }
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || !collection) return;
    const list = [...items];
    const from = list.findIndex(i => i.id === active.id);
    const to   = list.findIndex(i => i.id === over.id);
    if (from === -1 || to === -1) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    setCollection({ ...collection, items: list });
    reorderCollectionItems(siteId, collectionId, list.map((it, idx) => ({ id: it.id, order: idx })))
      .catch(() => toast.error('Failed to reorder'));
  };

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}><Loader2 size={20} className="animate-spin" style={{ color: 'var(--fg-subtle)' }} /></div>;
  }

  const existingKeys = new Set(fields.map(f => f.key));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          {fields.length} column{fields.length !== 1 ? 's' : ''} · {items.length} row{items.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => setShowAddRow(true)} disabled={fields.length === 0} className="btn btn--primary btn--sm">
          <Plus size={13} /> Add row
        </button>
      </div>

      <div className="panel" style={{ overflowX: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', alignItems: 'center', gap: 8, padding: '8px', background: 'var(--bg-sunk)', borderBottom: '1px solid var(--border)', gridTemplateColumns: gridCols }}>
          <span />
          {fields.map(f => (
            <div key={f.key} style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenHeader(o => (o === f.key ? null : f.key))}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                {f.label}
                <span style={{ fontSize: 9, fontWeight: 400, color: 'var(--fg-subtle)', textTransform: 'none' }}>{f.type}</span>
                <Settings2 size={11} style={{ color: 'var(--fg-subtle)' }} />
              </button>
              {openHeader === f.key && (
                <ColumnModal
                  field={f}
                  existingKeys={existingKeys}
                  onSave={updated => handleEditColumn(f.key, updated)}
                  onDelete={() => handleDeleteColumn(f.key)}
                  onClose={() => setOpenHeader(null)}
                />
              )}
            </div>
          ))}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setOpenHeader(o => (o === 'new' ? null : 'new'))}
              title="Add column"
              className="icon-btn"
              style={{ border: 'none', color: 'var(--accent)' }}
            >
              <Plus size={14} />
            </button>
            {openHeader === 'new' && (
              <ColumnModal existingKeys={existingKeys} onSave={handleAddColumn} onClose={() => setOpenHeader(null)} />
            )}
          </div>
        </div>

        {/* Rows */}
        {fields.length === 0 ? (
          <div className="empty">
            <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No columns yet</p>
            <p>Add your first column to start entering data</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty">
            <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No rows yet</p>
            <p>Click "Add row" to enter your first item</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
              {items.map(item => (
                <Row
                  key={item.id}
                  siteId={siteId}
                  item={item}
                  fields={fields}
                  gridCols={gridCols}
                  onPatch={data => handlePatchRow(item.id, data)}
                  onDuplicate={() => handleDuplicateRow(item)}
                  onDelete={() => handleDeleteRow(item.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {showAddRow && (
        <AddRowModal siteId={siteId} fields={fields} onCreate={handleAddRow} onClose={() => setShowAddRow(false)} />
      )}
    </div>
  );
}
