import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useEditorStore, findById, uid } from '../../../stores/editorStore';
import type { ToolMode } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';
import { ElementNode, VOID_TAGS } from './ElementView';
import { ContextMenu } from '../ContextMenu';
import { ToolSidebar } from './ToolSidebar';
import { getCollection, type SiteCollection } from '../../../api/collections';
import { getComponent, type SiteComponent } from '../../../api/components';
import { collectCollectionRefs, expandCollectionNodesForPreview } from '../utils/collectionExpansion';

const DEVICE_W = { desktop: 1200, tablet: 834, mobile: 390 } as const;
type Device = keyof typeof DEVICE_W;
type HandleDir = 'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w';

// Cursor for each draw tool
const TOOL_CURSORS: Record<ToolMode, string> = {
  select: 'default', frame: 'crosshair', rect: 'crosshair',
  ellipse: 'crosshair', line: 'crosshair', text: 'text',
};

// Build a new drawn element — flow-positioned (no position:absolute)
function makeDrawnElement(mode: ToolMode, width: number, height: number): PageElement {
  switch (mode) {
    case 'frame':
      return { id: uid(), tag: 'div', children: [],
        style: { position: 'relative', overflow: 'hidden', background: '#f9fafb', border: '1.5px solid #6366f1', width: `${width}px`, height: `${height}px` },
        _frameType: 'frame', _frameName: 'Frame' };
    case 'rect':
      return { id: uid(), tag: 'div',
        style: { width: `${width}px`, height: `${height}px`, background: '#6366f1', borderRadius: '4px' } };
    case 'ellipse':
      return { id: uid(), tag: 'div',
        style: { width: `${width}px`, height: `${height}px`, background: '#6366f1', borderRadius: '50%' } };
    case 'line':
      return { id: uid(), tag: 'div',
        style: { width: `${width}px`, height: '2px', background: '#374151' } };
    default:
      return { id: uid(), tag: 'div', style: { width: `${width}px`, height: `${height}px` } };
  }
}

// Find which child index the cursor Y falls at inside a parent container.
// Compares cursor against the midpoint of each direct child's bounding rect.
function findInsertIndex(parentId: string | null, cursorY: number): number {
  const selector = parentId
    ? `[data-el-id="${CSS.escape(parentId)}"] > [data-el-id]`
    : '[data-artboard] > [data-el-id]';
  const children = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  for (let i = 0; i < children.length; i++) {
    const mid = children[i].getBoundingClientRect().top + children[i].getBoundingClientRect().height / 2;
    if (cursorY < mid) return i;
  }
  return children.length; // below all siblings → append
}

// Find the deepest container element under a screen point.
// Only elements with a children[] array (explicitly created as containers) qualify.
function findDropParent(x: number, y: number): string | null {
  const hits = document.elementsFromPoint(x, y);
  const els  = useEditorStore.getState().elements;
  for (const h of hits) {
    if (!(h instanceof HTMLElement)) continue;
    if (h.dataset.artboard)          continue; // skip artboard root
    const elId = h.dataset.elId;
    if (!elId) continue;
    const found = findById(els, elId);
    if (!found) continue;
    if (VOID_TAGS.has(found.el.tag)) continue;
    if ((found.el as Record<string, unknown>)._collection) continue; // derived content, not a real drop target
    if (Array.isArray(found.el.children)) return elId; // has children → is a container
  }
  return null; // fall back to root
}

function getParentIdInTree(els: PageElement[], targetId: string): string | null {
  for (const el of els) {
    if (el.children?.some(c => c.id === targetId)) return el.id;
    if (el.children?.length) { const r = getParentIdInTree(el.children, targetId); if (r) return r; }
  }
  return null;
}

// ── Canvas ────────────────────────────────────────────────────────────────────
interface CanvasProps { previewMode?: boolean; }

