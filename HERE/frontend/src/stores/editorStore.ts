import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { PageElement, PageSummary, Page, UpdatePageData } from '../api/pages';
import { updatePage, publishPage } from '../api/pages';
export type { PageElement, PageSummary, Page };

// ── UID ───────────────────────────────────────────────────────────────────────
let __uid = 100;
export const uid = () => 'el-' + (++__uid);

// ── Helpers ───────────────────────────────────────────────────────────────────
function clone<T>(x: T): T { return JSON.parse(JSON.stringify(x)); }

export function findById(
  els: PageElement[], id: string,
): { el: PageElement; siblings: PageElement[]; idx: number } | null {
  for (let i = 0; i < els.length; i++) {
    if (els[i].id === id) return { el: els[i], siblings: els, idx: i };
    const kids = els[i].children;
    if (kids?.length) { const r = findById(kids, id); if (r) return r; }
  }
  return null;
}

function removeById(els: PageElement[], id: string): PageElement[] {
  return els
    .filter(el => el.id !== id)
    .map(el => el.children ? { ...el, children: removeById(el.children, id) } : el);
}

function patchById(els: PageElement[], id: string, props: Partial<PageElement>): PageElement[] {
  return els.map(el => {
    if (el.id === id) return { ...el, ...props };
    if (el.children) return { ...el, children: patchById(el.children, id, props) };
    return el;
  });
}

function patchStyleById(els: PageElement[], id: string, key: string, value: string): PageElement[] {
  return els.map(el => {
    if (el.id === id) return { ...el, style: { ...(el.style ?? {}), [key]: value } };
    if (el.children) return { ...el, children: patchStyleById(el.children, id, key, value) };
    return el;
  });
}

function removeStyleById(els: PageElement[], id: string, key: string): PageElement[] {
  return els.map(el => {
    if (el.id === id) {
      const s = { ...(el.style ?? {}) };
      delete s[key];
      return { ...el, style: s };
    }
    if (el.children) return { ...el, children: removeStyleById(el.children, id, key) };
    return el;
  });
}

function addChildToId(els: PageElement[], parentId: string, child: PageElement): PageElement[] {
  return els.map(el => {
    if (el.id === parentId) return { ...el, children: [...(el.children ?? []), child] };
    if (el.children) return { ...el, children: addChildToId(el.children, parentId, child) };
    return el;
  });
}

function insertAt(
  els: PageElement[], parentId: string | null, child: PageElement, index: number,
): PageElement[] {
  if (parentId === null) {
    const a = [...els]; a.splice(Math.min(index, a.length), 0, child); return a;
  }
  return els.map(el => {
    if (el.id === parentId) {
      const a = [...(el.children ?? [])]; a.splice(Math.min(index, a.length), 0, child);
      return { ...el, children: a };
    }
    if (el.children) return { ...el, children: insertAt(el.children, parentId, child, index) };
    return el;
  });
}

function findParentId(els: PageElement[], targetId: string): string | null {
  for (const el of els) {
    if (el.children?.some(c => c.id === targetId)) return el.id;
    if (el.children?.length) { const r = findParentId(el.children, targetId); if (r) return r; }
  }
  return null;
}

function dupInTree(els: PageElement[], id: string, copy: PageElement): PageElement[] {
  return els.flatMap(el => {
    if (el.id === id) return [el, copy];
    if (el.children) return [{ ...el, children: dupInTree(el.children, id, copy) }];
    return [el];
  });
}

export function cloneWithNewIds(el: PageElement): PageElement {
  return { ...clone(el), id: uid(), children: el.children?.map(cloneWithNewIds) };
}

// Recursively strip assetRef from a cloned element tree so a duplicated <img>
// cannot accidentally delete the original's uploaded file when replaced.
function stripAssetRefs(el: PageElement): PageElement {
  const copy = { ...el } as Record<string, unknown>;
  delete copy.assetRef;
  if (Array.isArray(copy.children)) {
    copy.children = (copy.children as PageElement[]).map(stripAssetRefs);
  }
  return copy as PageElement;
}

// ── Tool mode ─────────────────────────────────────────────────────────────────
export type ToolMode = 'select' | 'frame' | 'rect' | 'ellipse' | 'line' | 'text';

// ── Store interface ───────────────────────────────────────────────────────────
interface EditorState {
  siteId:   string;
  slug:     string;
  pageMeta: Page | null;
  pages:    PageSummary[];

  elements:   PageElement[];
  selectedId: string | null;
  editingId:  string | null;

  zoom: number;
  pan:  { x: number; y: number };

  leftTab:  'layers' | 'insert' | 'sections';
  toolMode: ToolMode;
  isDirty:  boolean;
  isSaving: boolean;

