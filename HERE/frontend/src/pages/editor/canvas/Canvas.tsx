import { useRef, useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../../../stores/editorStore';
import { ElementNode, VOID_TAGS } from './ElementView';

const DEVICE_W = { desktop: 1200, tablet: 834, mobile: 390 } as const;
type Device = keyof typeof DEVICE_W;

type HandleDir = 'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w';

// ── Canvas ────────────────────────────────────────────────────────────────────
export function Canvas() {
  const wrapRef  = useRef<HTMLDivElement>(null);

  const elements      = useEditorStore(s => s.elements);
  const selectedId    = useEditorStore(s => s.selectedId);
  const editingId     = useEditorStore(s => s.editingId);
  const zoom          = useEditorStore(s => s.zoom);
  const pan           = useEditorStore(s => s.pan);

  const selectElement  = useEditorStore(s => s.selectElement);
  const setEditingId   = useEditorStore(s => s.setEditingId);
  const setZoom        = useEditorStore(s => s.setZoom);
  const setPan         = useEditorStore(s => s.setPan);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const captureHistory = useEditorStore(s => s.captureHistory);
  const patchElement   = useEditorStore(s => s.patchElement);

  const [device, setDevice] = useState<Device>('desktop');
  const frameW = DEVICE_W[device];

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
      // Don't intercept Space when the user is typing in an editable field
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

  // Zoom to fit on mount
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const r  = wrap.getBoundingClientRect();
    const nz = Math.max(0.2, Math.min(0.9, (r.width - 120) / frameW));
    setZoom(nz);
    setPan((r.width - frameW * nz) / 2, 60);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Lock current size so element doesn't snap
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

  // ── Handle layout ─────────────────────────────────────────────────────────
  const handles: { dir: HandleDir; cursor: string; x: number; y: number }[] = selRect ? [
    { dir: 'nw', cursor: 'nw-resize', x: selRect.left,                       y: selRect.top },
    { dir: 'n',  cursor: 'n-resize',  x: selRect.left + selRect.width / 2,   y: selRect.top },
    { dir: 'ne', cursor: 'ne-resize', x: selRect.left + selRect.width,        y: selRect.top },
    { dir: 'e',  cursor: 'e-resize',  x: selRect.left + selRect.width,        y: selRect.top + selRect.height / 2 },
    { dir: 'se', cursor: 'se-resize', x: selRect.left + selRect.width,        y: selRect.top + selRect.height },
    { dir: 's',  cursor: 's-resize',  x: selRect.left + selRect.width / 2,   y: selRect.top + selRect.height },
    { dir: 'sw', cursor: 'sw-resize', x: selRect.left,                       y: selRect.top + selRect.height },
    { dir: 'w',  cursor: 'w-resize',  x: selRect.left,                       y: selRect.top + selRect.height / 2 },
  ] : [];

  // ── Check selected element is a void tag (no text editing) ────────────────
  const searchEl = (es: typeof elements, id: string): typeof elements[0] | null => {
    for (const e of es) {
      if (e.id === id) return e;
      if (e.children) { const r = searchEl(e.children, id); if (r) return r; }
    }
    return null;
  };
  const selectedEl = selectedId ? searchEl(elements, selectedId) : null;

  const selectedIsVoid     = selectedEl ? VOID_TAGS.has(selectedEl.tag) : false;
  const selectedHasChildren = selectedEl ? (selectedEl.children?.length ?? 0) > 0 : false;

  return (
    <div
      ref={wrapRef}
      className="lumen-canvas-wrap"
      style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#ececed', cursor: spaceDown.current ? 'grab' : 'default' }}
      onPointerDown={onWrapPointerDown}
      onClick={() => { if (!editingId) selectElement(null); }}
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
          {device.charAt(0).toUpperCase() + device.slice(1)} — {frameW}px
        </div>

        {/* Device switcher on artboard header */}
        <div style={{
          position: 'absolute', top: -28, right: 0,
          display: 'flex', gap: 6,
        }}>
          {(['desktop','tablet','mobile'] as Device[]).map(d => (
            <button key={d} onClick={e => { e.stopPropagation(); setDevice(d); }}
              style={{
                fontSize: 10, padding: '1px 7px', borderRadius: 4, border: '1px solid',
                background: device === d ? '#6366f1' : '#fff',
                borderColor: device === d ? '#6366f1' : '#d1d5db',
                color: device === d ? '#fff' : '#6b7280', cursor: 'pointer',
                userSelect: 'none',
              }}>
              {d[0].toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        {/* White artboard */}
        <div
          data-artboard="1"
          style={{ width: frameW, minHeight: 600, background: '#fff', boxShadow: '0 2px 40px rgba(0,0,0,.12)', position: 'relative', overflow: 'visible' }}
          onClick={e => { e.stopPropagation(); if (!editingId) selectElement(null); }}
        >
          {elements.map(el => el.tag === 'style' || el.tag === 'link' || el.tag === 'script' || el.tag === 'meta' ? (
            // Infrastructure elements: render invisibly (inject CSS/JS) but skip interaction
            <ElementNode key={el.id} el={el} depth={0}
              selectedId={null} editingId={null}
              onSelect={() => {}} onDblClick={() => {}} onTextBlur={() => {}} />
          ) : (
            <ElementNode key={el.id} el={el} depth={0}
              selectedId={selectedId} editingId={editingId}
              onSelect={handleSelect} onDblClick={handleDblClick} onTextBlur={handleTextBlur} />
          ))}

          {/* Empty state */}
          {elements.length === 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
              <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
                <div style={{ fontSize: 13 }}>Click Insert to add elements<br />or Import HTML to get started</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selection + resize handles overlay (screen coords, outside transform) */}
      {selRect && selectedId && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
          {/* Ring */}
          <div style={{
            position: 'absolute',
            left: selRect.left, top: selRect.top,
            width: selRect.width, height: selRect.height,
            outline: '1.5px solid #6366f1',
            outlineOffset: '0px',
            pointerEvents: 'none',
          }} />

          {/* Size label */}
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

          {/* Double-click hint for text-editable elements */}
          {!selectedIsVoid && !selectedHasChildren && !editingId && (
            <div style={{
              position: 'absolute',
              left: selRect.left + selRect.width / 2,
              top: selRect.top - 20,
              transform: 'translateX(-50%)',
              fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              Double-click to edit text
            </div>
          )}

          {/* 8 resize handles */}
          {handles.map(h => (
            <div key={h.dir} style={{
              position: 'absolute',
              left: h.x - 4, top: h.y - 4,
              width: 8, height: 8,
              background: '#fff', border: '1.5px solid #6366f1',
              borderRadius: 2, cursor: h.cursor,
              pointerEvents: 'all', zIndex: 101,
            }}
              onPointerDown={e => onHandleDown(h.dir, e)}
            />
          ))}
        </div>
      )}

      {/* Status bar */}
      <div style={{
        position: 'absolute', bottom: 12, left: 16,
        fontSize: 11, color: '#9ca3af', pointerEvents: 'none',
        background: 'rgba(255,255,255,0.9)', borderRadius: 6, padding: '3px 8px',
        userSelect: 'none',
      }}>
        Space+drag to pan · Ctrl+scroll to zoom · Double-click to edit text
      </div>

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
    </div>
  );
}
