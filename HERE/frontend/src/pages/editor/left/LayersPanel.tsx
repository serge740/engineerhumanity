import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext, PointerSensor, useSensor, useSensors,
  DragOverlay, closestCenter,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '../../../stores/editorStore';
import { flattenTree, getAncestorChain } from '../utils/treeHelpers';
import type { PageElement } from '../../../api/pages';

// ── Icons ─────────────────────────────────────────────────────────────────────
const IChevron = ({ open }: { open: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform .15s' }}>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IEye       = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>;
const ITrash     = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3.5 4.5h9M6.5 4.5V3.5a1 1 0 011-1h1a1 1 0 011 1v1M5 4.5l.5 8a1 1 0 001 1h3a1 1 0 001-1l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IDuplicate = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IGrip      = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ opacity: 0.35 }}>
    <circle cx="3" cy="2.5"  r="1" fill="currentColor"/>
    <circle cx="7" cy="2.5"  r="1" fill="currentColor"/>
    <circle cx="3" cy="7"    r="1" fill="currentColor"/>
    <circle cx="7" cy="7"    r="1" fill="currentColor"/>
    <circle cx="3" cy="11.5" r="1" fill="currentColor"/>
    <circle cx="7" cy="11.5" r="1" fill="currentColor"/>
  </svg>
);

const HIDDEN_TAGS = new Set(['style', 'link', 'script', 'meta', 'noscript', 'template']);

// ── Prevent dropping an element into its own subtree ──────────────────────────
function isDescendantOf(els: PageElement[], ancestorId: string, targetId: string): boolean {
  function subtreeContains(children: PageElement[]): boolean {
    for (const c of children) {
      if (c.id === targetId) return true;
      if (c.children?.length && subtreeContains(c.children)) return true;
    }
    return false;
  }
  function find(list: PageElement[]): boolean {
    for (const el of list) {
      if (el.id === ancestorId) return subtreeContains(el.children ?? []);
      if (el.children?.length && find(el.children)) return true;
    }
    return false;
  }
  return find(els);
}

function tagColor(tag: string): string {
  if (['h1','h2','h3','h4','h5','h6'].includes(tag)) return '#6366f1';
  if (['p','span','a','label','li'].includes(tag))    return '#0ea5e9';
  if (['button','input','select','textarea','form'].includes(tag)) return '#f59e0b';
  if (['img','video','audio','svg'].includes(tag))    return '#10b981';
  if (['nav','header','footer','section','main','article','aside'].includes(tag)) return '#ec4899';
  return '#6b7280';
}

// ── Row label (depth-indented content) ────────────────────────────────────────
function rowLabel(
  el: PageElement, open: boolean, hasChildren: boolean,
  onToggle: () => void, depth: number, isHidden: boolean,
) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, gap: 4 }}>
      {/* indent BEFORE chevron — chevron shifts right with depth */}
      <span style={{ display: 'inline-block', width: depth * 16, flexShrink: 0 }} />

      {/* chevron */}
      <span
        style={{ width: 14, flexShrink: 0, color: '#9ca3af', display: 'flex', alignItems: 'center' }}
        onClick={e => { e.stopPropagation(); if (hasChildren) onToggle(); }}
      >
        {hasChildren ? <IChevron open={open} /> : null}
      </span>

      {/* tag badge */}
      <code style={{ fontSize: 10, fontWeight: 600, color: tagColor(el.tag), background: `${tagColor(el.tag)}15`, padding: '1px 5px', borderRadius: 3, flexShrink: 0 }}>
        {el.tag}
      </code>

      {/* label */}
      <span style={{ flex: 1, fontSize: 11, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: isHidden ? 0.4 : 1 }}>
        {el.text?.slice(0, 20) || el.class?.split(' ')[0] || ''}
      </span>
    </div>
  );
}

