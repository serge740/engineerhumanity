import type { PageElement } from '../../../api/pages';

// ── Collect raw CSS text from all <style> nodes in the element tree ───────────
function collectStyleTexts(els: PageElement[]): string[] {
  const texts: string[] = [];
  for (const el of els) {
    if (el.tag === 'style') {
      const text = (el as Record<string, string>).text ?? '';
      if (text.trim()) texts.push(text);
    }
    if (el.children?.length) texts.push(...collectStyleTexts(el.children));
  }
  return texts;
}

// ── CSS property name kebab → camelCase ───────────────────────────────────────
function toCamel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ── Resolve CSS variables in a value using the collected :root variables ──────
function resolveVars(val: string, vars: Record<string, string>): string {
  return val.replace(/var\(([^)]+)\)/g, (_, name) => {
    const key = name.trim().split(',')[0].trim(); // e.g. --navy
    return vars[key] ?? name;
  });
}

// ── Collect :root CSS custom properties from all style sheets ─────────────────
function collectCSSVars(cssTexts: string[]): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const cssText of cssTexts) {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);
    try {
      const sheet = styleEl.sheet as CSSStyleSheet | null;
      if (!sheet) continue;
      for (const rule of Array.from(sheet.cssRules)) {
        if (!(rule instanceof CSSStyleRule)) continue;
        // :root or html rules carry custom properties
        if (rule.selectorText !== ':root' && rule.selectorText !== 'html') continue;
        const { style } = rule;
        for (let i = 0; i < style.length; i++) {
          const p = style[i].trim();
          if (p.startsWith('--')) vars[p] = style.getPropertyValue(p).trim();
        }
      }
    } finally {
      document.head.removeChild(styleEl);
    }
  }
  return vars;
}

// ── Check one CSSStyleRule against a fake element, applying matching props ────
function applyIfMatches(
  rule:   CSSStyleRule,
  fakeEl: Element,
  vars:   Record<string, string>,
  out:    Record<string, string>,
) {
  try {
    const sel = rule.selectorText;

    // Skip pseudo-class / pseudo-element selectors — can't match statically
    if (sel.includes(':')) return;

    // Universal selector (*) — matches everything
    const matches = sel === '*' || sel === '*, *::before, *::after' || fakeEl.matches(sel);
    if (!matches) return;

    const { style } = rule;
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      if (prop.startsWith('--')) continue; // skip custom property declarations
      let val = style.getPropertyValue(prop).trim();
      if (!val) continue;
      // Resolve CSS variables inline so the Inspector shows real values
      if (val.includes('var(')) val = resolveVars(val, vars);
      out[toCamel(prop)] = val;
    }
  } catch {
    // Invalid selector — browser throws; just skip
  }
}

// ── Walk a CSSRuleList recursively (handles @media, @supports) ───────────────
function walkRules(
  rules:  CSSRuleList,
  fakeEl: Element,
  vars:   Record<string, string>,
  out:    Record<string, string>,
) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      applyIfMatches(rule, fakeEl, vars, out);
    } else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
      walkRules(rule.cssRules, fakeEl, vars, out);
    }
  }
}

// ── Properties that come from the universal * rule but aren't useful to show ──
const SKIP_UNIVERSAL = new Set(['boxSizing', 'margin', 'padding']);

// ── Main export ───────────────────────────────────────────────────────────────
export function computeEffectiveStyles(
  elements: PageElement[],
  el:       PageElement,
): Record<string, string> {
  const cssTexts = collectStyleTexts(elements);
  if (cssTexts.length === 0) return {};

  // Collect CSS variables first so resolveVars() works
  const vars = collectCSSVars(cssTexts);

  // Build a fake element so we can call .matches() without touching the real DOM
  const fakeEl = document.createElement(el.tag);
  if (el.class) fakeEl.className = el.class;
  // The internal id (imp-1234) is not an HTML id attribute, skip it.
  // If the original element had an HTML id it would be in el.htmlId.
  const htmlId = (el as Record<string, string>).htmlId ?? '';
  if (htmlId) fakeEl.id = htmlId;

  // Two-pass: first collect universal-selector props, then specific rules
  // so that specific rules override the universal * rule when displayed.
  const universalOut: Record<string, string> = {};
  const specificOut:  Record<string, string> = {};

  for (const cssText of cssTexts) {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);
    try {
      const sheet = styleEl.sheet as CSSStyleSheet | null;
      if (!sheet) continue;

      for (const rule of Array.from(sheet.cssRules)) {
        if (!(rule instanceof CSSStyleRule)) {
          if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
            walkRules(rule.cssRules, fakeEl, vars, specificOut);
          }
          continue;
        }
        const sel = rule.selectorText;
        if (sel === '*' || sel.startsWith('*,') || sel === '*, *::before, *::after') {
          applyIfMatches(rule, fakeEl, vars, universalOut);
        } else {
          applyIfMatches(rule, fakeEl, vars, specificOut);
        }
      }
    } finally {
      document.head.removeChild(styleEl);
    }
  }

  // Merge: specific rules override universal; skip universal-only noise props
  const merged: Record<string, string> = {};
  for (const [k, v] of Object.entries(universalOut)) {
    if (!SKIP_UNIVERSAL.has(k)) merged[k] = v;
  }
  for (const [k, v] of Object.entries(specificOut)) {
    merged[k] = v;
  }

  // Remove properties that are already set as inline styles (caller has those)
  const inlineStyle = (el.style ?? {}) as Record<string, string>;
  for (const k of Object.keys(inlineStyle)) delete merged[k];

  return merged;
}
