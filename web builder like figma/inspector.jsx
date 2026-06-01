/* ============ small field controls ============ */
function NumField({ k, value, onChange, step = 1, min, suffix }) {
  return (
    <div className="field">
      {k && <span className="k">{k}</span>}
      <input type="number" value={value ?? ""} step={step} min={min}
        onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))} />
      {suffix && <span className="k" style={{ color: "var(--text-3)" }}>{suffix}</span>}
    </div>
  );
}
function ColorField({ k, value, onChange }) {
  return (
    <div className="field">
      <span className="swatch" style={{ background: value || "#ffffff" }}>
        <input type="color" value={(value || "#ffffff").slice(0, 7)} onChange={(e) => onChange(e.target.value)} />
      </span>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ textTransform: "uppercase", fontSize: 11.5 }} />
    </div>
  );
}

/* ============ Right inspector ============ */
function Inspector({ selected, patch, order, frameW }) {
  if (selected.length === 0) {
    return (
      <div className="right">
        <div className="insp-empty">
          <div className="ico">{I.cursor({ width: 20, height: 20 })}</div>
          <h4>Nothing selected</h4>
          <p>Select a layer on the canvas to edit its position, size, type and style.</p>
        </div>
      </div>
    );
  }
  if (selected.length > 1) {
    return (
      <div className="right">
        <div className="insp-scroll">
          <div className="insp-sect">
            <p className="insp-title">{selected.length} layers selected</p>
            <p style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.55, margin: 0 }}>Use the alignment bar on the canvas to align and distribute, or drag to move them together.</p>
          </div>
          <div className="insp-sect">
            <p className="insp-title">Fill</p>
            <ColorField value="" onChange={(v) => patch({ bg: v })} />
          </div>
        </div>
      </div>
    );
  }

  const el = selected[0];
  const isText = ["heading", "text", "button", "badge", "input"].includes(el.type);
  const hasFill = ["button", "badge", "container", "image", "icon", "section", "navbar", "input", "divider"].includes(el.type);
  const hasRadius = ["button", "badge", "container", "image", "icon", "input"].includes(el.type);
  const aligns = [["left", "alignL"], ["center", "alignCx"], ["right", "alignR"]];

  return (
    <div className="right">
      <div className="insp-scroll">
        {/* header */}
        <div className="insp-sect" style={{ paddingBottom: 12 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <span className="k">{I[TYPE_ICON[el.type] || "square"]({ width: 14, height: 14 })}</span>
            <input value={el.name} onChange={(e) => patch({ name: e.target.value })} style={{ fontWeight: 600 }} />
          </div>
        </div>

        {/* position & size */}
        <div className="insp-sect">
          <p className="insp-title">Position &amp; Size</p>
          <div className="field-row">
            <NumField k="X" value={Math.round(el.x)} onChange={(v) => patch({ x: v })} />
            <NumField k="Y" value={Math.round(el.y)} onChange={(v) => patch({ y: v })} />
          </div>
          <div className="field-row">
            <NumField k="W" value={Math.round(el.w)} onChange={(v) => patch({ w: Math.max(8, v) })} />
            <NumField k="H" value={Math.round(el.h)} onChange={(v) => patch({ h: Math.max(4, v) })} />
          </div>
          <div className="seg" style={{ marginTop: 2 }}>
            <button title="Align left in frame" onClick={() => patch({ x: 0 })}>{I.alignL()}</button>
            <button title="Center in frame" onClick={() => patch({ x: Math.round((frameW - el.w) / 2) })}>{I.alignCx()}</button>
            <button title="Align right in frame" onClick={() => patch({ x: frameW - el.w })}>{I.alignR()}</button>
          </div>
        </div>

        {/* typography */}
        {isText && (
          <div className="insp-sect">
            <p className="insp-title">Typography</p>
            <div className="field-row">
              <NumField k="Size" value={el.fontSize} onChange={(v) => patch({ fontSize: v })} suffix="px" />
              <div className="field">
                <span className="k">Weight</span>
                <select value={el.fontWeight || 400} onChange={(e) => patch({ fontWeight: parseInt(e.target.value) })}>
                  {[...new Set([300, 400, 500, 600, 700, 800, el.fontWeight || 400])].sort((a, b) => a - b).map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>
            {el.type !== "button" && el.type !== "badge" && (
              <div className="field-row">
                <NumField k="Line" value={el.lineHeight} step={0.05} onChange={(v) => patch({ lineHeight: v })} />
                <NumField k="Spacing" value={el.letter} step={0.005} onChange={(v) => patch({ letter: v })} suffix="em" />
              </div>
            )}
            <div className="seg" style={{ marginBottom: 9 }}>
              {aligns.map(([a, ic]) => (
                <button key={a} className={el.align === a ? "active" : ""} onClick={() => patch({ align: a })}>{I[ic]()}</button>
              ))}
            </div>
            <ColorField value={el.color} onChange={(v) => patch({ color: v })} />
          </div>
        )}

        {/* fill */}
        {hasFill && (
          <div className="insp-sect">
            <p className="insp-title">Fill</p>
            <ColorField value={el.bg || (el.type === "image" ? "#eef0f4" : "#ffffff")} onChange={(v) => patch({ bg: v })} />
            {hasRadius && (
              <div className="field-row" style={{ marginTop: 9, marginBottom: 0, alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600, flex: "0 0 auto" }}>Radius</span>
                <input className="slider" type="range" min="0" max="48" value={Math.min(48, el.radius || 0)} onChange={(e) => patch({ radius: parseInt(e.target.value) })} />
                <div className="field" style={{ flex: "0 0 64px" }}><input type="number" value={el.radius || 0} onChange={(e) => patch({ radius: parseInt(e.target.value) || 0 })} /></div>
              </div>
            )}
          </div>
        )}

        {/* border */}
        {["container", "input", "button", "image"].includes(el.type) && (
          <div className="insp-sect">
            <p className="insp-title">Border</p>
            <div className="field-row">
              <NumField k="Width" value={el.border || 0} onChange={(v) => patch({ border: v })} suffix="px" />
              <ColorField value={el.borderColor || "#e9e9ee"} onChange={(v) => patch({ borderColor: v })} />
            </div>
          </div>
        )}

        {/* arrange */}
        <div className="insp-sect">
          <p className="insp-title">Arrange</p>
          <div className="field-row" style={{ marginBottom: 0 }}>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => order("front")}>Front</button>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => order("forward")}>Forward</button>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => order("backward")}>Back</button>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => order("back")}>Bottom</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Floating alignment bar (multi-select) ============ */