// ── Sortable layer row ─────────────────────────────────────────────────────────
interface SortableRowProps {
  el:       PageElement;
  depth:    number;
  open:     boolean;
  onToggle: () => void;
}

function SortableLayerRow({ el, depth, open, onToggle }: SortableRowProps) {
  const selectedId       = useEditorStore(s => s.selectedId);
  const selectElement    = useEditorStore(s => s.selectElement);
  const removeElement    = useEditorStore(s => s.removeElement);
  const duplicateElement = useEditorStore(s => s.duplicateElement);
  const patchElement     = useEditorStore(s => s.patchElement);

  const hasChildren = (el.children?.length ?? 0) > 0;
  const isSel       = selectedId === el.id;
  const isHidden    = !!(el as Record<string, unknown>)._hidden;

  const [renaming, setRenaming] = useState(false);
  const [nameVal,  setNameVal]  = useState('');

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: el.id });

  // We need our own DOM ref for scrollIntoView — combine with dnd-kit's ref
  const domRef = useRef<HTMLDivElement | null>(null);
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      domRef.current = node;
    },
    [setNodeRef],
  );

  // Scroll this row into view whenever it becomes selected
  // (covers both canvas-click → panel and panel-click → same panel)
  useEffect(() => {
    if (isSel && domRef.current) {
      domRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isSel]);

  const rowStyle: React.CSSProperties = {
    transform:   CSS.Transform.toString(transform),
    transition,
    opacity:     isDragging ? 0.4 : 1,
    display:     'flex',
    alignItems:  'center',
    paddingRight: 4,
    height:      28,
    background:  isSel ? '#eef2ff' : undefined,
    cursor:      'pointer',
    borderLeft:  isSel ? '2px solid #6366f1' : '2px solid transparent',
    gap:         2,
    position:    'relative',
  };

  return (
    <div
      ref={combinedRef}
      style={rowStyle}
      onClick={() => selectElement(el.id)}
      onDoubleClick={e => { e.stopPropagation(); setNameVal(el.class || ''); setRenaming(true); }}
      className="l-layer-row"
    >
      {/* drag handle */}
      <span
        {...attributes}
        {...listeners}
        style={{ paddingLeft: 6, paddingRight: 2, display: 'flex', alignItems: 'center', cursor: 'grab', flexShrink: 0, color: '#9ca3af' }}
        onClick={e => e.stopPropagation()}
      >
        <IGrip />
      </span>

      {rowLabel(el, open, hasChildren, onToggle, depth, isHidden)}

      {/* inline rename */}
      {renaming && (
        <input
          autoFocus
          value={nameVal}
          style={{ position: 'absolute', left: 30, right: 60, border: '1px solid #6366f1', borderRadius: 3, padding: '1px 4px', fontSize: 11, zIndex: 10 }}
          onClick={e => e.stopPropagation()}
          onChange={e => setNameVal(e.target.value)}
          onBlur={() => { patchElement(el.id, { class: nameVal || undefined }); setRenaming(false); }}
          onKeyDown={e => {
            if (e.key === 'Enter')  (e.target as HTMLInputElement).blur();
            if (e.key === 'Escape') setRenaming(false);
          }}
        />
      )}

      {/* row actions (visible only when selected) */}
      <span
        className="l-layer-act"
        style={{ display: 'flex', gap: 2, opacity: isSel ? 1 : 0, flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button title="Duplicate" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '2px' }}
          onClick={() => duplicateElement(el.id)}><IDuplicate /></button>
        <button title="Hide/Show" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '2px' }}
          onClick={() => patchElement(el.id, { _hidden: !isHidden } as Partial<PageElement>)}><IEye /></button>
        <button title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626', padding: '2px' }}
          onClick={() => removeElement(el.id)}><ITrash /></button>
      </span>
    </div>
  );
}

