const { useState, useRef, useEffect, useCallback } = React;

const DEVICES = {
  desktop: { w: 1200, label: "Desktop" },
  tablet: { w: 834, label: "Tablet" },
  mobile: { w: 390, label: "Mobile" },
};
const BASE_W = 1200;

function clone(x) { return JSON.parse(JSON.stringify(x)); }

function App() {
  const [pages, setPages] = useState([
    { id: "p1", name: "Home" }, { id: "p2", name: "Pricing" }, { id: "p3", name: "About" },
  ]);
  const [currentPage, setCurrentPage] = useState("p1");
  const initial = useRef({ p1: heroPage(), p2: pricingTemplate(), p3: [] }).current;
  const [ebp, setEbp] = useState(initial);

  const [selectedIds, setSelectedIds] = useState([]);
  const [tool, setTool] = useState("select");
  const [device, setDevice] = useState("desktop");
  const [zoom, setZoom] = useState(0.62);
  const [pan, setPan] = useState({ x: 120, y: 70 });
  const [editingId, setEditingId] = useState(null);
  const [pendingType, setPendingType] = useState(null);
  const [leftTab, setLeftTab] = useState("layers");
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [space, setSpace] = useState(false);

  const els = ebp[currentPage] || [];
  const setEls = (arr) => setEbp((m) => ({ ...m, [currentPage]: arr }));

  // ---------- history ----------
  const past = useRef([]); const future = useRef([]); const committed = useRef(clone(initial));
  const ebpRef = useRef(initial);
  const [, force] = useState(0);
  useEffect(() => { ebpRef.current = ebp; }, [ebp]);

  const updateElements = useCallback((newEls, commitFlag) => {
    const next = { ...ebpRef.current, [currentPage]: newEls };
    ebpRef.current = next;
    setEbp(next);
    if (commitFlag) {
      past.current.push(committed.current);
      if (past.current.length > 80) past.current.shift();
      committed.current = clone(next);
      future.current = [];
      force((n) => n + 1);
    }
  }, [currentPage]);

  const commit = useCallback(() => {
    past.current.push(committed.current);
    if (past.current.length > 80) past.current.shift();
    committed.current = clone(ebpRef.current);
    future.current = [];
    force((n) => n + 1);
  }, []);

  const undo = useCallback(() => {
    if (!past.current.length) return;
    future.current.push(clone(committed.current));
    const prev = past.current.pop();
    committed.current = prev; ebpRef.current = prev; setEbp(clone(prev));
    setSelectedIds([]); setEditingId(null); force((n) => n + 1);
  }, []);
  const redo = useCallback(() => {
    if (!future.current.length) return;
    past.current.push(clone(committed.current));
    const nx = future.current.pop();
    committed.current = nx; ebpRef.current = nx; setEbp(clone(nx));
    force((n) => n + 1);
  }, []);

  // ---------- selection-derived ----------
  const selected = els.filter((e) => selectedIds.includes(e.id));
  const editable = device === "desktop";

  // ---------- element ops ----------
  const patch = (props) => updateElements(els.map((e) => selectedIds.includes(e.id) ? { ...e, ...props } : e), true);

  const order = (mode) => {
    if (selectedIds.length !== 1) return;
    const id = selectedIds[0];
    const idx = els.findIndex((e) => e.id === id);
    const arr = [...els];
    const [it] = arr.splice(idx, 1);
    if (mode === "front") arr.push(it);
    else if (mode === "back") arr.unshift(it);
    else if (mode === "forward") arr.splice(Math.min(arr.length, idx + 1), 0, it);
    else arr.splice(Math.max(0, idx - 1), 0, it);
    updateElements(arr, true);
  };

  const removeSelected = () => {
    if (!selectedIds.length) return;
    updateElements(els.filter((e) => !selectedIds.includes(e.id)), true);
    setSelectedIds([]);
  };
  const removeElement = (id) => { updateElements(els.filter((e) => e.id !== id), true); setSelectedIds((s) => s.filter((i) => i !== id)); };
  const toggleHidden = (id) => updateElements(els.map((e) => e.id === id ? { ...e, hidden: !e.hidden } : e), true);
  const toggleLock = (id) => updateElements(els.map((e) => e.id === id ? { ...e, locked: !e.locked } : e), true);
  const renameElement = (id, name) => updateElements(els.map((e) => e.id === id ? { ...e, name } : e), true);

  const duplicate = () => {
    if (!selectedIds.length) return;
    const copies = selected.map((e) => ({ ...clone(e), id: uid(), x: e.x + 20, y: e.y + 20, name: e.name + " copy" }));
    updateElements([...els, ...copies], true);
    setSelectedIds(copies.map((c) => c.id));
  };

  const align = (mode) => {
    if (selected.length < 2) return;
    const x1 = Math.min(...selected.map((e) => e.x)), x2 = Math.max(...selected.map((e) => e.x + e.w));
    const y1 = Math.min(...selected.map((e) => e.y)), y2 = Math.max(...selected.map((e) => e.y + e.h));
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    updateElements(els.map((e) => {
      if (!selectedIds.includes(e.id)) return e;
      const n = { ...e };
      if (mode === "left") n.x = x1;
      else if (mode === "right") n.x = x2 - e.w;
      else if (mode === "cx") n.x = Math.round(cx - e.w / 2);
      else if (mode === "top") n.y = y1;
      else if (mode === "bottom") n.y = y2 - e.h;
      else if (mode === "cy") n.y = Math.round(cy - e.h / 2);
      return n;
    }), true);
  };

  const distribute = (axis) => {
    if (selected.length < 3) return;
    const key = axis === "h" ? "x" : "y", size = axis === "h" ? "w" : "h";
    const sorted = [...selected].sort((a, b) => a[key] - b[key]);
    const first = sorted[0], last = sorted[sorted.length - 1];
    const total = (last[key] + last[size]) - first[key];
    const sumSizes = sorted.reduce((s, e) => s + e[size], 0);
    const gap = (total - sumSizes) / (sorted.length - 1);
    let cursor = first[key];
    const pos = {};
    sorted.forEach((e) => { pos[e.id] = Math.round(cursor); cursor += e[size] + gap; });
    updateElements(els.map((e) => pos[e.id] != null ? { ...e, [key]: pos[e.id] } : e), true);
  };

  const startPlace = (type) => { setPendingType(type); setTool("select"); setLeftTab("insert"); };

  const addPage = () => {
    const id = "p" + (pages.length + 1) + "-" + Math.random().toString(36).slice(2, 5);
    setPages([...pages, { id, name: "Page " + (pages.length + 1) }]);
    setEbp((m) => ({ ...m, [id]: [] }));
    committed.current = clone({ ...ebpRef.current, [id]: [] });
    setCurrentPage(id); setSelectedIds([]);
  };

  const pickTemplate = (t) => {
    const newEls = t.make();
    updateElements(newEls, true);
    setSelectedIds([]); setTemplatesOpen(false);
    setTimeout(zoomToFit, 30);
  };

  // ---------- view ----------
  const baseH = Math.max(600, ...els.map((e) => e.y + e.h)) + 40;
  const ratio = DEVICES[device].w / BASE_W;
  const frameW = DEVICES[device].w;
  const frameH = Math.round(baseH * ratio);

  const wrapSizeRef = useRef(null);
  const zoomToFit = useCallback(() => {
    const el = document.querySelector(".canvas-wrap");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const z = Math.min((r.width - 96) / frameW, (r.height - 120) / frameH, 1.2);
    const nz = Math.max(0.12, z);
    setZoom(nz);
    setPan({ x: (r.width - frameW * nz) / 2, y: Math.max(60, (r.height - frameH * nz) / 2) });
  }, [frameW, frameH]);

  useEffect(() => { const t = setTimeout(zoomToFit, 80); return () => clearTimeout(t); }, [device]);
  const userZoomed = useRef(false);
  useEffect(() => {
    const wrap = document.querySelector(".canvas-wrap");
    const t1 = setTimeout(zoomToFit, 120);
    const onResize = () => zoomToFit();
    window.addEventListener("resize", onResize);
    let ro;
    if (wrap && window.ResizeObserver) {
      ro = new ResizeObserver(() => { if (!userZoomed.current) zoomToFit(); });
      ro.observe(wrap);
      setTimeout(() => ro && ro.disconnect(), 1400);
    }
    return () => { clearTimeout(t1); window.removeEventListener("resize", onResize); ro && ro.disconnect(); };
  }, []);

  // ---------- keyboard ----------
  useEffect(() => {
    const isField = (t) => t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.isContentEditable);
    const down = (e) => {
      if (e.code === "Space" && !isField(e.target)) { setSpace(true); e.preventDefault(); return; }
      if (isField(e.target)) return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
      if (meta && e.key.toLowerCase() === "d") { e.preventDefault(); duplicate(); return; }
      if (meta && e.key.toLowerCase() === "a") { e.preventDefault(); setSelectedIds(els.filter((x) => !x.hidden && !x.locked).map((x) => x.id)); return; }
      if ((e.key === "Delete" || e.key === "Backspace")) { e.preventDefault(); removeSelected(); return; }
      if (e.key === "Escape") { setPendingType(null); setEditingId(null); setSelectedIds([]); return; }
      if (e.key.toLowerCase() === "v") setTool("select");
      if (e.key.toLowerCase() === "h") setTool("hand");
      if (e.key.toLowerCase() === "t") startPlace("text");
      if (e.key.toLowerCase() === "r") startPlace("container");
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && selectedIds.length) {
        e.preventDefault();
        const d = e.shiftKey ? 10 : 1;
        const dx = e.key === "ArrowLeft" ? -d : e.key === "ArrowRight" ? d : 0;
        const dy = e.key === "ArrowUp" ? -d : e.key === "ArrowDown" ? d : 0;
        updateElements(els.map((x) => selectedIds.includes(x.id) ? { ...x, x: x.x + dx, y: x.y + dy } : x), true);
      }
    };
    const up = (e) => { if (e.code === "Space") setSpace(false); };
    window.addEventListener("keydown", down); window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [els, selectedIds, undo, redo, updateElements]);

  const effectiveTool = space ? "hand" : tool;

  return (
    <div className="app">
      <Toolbar
        tool={tool} setTool={setTool} zoom={zoom}
        setZoom={(z) => { userZoomed.current = true; setZoom(z); }} zoomToFit={zoomToFit}
        device={device} setDevice={setDevice}
        undo={undo} redo={redo} canUndo={past.current.length > 0} canRedo={future.current.length > 0}
        openTemplates={() => setTemplatesOpen(true)}
      />
      <div className="workspace">
        <LeftPanel
          tab={leftTab} setTab={setLeftTab}
          elements={els} selectedIds={selectedIds} setSelectedIds={setSelectedIds}
          pages={pages} currentPage={currentPage} setCurrentPage={(p) => { setCurrentPage(p); setSelectedIds([]); setTimeout(zoomToFit, 30); }}
          addPage={addPage} toggleHidden={toggleHidden} toggleLock={toggleLock}
          removeElement={removeElement} renameElement={renameElement}
          startPlace={startPlace} pendingType={pendingType}
        />

        <div style={{ flex: 1, position: "relative", minWidth: 0, display: "flex" }}>
          {editable ? (
            <Canvas
              elements={els} selectedIds={selectedIds} setSelectedIds={setSelectedIds}
              zoom={zoom} setZoom={setZoom} pan={pan} setPan={setPan}
              tool={effectiveTool} frameW={frameW} frameH={frameH} deviceName={DEVICES[device].label}
              updateElements={updateElements} commit={commit}
              editingId={editingId} setEditingId={setEditingId}
              pendingType={pendingType} setPendingType={setPendingType}
            />
          ) : (
            <PreviewCanvas elements={els} frameW={frameW} baseW={BASE_W} ratio={ratio} baseH={baseH} zoom={zoom} pan={pan} setPan={setPan} setZoom={setZoom} deviceName={DEVICES[device].label} />
          )}

          {editable && selectedIds.length > 1 && <AlignBar count={selectedIds.length} align={align} distribute={distribute} />}
        </div>

        <Inspector selected={editable ? selected : []} patch={patch} order={order} frameW={frameW} />
      </div>

      {templatesOpen && <TemplatesModal onClose={() => setTemplatesOpen(false)} onPick={pickTemplate} />}
    </div>
  );
}

