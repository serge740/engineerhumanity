// Selectors considered "the universal reset" — any rule whose selector list
// consists solely of these (in any combination) gets its margin/padding
// declarations stripped, since a blanket `* { margin:0; padding:0 }` zeroes
// out spacing on every element in the page, including ones that never had
// an overriding class-specific rule to restore it.
const RESET_SELECTORS = new Set(['*', '*::before', '*::after', '*:before', '*:after']);

function isResetSelectorList(selectors: string): boolean {
  return selectors
    .split(',')
    .map(s => s.trim())
    .every(s => RESET_SELECTORS.has(s));
}

function stripSpacingDeclarations(block: string): string {
  return block
    .split(';')
    .filter(decl => !/^\s*(margin|padding)(-(top|right|bottom|left))?\s*:/i.test(decl))
    .join(';');
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Strips `margin`/`padding` declarations from any `*, *::before, *::after`
 * (or subset thereof) reset rule in a CSS string, leaving other
 * declarations (e.g. box-sizing) and all other rules untouched.
 */
export function stripResetSpacing(rawCss: string): string {
  const css = stripComments(rawCss);
  let out = '';
  let i = 0;
  const n = css.length;

  while (i < n) {
    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) {
      out += css.slice(i);
      break;
    }
    const prelude = css.slice(i, braceIdx).trim();

    let depth = 1;
    let j = braceIdx + 1;
    while (j < n && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const block = css.slice(braceIdx + 1, j - 1);

    if (prelude && !prelude.startsWith('@') && isResetSelectorList(prelude)) {
      out += `${prelude} {${stripSpacingDeclarations(block)}}`;
    } else if (prelude.startsWith('@')) {
      // Recurse into nesting at-rules so a reset inside @media is caught too.
      out += `${prelude} {${stripResetSpacing(block)}}`;
    } else if (prelude) {
      out += `${prelude} {${block}}`;
    }

    i = j;
  }

  return out;
}
