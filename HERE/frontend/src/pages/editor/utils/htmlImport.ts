import type { PageElement } from '../../../api/pages';

let __uid = 1000;
const uid = () => 'imp-' + (++__uid);

// ── CSS kebab → camelCase ─────────────────────────────────────────────────────
function toCamel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ── Parse style="..." → React style object ────────────────────────────────────
function parseInlineStyle(styleAttr: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!styleAttr) return result;
  for (const part of styleAttr.split(';')) {
    const colon = part.indexOf(':');
    if (colon < 0) continue;
    const key = part.slice(0, colon).trim();
    const val = part.slice(colon + 1).trim();
    if (key && val) result[toCamel(key)] = val;
  }
  return result;
}

// ── Void elements ─────────────────────────────────────────────────────────────
const VOID = new Set([
  'area','base','br','col','embed','hr','img','input',
  'link','meta','param','source','track','wbr',
]);

// ── Attributes to always copy from the DOM element ───────────────────────────
const ATTRS = [
  'src','href','alt','type','name','placeholder','rel','media',
  'target','action','method','enctype','for','value',
  'checked','selected','disabled','readonly','required',
  'multiple','pattern','min','max','step','rows','cols',
  'width','height','loading','decoding','async','defer',
  'crossorigin',
];

// ── Does this element need innerHTML for full fidelity? ───────────────────────
// True when:
//   (a) has both text nodes AND element children (text nodes would be dropped), OR
//   (b) contains inline formatting elements (br, strong, em, span, a, code…)
//       as direct children — these are "inline flow" and belong in innerHTML
const INLINE_TAGS = new Set(['br','strong','em','b','i','span','a','code','mark','s','u','small','sup','sub','abbr','time','wbr']);

function hasMixedContent(node: Element): boolean {
  if (node.children.length === 0) return false;
  const childNodes = Array.from(node.childNodes);
  // Case (a): has non-empty text nodes alongside element children
  const hasText = childNodes.some(
    n => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '').length > 0
  );
  if (hasText) return true;
  // Case (b): all element children are inline — treat whole thing as inline content
  const allInline = Array.from(node.children).every(c => INLINE_TAGS.has(c.tagName.toLowerCase()));
  return allInline;
}

// ── Known inline-container tags — always use innerHTML for fidelity ───────────
// These tags contain inline content that mixes text nodes with inline elements.
// Using innerHTML preserves everything exactly, including <em>, <strong>, <a> etc.
const INLINE_CONTAINERS = new Set([
  // Text blocks
  'p','h1','h2','h3','h4','h5','h6',
  'blockquote','cite','address','figcaption','caption',
  // List items & definition list
  'li','dt','dd',
  // Table cells
  'td','th',
  // Form labels
  'label','legend',
  // Inline containers that often carry mixed content
  'button','summary','option','title',
]);

// ── DOM Element → PageElement (recursive) ────────────────────────────────────
function domToEl(node: Element, depth: number): PageElement | null {
  if (depth > 14) return null;

  const tag   = node.tagName.toLowerCase();
  const style = parseInlineStyle(node.getAttribute('style') ?? '');
  const cls   = node.getAttribute('class') || undefined;

  const el: PageElement = {
    id: uid(),
    tag,
    class: cls,
    style: Object.keys(style).length ? style : undefined,
  };

  // Copy known HTML attributes
  for (const attr of ATTRS) {
    const v = node.getAttribute(attr);
    if (v !== null) (el as Record<string, string>)[attr] = v;
  }

  // ── Void elements ──────────────────────────────────────────────────────────
  if (VOID.has(tag)) return el;

  // ── <script> ──────────────────────────────────────────────────────────────
  if (tag === 'script') {
    el.text = node.textContent ?? '';
    return el;
  }

  // ── Use innerHTML when: ────────────────────────────────────────────────────
  //   (a) it's a known inline-container tag, OR
  //   (b) the element has BOTH text nodes AND element children (mixed content)
  //
  // This is the key fix: without this, text nodes adjacent to element children
  // are silently dropped because node.children only returns element nodes.
  // Example: <span><span>◆</span>Clean Water</span>
  //   node.children = [span]  →  would only render "◆", losing "Clean Water"
  //   With innerHTML = "...", we get the full text preserved.
  const childEls  = Array.from(node.children);
  const usesHTML  = INLINE_CONTAINERS.has(tag) || hasMixedContent(node);

  if (usesHTML) {
    const raw = node.innerHTML.trim();
    if (raw) (el as Record<string, string>).innerHTML = raw;
    else     el.text = node.textContent?.trim() ?? '';
    return el;
  }

  // ── Block container: recurse into element children ─────────────────────────
  if (childEls.length > 0) {
    const kids = childEls
      .map(c => domToEl(c, depth + 1))
      .filter((c): c is PageElement => c !== null);
    if (kids.length) el.children = kids;
  } else {
    const text = node.textContent?.trim();
    if (text) el.text = text;
  }

  return el;
}

