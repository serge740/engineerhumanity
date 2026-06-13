import { useRef, useState } from 'react';
import { useEditorStore } from '../../../../stores/editorStore';
import { uploadAsset, deleteAsset } from '../../../../api/assets';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

type Mode = 'image'  | 'background';
type Tab  = 'url'    | 'upload';

export interface ImagePickerProps {
  elId:     string;
  tag:      string;
  src:      string | undefined;
  assetRef: string | undefined;
  style:    Record<string, string>;
}

const ACCEPT = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/avif';

// ── Gradient state ────────────────────────────────────────────────────────────
interface GradState {
  on:    boolean;
  angle: number;  // degrees
  c1:    string;  // hex color
  a1:    number;  // 0–1 opacity
  c2:    string;
  a2:    number;
}
const DEFAULT_GRAD: GradState = { on: false, angle: 180, c1: '#000000', a1: 0, c2: '#000000', a2: 0.65 };

const DIRECTIONS = [
  { angle: 0,   icon: '↑' },
  { angle: 45,  icon: '↗' },
  { angle: 90,  icon: '→' },
  { angle: 135, icon: '↘' },
  { angle: 180, icon: '↓' },
  { angle: 270, icon: '←' },
];

// ── CSS ↔ gradient helpers ────────────────────────────────────────────────────

function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

function gradToCss(g: GradState): string {
  return `linear-gradient(${g.angle}deg,${hexAlpha(g.c1, g.a1)},${hexAlpha(g.c2, g.a2)})`;
}

// Parse our own gradient format back into GradState
const GRAD_RE =
  /linear-gradient\(\s*(\d+)deg\s*,\s*rgba\((\d+),(\d+),(\d+),([\d.]+)\)\s*,\s*rgba\((\d+),(\d+),(\d+),([\d.]+)\)\s*\)/;

function parseCssToGrad(css: string | undefined): GradState | null {
  if (!css) return null;
  const m = css.match(GRAD_RE);
  if (!m) return null;
  const toHex = (r: string, g: string, b: string) =>
    '#' + [r, g, b].map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
  return {
    on: true, angle: parseInt(m[1]),
    c1: toHex(m[2], m[3], m[4]), a1: parseFloat(m[5]),
    c2: toHex(m[6], m[7], m[8]), a2: parseFloat(m[9]),
  };
}

// Extract url("...") from a background-image value that might also contain gradient(...)
function extractBgUrl(bgImage: string | undefined): string | undefined {
  if (!bgImage) return undefined;
  const m = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
  return m?.[1];
}

// Extract just the gradient prefix (before the first url(...)) from background-image
function extractBgGradient(bgImage: string | undefined): string | undefined {
  if (!bgImage) return undefined;
  const urlIdx = bgImage.search(/url\(/);
  if (urlIdx === -1) {
    return bgImage.includes('gradient') ? bgImage.trim() : undefined;
  }
  const before = bgImage.slice(0, urlIdx).replace(/,\s*$/, '').trim();
  return before || undefined;
}

function wrapBgUrl(url: string) { return `url("${url}")`; }

function composeBgImage(gradient: string | undefined, url: string | undefined): string | undefined {
  const parts = [gradient, url ? wrapBgUrl(url) : undefined].filter(Boolean) as string[];
  return parts.length ? parts.join(', ') : undefined;
}

// ── Sub-components ────────────────────────────────────────────────────────────

const IUpload = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v9M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const ILink = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const ITrash = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 4.5h9M6.5 4.5V3.5a1 1 0 011-1h1a1 1 0 011 1v1M5 4.5l.5 8a1 1 0 001 1h3a1 1 0 001-1l.5-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

// Segmented control
function Seg({ label, value, options, onChange }: {
  label:   string;
  value:   string;
  options: { v: string; l: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
      <span style={{ flex: '0 0 72px', fontSize: 11, color: '#6b7280', flexShrink: 0 }}>{label}</span>
      <div style={{ display: 'flex', flex: 1, background: '#f3f4f6', borderRadius: 5, padding: 2, gap: 1 }}>
        {options.map(o => (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            flex: 1, border: 'none', borderRadius: 4,
            padding: '3px 2px', fontSize: 10, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
            background: value === o.v ? '#fff'    : 'transparent',
            color:      value === o.v ? '#4f46e5' : '#6b7280',
            boxShadow:  value === o.v ? '0 1px 3px rgba(0,0,0,.1)' : 'none',
          }}>{o.l}</button>
        ))}
      </div>
    </div>
  );
}

