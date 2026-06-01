/* ============ Top toolbar ============ */
function Toolbar({ tool, setTool, zoom, setZoom, zoomToFit, device, setDevice, undo, redo, canUndo, canRedo, openTemplates }) {
  const tools = [
    { id: "select", icon: "cursor", title: "Move (V)" },
    { id: "hand", icon: "hand", title: "Hand (H)" },
  ];
  const devices = [
    { id: "desktop", icon: "desktop", title: "Desktop" },
    { id: "tablet", icon: "tablet", title: "Tablet" },
    { id: "mobile", icon: "mobile", title: "Mobile" },
  ];
  return (
    <div className="toolbar">
      <div className="brand">
        <div className="logo">{I.frame({ width: 15, height: 15 })}</div>
        Lumen
      </div>
      <div className="tb-sep" />
      <div className="tb-group">
        {tools.map((t) => (
          <button key={t.id} className={"tool-btn" + (tool === t.id ? " active" : "")} title={t.title} onClick={() => setTool(t.id)}>
            {I[t.icon]()}
          </button>
        ))}
      </div>
      <div className="tb-sep" />
      <div className="tb-group">
        <button className="tool-btn" title="Undo (⌘Z)" disabled={!canUndo} onClick={undo}>{I.undo()}</button>
        <button className="tool-btn" title="Redo (⌘⇧Z)" disabled={!canRedo} onClick={redo}>{I.redo()}</button>
      </div>
      <div className="tb-sep" />
      <button className="btn-ghost" onClick={openTemplates}>{I.tmpl({ width: 15, height: 15 })} Templates</button>

      <div className="spacer" />

      <div className="device-seg">
        {devices.map((d) => (
          <button key={d.id} className={device === d.id ? "active" : ""} title={d.title} onClick={() => setDevice(d.id)}>{I[d.icon]()}</button>
        ))}
      </div>
      <div className="tb-sep" />
      <div className="zoom-pill">
        <button title="Zoom out" onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>{I.minus()}</button>
        <span className="zval" title="Zoom to fit" onClick={zoomToFit}>{Math.round(zoom * 100)}%</span>
        <button title="Zoom in" onClick={() => setZoom(Math.min(4, zoom + 0.1))}>{I.plus()}</button>
      </div>

      <div className="tb-sep" />
      <div className="avatars">
        <div className="av" style={{ background: "#6366f1" }}>A</div>
        <div className="av" style={{ background: "#10b981" }}>K</div>
        <div className="av" style={{ background: "#f59e0b" }}>M</div>
      </div>
      <button className="btn-primary">{I.share({ width: 14, height: 14 })} Share</button>
    </div>
  );
}

/* ============ Left panel ============ */
function LeftPanel({
  tab, setTab, elements, selectedIds, setSelectedIds, pages, currentPage, setCurrentPage,
  addPage, toggleHidden, toggleLock, removeElement, renameElement, startPlace, pendingType,
}) {
  const [q, setQ] = React.useState("");
  const lib = LIBRARY.filter((l) => l.label.toLowerCase().includes(q.toLowerCase()));
  // layers: top of array = back; show reversed so front is on top
  const ordered = [...elements].reverse();

  return (
    <div className="left">
      <div className="panel-tabs">
        <button className={"panel-tab" + (tab === "layers" ? " active" : "")} onClick={() => setTab("layers")}>Layers</button>
        <button className={"panel-tab" + (tab === "insert" ? " active" : "")} onClick={() => setTab("insert")}>Insert</button>
      </div>

      {tab === "layers" && (
        <div className="panel-scroll">
          <div className="sect-head">Pages
            <button title="Add page" onClick={addPage}>{I.plus({ width: 14, height: 14 })}</button>
          </div>
          {pages.map((p) => (
            <div key={p.id} className={"page-item" + (p.id === currentPage ? " active" : "")} onClick={() => setCurrentPage(p.id)}>
              <span className="dot" /> {p.name}
            </div>
          ))}

          <div className="sect-head">Layers</div>
          {ordered.length === 0 && <div style={{ padding: "10px 8px", fontSize: 12, color: "var(--text-3)" }}>No layers yet. Add from Insert.</div>}
          {ordered.map((el) => (
            <Layer key={el.id} el={el} sel={selectedIds.includes(el.id)}
              onSelect={(e) => setSelectedIds(e.shiftKey ? (selectedIds.includes(el.id) ? selectedIds.filter((i) => i !== el.id) : [...selectedIds, el.id]) : [el.id])}
              onHide={() => toggleHidden(el.id)} onLock={() => toggleLock(el.id)} onDelete={() => removeElement(el.id)} onRename={(n) => renameElement(el.id, n)} />
          ))}
        </div>
      )}

      {tab === "insert" && (
        <div className="panel-scroll">
          <div className="lib-search">{I.search()}<input placeholder="Search elements" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="sect-head">Elements</div>
          <div className="lib-grid">
            {lib.map((l) => (
              <div key={l.type} className={"lib-card" + (pendingType === l.type ? " active" : "")} style={pendingType === l.type ? { borderColor: "var(--accent)", boxShadow: "0 0 0 2px var(--accent-100)" } : null}
                onPointerDown={() => startPlace(l.type)} title={`Click, then click canvas to place a ${l.label}`}>
                <div className="glyph" style={pendingType === l.type ? { color: "var(--accent)", borderColor: "var(--accent-100)" } : null}>{I[l.icon]({ width: 18, height: 18 })}</div>
                <div className="lbl">{l.label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 6px 0", fontSize: 11.5, color: "var(--text-3)", lineHeight: 1.5 }}>
            Click an element, then click anywhere on the canvas to drop it in.
          </div>
        </div>
      )}
    </div>
  );
}

function Layer({ el, sel, onSelect, onHide, onLock, onDelete, onRename }) {
  const [editing, setEditing] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { if (editing && ref.current) { ref.current.focus(); document.getSelection().selectAllChildren(ref.current); } }, [editing]);
  return (
    <div className={"layer" + (sel ? " sel" : "") + (el.hidden ? " hidden" : "")} onClick={onSelect} onDoubleClick={() => setEditing(true)}>
      <span className="l-icon">{I[TYPE_ICON[el.type] || "square"]({ width: 15, height: 15 })}</span>
      <span className="l-name" contentEditable={editing} suppressContentEditableWarning ref={ref}
        onBlur={(e) => { setEditing(false); const v = e.currentTarget.textContent.trim(); if (v) onRename(v); else e.currentTarget.textContent = el.name; }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); } }}>{el.name}</span>
      <span className="l-act" onClick={(e) => e.stopPropagation()}>
        <button title={el.locked ? "Unlock" : "Lock"} onClick={onLock} style={el.locked ? { opacity: 1, color: "var(--accent)" } : null}>{I.lock({ width: 13, height: 13 })}</button>
        <button title={el.hidden ? "Show" : "Hide"} onClick={onHide}>{el.hidden ? I.eyeOff() : I.eye()}</button>
        <button title="Delete" onClick={onDelete}>{I.trash()}</button>
      </span>
    </div>
  );
}

Object.assign(window, { Toolbar, LeftPanel, Layer });
