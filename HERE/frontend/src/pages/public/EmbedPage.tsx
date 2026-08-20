import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPage, type PageElement, type PageMetadata } from '../../api/pages';
import { ElementNode } from '../editor/canvas/ElementView';

interface PublicPageData {
  slug: string;
  title: string;
  description: string | null;
  html: PageElement[];
  metadata: PageMetadata;
}

export const EMBED_HEIGHT_MESSAGE = 'e4h-embed-height';

// Anchor targets that already break out of this iframe correctly on their
// own — mirrors ElementView.tsx's SAFE_ANCHOR_TARGETS for the same reasoning.
const SAFE_TARGETS = new Set(['_blank', '_top', '_parent']);

// Spinner shown while page loads
function Loader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#fff', gap: 16,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid #e5e7eb', borderTopColor: '#6366f1',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// 404 / not published screen
function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#f9fafb', gap: 12,
    }}>
      <div style={{ fontSize: 64, lineHeight: 1 }}>404</div>
      <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>Page not found</p>
    </div>
  );
}

/**
 * Renders a published page's own content — nothing else. Loaded exclusively
 * as an <iframe src> from PublicPage.tsx, never navigated to directly by a
 * user. Being a real separate document (not just a client-side route) is
 * what gives the page's own imported CSS/<script> tags full isolation from
 * the surrounding React app (Navbar/Footer) — see PublicPage.tsx for the
 * host side of this split and the height-sync bridge.
 */
export default function EmbedPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page,    setPage]    = useState<PublicPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Normalize html/body the same way the old single-document PublicPage did —
  // still needed here since this document may inherit browser default margins.
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'public-page-reset';
    style.textContent = `
      html, body {
        background: transparent !important;
        max-width: none !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  useEffect(() => {
    if (!slug) { setMissing(true); setLoading(false); return; }
    getPublicPage(slug)
      .then(data => setPage(data))
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Structured <a> PageElements already get target="_top" (see ElementView.tsx)
  // to break out of this iframe. But links embedded as raw innerHTML (e.g. a
  // whole card imported as one HTML blob) aren't individual PageElements, so
  // that fix can't reach them, and their native click bubbles into whatever
  // ancestor's onClick called e.stopPropagation() (every element gets one —
  // see ElementView.tsx's `shared.onClick`) before it could reach a bubble-
  // phase listener here. A capture-phase listener runs before any of that,
  // so it always sees the click regardless of what's between it and the <a>.
  useEffect(() => {
    // SAFE_TARGETS: anything else — no target, target="_self", or any other
    // value — navigates *within this iframe* by default, which is exactly
    // the bug this component exists to prevent. Imported/scraped HTML very
    // commonly carries an explicit target="_self" on nav-style links, so
    // "has a target at all" is not a safe signal to skip interception on.
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      if (SAFE_TARGETS.has(anchor.target)) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      e.preventDefault();
      window.top!.location.href = new URL(href, document.baseURI).href;
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // Report this document's real content height to the parent whenever it
  // changes (initial render, images/fonts loading in, responsive reflow on
  // parent resize) so the host iframe can size itself with no inner scrollbar.
  useEffect(() => {
    const reportHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: EMBED_HEIGHT_MESSAGE, height }, window.location.origin);
    };

    reportHeight();
    const observer = new ResizeObserver(reportHeight);
    observer.observe(document.documentElement);
    window.addEventListener('load', reportHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', reportHeight);
    };
  }, [loading, missing, page]);

  if (loading) return <Loader />;
  if (missing || !page) return <NotFound />;

  return (
    <div ref={rootRef} style={{ margin: 0, padding: 0 }}>
      {page.html.map(el => (
        <ElementNode
          key={el.id}
          el={el}
          depth={0}
          selectedId={null}
          editingId={null}
          onSelect={() => {}}
          onDblClick={() => {}}
          onTextBlur={() => {}}
          interactive
        />
      ))}
    </div>
  );
}