export function Canvas({ previewMode = false }: CanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const elements      = useEditorStore(s => s.elements);
  const selectedId    = useEditorStore(s => s.selectedId);
  const editingId     = useEditorStore(s => s.editingId);
  const zoom          = useEditorStore(s => s.zoom);
  const pan           = useEditorStore(s => s.pan);
  const toolMode      = useEditorStore(s => s.toolMode);
  const mode          = useEditorStore(s => s.mode);
  const componentView = useEditorStore(s => s.componentView);

  const selectElement  = useEditorStore(s => s.selectElement);
  const setEditingId   = useEditorStore(s => s.setEditingId);
  const setZoom        = useEditorStore(s => s.setZoom);
  const setPan         = useEditorStore(s => s.setPan);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const captureHistory = useEditorStore(s => s.captureHistory);
  const patchElement   = useEditorStore(s => s.patchElement);
  const moveElement    = useEditorStore(s => s.moveElement);
  const addChild       = useEditorStore(s => s.addChild);
  const insertChild    = useEditorStore(s => s.insertChild);
  const setToolMode    = useEditorStore(s => s.setToolMode);

  const [device, setDevice]         = useState<Device>('desktop');
  const [ctxMenu, setCtxMenu]       = useState<{ x: number; y: number; targetId: string } | null>(null);
  const siteId = useEditorStore(s => s.siteId);

  // ── Collection-list preview data ──────────────────────────────────────────
  // Any element carrying a `_collection` marker gets expanded into real card
  // instances here (client-side, preview-only) so the canvas shows actual data
  // while editing. The real, published/exported output is generated fresh by
  // the backend from live data — this is never written back to `elements`.
  const [collectionsById, setCollectionsById] = useState<Map<string, SiteCollection>>(new Map());
  const [componentsById, setComponentsById]   = useState<Map<string, SiteComponent>>(new Map());

  useEffect(() => {
    const refs = collectCollectionRefs(elements);
    if (!refs.length || !siteId) return;
    const missing = refs.filter(r => !collectionsById.has(r.collectionId) || !componentsById.has(r.componentId));
    if (!missing.length) return;

    let cancelled = false;
    Promise.all(missing.map(async r => {
      const [collection, component] = await Promise.all([
        collectionsById.has(r.collectionId) ? null : getCollection(siteId, r.collectionId).catch(() => null),
        componentsById.has(r.componentId)   ? null : getComponent(siteId, r.componentId).catch(() => null),
      ]);
      return { r, collection, component };
    })).then(results => {
      if (cancelled) return;
      setCollectionsById(prev => {
        const next = new Map(prev);
        results.forEach(({ r, collection }) => { if (collection) next.set(r.collectionId, collection); });
        return next;
      });
      setComponentsById(prev => {
        const next = new Map(prev);
        results.forEach(({ r, component }) => { if (component) next.set(r.componentId, component); });
        return next;
      });
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, siteId]);

  const renderElements = useMemo(
    () => expandCollectionNodesForPreview(elements, collectionsById, componentsById, previewMode),
    [elements, collectionsById, componentsById, previewMode],
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dropLine, setDropLine]     = useState<{ left: number; top: number; width: number } | null>(null);
  const [drawGhost, setDrawGhost]   = useState<{ left: number; top: number; width: number; height: number; mode: ToolMode } | null>(null);
  // Editing a component's Modal content: the artboard itself becomes a visual
  // stand-in for the real <dialog> shell (fixed narrow width, padding, rounded
  // corners) instead of a full page canvas, so what's designed here matches
  // what actually renders once wrapped by the system-managed shell at runtime.
  const isModalView = mode === 'component' && componentView === 'modal';
  const frameW = isModalView ? 460 : DEVICE_W[device];

  // ── Selection overlay rect (screen coords relative to wrap) ───────────────
  const [selRect, setSelRect] = useState<{ left:number; top:number; width:number; height:number } | null>(null);

  const updateSelRect = useCallback(() => {
    if (!selectedId || !wrapRef.current) { setSelRect(null); return; }
    const el   = wrapRef.current.querySelector(`[data-el-id="${selectedId}"]`);
    const wrap = wrapRef.current;
    if (!el || !wrap) { setSelRect(null); return; }
    const wr = wrap.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setSelRect({ left: er.left - wr.left, top: er.top - wr.top, width: er.width, height: er.height });
  }, [selectedId]);

  useEffect(() => { updateSelRect(); }, [selectedId, zoom, pan, elements, updateSelRect]);

  // ── Zoom / pan ────────────────────────────────────────────────────────────
  const spaceDown = useRef(false);

  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return;
      const t = e.target as HTMLElement;
      if (t?.isContentEditable || ['INPUT','TEXTAREA','SELECT'].includes(t?.tagName ?? '')) return;
      e.preventDefault();
      spaceDown.current = true;
    };
    const up = (e: KeyboardEvent) => { if (e.code === 'Space') spaceDown.current = false; };
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const st = useEditorStore.getState();
    if (e.ctrlKey || e.metaKey) {
      const wrap = wrapRef.current; if (!wrap) return;
      const r  = wrap.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      const nz = Math.min(4, Math.max(0.1, st.zoom * factor));
      st.setZoom(nz);
      st.setPan(mx - (mx - st.pan.x) * (nz / st.zoom), my - (my - st.pan.y) * (nz / st.zoom));
    } else {
      st.setPan(st.pan.x - e.deltaX, st.pan.y - e.deltaY);
    }
  }, []);

  useEffect(() => {
    const w = wrapRef.current; if (!w) return;
    w.addEventListener('wheel', handleWheel, { passive: false });
    return () => w.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Space+drag pan
  const onWrapPointerDown = useCallback((e: React.PointerEvent) => {
    if (!spaceDown.current || e.button !== 0) return;
    e.preventDefault();
    const ox = e.clientX - useEditorStore.getState().pan.x;
    const oy = e.clientY - useEditorStore.getState().pan.y;
    const mv = (ev: PointerEvent) => useEditorStore.getState().setPan(ev.clientX - ox, ev.clientY - oy);
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);
  }, []);

  // Zoom to fit on mount, and again whenever switching between the Card and
  // Modal views — the artboard's width changes drastically (full page width
  // vs a ~460px dialog box) so the previous zoom/pan would leave the new
  // artboard tiny or off-screen otherwise.
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const r  = wrap.getBoundingClientRect();
    const nz = Math.max(0.2, Math.min(0.9, (r.width - 120) / frameW));
    setZoom(nz);
    setPan((r.width - frameW * nz) / 2, 60);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalView]);

  // ── Text editing ──────────────────────────────────────────────────────────
  const handleTextBlur = useCallback((id: string, content: string, field: 'text' | 'innerHTML') => {
    patchElement(id, { [field]: content });
    setEditingId(null);
  }, [patchElement, setEditingId]);

  const handleDblClick = useCallback((id: string, hasChildren: boolean) => {
    if (!hasChildren) setEditingId(id);
  }, [setEditingId]);

  const handleSelect = useCallback((id: string, _e: React.MouseEvent) => {
    if (editingId) return;
    selectElement(id);
  }, [selectElement, editingId]);

  // ── Resize handles ────────────────────────────────────────────────────────
  const resizeState = useRef<{
    dir: HandleDir; startX: number; startY: number;
    startW: number; startH: number;
  } | null>(null);

  const onHandleDown = useCallback((dir: HandleDir, e: React.PointerEvent) => {
    if (!selectedId || !selRect) return;
    e.preventDefault(); e.stopPropagation();
    captureHistory();

    const z = useEditorStore.getState().zoom;
    resizeState.current = {
      dir,
      startX: e.clientX, startY: e.clientY,
      startW: Math.round(selRect.width / z),
      startH: Math.round(selRect.height / z),
    };

    const id = selectedId;
    patchStyleLive(id, 'width',  resizeState.current.startW + 'px');
    patchStyleLive(id, 'height', resizeState.current.startH + 'px');

    const onMove = (ev: PointerEvent) => {
      const rs = resizeState.current; if (!rs) return;
      const cz = useEditorStore.getState().zoom;
      const dx = (ev.clientX - rs.startX) / cz;
      const dy = (ev.clientY - rs.startY) / cz;
      if (rs.dir.includes('e')) patchStyleLive(id, 'width',  Math.max(20, Math.round(rs.startW + dx)) + 'px');
      if (rs.dir.includes('s')) patchStyleLive(id, 'height', Math.max(10, Math.round(rs.startH + dy)) + 'px');
      if (rs.dir.includes('w')) patchStyleLive(id, 'width',  Math.max(20, Math.round(rs.startW - dx)) + 'px');
      if (rs.dir.includes('n')) patchStyleLive(id, 'height', Math.max(10, Math.round(rs.startH - dy)) + 'px');
      updateSelRect();
    };
    const onUp = () => {
      resizeState.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [selectedId, selRect, captureHistory, patchStyleLive, updateSelRect]);

  // ── Drag-to-reorder ───────────────────────────────────────────────────────
  const dragState = useRef<{
    id: string; startX: number; startY: number;
    active: boolean; domNode: HTMLElement | null;
  } | null>(null);
  const dropTarget = useRef<{ parentId: string | null; index: number } | null>(null);

  // ── Draw-to-create ────────────────────────────────────────────────────────
  const drawState = useRef<{
    startScreenX: number; startScreenY: number;
    startLocalX: number; startLocalY: number;
    active: boolean;
    parentId:    string | null;
    insertIndex: number;
  } | null>(null);

  const onArtboardPointerDown = useCallback((e: React.PointerEvent) => {
    if (spaceDown.current || e.button !== 0 || previewMode) return;
    const currentTool = useEditorStore.getState().toolMode;

    // ── Draw mode ─────────────────────────────────────────────────────────
    if (currentTool !== 'select') {
      e.preventDefault(); e.stopPropagation();
      const wr = wrapRef.current!.getBoundingClientRect();
      const st = useEditorStore.getState();
      const localX = (e.clientX - wr.left - st.pan.x) / st.zoom;
      const localY = (e.clientY - wr.top  - st.pan.y) / st.zoom;

      // Detect parent container and insert position at draw-start time
      const dropParentId  = findDropParent(e.clientX, e.clientY);
      const dropIndex     = findInsertIndex(dropParentId, e.clientY);

      // Text: single click — no drag needed
      if (currentTool === 'text') {
        const el: PageElement = {
          id: uid(), tag: 'p', text: 'Text',
          style: { margin: '0', fontSize: '16px', color: '#374151' },
        };
        insertChild(dropParentId, el, dropIndex);
        setToolMode('select');
        return;
      }

      drawState.current = {
        startScreenX: e.clientX, startScreenY: e.clientY,
        startLocalX: localX, startLocalY: localY,
        active: false, parentId: dropParentId, insertIndex: dropIndex,
      };

      const onMove = (ev: PointerEvent) => {
        const ds = drawState.current; if (!ds) return;
        const wr2 = wrapRef.current?.getBoundingClientRect(); if (!wr2) return;
        const gW = Math.abs(ev.clientX - ds.startScreenX);
        const gH = Math.abs(ev.clientY - ds.startScreenY);
        if (gW < 3 && gH < 3) return;
        ds.active = true;
        setDrawGhost({
          left:   Math.min(ds.startScreenX, ev.clientX) - wr2.left,
          top:    Math.min(ds.startScreenY, ev.clientY) - wr2.top,
          width:  gW,
          height: currentTool === 'line' ? 2 : gH,
          mode:   currentTool,
        });
      };

      const onUp = (ev: PointerEvent) => {
        const ds = drawState.current;
        if (ds?.active) {
          const wr2 = wrapRef.current?.getBoundingClientRect();
          if (wr2) {
            const st2    = useEditorStore.getState();
            const endLX  = (ev.clientX - wr2.left - st2.pan.x) / st2.zoom;
            const endLY  = (ev.clientY - wr2.top  - st2.pan.y) / st2.zoom;
            const width  = Math.max(20, Math.round(Math.abs(endLX - ds.startLocalX)));
            const height = currentTool === 'line'
              ? 2
              : Math.max(20, Math.round(Math.abs(endLY - ds.startLocalY)));
            const el = makeDrawnElement(currentTool, width, height);
            insertChild(ds.parentId, el, ds.insertIndex);
            setToolMode('select');
          }
        }
        drawState.current = null;
        setDrawGhost(null);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      return;
    }

    // ── Select mode — drag ────────────────────────────────────────────────
    if (editingId) return;
    const elNode = (e.target as HTMLElement).closest('[data-el-id]') as HTMLElement | null;
    if (!elNode) return;
    const id = elNode.dataset.elId!;
    if (id !== selectedId) return;

    // Decide strategy: position-drag for absolute/fixed, tree-reorder for flow
    const { elements: curEls } = useEditorStore.getState();
    const foundEl   = findById(curEls, id);
    const elStyle   = (foundEl?.el.style ?? {}) as Record<string, string>;
    const isAbsEl   = ['absolute', 'fixed'].includes(elStyle.position ?? '');

    dragState.current = { id, startX: e.clientX, startY: e.clientY, active: false, domNode: elNode };

    if (isAbsEl) {
      // ── Position drag: move left/top in real time ─────────────────────
      const startLeft = parseFloat(elStyle.left ?? '0') || 0;
      const startTop  = parseFloat(elStyle.top  ?? '0') || 0;

      const onMove = (ev: PointerEvent) => {
        const ds = dragState.current; if (!ds) return;
        if (!ds.active && Math.hypot(ev.clientX - ds.startX, ev.clientY - ds.startY) < 3) return;
        if (!ds.active) {
          ds.active = true;
          setIsDragging(true);
          captureHistory();            // one snapshot before we start patching
        }
        const cz = useEditorStore.getState().zoom;
        const dx = (ev.clientX - ds.startX) / cz;
        const dy = (ev.clientY - ds.startY) / cz;
        patchStyleLive(id, 'left', `${Math.round(startLeft + dx)}px`);
        patchStyleLive(id, 'top',  `${Math.round(startTop  + dy)}px`);
      };

      const onUp = () => {
        dragState.current = null;
        setIsDragging(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup',   onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup',   onUp);

    } else {
      // ── Tree reorder: drop line + moveElement ─────────────────────────
      const onMove = (ev: PointerEvent) => {
        const ds = dragState.current; if (!ds) return;
        if (!ds.active && Math.hypot(ev.clientX - ds.startX, ev.clientY - ds.startY) < 5) return;
        if (!ds.active) {
          ds.active = true;
          setIsDragging(true);
          if (ds.domNode) { ds.domNode.style.opacity = '0.4'; ds.domNode.style.pointerEvents = 'none'; }
        }
        const hits = document.elementsFromPoint(ev.clientX, ev.clientY);
        let targetEl: HTMLElement | null = null;
        for (const h of hits) {
          if (h instanceof HTMLElement && h.dataset.elId && h.dataset.elId !== ds.id) {
            targetEl = h; break;
          }
        }
        if (!targetEl || !wrapRef.current) { dropTarget.current = null; setDropLine(null); return; }
        const targetId = targetEl.dataset.elId!;
        const tr = targetEl.getBoundingClientRect();
        const wr = wrapRef.current.getBoundingClientRect();
        const inTopHalf = ev.clientY < tr.top + tr.height / 2;
        const { elements: els } = useEditorStore.getState();
        const found2 = findById(els, targetId);
        if (!found2) { setDropLine(null); return; }
        const parentId = getParentIdInTree(els, targetId);
        dropTarget.current = { parentId, index: inTopHalf ? found2.idx : found2.idx + 1 };
        setDropLine({ left: tr.left - wr.left, top: (inTopHalf ? tr.top : tr.bottom) - wr.top, width: tr.width });
      };

      const onUp = () => {
        const ds = dragState.current;
        if (ds?.active) {
          if (ds.domNode) { ds.domNode.style.opacity = ''; ds.domNode.style.pointerEvents = ''; }
          const dt = dropTarget.current;
          if (dt) { captureHistory(); moveElement(ds.id, dt.parentId, dt.index); }
        }
        dragState.current  = null;
        dropTarget.current = null;
        setIsDragging(false);
        setDropLine(null);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup',   onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup',   onUp);
    }
  }, [selectedId, editingId, previewMode, captureHistory, moveElement, addChild, insertChild, setToolMode]);

  // ── Handle layout ─────────────────────────────────────────────────────────
  const handles: { dir: HandleDir; cursor: string; x: number; y: number }[] = selRect ? [
    { dir: 'nw', cursor: 'nw-resize', x: selRect.left,                     y: selRect.top },
    { dir: 'n',  cursor: 'n-resize',  x: selRect.left + selRect.width / 2, y: selRect.top },
    { dir: 'ne', cursor: 'ne-resize', x: selRect.left + selRect.width,      y: selRect.top },
    { dir: 'e',  cursor: 'e-resize',  x: selRect.left + selRect.width,      y: selRect.top + selRect.height / 2 },
    { dir: 'se', cursor: 'se-resize', x: selRect.left + selRect.width,      y: selRect.top + selRect.height },
    { dir: 's',  cursor: 's-resize',  x: selRect.left + selRect.width / 2, y: selRect.top + selRect.height },
    { dir: 'sw', cursor: 'sw-resize', x: selRect.left,                     y: selRect.top + selRect.height },
    { dir: 'w',  cursor: 'w-resize',  x: selRect.left,                     y: selRect.top + selRect.height / 2 },
  ] : [];

  // ── Check selected element ────────────────────────────────────────────────
  const searchEl = (es: typeof elements, id: string): typeof elements[0] | null => {
    for (const e of es) {
      if (e.id === id) return e;
      if (e.children) { const r = searchEl(e.children, id); if (r) return r; }
    }
    return null;
  };
  const selectedEl          = selectedId ? searchEl(elements, selectedId) : null;
  const selectedIsVoid      = selectedEl ? VOID_TAGS.has(selectedEl.tag) : false;
  const selectedHasChildren = selectedEl ? (selectedEl.children?.length ?? 0) > 0 : false;

  const isDrawMode = toolMode !== 'select' && !previewMode;

  // Ghost border colour by tool
  const ghostColor = drawGhost?.mode === 'frame' ? '#6366f1'
    : drawGhost?.mode === 'line' ? '#374151' : '#6366f1';

  return (
    <div
      ref={wrapRef}
      className="lumen-canvas-wrap"
      style={{
        flex: 1, overflow: 'hidden', position: 'relative', background: '#ececed',
        cursor: isDragging ? 'grabbing'
          : isDrawMode ? TOOL_CURSORS[toolMode]
          : spaceDown.current ? 'grab' : 'default',
      }}
      onPointerDown={onWrapPointerDown}
      onClick={() => { if (!editingId && !isDrawMode) selectElement(null); }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #c4c4c8 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }} />

      {/* Scene — transformed */}
      <div style={{
        position: 'absolute', transformOrigin: '0 0',
        transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
      }}>
        {/* Artboard label */}
        <div style={{
          position: 'absolute', top: -28, left: 0,
          fontSize: 11, color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap', userSelect: 'none',
        }}>
          {isModalView ? `Modal preview — ${frameW}px` : `${device.charAt(0).toUpperCase() + device.slice(1)} — ${frameW}px`}
        </div>

        {/* Device switcher — not meaningful for a single reusable card */}
        {mode === 'page' && (
        <div style={{ position: 'absolute', top: -28, right: 0, display: 'flex', gap: 6 }}>
          {(['desktop','tablet','mobile'] as Device[]).map(d => (
            <button key={d} onClick={e => { e.stopPropagation(); setDevice(d); }}
              style={{
                fontSize: 10, padding: '1px 7px', borderRadius: 4, border: '1px solid',
                background: device === d ? '#6366f1' : '#fff',
                borderColor: device === d ? '#6366f1' : '#d1d5db',
                color: device === d ? '#fff' : '#6b7280', cursor: 'pointer', userSelect: 'none',
              }}>
              {d[0].toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        )}

        {/* White artboard */}
        <div
          data-artboard="1"
          style={isModalView ? {
            width: frameW, minHeight: 'auto', background: '#fff',
            padding: '32px', borderRadius: '16px', boxSizing: 'border-box',
            boxShadow: '0 20px 60px rgba(0,0,0,.3)', position: 'relative', overflow: 'visible',
          } : {
            width: frameW, minHeight: 600, background: '#fff',
            boxShadow: '0 2px 40px rgba(0,0,0,.12)', position: 'relative', overflow: 'visible',
          }}
          onClick={e => { e.stopPropagation(); if (!editingId && !isDrawMode) selectElement(null); }}
          onPointerDown={onArtboardPointerDown}
          onContextMenu={previewMode ? undefined : (e => {
            const el = (e.target as HTMLElement).closest('[data-el-id]') as HTMLElement | null;
            if (!el) return;
            e.preventDefault(); e.stopPropagation();
            const targetId = el.dataset.elId!;
            selectElement(targetId);
            setCtxMenu({ x: e.clientX, y: e.clientY, targetId });
          })}
        >
          {renderElements.map(el =>
            el.tag === 'style' || el.tag === 'link' || el.tag === 'script' || el.tag === 'meta' ? (
              <ElementNode key={el.id} el={el} depth={0}
                selectedId={null} editingId={null}
                onSelect={() => {}} onDblClick={() => {}} onTextBlur={() => {}} />
            ) : (
              <ElementNode key={el.id} el={el} depth={0}
                selectedId={previewMode ? null : selectedId}
                editingId={previewMode ? null : editingId}
                onSelect={previewMode ? () => {} : handleSelect}
                onDblClick={previewMode ? () => {} : handleDblClick}
                onTextBlur={previewMode ? () => {} : handleTextBlur}
                interactive={previewMode} />
            )
          )}

          {elements.length === 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
                <div style={{ fontSize: 13 }}>Click Insert to add elements<br />or use a shape tool to draw</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Overlays (all in screen coords, outside transform) ────────────── */}

      {/* Selection ring + handles */}
      {!previewMode && selRect && selectedId && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
          <div style={{
            position: 'absolute',
            left: selRect.left, top: selRect.top,
            width: selRect.width, height: selRect.height,
            outline: isDragging ? '2px dashed #6366f1' : '1.5px solid #6366f1',
            outlineOffset: '0px', pointerEvents: 'none',
          }} />
          {!isDragging && (
            <div style={{
              position: 'absolute',
              left: selRect.left + selRect.width / 2,
              top: selRect.top + selRect.height + 6,
              transform: 'translateX(-50%)',
              background: '#6366f1', color: '#fff',
              fontSize: 10, fontWeight: 600,
              padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              {Math.round(selRect.width / zoom)} × {Math.round(selRect.height / zoom)}
            </div>
          )}
          {!selectedIsVoid && !selectedHasChildren && !editingId && !isDragging && (
            <div style={{
              position: 'absolute',
              left: selRect.left + selRect.width / 2, top: selRect.top - 20,
              transform: 'translateX(-50%)',
              fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap', pointerEvents: 'none',
            }}>
              Double-click to edit text
            </div>
          )}
          {!isDragging && handles.map(h => (
            <div key={h.dir} style={{
              position: 'absolute', left: h.x - 4, top: h.y - 4,
              width: 8, height: 8, background: '#fff',
              border: '1.5px solid #6366f1', borderRadius: 2,
              cursor: h.cursor, pointerEvents: 'all', zIndex: 101,
            }}
              onPointerDown={e => onHandleDown(h.dir, e)}
            />
          ))}
        </div>
      )}

      {/* Drop line (reorder) */}
      {!previewMode && dropLine && (
        <div style={{
          position: 'absolute', left: dropLine.left, top: dropLine.top - 1,
          width: dropLine.width, height: 2,
          background: '#6366f1', boxShadow: '0 0 6px rgba(99,102,241,.5)',
          borderRadius: 1, zIndex: 200, pointerEvents: 'none',
        }} />
      )}

      {/* Draw ghost (while dragging to create a shape) */}
      {!previewMode && drawGhost && (
        <div style={{
          position: 'absolute',
          left: drawGhost.left, top: drawGhost.top,
          width: drawGhost.width, height: Math.max(2, drawGhost.height),
          border: `1.5px dashed ${ghostColor}`,
          background: drawGhost.mode === 'rect' || drawGhost.mode === 'ellipse'
            ? 'rgba(99,102,241,.08)' : 'transparent',
          borderRadius: drawGhost.mode === 'ellipse' ? '50%'
            : drawGhost.mode === 'frame' ? '2px' : '0',
          pointerEvents: 'none', zIndex: 200,
        }}>
          {/* Dimension label */}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            marginTop: 4, background: '#6366f1', color: '#fff',
            fontSize: 10, fontWeight: 600, padding: '2px 6px',
            borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            {Math.round(drawGhost.width / zoom)} × {Math.round(drawGhost.height / zoom)}
          </div>
        </div>
      )}

      {/* Status bar */}
      <div style={{
        position: 'absolute', bottom: 12, left: 56, // shifted right to clear tool sidebar
        fontSize: 11, color: '#9ca3af', pointerEvents: 'none',
        background: 'rgba(255,255,255,0.9)', borderRadius: 6, padding: '3px 8px',
        userSelect: 'none',
      }}>
        {previewMode
          ? 'Preview mode — click Exit Preview in the toolbar to resume editing'
          : isDrawMode
          ? `${toolMode.charAt(0).toUpperCase() + toolMode.slice(1)} tool — click and drag on the canvas to create`
          : isDragging
          ? 'Drag to reorder — release to drop'
          : 'V=Select · F=Frame · R=Rect · E=Ellipse · L=Line · T=Text'}
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x} y={ctxMenu.y} targetId={ctxMenu.targetId}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* Zoom pill */}
      <div style={{
        position: 'absolute', bottom: 12, right: 16,
        display: 'flex', alignItems: 'center', gap: 4,
        background: '#fff', border: '1px solid #e9e9ee', borderRadius: 8,
        padding: '3px 6px', fontSize: 11, color: '#374151',
        boxShadow: '0 1px 4px rgba(0,0,0,.06)', userSelect: 'none',
      }}>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 3px', fontSize: 14 }}
          onClick={e => { e.stopPropagation(); setZoom(Math.max(0.1, zoom - 0.1)); }}>−</button>
        <span style={{ minWidth: 38, textAlign: 'center', fontWeight: 600, cursor: 'pointer' }}
          onClick={e => { e.stopPropagation(); useEditorStore.getState().zoomToFit(frameW, 800); }}>
          {Math.round(zoom * 100)}%
        </span>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 3px', fontSize: 14 }}
          onClick={e => { e.stopPropagation(); setZoom(Math.min(4, zoom + 0.1)); }}>+</button>
      </div>

      {/* Floating tool sidebar — shape-drawing tools aren't needed to design a single reusable card */}
      {!previewMode && mode === 'page' && <ToolSidebar />}
    </div>
  );
}