// ── Ghost row for DragOverlay ──────────────────────────────────────────────────
function GhostRow({ el }: { el: PageElement }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 28, paddingLeft: 8, paddingRight: 4, background: '#eef2ff', border: '1px solid #6366f1', borderRadius: 4, gap: 4, opacity: 0.9 }}>
      <IGrip />
      <code style={{ fontSize: 10, fontWeight: 600, color: tagColor(el.tag), background: `${tagColor(el.tag)}15`, padding: '1px 5px', borderRadius: 3 }}>
        {el.tag}
      </code>
      <span style={{ fontSize: 11, color: '#374151' }}>{el.text?.slice(0, 20) || el.class?.split(' ')[0] || ''}</span>
    </div>
  );
}

// ── Layers panel ───────────────────────────────────────────────────────────────
export function LayersPanel() {
  const elements    = useEditorStore(s => s.elements);
  const selectedId  = useEditorStore(s => s.selectedId);
  const pages       = useEditorStore(s => s.pages);
  const slug        = useEditorStore(s => s.slug);
  const siteId      = useEditorStore(s => s.siteId);
  const isDirty     = useEditorStore(s => s.isDirty);
  const save        = useEditorStore(s => s.save);
  const moveElement = useEditorStore(s => s.moveElement);
  const navigate    = useNavigate();

  const [openIds,  setOpenIds]  = useState<Set<string>>(new Set());
  const [activeEl, setActiveEl] = useState<PageElement | null>(null);

  // ── When canvas selects an element, expand its ancestor chain ────────────────
  // so the row is visible in the flat list, then SortableLayerRow scrolls to it.
  useEffect(() => {
    if (!selectedId) return;
    const ancestors = getAncestorChain(elements, selectedId);
    if (!ancestors?.length) return;
    setOpenIds(prev => {
      const next = new Set(prev);
      ancestors.forEach(a => next.add(a.id));
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]); // elements intentionally omitted — ancestor expand is selection-driven

  const toggle = (id: string) =>
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const switchPage = async (newSlug: string) => {
    if (newSlug === slug) return;
    if (isDirty) await save().catch(() => {});
    navigate(`/sites/${siteId}/editor/${newSlug}`);
  };

  // Only show non-system tags at the top level
  const visible   = elements.filter(el => !HIDDEN_TAGS.has(el.tag));
  const flatItems = flattenTree(visible, openIds);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const item = flatItems.find(f => f.el.id === active.id);
    setActiveEl(item?.el ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveEl(null);
    if (!over || active.id === over.id) return;
    if (isDescendantOf(elements, String(active.id), String(over.id))) return;
    const overItem = flatItems.find(f => f.el.id === over.id);
    if (!overItem) return;
    moveElement(String(active.id), overItem.parentId, overItem.index);
  };

  return (
    <div className="l-panel-scroll">
      {/* Pages */}
      <div className="l-sect-head">Pages</div>
      {pages.map(p => (
        <div
          key={p.slug}
          className={'l-page-item' + (p.slug === slug ? ' active' : '')}
          style={{ cursor: p.slug === slug ? 'default' : 'pointer' }}
          onClick={() => switchPage(p.slug)}
        >
          <span className="l-page-dot" />
          {p.title || p.slug}
          {p.slug === slug && (
            <span style={{ marginLeft: 'auto', fontSize: 9, background: '#6366f1', color: '#fff', borderRadius: 3, padding: '1px 5px' }}>
              current
            </span>
          )}
        </div>
      ))}

      {/* Layers */}
      <div className="l-sect-head">Layers</div>

      {flatItems.length === 0 ? (
        <div style={{ padding: '12px 16px', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
          No elements yet.<br />Use Insert or Sections to add content.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={flatItems.map(f => f.el.id)} strategy={verticalListSortingStrategy}>
            {flatItems.map(item => (
              <SortableLayerRow
                key={item.el.id}
                el={item.el}
                depth={item.depth}
                open={openIds.has(item.el.id)}
                onToggle={() => toggle(item.el.id)}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeEl ? <GhostRow el={activeEl} /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
