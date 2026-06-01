import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';

// ── Icons ─────────────────────────────────────────────────────────────────────
const IChevron  = ({ open }: { open: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform .15s' }}>
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IEye     = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>;
const ITrash   = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3.5 4.5h9M6.5 4.5V3.5a1 1 0 011-1h1a1 1 0 011 1v1M5 4.5l.5 8a1 1 0 001 1h3a1 1 0 001-1l.5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IDuplicate = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── Tag glyph colour ──────────────────────────────────────────────────────────
function tagColor(tag: string): string {
  if (['h1','h2','h3','h4','h5','h6'].includes(tag)) return '#6366f1';
  if (['p','span','a','label','li'].includes(tag))    return '#0ea5e9';
  if (['button','input','select','textarea','form'].includes(tag)) return '#f59e0b';
  if (['img','video','audio','svg'].includes(tag))    return '#10b981';
  if (['nav','header','footer','section','main','article','aside'].includes(tag)) return '#ec4899';
  return '#6b7280';
}

// ── Layer row ─────────────────────────────────────────────────────────────────
interface LayerRowProps {
  el:       PageElement;
  depth:    number;
  open:     boolean;
  onToggle: () => void;
}

function LayerRow({ el, depth, open, onToggle }: LayerRowProps) {
  const selectedId      = useEditorStore(s => s.selectedId);
  const selectElement   = useEditorStore(s => s.selectElement);
  const removeElement   = useEditorStore(s => s.removeElement);
  const duplicateElement = useEditorStore(s => s.duplicateElement);
  const patchElement    = useEditorStore(s => s.patchElement);

  const hasChildren = (el.children?.length ?? 0) > 0;
  const isSel       = selectedId === el.id;
  const isHidden    = !!(el as Record<string,unknown>)._hidden;

  const [renaming, setRenaming] = useState(false);
  const [nameVal,  setNameVal ] = useState('');

  const label = el.text?.slice(0, 20) || el.class?.split(' ')[0] || el.tag;

  const startRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNameVal(el.class || '');
    setRenaming(true);
  };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center',
        paddingLeft: 8 + depth * 14,
        paddingRight: 4,
        height: 28,
        background: isSel ? '#eef2ff' : undefined,
        cursor: 'pointer',
        borderLeft: isSel ? '2px solid #6366f1' : '2px solid transparent',
        gap: 4,
      }}
      onClick={() => selectElement(el.id)}
      onDoubleClick={startRename}
      className="l-layer-row"
    >
      {/* chevron */}
      <span style={{ width: 14, flexShrink: 0, color: '#9ca3af', display: 'flex', alignItems: 'center' }}
        onClick={e => { e.stopPropagation(); if (hasChildren) onToggle(); }}>
        {hasChildren ? <IChevron open={open} /> : null}
      </span>

      {/* tag badge */}
      <code style={{ fontSize: 10, fontWeight: 600, color: tagColor(el.tag), background: `${tagColor(el.tag)}15`, padding: '1px 5px', borderRadius: 3, flexShrink: 0 }}>
        {el.tag}
      </code>

      {/* label / rename */}
      {renaming ? (
        <input
          autoFocus
          value={nameVal}
          style={{ flex: 1, border: '1px solid #6366f1', borderRadius: 3, padding: '1px 4px', fontSize: 11 }}
          onClick={e => e.stopPropagation()}
          onChange={e => setNameVal(e.target.value)}
          onBlur={() => { patchElement(el.id, { class: nameVal || undefined }); setRenaming(false); }}
          onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') setRenaming(false); }}
        />
      ) : (
        <span style={{ flex: 1, fontSize: 11, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: isHidden ? 0.4 : 1 }}>
          {label}
        </span>
      )}

      {/* actions (only visible on hover / selection) */}
      <span className="l-layer-act" style={{ display: 'flex', gap: 2, opacity: isSel ? 1 : 0, flexShrink: 0 }}
        onClick={e => e.stopPropagation()}>
        <button title="Duplicate" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '2px' }}
          onClick={() => duplicateElement(el.id)}><IDuplicate /></button>
        <button title="Hide/Show" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', padding: '2px' }}
          onClick={() => patchElement(el.id, { _hidden: !(el as Record<string,unknown>)._hidden } as Partial<PageElement>)}><IEye /></button>
        <button title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626', padding: '2px' }}
          onClick={() => removeElement(el.id)}><ITrash /></button>
      </span>
    </div>
  );
}

// ── Recursive layer tree ──────────────────────────────────────────────────────
interface TreeProps {
  elements: PageElement[];
  depth:    number;
  openIds:  Set<string>;
  onToggle: (id: string) => void;
}

function LayerTree({ elements, depth, openIds, onToggle }: TreeProps) {
  return (
    <>
      {elements.map(el => {
        const hasKids = (el.children?.length ?? 0) > 0;
        const isOpen  = openIds.has(el.id);
        return (
          <React.Fragment key={el.id}>
            <LayerRow el={el} depth={depth} open={isOpen} onToggle={() => onToggle(el.id)} />
            {hasKids && isOpen && (
              <LayerTree elements={el.children!} depth={depth + 1} openIds={openIds} onToggle={onToggle} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ── Layers panel ──────────────────────────────────────────────────────────────
export function LayersPanel() {
  const elements = useEditorStore(s => s.elements);
  const pages    = useEditorStore(s => s.pages);
  const slug     = useEditorStore(s => s.slug);
  const siteId   = useEditorStore(s => s.siteId);
  const isDirty  = useEditorStore(s => s.isDirty);
  const save     = useEditorStore(s => s.save);
  const navigate = useNavigate();

  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const switchPage = async (newSlug: string) => {
    if (newSlug === slug) return;
    // Save current page first if dirty so no work is lost
    if (isDirty) await save().catch(() => {});
    navigate(`/sites/${siteId}/editor/${newSlug}`);
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
      {(() => {
        // Filter out invisible infrastructure elements (style, link, script, meta)
        // so they don't clutter the layers panel
        const HIDDEN_TAGS = new Set(['style','link','script','meta','noscript','template']);
        const visible = elements.filter(el => !HIDDEN_TAGS.has(el.tag));
        if (visible.length === 0) return (
          <div style={{ padding: '12px 16px', fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>
            No elements yet.<br />Use Insert or Import HTML.
          </div>
        );
        return <LayerTree elements={visible} depth={0} openIds={openIds} onToggle={toggle} />;
      })()}
    </div>
  );
}
