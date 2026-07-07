import { useRef, useState } from 'react';
import { Upload, Loader2, CheckCircle2, XCircle, FileJson } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { createStory, type StoryGroup, type CreateStoryData, type StorySection } from '../../api/stories';

interface RawEntry {
  name?: unknown;
  role?: unknown;
  image?: unknown;
  summary?: unknown;
  story?: unknown;
  intro?: unknown;
  sections?: unknown;
}

interface ParseResult {
  valid: CreateStoryData[];
  errors: string[];
}

function asSections(v: unknown): StorySection[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((x): x is StorySection =>
    x && typeof x === 'object' && typeof (x as StorySection).title === 'string' && typeof (x as StorySection).content === 'string');
  return arr.length ? arr : undefined;
}

function parseEntries(text: string, group: StoryGroup): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { valid: [], errors: ['Not valid JSON.'] };
  }
  if (!Array.isArray(data)) {
    return { valid: [], errors: ['Expected a JSON array of entries.'] };
  }

  const isSummary = group === 'success-summary';
  const valid: CreateStoryData[] = [];
  const errors: string[] = [];

  data.forEach((raw: RawEntry, i) => {
    const name = typeof raw?.name === 'string' ? raw.name.trim() : '';
    if (!name) {
      errors.push(`Entry ${i + 1}: missing "name" — skipped.`);
      return;
    }
    valid.push({
      group,
      name,
      role: !isSummary && typeof raw.role === 'string' ? raw.role.trim() || undefined : undefined,
      image: !isSummary && typeof raw.image === 'string' ? raw.image.trim() || undefined : undefined,
      summary: !isSummary && typeof raw.summary === 'string' ? raw.summary.trim() || undefined : undefined,
      story: isSummary && typeof raw.story === 'string' ? raw.story.trim() || undefined : undefined,
      intro: !isSummary && typeof raw.intro === 'string' ? raw.intro.trim() || undefined : undefined,
      sections: !isSummary ? asSections(raw.sections) : undefined,
    });
  });

  return { valid, errors };
}

const GROUP_LABELS: Record<StoryGroup, string> = {
  success: 'Success Stories',
  'success-summary': 'Success Summaries',
  testimony: 'Testimonials',
};

export function ImportJsonModal({ siteId, group, onClose, onImported }: {
  siteId: string;
  group: StoryGroup;
  onClose: () => void;
  onImported: () => void;
}) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ ok: number; failed: string[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { valid, errors } = text.trim() ? parseEntries(text, group) : { valid: [], errors: [] };

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
    const outcomes = await Promise.allSettled(valid.map(data => createStory(siteId, data)));
    const failed = outcomes
      .map((o, i) => (o.status === 'rejected' ? valid[i].name : null))
      .filter((n): n is string => n !== null);
    const ok = outcomes.length - failed.length;
    setResult({ ok, failed });
    setImporting(false);
    if (ok > 0) onImported();
  };

  return (
    <Modal
      title={`Import ${GROUP_LABELS[group]} from JSON`}
      subtitle={`Paste or upload a JSON array of entries for ${GROUP_LABELS[group]}`}
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
            placeholder={group === 'success-summary'
              ? '[ { "name": "Jane Doe", "story": "…" } ]'
              : '[ { "name": "Jane Doe", "role": "…", "summary": "…", "intro": "…", "sections": [{ "title": "…", "content": "…" }] } ]'}
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