/* device preview (view-only, scaled) */
function PreviewCanvas({ elements, frameW, baseW, ratio, baseH, zoom, pan, setPan, setZoom, deviceName }) {
  const wrapRef = useRef(null);
  const onWheel = (e) => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(Math.min(4, Math.max(0.1, zoom * Math.exp(-e.deltaY * 0.0015)))); }
    else setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY });
  };
  useEffect(() => { const el = wrapRef.current; if (!el) return; el.addEventListener("wheel", onWheel, { passive: false }); return () => el.removeEventListener("wheel", onWheel); });
  const onDown = (e) => {
    const sp = { x: e.clientX, y: e.clientY }, op = { ...pan };
    const mv = (ev) => setPan({ x: op.x + (ev.clientX - sp.x), y: op.y + (ev.clientY - sp.y) });
    const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };
  const frameH = Math.round(baseH * ratio);
  return (
    <div ref={wrapRef} className="canvas-wrap tool-hand" onPointerDown={onDown}>
      <div className="scene" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
        <div className="frame-label" style={{ width: frameW, transform: `scale(${1 / zoom})`, transformOrigin: "0 100%" }}>
          {deviceName} <span className="dim">{frameW} × {frameH} · preview</span>
        </div>
        <div className="frame" style={{ left: 0, top: 0, width: frameW, height: frameH, overflow: "hidden", borderRadius: frameW < 500 ? 22 : 6 }}>
          <div style={{ width: baseW, height: baseH, transform: `scale(${ratio})`, transformOrigin: "top left", position: "relative" }}>
            {elements.filter((e) => !e.hidden).map((e) => (
              <div key={e.id} style={{ position: "absolute", left: e.x, top: e.y, width: e.w, height: e.h, overflow: "hidden" }}>
                <ElementView el={e} editing={false} onText={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="statusbar"><span>Preview mode · switch to Desktop to edit</span></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
