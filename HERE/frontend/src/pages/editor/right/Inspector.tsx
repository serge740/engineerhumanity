import React, { useState } from 'react';
import { useEditorStore, findById } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';

// ── Helpers ───────────────────────────────────────────────────────────────────

const ICursor = () => (
  <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
    <path d="M3 2.5l9.5 4-4 1.2-1.2 4L3 2.5z" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

// ── CSS field ─────────────────────────────────────────────────────────────────
interface FieldProps {
  label:       string;
  propKey:     string;
  elId:        string;
  value:       string | undefined;
  placeholder?: string;
  type?:        'text' | 'color' | 'number';
  unit?:        string;
}

function CSSField({ label, propKey, elId, value, placeholder, type = 'text', unit }: FieldProps) {
  const capture        = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const removeStyle    = useEditorStore(s => s.removeStyle);

  const handleFocus = () => capture();
  const handleChange = (v: string) => {
    if (!v && type !== 'color') { removeStyle(elId, propKey); return; }
    const out = (type === 'number' && unit) ? `${v}${unit}` : v;
    patchStyleLive(elId, propKey, out);
  };

  // Strip trailing unit for number inputs
  const displayVal = type === 'number' && unit && value?.endsWith(unit)
    ? value.slice(0, -unit.length)
    : value ?? '';

  return (
    <div className="l-field" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
      {type === 'color' ? (
        <>
          <span className="l-field-k" style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>{label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
            <input type="color" value={value || '#000000'}
              style={{ width: 22, height: 22, padding: 0, border: '1px solid #e9e9ee', borderRadius: 4, cursor: 'pointer' }}
              onFocus={handleFocus}
              onChange={e => handleChange(e.target.value)} />
            <input type="text" value={displayVal} placeholder={placeholder ?? '#000000'}
              style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11, fontFamily: 'monospace' }}
              onFocus={handleFocus}
              onChange={e => handleChange(e.target.value)} />
          </div>
        </>
      ) : type === 'number' ? (
        <>
          <span className="l-field-k" style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>{label}</span>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, overflow: 'hidden' }}>
            <input type="number" value={displayVal} placeholder={placeholder ?? ''}
              style={{ flex: 1, border: 'none', padding: '3px 6px', fontSize: 11, minWidth: 0 }}
              onFocus={handleFocus}
              onChange={e => handleChange(e.target.value)} />
            {unit && <span style={{ padding: '0 5px', fontSize: 10, color: '#9ca3af', borderLeft: '1px solid #e9e9ee', background: '#fafafa' }}>{unit}</span>}
          </div>
        </>
      ) : (
        <>
          <span className="l-field-k" style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>{label}</span>
          <input type="text" value={displayVal} placeholder={placeholder ?? ''}
            style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11 }}
            onFocus={handleFocus}
            onChange={e => handleChange(e.target.value)} />
        </>
      )}
    </div>
  );
}

// ── Select field ──────────────────────────────────────────────────────────────
function SelectField({ label, propKey, elId, value, options }: {
  label: string; propKey: string; elId: string;
  value: string | undefined; options: string[];
}) {
  const capture        = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
      <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>{label}</span>
      <select value={value ?? ''} style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11 }}
        onFocus={() => capture()}
        onChange={e => patchStyleLive(elId, propKey, e.target.value)}>
        <option value="">— default —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function Sect({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="l-insp-sect">
      <div className="l-insp-title" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setOpen(!open)}>
        <span>{open ? '▾' : '▸'}</span> {title}
      </div>
      {open && <div style={{ padding: '4px 8px 8px' }}>{children}</div>}
    </div>
  );
}

