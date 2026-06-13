import type { PageElement } from '../../../api/pages';

export interface FlatItem {
  el:       PageElement;
  depth:    number;
  parentId: string | null;
  index:    number;
}

/**
 * Returns the chain of ancestor elements from root down to (but not including)
 * the element with targetId. Returns null if not found.
 */
export function getAncestorChain(
  els: PageElement[],
  targetId: string,
  chain: PageElement[] = [],
): PageElement[] | null {
  for (const el of els) {
    if (el.id === targetId) return chain;
    if (el.children?.length) {
      const result = getAncestorChain(el.children, targetId, [...chain, el]);
      if (result) return result;
    }
  }
  return null;
}

/**
 * Flattens the element tree into an ordered list carrying depth, parentId, and
 * sibling index. Only includes visible elements (collapsed children are excluded
 * based on the openIds set passed in).
 */
export function flattenTree(
  els: PageElement[],
  openIds: Set<string>,
  depth = 0,
  parentId: string | null = null,
): FlatItem[] {
  const result: FlatItem[] = [];
  els.forEach((el, index) => {
    result.push({ el, depth, parentId, index });
    if (el.children?.length && openIds.has(el.id)) {
      result.push(...flattenTree(el.children, openIds, depth + 1, el.id));
    }
  });
  return result;
}
