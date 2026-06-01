import React, { useEffect } from 'react';
import type { PageElement } from '../../../api/pages';

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
  // run once per element id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el.id]);
  return null;
}

// ── Recursive element node ────────────────────────────────────────────────────
export function ElementNode({
  el, depth, selectedId, editingId, onSelect, onDblClick, onTextBlur,
}: NodeProps): React.ReactElement | null {
  if (!el.tag || typeof el.tag !== 'string') return null;

  const rec         = el as Record<string, string>;
  const innerHTML   = rec.innerHTML;          // set by importer for mixed-content elements
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

  const shared: Record<string, unknown> = {
    'data-el-id':  el.id,
    className:     el.class || undefined,
    style,
    onClick:       (e: React.MouseEvent) => { e.stopPropagation(); onSelect(el.id, e); },
    onDoubleClick: (e: React.MouseEvent) => { e.stopPropagation(); onDblClick(el.id, hasChildren); },
  };

  // ── <a> — handled before innerHTML check to ensure navigation is prevented ─
  // Always prevent default so the editor click selects the element, not navigate.
  if (el.tag === 'a') {
    const aClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(el.id, e);
    };
    if (innerHTML) {
      return (
        <a {...shared as React.AnchorHTMLAttributes<HTMLAnchorElement>}
          href="#" onClick={aClick}
          dangerouslySetInnerHTML={{ __html: innerHTML }} />
      );
    }
    return (
      <a {...shared as React.AnchorHTMLAttributes<HTMLAnchorElement>}
        href="#" onClick={aClick}>
        {hasChildren
          ? el.children!.map(c => <ElementNode key={c.id} el={c} depth={depth + 1}
              selectedId={selectedId} editingId={editingId}
              onSelect={onSelect} onDblClick={onDblClick} onTextBlur={onTextBlur} />)
          : (el.text ?? null)}
      </a>
    );
  }

  // ── Void elements ──────────────────────────────────────────────────────────
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
  // Used for: known inline-container tags (li, p, h1-h6, td, button, summary…)
  // AND any element with mixed text+element content (detected in the parser).
  // dangerouslySetInnerHTML preserves text nodes that would otherwise be dropped.
  if (innerHTML) {
    if (isEditing) {
      // Use a ref to populate the contentEditable with the EXISTING innerHTML on mount,
      // so the user sees current content (not an empty element) when editing.
      return React.createElement(el.tag, {
        ...shared,
        ref: (node: HTMLElement | null) => {
          if (node && node.innerHTML !== innerHTML) {
            node.innerHTML = innerHTML;
          }
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
          onSelect={onSelect} onDblClick={onDblClick} onTextBlur={onTextBlur} />
      ))
    : (el.text ?? null);

  return React.createElement(el.tag, shared, childNodes);
}
