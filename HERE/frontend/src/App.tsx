import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import { getSites } from './api/sites';

const DashboardPage     = lazy(() => import('./pages/dashboard/DashboardPage'));
const SiteWorkspacePage = lazy(() => import('./pages/sites/SiteWorkspacePage'));
const EditorPage        = lazy(() => import('./pages/editor/EditorPage'));
const ComingSoonPage    = lazy(() => import('./pages/placeholder/ComingSoonPage'));
const PublicPage        = lazy(() => import('./pages/public/PublicPage'));
const LandingRedirect   = lazy(() => import('./pages/public/LandingRedirect'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

// Fetches the one site and redirects to its workspace
function SiteRedirect() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    getSites()
      .then(sites => {
        if (sites.length > 0) {
          navigate(`/sites/${sites[0].id}`, { replace: true });
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-slate-500 text-sm">No site found. Please contact the administrator.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { fontSize: '13px', borderRadius: '12px' },
          }}
        />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Public routes (no auth) ──────────────────────── */}
            {/* / → loading screen → fetch landing page → navigate to /:slug */}
            <Route path="/" element={<LandingRedirect />} />

            {/* Admin login */}
            <Route path="/login" element={<LoginPage />} />

            {/* ── Protected admin routes ───────────────────────── */}
            <Route path="/dashboard" element={
              <Protected><DashboardPage /></Protected>
            } />

            {/* /sites → auto-redirect to the one site's workspace */}
            <Route path="/sites" element={
              <Protected><SiteRedirect /></Protected>
            } />

            {/* Site workspace — pages / components / assets / settings */}
            <Route path="/sites/:siteId" element={
              <Protected><SiteWorkspacePage /></Protected>
            } />

            {/* Page editor */}
            <Route path="/sites/:siteId/editor/:slug" element={
              <Protected><EditorPage /></Protected>
            } />

            {/* Global settings */}
            <Route path="/settings" element={
              <Protected>
                <ComingSoonPage title="Settings" description="Global settings coming soon." />
              </Protected>
            } />

            {/* ── Public page renderer ─────────────────────────── */}
            {/* Must be LAST so admin routes match first */}
            <Route path="/:slug" element={<PublicPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
