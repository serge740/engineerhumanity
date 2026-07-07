import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Image as ImageIcon, Upload, X, Loader2 } from 'lucide-react';
import { uploadAsset } from '../../api/assets';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

interface Props {
  siteId: string;
  value:  string | undefined;
  onChange: (url: string | undefined) => void;
}

// A deliberately minimal image picker for a single Data-tab table cell — just
// URL-or-upload, no gradients/background modes. The full-featured picker used
// by the Inspector (right/controls/ImagePicker.tsx) is intentionally not reused
// here since that logic is coupled to editing a PageElement's style.
export function ImageCellPicker({ siteId, value, onChange }: Props) {
  const [open, setOpen]         = useState(false);
  const [urlDraft, setUrlDraft] = useState(value ?? '');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const src = value ? (value.startsWith('http') ? value : `${BACKEND_URL}${value}`) : undefined;

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
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
    </div>
  );
}
