import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Image as ImageIcon, Upload, X, Loader2, Crosshair } from 'lucide-react';
import { uploadAsset } from '../../api/assets';
import { Modal } from '../../components/ui/Modal';
import { ImageFocusPicker } from './ImageFocusPicker';
import { focusStyle, CENTER, type Focus } from '../../utils/imageFocus';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

interface Props {
  siteId: string;
  value:  string | undefined;
  onChange: (url: string | undefined) => void;
  /** Saved focus point; null/undefined means the surface's default crop. */
  focusX?: number | null;
  focusY?: number | null;
  onFocusChange?: (x: number, y: number) => void;
  /** Default crop for surfaces that used to hard-code `object-top` (e.g. team photos). */
  focusFallback?: Focus;
  /** Card/avatar shape the adjust preview should match (width ÷ height). */
  focusAspect?: number;
  focusCircle?: boolean;
}

// A deliberately minimal image picker for a single cell or form field — URL or
// upload, plus an optional focus adjustment. The full-featured picker used by the
// Inspector (right/controls/ImagePicker.tsx) is intentionally not reused here since
// that logic is coupled to editing a PageElement's style.
export function ImageCellPicker({
  siteId, value, onChange, focusX, focusY, onFocusChange, focusFallback, focusAspect, focusCircle,
}: Props) {
  const [open, setOpen]           = useState(false);
  const [urlDraft, setUrlDraft]   = useState(value ?? '');
  const [uploading, setUploading] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const [draft, setDraft]         = useState<Focus>(CENTER);
  const fileRef = useRef<HTMLInputElement>(null);

  const src = value ? (value.startsWith('http') ? value : `${BACKEND_URL}${value}`) : undefined;
  const fallback = focusFallback ?? CENTER;
  const current: Focus = { x: focusX ?? fallback.x, y: focusY ?? fallback.y };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const asset = await uploadAsset(siteId, file, 'image');
      const full  = asset.url.startsWith('http') ? asset.url : `${BACKEND_URL}${asset.url}`;
      onChange(full);
      setUrlDraft(full);
      setOpen(false);
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const openAdjust = () => {
    setDraft(current);
    setOpen(false);
    setAdjusting(true);
  };

  const saveAdjust = () => {
    onFocusChange?.(draft.x, draft.y);
    setAdjusting(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: 56, height: 56, borderRadius: 'var(--r-sm)', border: '1px solid var(--border)',
          background: 'var(--bg-sunk)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {src ? (
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', ...focusStyle(focusX, focusY, fallback) }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <ImageIcon size={16} style={{ color: 'var(--fg-subtle)' }} />
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute', zIndex: 20, top: '100%', left: 0, marginTop: 4, width: 224,
          background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-lg)', padding: 12, display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-subtle)' }}>Image</span>
            <button onClick={() => setOpen(false)} className="icon-btn" style={{ border: 'none', width: 22, height: 22 }}><X size={13} /></button>
          </div>
          <input
            type="text"
            value={urlDraft}
            placeholder="https://example.com/image.jpg"
            onChange={e => setUrlDraft(e.target.value)}
            onBlur={() => onChange(urlDraft.trim() || undefined)}
            onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            className="input"
          />
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="btn btn--block btn--sm"
            style={{ borderStyle: 'dashed', color: 'var(--accent)' }}
          >
            {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          {value && onFocusChange && (
            <button type="button" onClick={openAdjust} className="btn btn--block btn--sm">
              <Crosshair size={12} /> Adjust position
            </button>
          )}
          {value && (
            <button
              type="button"
              onClick={() => { onChange(undefined); setUrlDraft(''); }}
              className="btn btn--danger btn--sm"
              style={{ border: 'none', background: 'none' }}
            >
              Remove image
            </button>
          )}
        </div>
      )}

      {adjusting && src && onFocusChange && (
        <Modal
          title="Adjust image position"
          subtitle="Choose which part of the photo stays visible on the card"
          onClose={() => setAdjusting(false)}
        >
          <div className="modal__body">
            <ImageFocusPicker
              src={src}
              x={draft.x}
              y={draft.y}
              aspect={focusAspect ?? 4 / 3}
              circle={focusCircle}
              onChange={(x, y) => setDraft({ x, y })}
            />
          </div>
          <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAdjusting(false)} className="btn btn--ghost">Cancel</button>
            <button type="button" onClick={saveAdjust} className="btn btn--primary">Save position</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
