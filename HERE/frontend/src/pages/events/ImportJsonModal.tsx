import { useRef, useState } from 'react';
import { Upload, Loader2, CheckCircle2, XCircle, FileJson } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { createEvent, type EventStatus, type CreateEventData, type EventHighlight, type EventContact } from '../../api/events';

interface RawEntry {
  title?: unknown;
  date?: unknown;
  time?: unknown;
  location?: unknown;
  attendees?: unknown;
  description?: unknown;
  paragraphs?: unknown;
  highlights?: unknown;
  images?: unknown;
  contacts?: unknown;
}

interface ParseResult {
  valid: CreateEventData[];
  errors: string[];
}

function asStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((x): x is string => typeof x === 'string');
  return arr.length ? arr : undefined;
}

function asHighlights(v: unknown): EventHighlight[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((x): x is EventHighlight =>
    x && typeof x === 'object' && typeof (x as EventHighlight).label === 'string' && typeof (x as EventHighlight).icon === 'string');
  return arr.length ? arr : undefined;
}

function asContacts(v: unknown): EventContact[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((x): x is EventContact =>
    x && typeof x === 'object' && typeof (x as EventContact).label === 'string' && typeof (x as EventContact).email === 'string');
  return arr.length ? arr : undefined;
}

function parseEntries(text: string, status: EventStatus): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { valid: [], errors: ['Not valid JSON.'] };
  }
  if (!Array.isArray(data)) {
    return { valid: [], errors: ['Expected a JSON array of events.'] };
  }

  const valid: CreateEventData[] = [];
  const errors: string[] = [];

  data.forEach((raw: RawEntry, i) => {
    const title = typeof raw?.title === 'string' ? raw.title.trim() : '';
    const date = typeof raw?.date === 'string' ? raw.date.trim() : '';
    const location = typeof raw?.location === 'string' ? raw.location.trim() : '';
    if (!title || !date || !location) {
      errors.push(`Entry ${i + 1}: missing "title", "date" or "location" — skipped.`);
      return;
    }
    valid.push({
      status,
      title,
      date,
      location,
      time: status === 'upcoming' && typeof raw.time === 'string' ? raw.time.trim() || undefined : undefined,
      attendees: status === 'past' && typeof raw.attendees === 'string' ? raw.attendees.trim() || undefined : undefined,
      description: typeof raw.description === 'string' ? raw.description : '',
      paragraphs: asStringArray(raw.paragraphs),
      highlights: asHighlights(raw.highlights),
      images: asStringArray(raw.images),
      contacts: status === 'upcoming' ? asContacts(raw.contacts) : undefined,
    });
  });

  return { valid, errors };
}

export function ImportJsonModal({ siteId, status, onClose, onImported }: {
  siteId: string;
  status: EventStatus;
  onClose: () => void;
  onImported: () => void;
}) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ ok: number; failed: string[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { valid, errors } = text.trim() ? parseEntries(text, status) : { valid: [], errors: [] };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    const content = await file.text();
    setText(content);
    e.target.value = '';
  };

  const handleImport = async () => {
    if (!valid.length) return;
    setImporting(true);
    setResult(null);
    const outcomes = await Promise.allSettled(valid.map(data => createEvent(siteId, data)));
    const failed = outcomes
      .map((o, i) => (o.status === 'rejected' ? valid[i].title : null))
      .filter((n): n is string => n !== null);
    const ok = outcomes.length - failed.length;
    setResult({ ok, failed });
    setImporting(false);
    if (ok > 0) onImported();
  };

  return (
    <Modal
      title={`Import ${status === 'upcoming' ? 'Upcoming Events' : 'Past Events'} from JSON`}
      subtitle={`Paste or upload a JSON array of ${status} events`}
      onClose={onClose}
      wide
    >
      <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'block' }}>
          <div style={{
            border: '2px dashed var(--border)', borderRadius: 'var(--r-md)', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'var(--bg-sunk)',
          }}>
            <FileJson size={20} style={{ color: 'var(--fg-subtle)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: fileName ? 'var(--fg)' : 'var(--fg-subtle)' }}>
              {fileName || 'Click to select a .json file'}
            </span>
            <input ref={fileRef} type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={handleFile} />
          </div>
        </label>

        <div className="field">
          <label className="field__label">Or paste JSON</label>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setResult(null); }}
            rows={10}
            placeholder='[ { "title": "…", "date": "…", "location": "…", "description": "…" } ]'
            className="input"
            style={{ height: 'auto', resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 12 }}
          />
        </div>

        {text.trim() && (
          <div style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
            {valid.length} valid entr{valid.length !== 1 ? 'ies' : 'y'} found
            {errors.length > 0 && `, ${errors.length} skipped`}
          </div>
        )}

        {errors.length > 0 && (
          <div style={{ background: 'var(--danger-soft, #fef2f2)', border: '1px solid var(--danger, #fca5a5)', borderRadius: 'var(--r-sm)', padding: '8px 12px', fontSize: 12, color: 'var(--danger, #dc2626)' }}>
            {errors.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        )}

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success, #059669)' }}>
              <CheckCircle2 size={14} /> {result.ok} imported successfully
            </div>
            {result.failed.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: 'var(--danger, #dc2626)' }}>
                <XCircle size={14} style={{ marginTop: 1, flexShrink: 0 }} />
                <span>Failed: {result.failed.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="modal__foot" style={{ justifyContent: 'flex-end' }}>
        <button type="button" onClick={onClose} className="btn btn--ghost">
          {result ? 'Close' : 'Cancel'}
        </button>
        <button
          type="button"
          onClick={handleImport}
          disabled={!valid.length || importing}
          className="btn btn--primary"
        >
          {importing ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          Import {valid.length ? `(${valid.length})` : ''}
        </button>
      </div>
    </Modal>
  );
}