function AlignBar({ count, align, distribute }) {
  return (
    <div className="align-bar">
      <span className="count">{count} selected</span>
      <button className="tool-btn" title="Align left" onClick={() => align("left")}>{I.alignL()}</button>
      <button className="tool-btn" title="Align center" onClick={() => align("cx")}>{I.alignCx()}</button>
      <button className="tool-btn" title="Align right" onClick={() => align("right")}>{I.alignR()}</button>
      <div className="tb-sep" />
      <button className="tool-btn" title="Align top" onClick={() => align("top")}>{I.alignT()}</button>
      <button className="tool-btn" title="Align middle" onClick={() => align("cy")}>{I.alignM()}</button>
      <button className="tool-btn" title="Align bottom" onClick={() => align("bottom")}>{I.alignB()}</button>
      <div className="tb-sep" />
      <button className="tool-btn" title="Distribute horizontally" onClick={() => distribute("h")}>{I.distH()}</button>
      <button className="tool-btn" title="Distribute vertically" onClick={() => distribute("v")} style={{ transform: "rotate(90deg)" }}>{I.distH()}</button>
    </div>
  );
}

/* ============ Templates modal ============ */
function TemplatesModal({ onClose, onPick }) {
  return (
    <div className="modal-scrim" onPointerDown={onClose}>
      <div className="modal" onPointerDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>Start from a template</h3>
            <p>Pick a layout to drop onto the canvas. This replaces the current page.</p>
          </div>
          <button className="icon-x" onClick={onClose}>{I.close()}</button>
        </div>
        <div className="modal-body">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="tmpl-card" onClick={() => onPick(t)}>
              <div className="tmpl-thumb"><TemplateThumb t={t} /></div>
              <div className="tmpl-meta"><div className="t">{t.name}</div><div className="s">{t.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateThumb({ t }) {
  const els = t.make();
  if (!els.length) {
    return <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--text-3)" }}>{I.plus({ width: 22, height: 22 })}</div>;
  }
  const maxX = Math.max(...els.map((e) => e.x + e.w), 1200);
  const maxY = Math.max(...els.map((e) => e.y + e.h), 600);
  const sc = Math.min(294 / maxX, 150 / maxY);
  return (
    <div style={{ position: "absolute", top: 0, left: "50%", transform: `translateX(-50%) scale(${sc})`, transformOrigin: "top center", width: maxX, height: maxY }}>
      {els.filter((e) => !e.hidden).map((e) => (
        <div key={e.id} style={{ position: "absolute", left: e.x, top: e.y, width: e.w, height: e.h, overflow: "hidden" }}>
          <ElementView el={e} editing={false} onText={() => {}} />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Inspector, AlignBar, TemplatesModal, TemplateThumb, NumField, ColorField });
