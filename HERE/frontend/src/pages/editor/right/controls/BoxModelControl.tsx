import { useState } from 'react';
import { useEditorStore } from '../../../../stores/editorStore';

// ── Parse CSS spacing shorthand → [top, right, bottom, left] ─────────────────
function parseShorthand(val: string): [string, string, string, string] {
  const parts = val.trim().split(/\s+/);
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0], parts[1], parts[2], parts[3]];
}

function getSide(
  style:    Record<string, string>,
  computed: Record<string, string>,
  prefix:   'padding' | 'margin',
  side:     'Top' | 'Right' | 'Bottom' | 'Left',
): { value: string; fromComputed: boolean } {
  // 1. Individual inline property wins
  const indivKey  = `${prefix}${side}`;
  if (style[indivKey])  return { value: style[indivKey],  fromComputed: false };

  // 2. Shorthand inline property
  if (style[prefix]) {
    const [t, r, b, l] = parseShorthand(style[prefix]);
    return { value: { Top: t, Right: r, Bottom: b, Left: l }[side], fromComputed: false };
  }

  // 3. Individual computed CSS (from <style> block)
  if (computed[indivKey]) return { value: computed[indivKey], fromComputed: true };

  // 4. Shorthand computed CSS
  if (computed[prefix]) {
    const [t, r, b, l] = parseShorthand(computed[prefix]);
    return { value: { Top: t, Right: r, Bottom: b, Left: l }[side], fromComputed: true };
  }

  return { value: '', fromComputed: false };
}

function displayNum(val: string): string {
  if (!val) return '—';
  return val.replace(/px$/, '');
}

// ── Editable zone ─────────────────────────────────────────────────────────────
interface ZoneProps {
  elId:         string;
  propKey:      string;
  value:        string;
  fromComputed: boolean;
  style?:       React.CSSProperties;
  label?:       string;
}

function EditableZone({ elId, propKey, value, fromComputed, style: extraStyle, label }: ZoneProps) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState('');
  const capture        = useEditorStore(s => s.captureHistory);
  const patchStyleLive = useEditorStore(s => s.patchStyleLive);
  const removeStyle    = useEditorStore(s => s.removeStyle);

  const commit = (v: string) => {
    setEditing(false);
    const trimmed = v.trim();
    if (!trimmed) { removeStyle(elId, propKey); return; }
    const withUnit = /^\d+(\.\d+)?$/.test(trimmed) ? trimmed + 'px' : trimmed;
    patchStyleLive(elId, propKey, withUnit);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        style={{
          width: 44, textAlign: 'center', border: '1px solid #6366f1',
          borderRadius: 4, fontSize: 11, padding: '1px 2px',
          background: '#fff', ...extraStyle,
        }}
        onChange={e => setDraft(e.target.value)}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') commit(draft);
          if (e.key === 'Escape') setEditing(false);
        }}
      />
    );
  }

  return (
    <div
      onClick={() => { capture(); setDraft(value.replace(/px$/, '')); setEditing(true); }}
      title={label ? `${label}: ${value || '0'}${fromComputed ? ' (from CSS)' : ''}` : propKey}
      style={{
        minWidth: 24, padding: '0 4px', textAlign: 'center',
        fontSize: 10, fontWeight: 600,
        // amber when value comes from CSS class, dimmer when truly empty
        color: fromComputed ? '#92400e' : (value ? 'inherit' : '#aaa'),
        fontStyle: fromComputed ? 'italic' : 'normal',
        cursor: 'pointer',
        borderRadius: 3,
        ...extraStyle,
      }}
    >
      {displayNum(value)}
    </div>
  );
}

// ── Box Model Visual ───────────────────────────────────────────────────────────
interface Props {
  elId:     string;
  style:    Record<string, string>;
  computed?: Record<string, string>;
}

export function BoxModelControl({ elId, style, computed = {} }: Props) {
  const get = (prefix: 'padding' | 'margin', side: 'Top' | 'Right' | 'Bottom' | 'Left') =>
    getSide(style, computed, prefix, side);

  const mT = get('margin',  'Top');
  const mR = get('margin',  'Right');
  const mB = get('margin',  'Bottom');
  const mL = get('margin',  'Left');
  const pT = get('padding', 'Top');
  const pR = get('padding', 'Right');
  const pB = get('padding', 'Bottom');
  const pL = get('padding', 'Left');

  const BOX: React.CSSProperties = {
    position: 'relative', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  };

  const LABEL: React.CSSProperties = {
    position: 'absolute', top: 2, left: 4,
    fontSize: 9, fontWeight: 700, letterSpacing: '0.5px',
    textTransform: 'uppercase', opacity: 0.55,
  };

  return (
    <div style={{ padding: '4px 0' }}>
      {/* Margin (amber) */}
      <div style={{ ...BOX, background: '#fef3c7', borderRadius: 6, padding: '20px', color: '#92400e' }}>
        <span style={LABEL}>Margin</span>

        <EditableZone elId={elId} propKey="marginTop"    value={mT.value} fromComputed={mT.fromComputed} label="Margin top"
          style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)' }} />
        <EditableZone elId={elId} propKey="marginRight"  value={mR.value} fromComputed={mR.fromComputed} label="Margin right"
          style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }} />
        <EditableZone elId={elId} propKey="marginBottom" value={mB.value} fromComputed={mB.fromComputed} label="Margin bottom"
          style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)' }} />
        <EditableZone elId={elId} propKey="marginLeft"   value={mL.value} fromComputed={mL.fromComputed} label="Margin left"
          style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)' }} />

        {/* Padding (green) */}
        <div style={{ ...BOX, background: '#d1fae5', borderRadius: 4, padding: '20px', color: '#065f46', width: '100%' }}>
          <span style={{ ...LABEL, top: 2, left: 4 }}>Padding</span>

          <EditableZone elId={elId} propKey="paddingTop"    value={pT.value} fromComputed={pT.fromComputed} label="Padding top"
            style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)' }} />
          <EditableZone elId={elId} propKey="paddingRight"  value={pR.value} fromComputed={pR.fromComputed} label="Padding right"
            style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }} />
          <EditableZone elId={elId} propKey="paddingBottom" value={pB.value} fromComputed={pB.fromComputed} label="Padding bottom"
            style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)' }} />
          <EditableZone elId={elId} propKey="paddingLeft"   value={pL.value} fromComputed={pL.fromComputed} label="Padding left"
            style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)' }} />

          {/* Content box */}
          <div style={{
            background: '#fff', border: '1px dashed #a7f3d0',
            borderRadius: 3, padding: '6px 20px',
            fontSize: 10, color: '#9ca3af', fontWeight: 600,
            textAlign: 'center', minWidth: 60,
          }}>
            content
          </div>
        </div>
      </div>

      <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 6, textAlign: 'center' }}>
        Click any value to edit · <em style={{ color: '#92400e' }}>italic = from CSS</em>
      </p>
    </div>
  );
}