// ── Inspector ─────────────────────────────────────────────────────────────────
export function Inspector() {
  const elements     = useEditorStore(s => s.elements);
  const selectedId   = useEditorStore(s => s.selectedId);
  const patchElement = useEditorStore(s => s.patchElement);
  const captureHistory = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);

  // Find selected element
  const found = selectedId ? findById(elements, selectedId) : null;
  const el: PageElement | null = found?.el ?? null;
  const style = (el?.style ?? {}) as Record<string,string>;

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!el) {
    return (
      <div className="l-right">
        <div className="l-insp-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, color: '#9ca3af' }}>
          <ICursor />
          <p style={{ fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
            Click an element<br />to inspect it
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="l-right">
      <div className="l-insp-scroll">

        {/* ── Element header ──────────────────────────────────────────────── */}
        <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #f0f0f4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <code style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 7px', borderRadius: 5, fontSize: 12, fontFamily: 'monospace' }}>
              &lt;{el.tag}&gt;
            </code>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>id: {el.id}</span>
          </div>
          {/* Class */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6b7280', flex: '0 0 34px' }}>class</span>
            <input
              value={el.class || ''}
              placeholder="class names"
              style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '4px 8px', fontSize: 11 }}
              onFocus={() => captureHistory()}
              onChange={e => patchElement(el.id, { class: e.target.value || undefined })}
            />
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        {(el.tag !== 'img' && el.tag !== 'input' && !el.children?.length) && (() => {
          // Elements imported from HTML store content in `innerHTML` (mixed content).
          // Manually-added elements store it in `text`. Use whichever is present.
          const hasInnerHTML = (el as Record<string,unknown>).innerHTML !== undefined;
          const contentValue = hasInnerHTML
            ? ((el as Record<string,unknown>).innerHTML as string) ?? ''
            : el.text ?? '';
          const contentField = hasInnerHTML ? 'innerHTML' : 'text';
          return (
            <Sect title="Content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>
                  {hasInnerHTML ? 'HTML content' : 'Text'}
                </div>
                <textarea
                  value={contentValue}
                  placeholder={hasInnerHTML ? '<strong>bold</strong> text…' : 'Text content…'}
                  rows={3}
                  style={{ border: '1px solid #e9e9ee', borderRadius: 5, padding: '6px 8px', fontSize: 12, resize: 'vertical', fontFamily: hasInnerHTML ? 'monospace' : 'inherit' }}
                  onFocus={() => captureHistory()}
                  onChange={e => patchElement(el.id, { [contentField]: e.target.value })}
                />
              </div>
            </Sect>
          );
        })()}

        {el.tag === 'img' && (
          <Sect title="Content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, color: '#6b7280' }}>src</div>
              <input value={el.src ?? ''} placeholder="https://…"
                style={{ border: '1px solid #e9e9ee', borderRadius: 5, padding: '4px 8px', fontSize: 11 }}
                onFocus={() => captureHistory()}
                onChange={e => patchElement(el.id, { src: e.target.value })} />
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>alt</div>
              <input value={el.alt ?? ''} placeholder="Alt text"
                style={{ border: '1px solid #e9e9ee', borderRadius: 5, padding: '4px 8px', fontSize: 11 }}
                onFocus={() => captureHistory()}
                onChange={e => patchElement(el.id, { alt: e.target.value })} />
            </div>
          </Sect>
        )}

        {/* ── Size ────────────────────────────────────────────────────────── */}
        <Sect title="Size">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <CSSField label="W"        propKey="width"     elId={el.id} value={style.width}     placeholder="auto" />
            <CSSField label="H"        propKey="height"    elId={el.id} value={style.height}    placeholder="auto" />
            <CSSField label="Min W"    propKey="minWidth"  elId={el.id} value={style.minWidth}  placeholder="—" />
            <CSSField label="Min H"    propKey="minHeight" elId={el.id} value={style.minHeight} placeholder="—" />
            <CSSField label="Max W"    propKey="maxWidth"  elId={el.id} value={style.maxWidth}  placeholder="—" />
            <CSSField label="Max H"    propKey="maxHeight" elId={el.id} value={style.maxHeight} placeholder="—" />
          </div>
        </Sect>

        {/* ── Layout ──────────────────────────────────────────────────────── */}
        <Sect title="Layout">
          <SelectField label="Display"  propKey="display"  elId={el.id} value={style.display}
            options={['block','inline-block','inline','flex','inline-flex','grid','none']} />
          {(style.display === 'flex' || style.display === 'inline-flex') && (
            <>
              <SelectField label="Direction"   propKey="flexDirection"  elId={el.id} value={style.flexDirection}  options={['row','row-reverse','column','column-reverse']} />
              <SelectField label="Wrap"        propKey="flexWrap"       elId={el.id} value={style.flexWrap}       options={['nowrap','wrap','wrap-reverse']} />
              <SelectField label="Justify"     propKey="justifyContent" elId={el.id} value={style.justifyContent} options={['flex-start','center','flex-end','space-between','space-around','space-evenly']} />
              <SelectField label="Align items" propKey="alignItems"     elId={el.id} value={style.alignItems}     options={['flex-start','center','flex-end','stretch','baseline']} />
              <CSSField    label="Gap"         propKey="gap"            elId={el.id} value={style.gap}            placeholder="0" />
            </>
          )}
          <SelectField label="Position"  propKey="position" elId={el.id} value={style.position}
            options={['static','relative','absolute','fixed','sticky']} />
          {(style.position === 'absolute' || style.position === 'fixed' || style.position === 'sticky') && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 4 }}>
              <CSSField label="Top"    propKey="top"    elId={el.id} value={style.top}    placeholder="auto" />
              <CSSField label="Right"  propKey="right"  elId={el.id} value={style.right}  placeholder="auto" />
              <CSSField label="Bottom" propKey="bottom" elId={el.id} value={style.bottom} placeholder="auto" />
              <CSSField label="Left"   propKey="left"   elId={el.id} value={style.left}   placeholder="auto" />
            </div>
          )}
          <CSSField label="Z-index"  propKey="zIndex"   elId={el.id} value={style.zIndex}   placeholder="auto" />
          <CSSField label="Overflow" propKey="overflow"  elId={el.id} value={style.overflow}  placeholder="visible" />
        </Sect>

        {/* ── Spacing ─────────────────────────────────────────────────────── */}
        <Sect title="Spacing">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <CSSField label="Pad"    propKey="padding"       elId={el.id} value={style.padding}       placeholder="0" />
            <CSSField label="Margin" propKey="margin"        elId={el.id} value={style.margin}        placeholder="0" />
            <CSSField label="P top"  propKey="paddingTop"    elId={el.id} value={style.paddingTop}    placeholder="—" />
            <CSSField label="M top"  propKey="marginTop"     elId={el.id} value={style.marginTop}     placeholder="—" />
            <CSSField label="P right" propKey="paddingRight" elId={el.id} value={style.paddingRight}  placeholder="—" />
            <CSSField label="M right" propKey="marginRight"  elId={el.id} value={style.marginRight}   placeholder="—" />
            <CSSField label="P btm"  propKey="paddingBottom" elId={el.id} value={style.paddingBottom} placeholder="—" />
            <CSSField label="M btm"  propKey="marginBottom"  elId={el.id} value={style.marginBottom}  placeholder="—" />
            <CSSField label="P left" propKey="paddingLeft"   elId={el.id} value={style.paddingLeft}   placeholder="—" />
            <CSSField label="M left" propKey="marginLeft"    elId={el.id} value={style.marginLeft}    placeholder="—" />
          </div>
        </Sect>

        {/* ── Typography ──────────────────────────────────────────────────── */}
        <Sect title="Typography">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <CSSField label="Font size"   propKey="fontSize"      elId={el.id} value={style.fontSize}      placeholder="16px" />
            <CSSField label="Weight"      propKey="fontWeight"    elId={el.id} value={style.fontWeight}    placeholder="400" />
            <CSSField label="Line height" propKey="lineHeight"    elId={el.id} value={style.lineHeight}    placeholder="normal" />
            <CSSField label="Letter sp."  propKey="letterSpacing" elId={el.id} value={style.letterSpacing} placeholder="0" />
            <CSSField label="Color"       propKey="color"         elId={el.id} value={style.color}         type="color" />
            <SelectField label="Align" propKey="textAlign" elId={el.id} value={style.textAlign}
              options={['left','center','right','justify']} />
            <CSSField label="Font family" propKey="fontFamily"    elId={el.id} value={style.fontFamily}    placeholder="inherit" />
            <SelectField label="Decoration" propKey="textDecoration" elId={el.id} value={style.textDecoration}
              options={['none','underline','line-through','overline']} />
          </div>
        </Sect>

        {/* ── Background ──────────────────────────────────────────────────── */}
        <Sect title="Background">
          <CSSField label="Color"  propKey="background"     elId={el.id} value={style.background}     type="color" />
          <CSSField label="Image"  propKey="backgroundImage" elId={el.id} value={style.backgroundImage} placeholder="url(…)" />
          <SelectField label="Size"    propKey="backgroundSize"    elId={el.id} value={style.backgroundSize}    options={['auto','cover','contain']} />
          <SelectField label="Repeat"  propKey="backgroundRepeat"  elId={el.id} value={style.backgroundRepeat}  options={['repeat','no-repeat','repeat-x','repeat-y']} />
          <SelectField label="Position" propKey="backgroundPosition" elId={el.id} value={style.backgroundPosition} options={['top','center','bottom','left','right','top left','top right','bottom left','bottom right']} />
        </Sect>

        {/* ── Border ──────────────────────────────────────────────────────── */}
        <Sect title="Border">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <CSSField label="Border"  propKey="border"       elId={el.id} value={style.border}        placeholder="1px solid #e5e7eb" />
            <CSSField label="Radius"  propKey="borderRadius" elId={el.id} value={style.borderRadius}  placeholder="0" />
            <CSSField label="Width"   propKey="borderWidth"  elId={el.id} value={style.borderWidth}   placeholder="1px" />
            <CSSField label="Color"   propKey="borderColor"  elId={el.id} value={style.borderColor}   type="color" />
            <SelectField label="Style" propKey="borderStyle" elId={el.id} value={style.borderStyle}
              options={['solid','dashed','dotted','double','none']} />
          </div>
        </Sect>

        {/* ── Effects ─────────────────────────────────────────────────────── */}
        <Sect title="Effects">
          <CSSField label="Opacity"    propKey="opacity"        elId={el.id} value={style.opacity}        placeholder="1" />
          <CSSField label="Box shadow" propKey="boxShadow"      elId={el.id} value={style.boxShadow}      placeholder="0 2px 8px rgba(0,0,0,.1)" />
          <CSSField label="Transform"  propKey="transform"      elId={el.id} value={style.transform}      placeholder="rotate(0deg)" />
          <CSSField label="Transition" propKey="transition"     elId={el.id} value={style.transition}     placeholder="all .2s ease" />
          <CSSField label="Cursor"     propKey="cursor"         elId={el.id} value={style.cursor}         placeholder="default" />
        </Sect>

        {/* ── Custom CSS ──────────────────────────────────────────────────── */}
        <Sect title="Custom CSS">
          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4 }}>
            Any CSS property: <code>key: value;</code>
          </div>
          <textarea
            placeholder="font-variant: small-caps;&#10;white-space: nowrap;"
            rows={4}
            style={{ width: '100%', border: '1px solid #e9e9ee', borderRadius: 5, padding: '6px 8px', fontSize: 11, resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box' }}
            onFocus={() => captureHistory()}
            onBlur={e => {
              e.target.value.split(';').forEach(rule => {
                const [k, ...vs] = rule.split(':');
                if (!k || !vs.length) return;
                const key = k.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
                const val = vs.join(':').trim();
                if (key && val) patchStyleLive(el.id, key, val);
              });
            }}
          />
        </Sect>

        {/* ── Danger zone ─────────────────────────────────────────────────── */}
        <div style={{ padding: '8px 12px 20px' }}>
          <button
            style={{ width: '100%', padding: '7px', background: '#fff', border: '1px solid #fca5a5', borderRadius: 6, color: '#dc2626', fontSize: 12, cursor: 'pointer' }}
            onClick={() => useEditorStore.getState().removeElement(el.id)}
          >
            Delete element
          </button>
        </div>

      </div>
    </div>
  );
}