  past:    PageElement[][];
  future:  PageElement[][];
  canUndo: boolean;
  canRedo: boolean;

  init(siteId: string, slug: string, page: Page, pages: PageSummary[]): void;
  refreshPages(pages: PageSummary[]): void;

  selectElement(id: string | null): void;
  setEditingId(id: string | null): void;

  setZoom(z: number): void;
  setPan(x: number, y: number): void;
  zoomToFit(frameW: number, frameH: number): void;
  setLeftTab(t: 'layers' | 'insert' | 'sections'): void;
  setToolMode(t: ToolMode): void;
  wrapElement(id: string): void;

  setElements(els: PageElement[], commit?: boolean): void;
  patchElement(id: string, props: Partial<Omit<PageElement, 'id'>>): void;
  patchStyle(id: string, key: string, value: string): void;
  patchStyleLive(id: string, key: string, value: string): void;
  removeStyle(id: string, key: string): void;
  removeElement(id: string): void;
  addChild(parentId: string | null, el: PageElement): void;
  insertChild(parentId: string | null, el: PageElement, index: number): void;
  moveElement(id: string, newParentId: string | null, toIndex: number): void;
  duplicateElement(id: string): void;
  captureHistory(): void;

  undo(): void;
  redo(): void;

  save(): Promise<void>;
  publish(): Promise<void>;
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useEditorStore = create<EditorState>()(
  immer((set, get) => {
    const ph = (s: EditorState) => {
      s.past.push(clone(s.elements));
      if (s.past.length > 80) s.past.shift();
      s.future  = [];
      s.canUndo = true;
      s.canRedo = false;
    };

    return {
      siteId: '', slug: '', pageMeta: null, pages: [],
      elements: [], selectedId: null, editingId: null,
      zoom: 0.75, pan: { x: 80, y: 60 },
      leftTab: 'layers', toolMode: 'select',
      isDirty: false, isSaving: false,
      past: [], future: [], canUndo: false, canRedo: false,

      // ── Init ────────────────────────────────────────────────────────────────
      init(siteId, slug, page, pages) {
        // Read persisted history before entering the immer mutation (synchronous).
        let restoredPast:   PageElement[][] = [];
        let restoredFuture: PageElement[][] = [];
        try {
          const raw = localStorage.getItem(`lumen_hist_${siteId}_${slug}`);
          if (raw) {
            const h = JSON.parse(raw) as { past?: PageElement[][]; future?: PageElement[][] };
            if (Array.isArray(h.past))   restoredPast   = h.past.slice(-80);
            if (Array.isArray(h.future)) restoredFuture = h.future.slice(-80);
          }
        } catch { /* storage unavailable or corrupt — start with empty history */ }

        set(s => {
          s.siteId    = siteId;
          s.slug      = slug;
          s.pageMeta  = page;
          s.pages     = pages;

          const raw = Array.isArray(page.html) ? page.html : [];

          const isIncompatible = raw.length > 0 && (
            typeof (raw[0] as Record<string,unknown>).tag !== 'string' ||
            !(raw[0] as Record<string,unknown>).tag
          );

          s.elements   = isIncompatible ? [] : (raw as PageElement[]);
          s.selectedId = null;
          s.editingId  = null;
          s.isDirty    = false;
          s.past    = restoredPast;
          s.future  = restoredFuture;
          s.canUndo = restoredPast.length  > 0;
          s.canRedo = restoredFuture.length > 0;
        });
      },

      refreshPages(pages) { set(s => { s.pages = pages; }); },

      // ── Selection ────────────────────────────────────────────────────────────
      selectElement(id) { set(s => { s.selectedId = id; s.editingId = null; }); },
      setEditingId(id)  { set(s => { s.editingId = id; }); },

      // ── Canvas ───────────────────────────────────────────────────────────────
      setZoom(z) { set(s => { s.zoom = Math.min(4, Math.max(0.1, z)); }); },
      setPan(x, y) { set(s => { s.pan = { x, y }; }); },

      zoomToFit(frameW, frameH) {
        const wrap = document.querySelector('.lumen-canvas-wrap');
        if (!wrap) return;
        const r  = wrap.getBoundingClientRect();
        const nz = Math.max(0.12, Math.min((r.width - 96) / frameW, (r.height - 120) / frameH, 1.2));
        set(s => {
          s.zoom = nz;
          s.pan  = { x: (r.width - frameW * nz) / 2, y: Math.max(60, (r.height - frameH * nz) / 2) };
        });
      },

      setLeftTab(t)   { set(s => { s.leftTab   = t; }); },
      setToolMode(t)  { set(s => { s.toolMode  = t; }); },

      // ── Element mutations ────────────────────────────────────────────────────
      setElements(els, commit = true) {
        set(s => { if (commit) ph(s); s.elements = els; s.isDirty = true; });
      },

      patchElement(id, props) {
        set(s => { ph(s); s.elements = patchById(s.elements, id, props); s.isDirty = true; });
      },

      patchStyle(id, key, value) {
        set(s => { ph(s); s.elements = patchStyleById(s.elements, id, key, value); s.isDirty = true; });
      },

      patchStyleLive(id, key, value) {
        set(s => { s.elements = patchStyleById(s.elements, id, key, value); s.isDirty = true; });
      },

      removeStyle(id, key) {
        set(s => { ph(s); s.elements = removeStyleById(s.elements, id, key); s.isDirty = true; });
      },

      removeElement(id) {
        set(s => {
          ph(s);
          s.elements = removeById(s.elements, id);
          if (s.selectedId === id) s.selectedId = null;
          s.isDirty = true;
        });
      },

      addChild(parentId, el) {
        set(s => {
          ph(s);
          s.elements   = parentId === null
            ? [...s.elements, el]
            : addChildToId(s.elements, parentId, el);
          s.selectedId = el.id;
          s.isDirty    = true;
        });
      },

      insertChild(parentId, el, index) {
        set(s => {
          ph(s);
          s.elements   = insertAt(s.elements, parentId, el, index);
          s.selectedId = el.id;
          s.isDirty    = true;
        });
      },

      moveElement(id, newParentId, toIndex) {
        set(s => {
          const found = findById(s.elements, id);
          if (!found) return;
          ph(s);
          const c       = clone(found.el);
          const without = removeById(s.elements, id);
          s.elements    = insertAt(without, newParentId, c, toIndex);
          s.isDirty     = true;
        });
      },

      wrapElement(id) {
        set(s => {
          const found = findById(s.elements, id);
          if (!found) return;
          ph(s);
          const parentId = findParentId(s.elements, id);
          const wrapper: PageElement = { id: uid(), tag: 'div', style: { padding: '8px' }, children: [clone(found.el)] };
          const without = removeById(s.elements, id);
          s.elements   = insertAt(without, parentId, wrapper, found.idx);
          s.selectedId = wrapper.id;
          s.isDirty    = true;
        });
      },

      duplicateElement(id) {
        set(s => {
          const found = findById(s.elements, id);
          if (!found) return;
          ph(s);
          // stripAssetRefs so the copy doesn't share the backend asset ID with
          // the original — replacing the copy's image must not delete the original's file.
          const copy   = stripAssetRefs(cloneWithNewIds(found.el));
          s.elements   = dupInTree(s.elements, id, copy);
          s.selectedId = copy.id;
          s.isDirty    = true;
        });
      },

      captureHistory() { set(s => { ph(s); }); },

      // ── History ──────────────────────────────────────────────────────────────
      undo() {
        set(s => {
          if (!s.past.length) return;
          s.future.push(clone(s.elements));
          s.elements   = s.past.pop()!;
          s.selectedId = null;
          s.canUndo    = s.past.length > 0;
          s.canRedo    = true;
          s.isDirty    = true;
        });
      },

      redo() {
        set(s => {
          if (!s.future.length) return;
          s.past.push(clone(s.elements));
          s.elements   = s.future.pop()!;
          s.selectedId = null;
          s.canUndo    = true;
          s.canRedo    = s.future.length > 0;
          s.isDirty    = true;
        });
      },

      // ── Persistence ──────────────────────────────────────────────────────────
      async save() {
        const { siteId, slug, elements, isSaving } = get();
        if (isSaving) return;
        set(s => { s.isSaving = true; });
        try {
          const data: UpdatePageData = { html: elements };
          await updatePage(siteId, slug, data);
          set(s => { s.isDirty = false; if (s.pageMeta) s.pageMeta.version += 1; });
        } catch (err) {
          throw err; // let the caller show a toast
        } finally {
          set(s => { s.isSaving = false; });
        }
      },

      async publish() {
        await get().save();
        await publishPage(get().siteId, get().slug);
        set(s => { if (s.pageMeta) s.pageMeta.published = true; });
      },
    };
  })
);

// Persist undo/redo history to localStorage per page (up to 80 snapshots each).
// Each page gets its own key so switching pages never mixes histories.
useEditorStore.subscribe((s, prev) => {
  if (s.past === prev.past && s.future === prev.future) return; // nothing changed
  if (!s.siteId || !s.slug) return; // store not yet initialised
  try {
    localStorage.setItem(
      `lumen_hist_${s.siteId}_${s.slug}`,
      JSON.stringify({ past: s.past, future: s.future }),
    );
  } catch {
    // Storage quota exceeded — silently skip; history is best-effort.
  }
});
