import type { PageElement } from '../../../api/pages';
import { VOID_TAGS } from '../canvas/ElementView';

// Attributes copied straight through onto the exported tag when present —
// mirrors htmlImport.ts's ATTRS list so import → edit → export round-trips
// without losing anything the importer originally captured.
const ATTRS = [
  'src', 'href', 'alt', 'type', 'name', 'placeholder', 'rel', 'media',
  'target', 'action', 'method', 'enctype', 'for', 'value',
  'min', 'max', 'step', 'rows', 'cols',
  'width', 'height', 'loading', 'decoding', 'crossorigin',
] as const;

// Boolean attributes — rendered bare (no value) when truthy, omitted otherwise.
const BOOL_ATTRS = [
  'checked', 'selected', 'disabled', 'readonly', 'required',
  'multiple', 'async', 'defer',
] as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

function toKebab(prop: string): string {
  return prop.startsWith('--') ? prop : prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

function styleObjToCss(style?: Record<string, string>): string {
  if (!style) return '';
  return Object.entries(style)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${toKebab(k)}: ${v}`)
    .join('; ');
}

function renderAttrs(rec: Record<string, unknown>): string {
  const parts: string[] = [];
  // The importer stores an imported element's original `id`/`onclick` under
  // these internal marker keys instead of real attributes (see htmlImport.ts)
  // so the builder's own `data-el-id` never collides with hand-authored ids.
  // Restored verbatim here — a static export has no framework to rewire event
  // handlers, so inline scripts doing `document.getElementById('x')` only
  // work if the real `id="x"` attribute actually makes it into the output.
  if (typeof rec._htmlId === 'string' && rec._htmlId) parts.push(`id="${escapeAttr(rec._htmlId)}"`);
  if (typeof rec._onClick === 'string' && rec._onClick) parts.push(`onclick="${escapeAttr(rec._onClick)}"`);

  if (rec.class) parts.push(`class="${escapeAttr(String(rec.class))}"`);
  const css = styleObjToCss(rec.style as Record<string, string> | undefined);
  if (css) parts.push(`style="${escapeAttr(css)}"`);
  for (const attr of ATTRS) {
    const v = rec[attr];
    if (v !== undefined && v !== null && v !== '') parts.push(`${attr}="${escapeAttr(String(v))}"`);
  }
  for (const attr of BOOL_ATTRS) {
    if (rec[attr]) parts.push(attr);
  }
  // `data-*` attributes are captured verbatim by htmlImport.ts (scripts
  // commonly key off these, e.g. `el.getAttribute('data-id')`) but weren't
  // being re-emitted here — silently dropping them broke any imported script
  // that depended on one, even though the underlying stored data was fine.
  for (const key of Object.keys(rec)) {
    if (key.startsWith('data-')) parts.push(`${key}="${escapeAttr(String(rec[key]))}"`);
  }
  // Always present, matching ElementView.tsx's live rendering — any element
  // can be a modal's own target (a <dialog> matched by data-el-id), and a
  // trigger elsewhere needs its own data-el-id to be a stable lookup target too.
  if (rec.id) parts.push(`data-el-id="${escapeAttr(rec.id as string)}"`);
  // Modal wiring — see the runtime script appended to the exported document.
  if (typeof rec._modalTarget === 'string') {
    parts.push(`data-modal-target="${escapeAttr(rec._modalTarget)}"`);
  } else if (rec._modalClose) {
    parts.push('data-modal-close');
  }
  return parts.length ? ' ' + parts.join(' ') : '';
}

function renderElement(el: PageElement, indent: string): string {
  if (!el.tag || typeof el.tag !== 'string') return '';
  const rec = el as Record<string, unknown>;

  if (el.tag === 'script') {
    if (rec.src) return `${indent}<script src="${escapeAttr(String(rec.src))}"></script>`;
    if (el.text?.trim()) return `${indent}<script>\n${el.text}\n${indent}</script>`;
    return '';
  }
  if (el.tag === 'style') {
    return el.text?.trim() ? `${indent}<style>\n${el.text}\n${indent}</style>` : '';
  }
  if (el.tag === 'link') {
    const parts = [`rel="${escapeAttr(String(rec.rel ?? ''))}"`, `href="${escapeAttr(String(rec.href ?? ''))}"`];
    if (rec.media) parts.push(`media="${escapeAttr(String(rec.media))}"`);
    return `${indent}<link ${parts.join(' ')}>`;
  }

  const attrs = renderAttrs(rec);
  const innerHTML = rec.innerHTML as string | undefined;
  const isVoid = VOID_TAGS.has(el.tag);

  if (isVoid) return `${indent}<${el.tag}${attrs}>`;

  if (innerHTML) {
    return `${indent}<${el.tag}${attrs}>${innerHTML}</${el.tag}>`;
  }

  const children = el.children ?? [];
  if (children.length > 0) {
    const inner = children.map(c => renderElement(c, indent + '  ')).filter(Boolean).join('\n');
    return `${indent}<${el.tag}${attrs}>\n${inner}\n${indent}</${el.tag}>`;
  }

  const text = el.text ? escapeHtml(el.text) : '';
  return `${indent}<${el.tag}${attrs}>${text}</${el.tag}>`;
}

// Wires up the CMS's built-in "detail modal" pattern (an element carrying
// `_modalTarget`/`_modalClose`, opening/closing a matching <dialog> by
// data-el-id) without any framework — see ElementView.tsx's handleClick for
// the interactive-mode behavior this reproduces for a plain static export.
const MODAL_RUNTIME = `<script>
document.addEventListener('click', function (e) {
  var trigger = e.target.closest('[data-modal-target]');
  if (trigger) {
    var modal = document.querySelector('[data-el-id="' + trigger.getAttribute('data-modal-target') + '"]');
    if (modal && typeof modal.showModal === 'function') { e.preventDefault(); modal.showModal(); }
    return;
  }
  var closer = e.target.closest('[data-modal-close]');
  if (closer) {
    var dialog = closer.closest('dialog');
    if (dialog) { e.preventDefault(); dialog.close(); }
  }
}, true);
</script>`;

export interface ExportOptions {
  title?: string;
  description?: string | null;
}

export function serializePageToHtml(elements: PageElement[], opts: ExportOptions = {}): string {
  const title = opts.title?.trim() || 'Untitled Page';
  const body = elements.map(el => renderElement(el, '    ')).filter(Boolean).join('\n');
  const usesDialog = JSON.stringify(elements).includes('"_modalTarget"');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>${opts.description ? `\n  <meta name="description" content="${escapeAttr(opts.description)}">` : ''}
  <style>*, *::before, *::after { box-sizing: border-box; } html, body { margin: 0; padding: 0; }</style>
</head>
<body>
${body}
${usesDialog ? MODAL_RUNTIME : ''}
</body>
</html>
`;
}

export function downloadPageHtml(elements: PageElement[], filename: string, opts: ExportOptions = {}): void {
  const html = serializePageToHtml(elements, opts);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