// 3×3 position grid
const POS_GRID = [
  ['top left',    'top',    'top right'],
  ['left',        'center', 'right'],
  ['bottom left', 'bottom', 'bottom right'],
];
function PositionPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const nv = value.trim().toLowerCase() || 'center';
  const isActive = (pos: string) => {
    const np = pos.trim().toLowerCase();
    if (nv === np) return true;
    if (np === 'top'    && nv === 'top center')    return true;
    if (np === 'bottom' && nv === 'bottom center') return true;
    if (np === 'left'   && nv === 'center left')   return true;
    if (np === 'right'  && nv === 'center right')  return true;
    return false;
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
      <span style={{ flex: '0 0 72px', fontSize: 11, color: '#6b7280', flexShrink: 0 }}>Position</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,18px)', gap: 2 }}>
        {POS_GRID.flat().map(pos => (
          <button key={pos} title={pos} onClick={() => onChange(pos)} style={{
            width: 18, height: 18, padding: 0,
            border: `1px solid ${isActive(pos) ? '#6366f1' : '#d1d5db'}`,
            borderRadius: 3, cursor: 'pointer',
            background: isActive(pos) ? '#6366f1' : '#f9fafb',
          }} />
        ))}
      </div>
    </div>
  );
}

// Color stop row: swatch + alpha slider
function ColorStop({ label, color, alpha, onColor, onAlpha }: {
  label:   string;
  color:   string;
  alpha:   number;
  onColor: (v: string) => void;
  onAlpha: (v: number) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
      <span style={{ flex: '0 0 72px', fontSize: 11, color: '#6b7280', flexShrink: 0 }}>{label}</span>
      <input type="color" value={color} onChange={e => onColor(e.target.value)}
        style={{ width: 24, height: 22, padding: '1px 1px', border: '1px solid #d1d5db', borderRadius: 3, cursor: 'pointer', flexShrink: 0 }} />
      <input type="range" min={0} max={100} value={Math.round(alpha * 100)}
        onChange={e => onAlpha(parseInt(e.target.value) / 100)}
        style={{ flex: 1, accentColor: '#6366f1', height: 3 }} />
      <span style={{ fontSize: 10, color: '#6b7280', width: 28, textAlign: 'right', flexShrink: 0 }}>
        {Math.round(alpha * 100)}%
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ImagePicker({ elId, tag, src, assetRef, style }: ImagePickerProps) {
  const siteId         = useEditorStore(s => s.siteId);
  const patchElement   = useEditorStore(s => s.patchElement);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const removeStyle    = useEditorStore(s => s.removeStyle);
  const captureHistory = useEditorStore(s => s.captureHistory);

  const isImg  = tag === 'img';
  const bgUrl  = extractBgUrl(style.backgroundImage);

  // Determine initial mode
  const initMode: Mode = bgUrl ? 'background' : (isImg ? 'image' : 'background');

  const [mode, setMode]         = useState<Mode>(initMode);
  const [tab,  setTab]          = useState<Tab>(() => (initMode === 'image' ? src : bgUrl) ? 'url' : 'upload');
  const [urlDraft, setUrlDraft] = useState(() => initMode === 'image' ? (src ?? '') : (bgUrl ?? ''));
  const [uploading, setUploading] = useState(false);
  const [error,  setError]      = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Gradient state ─────────────────────────────────────────────────────────
  const [grad, setGrad] = useState<GradState>(() => {
    if (initMode === 'background') {
      const existing = extractBgGradient(style.backgroundImage);
      return parseCssToGrad(existing) ?? DEFAULT_GRAD;
    } else {
      return parseCssToGrad(style.maskImage) ?? DEFAULT_GRAD;
    }
  });

  const currentUrl = mode === 'image' ? src : bgUrl;
  const isUploaded = !!assetRef;

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const tryDeleteOld = (ref: string) => {
    deleteAsset(siteId, ref).catch(() => {});
  };

  // Apply gradient to the element according to current mode
  const applyGrad = (g: GradState, currentMode: Mode) => {
    const gradStr = g.on ? gradToCss(g) : undefined;
    if (currentMode === 'background') {
      // Rebuild background-image: gradient (if on) + url
      const url = extractBgUrl(style.backgroundImage) ?? extractBgUrl(src);
      const composed = composeBgImage(gradStr, url);
      if (composed) patchStyleLive(elId, 'backgroundImage', composed);
      else          removeStyle(elId, 'backgroundImage');
    } else {
      // Image mode: mask-image for fade/transparency effects
      if (g.on) {
        patchStyleLive(elId, 'maskImage',        gradStr!);
        patchStyleLive(elId, 'WebkitMaskImage',  gradStr!);
      } else {
        removeStyle(elId, 'maskImage');
        removeStyle(elId, 'WebkitMaskImage');
      }
    }
  };

  const updateGrad = (patch: Partial<GradState>) => {
    const next = { ...grad, ...patch };
    setGrad(next);
    applyGrad(next, mode);
  };

  // ── URL / upload helpers ──────────────────────────────────────────────────────

  const applyUrl = (url: string | undefined, uploadedId?: string) => {
    if (mode === 'image') {
      patchElement(elId, { src: url, assetRef: uploadedId });
    } else {
      // For background, keep existing gradient prefix + new url
      const gradStr = grad.on ? gradToCss(grad) : undefined;
      const composed = composeBgImage(gradStr, url);
      if (composed) patchStyleLive(elId, 'backgroundImage', composed);
      else          removeStyle(elId, 'backgroundImage');
      patchElement(elId, { assetRef: uploadedId });
    }
  };

  const commitUrl = (url: string) => {
    const trimmed = url.trim();
    captureHistory();
    if (assetRef) tryDeleteOld(assetRef);
    applyUrl(trimmed || undefined);
    if (!trimmed) patchElement(elId, { assetRef: undefined });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large (max 10 MB).');
      e.target.value = '';
      return;
    }
    setError(null);
    setUploading(true);
    try {
      if (assetRef) tryDeleteOld(assetRef);
      const asset   = await uploadAsset(siteId, file, 'image');
      const fullUrl = `${BACKEND_URL}${asset.url}`;
      captureHistory();
      applyUrl(fullUrl, asset.id);
      setUrlDraft(fullUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleClear = () => {
    if (assetRef) tryDeleteOld(assetRef);
    captureHistory();
    if (mode === 'image') {
      patchElement(elId, { src: undefined, assetRef: undefined });
      if (grad.on) { removeStyle(elId, 'maskImage'); removeStyle(elId, 'WebkitMaskImage'); }
    } else {
      // Keep gradient-only if gradient is enabled (no url part)
      const gradStr = grad.on ? gradToCss(grad) : undefined;
      if (gradStr) patchStyleLive(elId, 'backgroundImage', gradStr);
      else         removeStyle(elId, 'backgroundImage');
      patchElement(elId, { assetRef: undefined });
    }
    setUrlDraft('');
  };

  // ── Mode switch ───────────────────────────────────────────────────────────────

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    const url = currentUrl;
    captureHistory();

    if (next === 'background') {
      // image → background: move src to backgroundImage, apply gradient there
      const gradStr = grad.on ? gradToCss(grad) : undefined;
      const composed = composeBgImage(gradStr, url);
      if (composed) patchStyleLive(elId, 'backgroundImage', composed);
      patchElement(elId, { src: undefined });
      // Remove image-mode mask if it was on
      removeStyle(elId, 'maskImage');
      removeStyle(elId, 'WebkitMaskImage');
    } else {
      // background → image: move url to src, apply gradient as mask
      if (url) patchElement(elId, { src: url, assetRef: assetRef });
      removeStyle(elId, 'backgroundImage');
      if (grad.on) {
        const g = gradToCss(grad);
        patchStyleLive(elId, 'maskImage', g);
        patchStyleLive(elId, 'WebkitMaskImage', g);
      }
    }

    setMode(next);
    setUrlDraft(url ?? '');
  };

  // ── Tab button style ──────────────────────────────────────────────────────────
  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '4px 0', fontSize: 11, fontWeight: 600,
    border: 'none', cursor: 'pointer', borderRadius: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
    background: active ? '#fff'    : 'transparent',
    color:      active ? '#4f46e5' : '#6b7280',
    boxShadow:  active ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
  });

  // ── Render ─────────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* ── Mode toggle (img elements only) ─────────────────────────────── */}
      {isImg && (
        <div style={{ display: 'flex', gap: 3, background: '#f3f4f6', padding: 3, borderRadius: 6 }}>
          <button style={tabBtn(mode === 'image')}      onClick={() => switchMode('image')}>🖼 Image</button>
          <button style={tabBtn(mode === 'background')} onClick={() => switchMode('background')}>🎨 Background</button>
        </div>
      )}

      {/* ── Preview ──────────────────────────────────────────────────────── */}
      {currentUrl ? (
        <div style={{
          position: 'relative', borderRadius: 6, overflow: 'hidden',
          border: '1px solid #e9e9ee', background: '#f9fafb',
          height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {mode === 'image' ? (
            <img src={currentUrl} alt=""
              style={{
                maxWidth: '100%', maxHeight: '100%', display: 'block',
                objectFit: (style.objectFit as React.CSSProperties['objectFit']) || 'contain',
                maskImage: grad.on ? gradToCss(grad) : undefined,
                WebkitMaskImage: grad.on ? gradToCss(grad) : undefined,
              }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: composeBgImage(grad.on ? gradToCss(grad) : undefined, currentUrl),
              backgroundSize:     style.backgroundSize     || 'cover',
              backgroundPosition: style.backgroundPosition || 'center',
              backgroundRepeat:   style.backgroundRepeat   || 'no-repeat',
            }} />
          )}

          {/* source badge */}
          <span style={{
            position: 'absolute', top: 4, left: 4,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
            padding: '2px 5px', borderRadius: 3,
            background: isUploaded ? '#d1fae5' : '#eff6ff',
            color:      isUploaded ? '#065f46' : '#1e40af',
          }}>
            {isUploaded ? '↑ uploaded' : '🔗 url'}
          </span>

          <button title="Remove image" onClick={handleClear} style={{
            position: 'absolute', top: 4, right: 4,
            border: 'none', borderRadius: 4, padding: '3px 5px',
            background: 'rgba(220,38,38,0.85)', color: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 10, fontWeight: 600,
          }}>
            <ITrash /> Remove
          </button>
        </div>
      ) : (
        <div style={{
          height: 52, border: '1px dashed #d1d5db', borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#9ca3af', fontSize: 11,
        }}>No image set</div>
      )}

      {/* ── URL / Upload tabs ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 3, background: '#f3f4f6', padding: 3, borderRadius: 6 }}>
        <button style={tabBtn(tab === 'url')}    onClick={() => setTab('url')}><ILink /> URL</button>
        <button style={tabBtn(tab === 'upload')} onClick={() => setTab('upload')}><IUpload /> Upload</button>
      </div>

      {tab === 'url' && (
        <input type="text" value={urlDraft} placeholder="https://example.com/image.jpg"
          style={{ border: '1px solid #e9e9ee', borderRadius: 5, padding: '5px 8px', fontSize: 11, width: '100%', boxSizing: 'border-box' }}
          onChange={e => setUrlDraft(e.target.value)}
          onBlur={() => commitUrl(urlDraft)}
          onKeyDown={e => { if (e.key === 'Enter') commitUrl(urlDraft); }}
        />
      )}

      {tab === 'upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <input ref={fileRef} type="file" accept={ACCEPT} style={{ display: 'none' }} onChange={handleFileChange} />
          <button disabled={uploading} onClick={() => fileRef.current?.click()} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '7px 12px', border: '1px dashed #6366f1', borderRadius: 6,
            background: uploading ? '#f5f3ff' : '#fafafa',
            color: '#4f46e5', fontSize: 12, fontWeight: 600,
            cursor: uploading ? 'wait' : 'pointer', width: '100%',
          }}>
            {uploading ? (
              <><span style={{ width: 12, height: 12, border: '2px solid #c4b5fd', borderTopColor: '#4f46e5', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Uploading…</>
            ) : (
              <><IUpload /> {currentUrl && isUploaded ? 'Replace image' : 'Choose image'}</>
            )}
          </button>
          <p style={{ fontSize: 10, color: '#9ca3af', margin: 0, textAlign: 'center' }}>
            JPEG · PNG · GIF · WebP · SVG · AVIF · max 10 MB
          </p>
        </div>
      )}

      {/* ── Image mode: object-fit / anchor ───────────────────────────────── */}
      {currentUrl && mode === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 4, borderTop: '1px solid #f0f0f4' }}>
          <Seg label="Fit" value={style.objectFit || 'fill'}
            options={[{ v:'cover',l:'Cover' },{ v:'contain',l:'Contain' },{ v:'fill',l:'Fill' },{ v:'none',l:'None' }]}
            onChange={v => patchStyleLive(elId, 'objectFit', v)} />
          <Seg label="Anchor" value={style.objectPosition || 'center'}
            options={[{ v:'top',l:'Top' },{ v:'center',l:'Center' },{ v:'bottom',l:'Bottom' }]}
            onChange={v => patchStyleLive(elId, 'objectPosition', v)} />
        </div>
      )}

      {/* ── Background mode: size / position / repeat ─────────────────────── */}
      {currentUrl && mode === 'background' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 4, borderTop: '1px solid #f0f0f4' }}>
          <Seg label="Size" value={style.backgroundSize || 'cover'}
            options={[{ v:'cover',l:'Cover' },{ v:'contain',l:'Contain' },{ v:'auto',l:'Auto' },{ v:'100%',l:'100%' }]}
            onChange={v => patchStyleLive(elId, 'backgroundSize', v)} />
          <PositionPicker value={style.backgroundPosition || 'center'}
            onChange={v => patchStyleLive(elId, 'backgroundPosition', v)} />
          <Seg label="Repeat" value={style.backgroundRepeat || 'no-repeat'}
            options={[{ v:'no-repeat',l:'None' },{ v:'repeat',l:'Tile' },{ v:'repeat-x',l:'→' },{ v:'repeat-y',l:'↓' }]}
            onChange={v => patchStyleLive(elId, 'backgroundRepeat', v)} />
        </div>
      )}

      {/* ── Gradient overlay ──────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #f0f0f4', paddingTop: 6 }}>
        {/* Header + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: grad.on ? 6 : 0 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>
            {mode === 'image' ? 'Gradient fade' : 'Gradient overlay'}
          </span>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            {/* Toggle switch */}
            <div
              onClick={() => updateGrad({ on: !grad.on })}
              style={{
                width: 28, height: 15, borderRadius: 8, cursor: 'pointer', position: 'relative', flexShrink: 0,
                background: grad.on ? '#6366f1' : '#d1d5db', transition: 'background .2s',
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: grad.on ? 14 : 2,
                width: 11, height: 11, borderRadius: '50%', background: '#fff',
                transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)',
              }} />
            </div>
            <span style={{ fontSize: 10, color: '#6b7280' }}>{grad.on ? 'On' : 'Off'}</span>
          </label>
        </div>

        {grad.on && (
          <>
            {/* Hint for image mode */}
            {mode === 'image' && (
              <p style={{ fontSize: 10, color: '#9ca3af', margin: '0 0 5px', lineHeight: 1.4 }}>
                Applies as a CSS mask — controls where the image fades to transparent.
              </p>
            )}

            {/* Direction */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
              <span style={{ flex: '0 0 72px', fontSize: 11, color: '#6b7280', flexShrink: 0 }}>Direction</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {DIRECTIONS.map(d => (
                  <button key={d.angle} title={`${d.angle}°`} onClick={() => updateGrad({ angle: d.angle })} style={{
                    width: 24, height: 24, border: `1px solid ${grad.angle === d.angle ? '#6366f1' : '#d1d5db'}`,
                    borderRadius: 4, cursor: 'pointer',
                    background: grad.angle === d.angle ? '#eef2ff' : '#f9fafb',
                    fontSize: 13, color: grad.angle === d.angle ? '#4f46e5' : '#6b7280',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                  }}>{d.icon}</button>
                ))}
              </div>
            </div>

            {/* Color stops */}
            <ColorStop
              label="From"
              color={grad.c1} alpha={grad.a1}
              onColor={c => updateGrad({ c1: c })}
              onAlpha={a => updateGrad({ a1: a })}
            />
            <ColorStop
              label="To"
              color={grad.c2} alpha={grad.a2}
              onColor={c => updateGrad({ c2: c })}
              onAlpha={a => updateGrad({ a2: a })}
            />

            {/* Live preview swatch */}
            <div style={{
              height: 18, borderRadius: 4, marginTop: 2,
              background: `linear-gradient(${grad.angle}deg, ${hexAlpha(grad.c1, grad.a1)}, ${hexAlpha(grad.c2, grad.a2)})`,
              border: '1px solid #e9e9ee',
            }} />
          </>
        )}
      </div>

      {/* ── Error ─────────────────────────────────────────────────────────── */}
      {error && (
        <div style={{ fontSize: 11, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 5, padding: '5px 8px' }}>
          {error}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
