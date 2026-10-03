import { useRef, useState } from 'react';
import { clampFocus, CENTER } from '../../utils/imageFocus';

interface Props {
  src: string;
  x: number;
  y: number;
  /** width ÷ height of the real card/avatar this preview stands in for */
  aspect: number;
  circle?: boolean;
  onChange: (x: number, y: number) => void;
}

// Live preview at the real card shape. Dragging moves the photo under the cursor
// (the same behaviour as profile-photo crops in Instagram/WhatsApp): the amount
// the photo can slide is the cover-crop overflow, so moving the pointer across the
// whole overflow moves the focus from 0% to 100%.
export function ImageFocusPicker({ src, x, y, aspect, circle, onChange }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const natural = useRef<{ w: number; h: number } | null>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  const overflow = () => {
    const box = boxRef.current?.getBoundingClientRect();
    const n = natural.current;
    if (!box || !n) return null;
    const scale = Math.max(box.width / n.w, box.height / n.h);
    return { ox: n.w * scale - box.width, oy: n.h * scale - box.height };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x, y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    const o = overflow();
    if (!start || !o) return;
    const dx = e.clientX - start.px;
    const dy = e.clientY - start.py;
    // Dragging right reveals more of the left side, so the focus moves left.
    const nx = o.ox > 0 ? start.x - (dx / o.ox) * 100 : start.x;
    const ny = o.oy > 0 ? start.y - (dy / o.oy) * 100 : start.y;
    onChange(clampFocus(nx), clampFocus(ny));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const nudge = (dx: number, dy: number) => onChange(clampFocus(x + dx), clampFocus(y + dy));

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 5 : 1;
    switch (e.key) {
      case 'ArrowLeft':  nudge(-step, 0); break;
      case 'ArrowRight': nudge(step, 0); break;
      case 'ArrowUp':    nudge(0, -step); break;
      case 'ArrowDown':  nudge(0, step); break;
      case 'Home':
      case 'Enter':      onChange(CENTER.x, CENTER.y); break;
      default: return;
    }
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <div
        ref={boxRef}
        role="slider"
        tabIndex={0}
        aria-label="Image position — drag the photo or use the arrow keys"
        aria-valuetext={`${x}% from left, ${y}% from top`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => onChange(CENTER.x, CENTER.y)}
        onKeyDown={onKeyDown}
        style={{
          position: 'relative',
          width: circle ? 200 : '100%',
          maxWidth: '100%',
          aspectRatio: String(aspect),
          overflow: 'hidden',
          borderRadius: circle ? '50%' : 'var(--r-md)',
          background: 'var(--bg-sunk)',
          border: '1px solid var(--border)',
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          onLoad={e => {
            natural.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight };
            setReady(true);
          }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: `${x}% ${y}%`, pointerEvents: 'none',
            opacity: ready ? 1 : 0,
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'var(--fg-subtle)' }}>
        <span>Drag the photo, or use arrow keys · {x}% × {y}%</span>
        <button
          type="button"
          onClick={() => onChange(CENTER.x, CENTER.y)}
          className="btn btn--sm btn--ghost"
          disabled={x === CENTER.x && y === CENTER.y}
        >
          Center
        </button>
      </div>
    </div>
  );
}
