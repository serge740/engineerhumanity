import React, { useEffect } from 'react';
import type { PageElement } from '../../../api/pages';
import { useEditorStore } from '../../../stores/editorStore';

// ── Void elements ─────────────────────────────────────────────────────────────
export const VOID_TAGS = new Set([
  'area','base','br','col','embed','hr','img','input',
  'link','meta','param','source','track','wbr',
]);

// ── Props ─────────────────────────────────────────────────────────────────────
export interface NodeProps {
  el:         PageElement;
  depth:      number;
  selectedId: string | null;
  editingId:  string | null;
  onSelect:   (id: string, e: React.MouseEvent) => void;
  onDblClick: (id: string, hasChildren: boolean) => void;
  onTextBlur: (id: string, content: string, field: 'text' | 'innerHTML') => void;
  /**
   * True on the live public page and in the editor's Preview mode: real click
   * behavior applies (detail-modal triggers open a <dialog>, plain links
   * navigate) instead of the normal edit-mode "click selects this element"
   * behavior. Defaults to false so all existing editing behavior is unchanged.
   */
  interactive?: boolean;
}

// ── <script> — execute via useEffect so JS actually runs ─────────────────────
function ScriptNode({ el }: { el: PageElement }) {
  useEffect(() => {
    const rec = el as Record<string, string>;
    const tag = document.createElement('script');
    if (rec.src) {
      tag.src   = rec.src;
      tag.async = true;
    } else if (el.text?.trim()) {
      tag.textContent = el.text;
    } else {
      return;
    }
    document.head.appendChild(tag);
    return () => { try { document.head.removeChild(tag); } catch { /* already removed */ } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el.id]);
  return null;
}

// ── Recursive element node ────────────────────────────────────────────────────
export function ElementNode({
  el, depth, selectedId, editingId, onSelect, onDblClick, onTextBlur, interactive = false,
}: NodeProps): React.ReactElement | null {
  if (!el.tag || typeof el.tag !== 'string') return null;

  const rec         = el as Record<string, string>;
  const innerHTML   = rec.innerHTML;
  const isVoid      = VOID_TAGS.has(el.tag);
  const hasChildren = !isVoid && !innerHTML && (el.children?.length ?? 0) > 0;
  const isSelected  = selectedId === el.id;
  const isEditing   = editingId  === el.id;

  // ── Non-visual / infrastructure elements ──────────────────────────────────
  if (el.tag === 'script') return <ScriptNode el={el} />;
  if (el.tag === 'style')  return <style dangerouslySetInnerHTML={{ __html: el.text || '' }} />;
  if (el.tag === 'link')   return <link rel={rec.rel} href={rec.href} media={rec.media || undefined} />;

  // ── Shared editor props ───────────────────────────────────────────────────
  const style: React.CSSProperties = {
    ...(el.style as React.CSSProperties),
    userSelect: isEditing ? undefined : 'none',
    cursor:     isEditing ? 'text'    : undefined,
    ...(isSelected && !isEditing
      ? { outline: '2px solid #6366f1', outlineOffset: '-1px' }
      : {}),
  };

  // A "more detail" modal trigger/close button (see collectionExpansion.ts),
  // only actually wired up when `interactive` — i.e. Preview mode or the live
  // public page — so normal editing (click-to-select) is completely unaffected.
  const isModalTrigger = interactive && typeof rec._modalTarget === 'string';
  const isModalClose   = interactive && !!rec._modalClose;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isModalTrigger) {
      e.preventDefault();
      const modal = document.querySelector(`[data-el-id="${rec._modalTarget}"]`) as (HTMLDialogElement | null);
      modal?.showModal?.();
      return;
    }
    if (isModalClose) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).closest('dialog')?.close();
      return;
    }
    if (interactive) return; // real behavior (e.g. <a> navigation) proceeds natively
    onSelect(el.id, e);
  };

  const shared: Record<string, unknown> = {
    'data-el-id':  el.id,
    className:     el.class || undefined,
    style,
    onClick:       handleClick,
    onDoubleClick: (e: React.MouseEvent) => { e.stopPropagation(); onDblClick(el.id, hasChildren); },
  };

  // ── <a> ───────────────────────────────────────────────────────────────────
  if (el.tag === 'a') {
    // Interactive (Preview mode / live page): use the real href so normal
    // links actually navigate. Editing mode keeps href="#" so nothing ever
    // navigates away while building the page.
    const hrefVal = interactive ? (rec.href || '#') : '#';
    if (innerHTML) {
      return (
        <a {...shared as React.AnchorHTMLAttributes<HTMLAnchorElement>}
          href={hrefVal}
          dangerouslySetInnerHTML={{ __html: innerHTML }} />
      );
    }
    return (
      <a {...shared as React.AnchorHTMLAttributes<HTMLAnchorElement>}
        href={hrefVal}>
        {hasChildren
          ? el.children!.map(c => <ElementNode key={c.id} el={c} depth={depth + 1}
              selectedId={selectedId} editingId={editingId}
              onSelect={onSelect} onDblClick={onDblClick} onTextBlur={onTextBlur} interactive={interactive} />)
          : (el.text ?? null)}
      </a>
    );
  }

  // ── Void elements ─────────────────────────────────────────────────────────
  if (el.tag === 'img') {
    return <img {...shared as React.ImgHTMLAttributes<HTMLImageElement>}
      src={rec.src || 'https://placehold.co/600x300/eef0f4/6366f1?text=Image'}
      alt={el.alt || ''} />;
  }
  if (el.tag === 'input') {
    return <input {...shared as React.InputHTMLAttributes<HTMLInputElement>}
      type={rec.type || 'text'} placeholder={el.text || ''} readOnly />;
  }
  if (el.tag === 'hr')  return <hr  {...shared as React.HTMLAttributes<HTMLHRElement>} />;
  if (el.tag === 'br')  return <br  {...shared as React.HTMLAttributes<HTMLBRElement>} />;
  if (isVoid)           return React.createElement(el.tag, shared);

  // ── innerHTML path ────────────────────────────────────────────────────────
  if (innerHTML) {
    if (isEditing) {
      return React.createElement(el.tag, {
        ...shared,
        ref: (node: HTMLElement | null) => {
          if (node && node.innerHTML !== innerHTML) node.innerHTML = innerHTML;
        },
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: (e: React.FocusEvent<HTMLElement>) =>
          onTextBlur(el.id, e.currentTarget.innerHTML ?? '', 'innerHTML'),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') (e.target as HTMLElement).blur();
        },
      });
    }
    return React.createElement(el.tag, {
      ...shared,
      dangerouslySetInnerHTML: { __html: innerHTML },
    });
  }

  // ── contentEditable for plain-text leaf nodes ─────────────────────────────
  if (isEditing && !hasChildren) {
    shared.contentEditable = true;
    shared.suppressContentEditableWarning = true;
    shared.onBlur = (e: React.FocusEvent<HTMLElement>) =>
      onTextBlur(el.id, e.currentTarget.innerText ?? '', 'text');
    shared.onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') (e.target as HTMLElement).blur();
    };
  }

  // ── Generic block element ─────────────────────────────────────────────────
  const childNodes = hasChildren
    ? el.children!.map(c => (
        <ElementNode key={c.id} el={c} depth={depth + 1}
          selectedId={selectedId} editingId={editingId}
          onSelect={onSelect} onDblClick={onDblClick} onTextBlur={onTextBlur} interactive={interactive} />
      ))
    : (el.text ?? null);

  return React.createElement(el.tag, shared, childNodes);
}
