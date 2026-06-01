/* ============ Element renderer ============ */
function ElementView({ el, editing, onText }) {
  const s = el;
  const common = { width: "100%", height: "100%" };

  if (s.type === "section") {
    return <div style={{ ...common, background: s.bg }} />;
  }
  if (s.type === "navbar") {
    return (
      <div style={{ ...common, background: s.bg, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid #f0f0f4" }}>
        <div style={{ fontWeight: 720, fontSize: 18, color: "#15171c", letterSpacing: "-.02em" }}>{s.brand || "Brand"}</div>
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {["Product", "Pricing", "Docs"].map((t) => <span key={t} style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>{t}</span>)}
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", background: "#6366f1", padding: "8px 16px", borderRadius: 8 }}>Sign up</span>
        </div>
      </div>
    );
  }
  if (s.type === "image") {
    return (
      <div style={{ ...common, background: s.bg, borderRadius: s.radius, overflow: "hidden", position: "relative", display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,.035) 0 10px, transparent 10px 20px)" }} />
        <div style={{ position: "relative", fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#99a0ad", letterSpacing: ".02em" }}>{s.label || "image"}</div>
      </div>
    );
  }
  if (s.type === "icon") {
    return <div style={{ ...common, background: s.bg, borderRadius: s.radius, display: "grid", placeItems: "center", color: s.color }}>{I.icon({ width: 22, height: 22 })}</div>;
  }
  if (s.type === "divider") {
    return <div style={{ ...common, background: s.bg }} />;
  }
  if (s.type === "container") {
    return <div style={{ ...common, background: s.bg, borderRadius: s.radius, border: s.border ? `${s.border}px solid ${s.borderColor || "#e9e9ee"}` : "none" }} />;
  }
  if (s.type === "input") {
    return (
      <div style={{ ...common, background: s.bg, borderRadius: s.radius, border: s.border ? `${s.border}px solid ${s.borderColor || "#e9e9ee"}` : "none", display: "flex", alignItems: "center", padding: "0 14px", fontSize: s.fontSize, color: s.color }}>{s.text}</div>
    );
  }

  // text-bearing: heading, text, button, badge
  const isBtn = s.type === "button" || s.type === "badge";
  const textStyle = {
    width: "100%", height: "100%",
    display: "flex",
    alignItems: isBtn ? "center" : "flex-start",
    justifyContent: s.align === "center" ? "center" : s.align === "right" ? "flex-end" : "flex-start",
    fontSize: s.fontSize, fontWeight: s.fontWeight, color: s.color,
    lineHeight: s.lineHeight || (isBtn ? 1 : 1.4),
    letterSpacing: (s.letter || 0) + "em",
    textAlign: s.align || "left",
    background: s.bg || "transparent",
    borderRadius: s.radius || 0,
    border: s.border ? `${s.border}px solid ${s.borderColor || "#e9e9ee"}` : "none",
    padding: isBtn ? "0 16px" : 0,
    whiteSpace: isBtn ? "nowrap" : "pre-wrap",
    overflow: "hidden",
  };

  if (editing) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        style={{ ...textStyle, cursor: "text" }}
        onInput={(e) => onText(e.currentTarget.textContent)}
        onPointerDown={(e) => e.stopPropagation()}
        ref={(n) => { if (n && n.textContent !== s.text) n.textContent = s.text; }}
      />
    );
  }
  return <div style={textStyle}>{s.text}</div>;
}

/* ============ Canvas ============ */
function Canvas({
  elements, selectedIds, setSelectedIds, zoom, setZoom, pan, setPan,
  tool, frameW, frameH, deviceName, updateElements, commit,
  editingId, setEditingId, pendingType, setPendingType, onContextDelete,
}) {
  const wrapRef = React.useRef(null);
  const drag = React.useRef(null);
  const [guides, setGuides] = React.useState([]);
  const [marquee, setMarquee] = React.useState(null);
  const [hoverId, setHoverId] = React.useState(null);
  const [panning, setPanning] = React.useState(false);

  const visible = elements.filter((e) => !e.hidden);
  const single = selectedIds.length === 1 ? elements.find((e) => e.id === selectedIds[0]) : null;
  const selRect = (() => {
    const sel = elements.filter((e) => selectedIds.includes(e.id));
    if (!sel.length) return null;
    const x1 = Math.min(...sel.map((e) => e.x)), y1 = Math.min(...sel.map((e) => e.y));
    const x2 = Math.max(...sel.map((e) => e.x + e.w)), y2 = Math.max(...sel.map((e) => e.y + e.h));
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
  })();

  // screen -> scene coords
  const toScene = (clientX, clientY) => {
    const r = wrapRef.current.getBoundingClientRect();
    return { x: (clientX - r.left - pan.x) / zoom, y: (clientY - r.top - pan.y) / zoom };
  };

  /* ---- wheel: zoom (cmd/ctrl) or pan ---- */
  const onWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const r = wrapRef.current.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const factor = Math.exp(-e.deltaY * 0.0015);
      const nz = Math.min(4, Math.max(0.1, zoom * factor));
      // keep point under cursor stable
      setPan({ x: mx - (mx - pan.x) * (nz / zoom), y: my - (my - pan.y) * (nz / zoom) });
      setZoom(nz);
    } else {
      setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY });
    }
  };
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  /* ---- snapping helpers ---- */
  function computeSnap(moved, movingIds) {
    const others = elements.filter((e) => !movingIds.includes(e.id) && !e.hidden);
    const targetsX = [0, frameW / 2, frameW];
    const targetsY = [0, frameH];
    others.forEach((o) => { targetsX.push(o.x, o.x + o.w / 2, o.x + o.w); targetsY.push(o.y, o.y + o.h / 2, o.y + o.h); });
    const TH = 6 / zoom;
    let dx = 0, dy = 0, gl = [];
    const mx = [moved.x, moved.x + moved.w / 2, moved.x + moved.w];
    const my = [moved.y, moved.y + moved.h / 2, moved.y + moved.h];
    let bestX = TH, bestY = TH;
    mx.forEach((m) => targetsX.forEach((t) => { const d = t - m; if (Math.abs(d) < Math.abs(bestX)) { bestX = d; } }));
    my.forEach((m) => targetsY.forEach((t) => { const d = t - m; if (Math.abs(d) < Math.abs(bestY)) { bestY = d; } }));
    if (Math.abs(bestX) < TH) { dx = bestX; }
    if (Math.abs(bestY) < TH) { dy = bestY; }
    // build guide lines at snapped positions
    if (dx) { const sx = [moved.x + dx, moved.x + moved.w / 2 + dx, moved.x + moved.w + dx]; targetsX.forEach((t) => { if (sx.some((v) => Math.abs(v - t) < 0.5)) gl.push({ axis: "v", at: t }); }); }
    if (dy) { const sy = [moved.y + dy, moved.y + moved.h / 2 + dy, moved.y + moved.h + dy]; targetsY.forEach((t) => { if (sy.some((v) => Math.abs(v - t) < 0.5)) gl.push({ axis: "h", at: t }); }); }
    return { dx, dy, gl };
  }

  /* ---- pointer down on an element ---- */
  const onElPointerDown = (e, el) => {
    if (tool === "hand" || editingId) return;
    if (el.locked) return;
    e.stopPropagation();
    let sel = selectedIds;
    if (e.shiftKey) {
      sel = selectedIds.includes(el.id) ? selectedIds.filter((i) => i !== el.id) : [...selectedIds, el.id];
      setSelectedIds(sel);
      if (!sel.includes(el.id)) return;
    } else if (!selectedIds.includes(el.id)) {
      sel = [el.id]; setSelectedIds(sel);
    }
    const start = toScene(e.clientX, e.clientY);
    const movingIds = sel.length ? sel : [el.id];
    drag.current = {
      mode: "move", movingIds, start,
      orig: elements.filter((x) => movingIds.includes(x.id)).map((x) => ({ id: x.id, x: x.x, y: x.y, w: x.w, h: x.h })),
      moved: false,
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  /* ---- resize handle down ---- */
  const onHandleDown = (e, dir) => {
    e.stopPropagation();
    if (!single) return;
    const start = toScene(e.clientX, e.clientY);
    drag.current = { mode: "resize", dir, id: single.id, start, orig: { x: single.x, y: single.y, w: single.w, h: single.h }, moved: false };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onMove = (e) => {
    const d = drag.current; if (!d) return;
    const p = toScene(e.clientX, e.clientY);
    let ddx = p.x - d.start.x, ddy = p.y - d.start.y;
    d.moved = Math.abs(ddx) > 1 || Math.abs(ddy) > 1 || d.moved;

    if (d.mode === "move") {
      const lead = d.orig[0];
      const movedLead = { x: lead.x + ddx, y: lead.y + ddy, w: lead.w, h: lead.h };
      const snap = computeSnap(movedLead, d.movingIds);
      ddx += snap.dx; ddy += snap.dy;
      setGuides(snap.gl);
      const map = {};
      d.orig.forEach((o) => { map[o.id] = { x: Math.round(o.x + ddx), y: Math.round(o.y + ddy) }; });
      updateElements(elements.map((el) => map[el.id] ? { ...el, ...map[el.id] } : el), false);
    } else if (d.mode === "resize") {
      const o = d.orig, dir = d.dir;
      let { x, y, w, h } = o;
      if (dir.includes("e")) w = o.w + ddx;
      if (dir.includes("s")) h = o.h + ddy;
      if (dir.includes("w")) { w = o.w - ddx; x = o.x + ddx; }
      if (dir.includes("n")) { h = o.h - ddy; y = o.y + ddy; }
      w = Math.max(8, w); h = Math.max(4, h);
      updateElements(elements.map((el) => el.id === d.id ? { ...el, x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) } : el), false);
    }
  };

  const onUp = () => {
    const d = drag.current;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    setGuides([]);
    drag.current = null;
    if (d && d.moved) commit();
  };

  /* ---- empty canvas: marquee select, pan, or place ---- */
  const onCanvasDown = (e) => {
    if (editingId) { setEditingId(null); }
    const sceneStart = toScene(e.clientX, e.clientY);

    if (pendingType) {
      const el = makeElement(pendingType, sceneStart.x - 40, sceneStart.y - 20);
      updateElements([...elements, el], true);
      setSelectedIds([el.id]);
      setPendingType(null);
      return;
    }
    if (tool === "hand" || e.button === 1 || e.altKey) {
      setPanning(true);
      const sp = { x: e.clientX, y: e.clientY }, op = { ...pan };
      const mv = (ev) => setPan({ x: op.x + (ev.clientX - sp.x), y: op.y + (ev.clientY - sp.y) });
      const up = () => { setPanning(false); window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
      window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
      return;
    }
    // marquee
    if (!e.shiftKey) setSelectedIds([]);
    const startSel = e.shiftKey ? [...selectedIds] : [];
    const mv = (ev) => {
      const cur = toScene(ev.clientX, ev.clientY);
      const x = Math.min(sceneStart.x, cur.x), y = Math.min(sceneStart.y, cur.y);
      const w = Math.abs(cur.x - sceneStart.x), h = Math.abs(cur.y - sceneStart.y);
      setMarquee({ x, y, w, h });
      const hit = elements.filter((el) => !el.hidden && !el.locked && el.x < x + w && el.x + el.w > x && el.y < y + h && el.y + el.h > y).map((el) => el.id);
      setSelectedIds([...new Set([...startSel, ...hit])]);
    };
    const up = () => { setMarquee(null); window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  const dpr = window.devicePixelRatio || 1;
  const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

  return (
    <div
      ref={wrapRef}
      className={"canvas-wrap" + (tool === "hand" ? " tool-hand" : "") + (panning ? " panning" : "") + (pendingType ? " placing" : "")}
      onPointerDown={onCanvasDown}
    >
      <div className="scene" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
        {/* frame */}
        <div className="frame-label" style={{ width: frameW, transform: `scale(${1 / zoom})`, transformOrigin: "0 100%" }}>
          {deviceName} <span className="dim">{frameW} × {frameH}</span>
        </div>
        <div className="frame" style={{ left: 0, top: 0, width: frameW, height: frameH, overflow: "hidden" }}>
          {visible.map((el) => {
            const sel = selectedIds.includes(el.id);
            return (
              <div
                key={el.id}
                className={"el" + (sel ? " selected" : "") + (hoverId === el.id && !sel ? " hover" : "") + (editingId === el.id ? " editing" : "")}
                style={{ left: el.x, top: el.y, width: el.w, height: el.h, cursor: tool === "hand" ? "inherit" : "move" }}
                onPointerDown={(e) => onElPointerDown(e, el)}
                onPointerEnter={() => setHoverId(el.id)}
                onPointerLeave={() => setHoverId((h) => (h === el.id ? null : h))}
                onDoubleClick={(e) => { e.stopPropagation(); if (["heading", "text", "button", "badge"].includes(el.type)) { setSelectedIds([el.id]); setEditingId(el.id); } }}
              >
                <div className="el-inner">
                  <ElementView el={el} editing={editingId === el.id} onText={(t) => updateElements(elements.map((x) => x.id === el.id ? { ...x, text: t } : x), false)} />
                </div>
                <div className="el-outline" style={{ borderWidth: 1.5 / zoom }} />
              </div>
            );
          })}
        </div>

        {/* selection ring + handles */}
        {selRect && !editingId && (
          <div style={{ position: "absolute", left: selRect.x, top: selRect.y, width: selRect.w, height: selRect.h, pointerEvents: "none" }}>
            <div className="sel-ring" style={{ borderWidth: 1.5 / zoom }} />
            {single && (
              <div className="handles">
                {HANDLES.map((dir) => (
                  <div key={dir} className={"handle " + dir} style={{ width: 9 / zoom, height: 9 / zoom, borderWidth: 1.5 / zoom }}
                    onPointerDown={(e) => onHandleDown(e, dir)} />
                ))}
                <div className="size-tag" style={{ transform: `translateX(-50%) scale(${1 / zoom})`, bottom: -22 / zoom }}>{Math.round(single.w)} × {Math.round(single.h)}</div>
              </div>
            )}
          </div>
        )}

        {/* smart guides */}
        {guides.map((g, i) => g.axis === "v"
          ? <div key={i} className="guide v" style={{ left: g.at, top: -2000, height: 6000, width: 1 / zoom }} />
          : <div key={i} className="guide h" style={{ top: g.at, left: -2000, width: 6000, height: 1 / zoom }} />)}

        {/* marquee */}
        {marquee && <div className="marquee" style={{ left: marquee.x, top: marquee.y, width: marquee.w, height: marquee.h, borderWidth: 1 / zoom }} />}
      </div>

      <div className="statusbar">
        <span><span className="kbd">Space</span> + drag to pan</span>
        <span><span className="kbd">⌘</span> + scroll to zoom</span>
        <span>Double-click text to edit</span>
      </div>
    </div>
  );
}

Object.assign(window, { Canvas, ElementView });
