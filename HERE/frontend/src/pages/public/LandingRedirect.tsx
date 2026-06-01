import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLandingPage } from '../../api/pages';

export default function LandingRedirect() {
  const navigate = useNavigate();
  const [noPage, setNoPage] = useState(false);

  useEffect(() => {
    getLandingPage()
      .then(({ slug }) => navigate(`/${slug}`, { replace: true }))
      .catch(() => setNoPage(true));
  }, []);

  if (noPage) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#f9fafb', gap: 12,
      }}>
        <div style={{ fontSize: 48 }}>🚧</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#111827' }}>
          Coming soon
        </h1>
        <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
          No published landing page yet.
        </p>
      </div>
    );
  }

  // Loading screen shown while fetching the landing page slug
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: '#fff', gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '3px solid #e5e7eb', borderTopColor: '#6366f1',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
