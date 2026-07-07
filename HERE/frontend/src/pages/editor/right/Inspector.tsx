import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore, findById, cloneWithNewIds } from '../../../stores/editorStore';
import type { PageElement } from '../../../api/pages';
import { BoxModelControl } from './controls/BoxModelControl';
import { FontPicker } from './controls/FontPicker';
import { ImagePicker } from './controls/ImagePicker';
import { computeEffectiveStyles } from '../utils/cssCompute';
import { getComponents, type SiteComponent } from '../../../api/components';

// ── Computed-styles context ───────────────────────────────────────────────────
// Holds CSS properties resolved from <style> blocks (class / tag / id rules).
// Every CSSField and SelectField reads from it automatically.
const ComputedCtx = createContext<Record<string, string>>({});

// ── Icons ─────────────────────────────────────────────────────────────────────
const ICursor = () => (
  <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
    <path d="M3 2.5l9.5 4-4 1.2-1.2 4L3 2.5z" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

// ── Shared input style helpers ────────────────────────────────────────────────
function inputBorderColor(fromComputed: boolean) {
  return fromComputed ? '1px solid #fcd34d' : '1px solid #e9e9ee';
}
function inputBg(fromComputed: boolean) {
  return fromComputed ? '#fffbeb' : '#ffffff';
}
function inputColor(fromComputed: boolean) {
  return fromComputed ? '#92400e' : 'inherit';
}

// ── CSS text field ─────────────────────────────────────────────────────────────
interface FieldProps {
  label:        string;
  propKey:      string;
  elId:         string;
  value:        string | undefined;
  placeholder?: string;
  type?:        'text' | 'color' | 'number';
  unit?:        string;
}

function CSSField({ label, propKey, elId, value, placeholder, type = 'text', unit }: FieldProps) {
  const capture        = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const removeStyle    = useEditorStore(s => s.removeStyle);
  const computed       = useContext(ComputedCtx);

  const computedVal    = computed[propKey];
  const isInline       = value !== undefined && value !== '';
  const isFromComputed = !isInline && !!computedVal;

  // Strip trailing unit for number display
  const stripUnit = (v: string | undefined) =>
    type === 'number' && unit && v?.endsWith(unit) ? v.slice(0, -unit.length) : v ?? '';

  // What to show in the input:
  // inline value → computed CSS value → empty string
  const displayVal = isInline ? stripUnit(value) : (isFromComputed ? stripUnit(computedVal) : '');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    capture();
    // Select-all when showing a computed value so the user can immediately type an override
    if (isFromComputed) e.target.select();
  };

  const handleChange = (v: string) => {
    if (!v && type !== 'color') { removeStyle(elId, propKey); return; }
    const out = (type === 'number' && unit) ? `${v}${unit}` : v;
    patchStyleLive(elId, propKey, out);
  };

  const baseInput: React.CSSProperties = {
    border:     inputBorderColor(isFromComputed),
    background: inputBg(isFromComputed),
    color:      inputColor(isFromComputed),
    fontStyle:  isFromComputed ? 'italic' : 'normal',
    borderRadius: 5,
    padding: '4px 6px',
    fontSize: 11,
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  };

  // Label sits above the input (rather than beside it) so the input always
  // gets the field's full width — critical when several fields share a row
  // in a 2-column grid, where a fixed-width side label left almost no room
  // for the input itself.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '3px 0', minWidth: 0 }}>
      <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>{label}</span>
      {type === 'color' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <input
            type="color"
            value={value || (isFromComputed ? computedVal! : '#000000')}
            style={{ width: 26, height: 26, flexShrink: 0, padding: 0, border: inputBorderColor(isFromComputed), borderRadius: 4, cursor: 'pointer' }}
            onFocus={() => capture()}
            onChange={e => handleChange(e.target.value)}
          />
          <input
            type="text"
            value={displayVal}
            placeholder={placeholder ?? '#000000'}
            style={{ ...baseInput, flex: 1, fontFamily: 'monospace' }}
            onFocus={handleFocus}
            onChange={e => handleChange(e.target.value)}
          />
        </div>
      ) : type === 'number' ? (
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, border: inputBorderColor(isFromComputed), borderRadius: 5, overflow: 'hidden', background: inputBg(isFromComputed) }}>
          <input
            type="number"
            value={displayVal}
            placeholder={placeholder ?? ''}
            style={{ flex: 1, border: 'none', padding: '4px 6px', fontSize: 11, minWidth: 0, width: '100%', boxSizing: 'border-box', background: 'transparent', color: inputColor(isFromComputed), fontStyle: isFromComputed ? 'italic' : 'normal' }}
            onFocus={handleFocus}
            onChange={e => handleChange(e.target.value)}
          />
          {unit && <span style={{ padding: '0 6px', fontSize: 10, color: '#9ca3af', borderLeft: '1px solid #e9e9ee', background: '#fafafa', flexShrink: 0 }}>{unit}</span>}
        </div>
      ) : (
        <input
          type="text"
          value={displayVal}
          placeholder={!isFromComputed ? (placeholder ?? '') : ''}
          style={baseInput}
          onFocus={handleFocus}
          onChange={e => handleChange(e.target.value)}
        />
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
  const computed       = useContext(ComputedCtx);

  const computedVal    = computed[propKey];
  const isInline       = value !== undefined && value !== '';
  const isFromComputed = !isInline && !!computedVal;

  // When from computed, pre-select that option in the dropdown if it's in the list
  const selectValue = isInline ? value : (isFromComputed && options.includes(computedVal!) ? computedVal : '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '3px 0', minWidth: 0 }}>
      <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>{label}</span>
      <select
        value={selectValue ?? ''}
        style={{
          width: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          border: inputBorderColor(isFromComputed),
          borderRadius: 5,
          padding: '4px 6px',
          fontSize: 11,
          background: inputBg(isFromComputed),
          color: inputColor(isFromComputed),
          fontStyle: isFromComputed ? 'italic' : 'normal',
        }}
        onFocus={() => capture()}
        onChange={e => patchStyleLive(elId, propKey, e.target.value)}
      >
        <option value="">
          {isFromComputed && !options.includes(computedVal!)
            ? `${computedVal} (CSS)`
            : '— default —'}
        </option>
        {options.map(o => (
          <option key={o} value={o}>{o}{isFromComputed && o === computedVal ? ' ←CSS' : ''}</option>
        ))}
      </select>
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function Sect({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="l-insp-sect">
      <div className="l-insp-title" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setOpen(!open)}>
        <span>{open ? '▾' : '▸'}</span> {title}
      </div>
      {open && <div style={{ padding: '4px 8px 8px' }}>{children}</div>}
    </div>
  );
}

// ── Computed styles section ───────────────────────────────────────────────────
function ComputedStylesSection({ elId, computed, inlineStyle }: {
  elId: string;
  computed: Record<string, string>;
  inlineStyle: Record<string, string>;
}) {
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const captureHistory = useEditorStore(s => s.captureHistory);

  const entries = Object.entries(computed);
  if (entries.length === 0) return null;

  const toKebab = (s: string) => s.replace(/([A-Z])/g, m => '-' + m.toLowerCase());

  return (
    <Sect title={`Computed from CSS (${entries.length})`} defaultOpen={false}>
      <p style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, lineHeight: 1.5 }}>
        Rules from <code>&lt;style&gt;</code> blocks matching this element's tag / class.
        <br />Fields with <span style={{ color: '#92400e', fontWeight: 600 }}>amber border</span> = value comes from CSS.
        Click <strong>↓</strong> to lock it as inline.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {entries.map(([prop, val]) => {
          const overridden = !!inlineStyle[prop];
          return (
            <div key={prop} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '3px 6px', borderRadius: 4,
              background: overridden ? 'transparent' : '#fffbeb',
              opacity: overridden ? 0.4 : 1,
            }}>
              <code style={{ fontSize: 10, color: '#92400e', flex: '0 0 140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {toKebab(prop)}
              </code>
              <span style={{ flex: 1, fontSize: 10, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: overridden ? 'line-through' : 'none' }}>
                {val}
              </span>
              {!overridden && (
                <button
                  title="Lock as inline style"
                  onClick={() => { captureHistory(); patchStyleLive(elId, prop, val); }}
                  style={{ border: 'none', background: '#fcd34d', borderRadius: 3, fontSize: 10, padding: '1px 5px', cursor: 'pointer', flexShrink: 0, fontWeight: 700, color: '#78350f' }}
                >
                  ↓
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Sect>
  );
}

// ── Data Component binding (only shown for a `_collection` marker node) ───────
interface CollectionRef { collectionId: string; componentId: string; limit?: number; detailModal?: boolean }

function CollectionBindingSection({ el }: { el: PageElement }) {
  const siteId          = useEditorStore(s => s.siteId);
  const patchElement    = useEditorStore(s => s.patchElement);
  const captureHistory  = useEditorStore(s => s.captureHistory);
  const navigate         = useNavigate();

  const [components, setComponents] = useState<SiteComponent[]>([]);

  useEffect(() => {
    if (!siteId) return;
    getComponents(siteId)
      .then(list => setComponents(list.filter(c => c.type === 'dynamic' && c.collectionId)))
      .catch(() => {});
  }, [siteId]);

  const ref = ((el as Record<string, unknown>)._collection ?? {}) as CollectionRef;
  const current = components.find(c => c.id === ref.componentId);

  const handlePick = (componentId: string) => {
    const c = components.find(x => x.id === componentId);
    if (!c?.collectionId) return;
    captureHistory();
    patchElement(el.id, { _collection: { collectionId: c.collectionId, componentId: c.id, limit: ref.limit } } as Partial<PageElement>);
  };

  const handleLimit = (v: string) => {
    captureHistory();
    const limit = v.trim() === '' ? undefined : Math.max(0, parseInt(v, 10) || 0);
    patchElement(el.id, { _collection: { ...ref, limit } } as Partial<PageElement>);
  };

  const handleToggleModal = (checked: boolean) => {
    captureHistory();
    patchElement(el.id, { _collection: { ...ref, detailModal: checked } } as Partial<PageElement>);
  };

  return (
    <Sect title="Data Component">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Source</span>
          <select
            value={ref.componentId ?? ''}
            onChange={e => handlePick(e.target.value)}
            style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11 }}
          >
            {!current && <option value="" disabled>Select a component…</option>}
            {components.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Limit</span>
          <input
            type="number" min={0}
            value={ref.limit ?? ''}
            placeholder="All rows"
            onFocus={() => captureHistory()}
            onChange={e => handleLimit(e.target.value)}
            style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11 }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#374151', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!ref.detailModal}
            onChange={e => handleToggleModal(e.target.checked)}
          />
          Open item details in a modal when the card's button is clicked
        </label>
        {ref.detailModal && (
          <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>
            Toggle Preview (top bar) to test the modal right here in the editor.
          </p>
        )}
        {ref.componentId && current && (
          <button
            onClick={() => navigate(`/sites/${siteId}/components/${ref.componentId}`)}
            style={{ marginTop: 2, padding: '6px 10px', fontSize: 11, fontWeight: 600, border: '1px solid #6366f1', color: '#4f46e5', background: '#eef2ff', borderRadius: 6, cursor: 'pointer' }}
          >
            Edit card design / data →
          </button>
        )}
        {ref.componentId && !current && (
          <p style={{ fontSize: 10, color: '#dc2626' }}>This component reference could not be found (deleted?).</p>
        )}
      </div>
    </Sect>
  );
}

// ── Inspector ─────────────────────────────────────────────────────────────────
export function Inspector() {
  const elements        = useEditorStore(s => s.elements);
  const selectedId      = useEditorStore(s => s.selectedId);
  const patchElement    = useEditorStore(s => s.patchElement);
  const captureHistory  = useEditorStore(s => s.captureHistory);
  const patchStyleLive  = useEditorStore(s => s.patchStyleLive);
  const removeStyle     = useEditorStore(s => s.removeStyle);
  const patchEl         = useEditorStore(s => s.patchElement);

  const found = selectedId ? findById(elements, selectedId) : null;
  const el: PageElement | null = found?.el ?? null;
  const style = (el?.style ?? {}) as Record<string, string>;

  // Compute effective styles from <style> nodes in the tree
  const computed = useMemo(
    () => (el ? computeEffectiveStyles(elements, el) : {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId, elements],
  );

  // ── Empty state ──────────────────────────────────────────────────────────────
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

  const computedCount = Object.keys(computed).length;

  return (
    <ComputedCtx.Provider value={computed}>
      <div className="l-right">
        <div className="l-insp-scroll">

          {/* ── Element header ─────────────────────────────────────────────── */}
          <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #f0f0f4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <code style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 7px', borderRadius: 5, fontSize: 12, fontFamily: 'monospace' }}>
                &lt;{el.tag}&gt;
              </code>
              <span style={{ fontSize: 11, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                id: {el.id}
              </span>
            </div>
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

            {/* ── Flow / Absolute toggle ──────────────────────────────────── */}
            {(() => {
              const isAbs = ['absolute','fixed'].includes(style.position ?? '');
              const toAbsolute = () => {
                captureHistory();
                patchStyleLive(el.id, 'position', 'absolute');
                if (!style.left)  patchStyleLive(el.id, 'left', '0px');
                if (!style.top)   patchStyleLive(el.id, 'top',  '0px');
              };
              const toFlow = () => {
                captureHistory();
                removeStyle(el.id, 'position');
                removeStyle(el.id, 'left');
                removeStyle(el.id, 'top');
              };
              const btnBase: React.CSSProperties = {
                flex: 1, padding: '4px 0', fontSize: 11,
                border: 'none', cursor: 'pointer', fontWeight: 500,
              };
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: '#6b7280', flex: '0 0 34px' }}>pos</span>
                  <div style={{ display: 'flex', flex: 1, border: '1px solid #e9e9ee', borderRadius: 6, overflow: 'hidden' }}>
                    <button
                      style={{ ...btnBase, background: !isAbs ? '#6366f1' : '#fff', color: !isAbs ? '#fff' : '#6b7280' }}
                      onClick={toFlow}
                      title="Flow — element joins document flow and can be reordered by dragging"
                    >
                      Flow
                    </button>
                    <button
                      style={{ ...btnBase, background: isAbs ? '#6366f1' : '#fff', color: isAbs ? '#fff' : '#6b7280', borderLeft: '1px solid #e9e9ee' }}
                      onClick={toAbsolute}
                      title="Absolute — element is pinned by pixel coordinates and can be dragged freely"
                    >
                      Absolute
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* CSS rules banner */}
            {computedCount > 0 && (
              <div style={{ marginTop: 8, padding: '4px 8px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 5, fontSize: 10, color: '#92400e', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span>◈</span>
                <span>
                  <strong>{computedCount}</strong> CSS {computedCount === 1 ? 'rule' : 'rules'} applying from stylesheet.
                  Fields with amber border show CSS values — click to override.
                </span>
              </div>
            )}
          </div>

          {/* ── Frame section (only when element is a frame) ─────────────── */}
          {el._frameType === 'frame' && (
            <Sect title="Frame">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Name</span>
                  <input
                    value={(el._frameName as string) || 'Frame'}
                    style={{ flex: 1, border: '1px solid #e9e9ee', borderRadius: 5, padding: '3px 6px', fontSize: 11 }}
                    onFocus={() => captureHistory()}
                    onChange={e => patchEl(el.id, { _frameName: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Clip content</span>
                  <button
                    onClick={() => {
                      captureHistory();
                      patchStyleLive(el.id, 'overflow', style.overflow === 'visible' ? 'hidden' : 'visible');
                    }}
                    style={{
                      padding: '3px 10px', fontSize: 11, borderRadius: 5, cursor: 'pointer',
                      border: '1px solid #e9e9ee',
                      background: (style.overflow ?? 'hidden') !== 'visible' ? '#6366f1' : '#fff',
                      color:      (style.overflow ?? 'hidden') !== 'visible' ? '#fff'    : '#374151',
                    }}
                  >
                    {(style.overflow ?? 'hidden') !== 'visible' ? 'On' : 'Off'}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Auto layout</span>
                  <button
                    onClick={() => {
                      captureHistory();
                      if (style.display === 'flex') {
                        patchStyleLive(el.id, 'display', 'block');
                      } else {
                        patchStyleLive(el.id, 'display', 'flex');
                        patchStyleLive(el.id, 'flexDirection', 'column');
                        patchStyleLive(el.id, 'gap', '12px');
                      }
                    }}
                    style={{
                      padding: '3px 10px', fontSize: 11, borderRadius: 5, cursor: 'pointer',
                      border: '1px solid #e9e9ee',
                      background: style.display === 'flex' ? '#6366f1' : '#fff',
                      color:      style.display === 'flex' ? '#fff'    : '#374151',
                    }}
                  >
                    {style.display === 'flex' ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </Sect>
          )}

          {/* ── Data Component binding (only for a `_collection` marker) ──── */}
          {!!(el as Record<string, unknown>)._collection && (
            <CollectionBindingSection el={el} />
          )}

          {/* ── Align ────────────────────────────────────────────────────────── */}
          <Sect title="Align" defaultOpen={false}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>
              Horizontal align within parent
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {([
                { label: '⬤ Left',   title: 'Align left',   fn: () => { captureHistory(); patchStyleLive(el.id, 'marginLeft', '0'); patchStyleLive(el.id, 'marginRight', 'auto'); } },
                { label: '◉ Center', title: 'Align center', fn: () => { captureHistory(); patchStyleLive(el.id, 'marginLeft', 'auto'); patchStyleLive(el.id, 'marginRight', 'auto'); } },
                { label: 'Right ⬤',  title: 'Align right',  fn: () => { captureHistory(); patchStyleLive(el.id, 'marginLeft', 'auto'); patchStyleLive(el.id, 'marginRight', '0'); } },
              ] as const).map(btn => (
                <button key={btn.title} title={btn.title} onClick={btn.fn}
                  style={{ flex: 1, padding: '4px 2px', fontSize: 10, border: '1px solid #e9e9ee', borderRadius: 5, cursor: 'pointer', background: '#fff', color: '#374151' }}>
                  {btn.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>
              Flex child align-self
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {([
                { label: '▲ Start',  v: 'flex-start' },
                { label: '◆ Center', v: 'center'     },
                { label: '▼ End',    v: 'flex-end'   },
                { label: '⇔ Stretch',v: 'stretch'    },
              ] as const).map(btn => (
                <button key={btn.v} onClick={() => { captureHistory(); patchStyleLive(el.id, 'alignSelf', btn.v); }}
                  style={{
                    flex: 1, padding: '4px 2px', fontSize: 10,
                    border: '1px solid #e9e9ee', borderRadius: 5, cursor: 'pointer',
                    background: style.alignSelf === btn.v ? '#6366f1' : '#fff',
                    color:      style.alignSelf === btn.v ? '#fff'    : '#374151',
                  }}>
                  {btn.label}
                </button>
              ))}
            </div>
          </Sect>

          {/* ── Content ─────────────────────────────────────────────────────── */}
          {(el.tag !== 'img' && el.tag !== 'input' && !el.children?.length && !(el as Record<string, unknown>)._collection) && (() => {
            const hasInnerHTML = (el as Record<string, unknown>).innerHTML !== undefined;
            const contentValue = hasInnerHTML
              ? ((el as Record<string, unknown>).innerHTML as string) ?? ''
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
            <Sect title="Image">
              {/* key=el.id remounts when the selected element changes, resetting internal mode/draft state */}
              <ImagePicker
                key={el.id}
                elId={el.id}
                tag={el.tag}
                src={el.src}
                assetRef={(el as Record<string, string>).assetRef}
                style={style}
              />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Alt text</div>
                <input
                  value={el.alt ?? ''}
                  placeholder="Describe the image…"
                  style={{ width: '100%', border: '1px solid #e9e9ee', borderRadius: 5, padding: '4px 8px', fontSize: 11, boxSizing: 'border-box' }}
                  onFocus={() => captureHistory()}
                  onChange={e => patchElement(el.id, { alt: e.target.value })}
                />
              </div>
            </Sect>
          )}

          {/* ── Size ────────────────────────────────────────────────────────── */}
          <Sect title="Size">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              <CSSField label="W"     propKey="width"     elId={el.id} value={style.width}     placeholder="auto" />
              <CSSField label="H"     propKey="height"    elId={el.id} value={style.height}    placeholder="auto" />
              <CSSField label="Min W" propKey="minWidth"  elId={el.id} value={style.minWidth}  placeholder="—" />
              <CSSField label="Min H" propKey="minHeight" elId={el.id} value={style.minHeight} placeholder="—" />
              <CSSField label="Max W" propKey="maxWidth"  elId={el.id} value={style.maxWidth}  placeholder="—" />
              <CSSField label="Max H" propKey="maxHeight" elId={el.id} value={style.maxHeight} placeholder="—" />
            </div>
          </Sect>

          {/* ── Layout ──────────────────────────────────────────────────────── */}
          <Sect title="Layout">
            <SelectField label="Display"  propKey="display"  elId={el.id} value={style.display}
              options={['block','inline-block','inline','flex','inline-flex','grid','none']} />
            {/* Show flex sub-fields when either inline or computed display is flex */}
            {(['flex','inline-flex'].includes(style.display ?? computed.display ?? '')) && (
              <>
                <SelectField label="Direction"   propKey="flexDirection"  elId={el.id} value={style.flexDirection}  options={['row','row-reverse','column','column-reverse']} />
                <SelectField label="Wrap"        propKey="flexWrap"       elId={el.id} value={style.flexWrap}       options={['nowrap','wrap','wrap-reverse']} />
                <SelectField label="Justify"     propKey="justifyContent" elId={el.id} value={style.justifyContent} options={['flex-start','center','flex-end','space-between','space-around','space-evenly']} />
                <SelectField label="Align items" propKey="alignItems"     elId={el.id} value={style.alignItems}     options={['flex-start','center','flex-end','stretch','baseline']} />
                <CSSField    label="Gap"         propKey="gap"            elId={el.id} value={style.gap}            placeholder="0" type="number" unit="px" />
              </>
            )}
            {/* Show grid sub-fields when display is grid — this is what controls
                "3-column grid / 4-column grid" for a repeating Data Component list */}
            {(style.display ?? computed.display ?? '') === 'grid' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '3px 0', minWidth: 0 }}>
                  <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>Columns</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, minWidth: 0 }}>
                    {[1, 2, 3, 4, 5].map(n => {
                      const target = `repeat(${n}, 1fr)`;
                      const active = (style.gridTemplateColumns ?? computed.gridTemplateColumns) === target;
                      return (
                        <button key={n}
                          onClick={() => { captureHistory(); patchStyleLive(el.id, 'gridTemplateColumns', target); }}
                          style={{
                            flex: '1 1 32px', minWidth: 28, padding: '4px 0', fontSize: 11, fontWeight: 600,
                            border: '1px solid #e9e9ee', borderRadius: 5, cursor: 'pointer',
                            background: active ? '#6366f1' : '#fff',
                            color: active ? '#fff' : '#374151',
                          }}>
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '3px 0', minWidth: 0 }}>
                  <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>Auto-fit</span>
                  <button
                    onClick={() => { captureHistory(); patchStyleLive(el.id, 'gridTemplateColumns', 'repeat(auto-fit, minmax(240px, 1fr))'); }}
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '4px 0', fontSize: 11, fontWeight: 600,
                      border: '1px solid #e9e9ee', borderRadius: 5, cursor: 'pointer',
                      background: (style.gridTemplateColumns ?? computed.gridTemplateColumns) === 'repeat(auto-fit, minmax(240px, 1fr))' ? '#6366f1' : '#fff',
                      color: (style.gridTemplateColumns ?? computed.gridTemplateColumns) === 'repeat(auto-fit, minmax(240px, 1fr))' ? '#fff' : '#374151',
                    }}
                    title="Automatically wraps as many columns as fit, each at least 240px wide"
                  >
                    Wrap to fit
                  </button>
                </div>
                <CSSField label="Columns (custom)" propKey="gridTemplateColumns" elId={el.id} value={style.gridTemplateColumns} placeholder="repeat(3, 1fr)" />
                <CSSField label="Gap"              propKey="gap"                elId={el.id} value={style.gap}                placeholder="16" type="number" unit="px" />
                <SelectField label="Place items" propKey="placeItems" elId={el.id} value={style.placeItems}
                  options={['stretch', 'center', 'start', 'end']} />
              </>
            )}
            <SelectField label="Position" propKey="position" elId={el.id} value={style.position}
              options={['static','relative','absolute','fixed','sticky']} />
            {(['absolute','fixed','sticky'].includes(style.position ?? computed.position ?? '')) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 4 }}>
                <CSSField label="Top"    propKey="top"    elId={el.id} value={style.top}    placeholder="auto" />
                <CSSField label="Right"  propKey="right"  elId={el.id} value={style.right}  placeholder="auto" />
                <CSSField label="Bottom" propKey="bottom" elId={el.id} value={style.bottom} placeholder="auto" />
                <CSSField label="Left"   propKey="left"   elId={el.id} value={style.left}   placeholder="auto" />
              </div>
            )}
            <CSSField label="Z-index"  propKey="zIndex"  elId={el.id} value={style.zIndex}  placeholder="auto" />
            <CSSField label="Overflow" propKey="overflow" elId={el.id} value={style.overflow} placeholder="visible" />
          </Sect>

          {/* ── Spacing ─────────────────────────────────────────────────────── */}
          <Sect title="Spacing">
            <BoxModelControl elId={el.id} style={style} computed={computed} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', gridColumn: '1 / -1' }}>
                <span style={{ flex: '0 0 80px', fontSize: 11, color: '#6b7280' }}>Font</span>
                <FontPicker elId={el.id} value={style.fontFamily} />
              </div>
              <SelectField label="Decoration" propKey="textDecoration" elId={el.id} value={style.textDecoration}
                options={['none','underline','line-through','overline']} />
            </div>
          </Sect>

          {/* ── Background ──────────────────────────────────────────────────── */}
          <Sect title="Background">
            <CSSField label="Color" propKey="background" elId={el.id} value={style.background} type="color" />
            {/* Background image for non-img elements.
                For <img> the image/background picker lives in the Image section above. */}
            {el.tag !== 'img' && (
              <div style={{ marginTop: 6 }}>
                <ImagePicker
                  key={el.id}
                  elId={el.id}
                  tag={el.tag}
                  src={undefined}
                  assetRef={(el as Record<string, string>).assetRef}
                  style={style}
                />
              </div>
            )}
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
            <CSSField label="Opacity"    propKey="opacity"    elId={el.id} value={style.opacity}    placeholder="1" />
            <CSSField label="Box shadow" propKey="boxShadow"  elId={el.id} value={style.boxShadow}  placeholder="0 2px 8px rgba(0,0,0,.1)" />
            <CSSField label="Transform"  propKey="transform"  elId={el.id} value={style.transform}  placeholder="rotate(0deg)" />
            <CSSField label="Transition" propKey="transition" elId={el.id} value={style.transition} placeholder="all .2s ease" />
            <CSSField label="Cursor"     propKey="cursor"     elId={el.id} value={style.cursor}     placeholder="default" />
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

          {/* ── Computed styles reference ────────────────────────────────────── */}
          <ComputedStylesSection elId={el.id} computed={computed} inlineStyle={style} />

          {/* ── Danger zone ─────────────────────────────────────────────── */}
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
    </ComputedCtx.Provider>
  );
}
