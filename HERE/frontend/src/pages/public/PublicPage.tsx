import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EMBED_HEIGHT_MESSAGE } from './EmbedPage';

/**
 * Hosts a published page inside an iframe pointed at /embed/page/:slug.
 * That route is a genuinely separate document, so the page's own imported
 * CSS/<script> content is fully isolated from this app's Navbar/Footer —
 * see EmbedPage.tsx for the isolated side and the height-reporting bridge
 * this component listens for below. The iframe is styled borderless with a
 * height that tracks the page's real content, so it reads as one continuous
 * page rather than a boxed-in embed.
 */
export default function PublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [height, setHeight] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setHeight(null);
  }, [slug]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type !== EMBED_HEIGHT_MESSAGE) return;
      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0) setHeight(nextHeight);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!slug) return null;

  return (
    <iframe
      ref={iframeRef}
      src={`/embed/page/${slug}`}
      title="Page content"
      style={{
        display: 'block',
        width: '100%',
        border: 'none',
        // Fills the viewport until the real height is reported, so the
        // iframe's own loading spinner is visible immediately instead of
        // collapsing to zero height.
        height: height ?? '100vh',
      }}
    />
  );
}