// ── Browser-default styles (counters Tailwind's CSS reset) ───────────────────
const BROWSER_DEFAULTS = `
h1{font-size:2em;font-weight:bold;margin:0.67em 0}
h2{font-size:1.5em;font-weight:bold;margin:0.83em 0}
h3{font-size:1.17em;font-weight:bold;margin:1em 0}
h4{font-size:1em;font-weight:bold;margin:1.33em 0}
h5{font-size:0.83em;font-weight:bold;margin:1.67em 0}
h6{font-size:0.67em;font-weight:bold;margin:2.33em 0}
p{margin:1em 0}
ul{list-style:disc;padding-left:2.5em;margin:1em 0}
ol{list-style:decimal;padding-left:2.5em;margin:1em 0}
li{display:list-item;margin:0}
a{color:#0000ee;text-decoration:underline;cursor:pointer}
b,strong{font-weight:bold}
i,em{font-style:italic}
small{font-size:0.8em}
sub{vertical-align:sub;font-size:smaller}
sup{vertical-align:super;font-size:smaller}
table{border-collapse:separate;border-spacing:2px}
th{font-weight:bold;text-align:center}
blockquote{margin:1em 40px}
pre{margin:1em 0;white-space:pre;font-family:monospace}
code{font-family:monospace}
img{display:inline-block}
button{cursor:pointer}
details>summary{cursor:pointer;list-style:none}
details>summary::-webkit-details-marker{display:none}
`;

// ── Main parser ───────────────────────────────────────────────────────────────
export function parseHTML(htmlString: string, extraCSS?: string): PageElement[] {
  const parser = new DOMParser();
  const doc    = parser.parseFromString(htmlString, 'text/html');

  const result: PageElement[] = [];

  // ── Detect body class (e.g. "conservative", "dark", "bold") ──────────────
  // Many HTML templates define CSS variables scoped to body.{class}:
  //   body.conservative { --bg: #fff; --primary: #0F2557; }
  // The <body> tag itself is never imported, so these variables never apply.
  // Fix: rewrite "body.{activeClass}" → ":root" so variables land at root level.
  // Other theme classes (body.bold) stay unchanged — they won't fire since the
  // canvas body never has that class, so they're safely ignored.
  const bodyClass = doc.body.className.trim().split(/\s+/)[0] || '';

  // Helper: rewrite body-class CSS so it works without the <body> tag
  function fixBodyClassCSS(css: string): string {
    let out = css;
    if (bodyClass) {
      // body.conservative { ... }  →  :root { ... }
      // body.conservative .hero    →  :root .hero
      out = out.replace(new RegExp(`body\\.${bodyClass}\\b`, 'g'), ':root');
    }
    // NOTE: we do NOT rewrite position:fixed → sticky here.
    // The editor scene wrapper has a CSS transform applied, which causes browsers
    // to automatically contain fixed-position descendants inside that transform
    // ancestor (per CSS spec). So fixed elements already stay inside the artboard.
    // Rewriting to sticky was causing navs to be container-width instead of
    // viewport-width on the public page, creating visible side margins.
    return out;
  }

  // 1. Browser defaults — restores styles Tailwind's preflight strips
  result.push({ id: uid(), tag: 'style', text: BROWSER_DEFAULTS });

  // 2. Optional user-supplied CSS file
  if (extraCSS?.trim()) {
    result.push({ id: uid(), tag: 'style', text: extraCSS });
  }

  // 3. <link> tags from <head> (fonts, stylesheets, preconnect)
  doc.head.querySelectorAll('link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href) return;
    result.push({
      id:    uid(),
      tag:   'link',
      rel:   link.getAttribute('rel')   ?? '',
      href,
      media: link.getAttribute('media') ?? undefined,
    } as PageElement);
  });

  // 4. <style> blocks from <head> — with body-class rewriting
  doc.head.querySelectorAll('style').forEach(s => {
    const raw = s.textContent ?? '';
    if (!raw.trim()) return;
    result.push({ id: uid(), tag: 'style', text: fixBodyClassCSS(raw) });
  });

  // 5. <script> blocks from <head>
  doc.head.querySelectorAll('script').forEach(s => {
    const src = s.getAttribute('src');
    result.push({
      id: uid(), tag: 'script',
      ...(src ? { src } : { text: s.textContent ?? '' }),
    } as PageElement);
  });

  // 6. Body children
  const bodyEls = Array.from(doc.body.children)
    .map(el => domToEl(el, 0))
    .filter((el): el is PageElement => el !== null);

  return [...result, ...bodyEls];
}
