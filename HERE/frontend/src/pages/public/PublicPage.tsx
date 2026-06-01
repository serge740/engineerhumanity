import { useEffect, useState } from 'react';
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

export default function PublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page,    setPage]    = useState<PublicPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  // Inject a high-priority stylesheet that:
  // 1. Clears the admin app's gray body background
  // 2. Removes any max-width / margin constraints the imported page CSS
  //    may have placed on html/body (which would create visible side gaps)
  // Appended LAST to <head> so it wins over imported page stylesheets.
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
      .then(data => {
        document.title = data.title || slug;
        setPage(data);
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (missing || !page) return <NotFound />;

  return (
    <div style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
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
        />
      ))}
    </div>
  );
}
