import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense, useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import { getSites } from './api/sites';
import MainLayout from './components/layout/MainLayout';
import Contact from './pages/public/Contact';
import Donate from './pages/public/Donate';
import DonationSuccess from './pages/public/DonationSuccess';
import DonationFailed from './pages/public/DonationFailed';

const DashboardPage       = lazy(() => import('./pages/dashboard/DashboardPage'));
const DonationsPage       = lazy(() => import('./pages/dashboard/DonationsPage'));
const DonationDetailPage  = lazy(() => import('./pages/dashboard/DonationDetailPage'));
const SiteWorkspacePage   = lazy(() => import('./pages/sites/SiteWorkspacePage'));
const EditorPage          = lazy(() => import('./pages/editor/EditorPage'));
const ComponentDetailPage = lazy(() => import('./pages/components/ComponentDetailPage'));
const ComingSoonPage    = lazy(() => import('./pages/placeholder/ComingSoonPage'));
const PublicPage        = lazy(() => import('./pages/public/PublicPage'));
const LandingRedirect   = lazy(() => import('./pages/public/LandingRedirect'));
const BoardMembersPublicPage    = lazy(() => import('./pages/public/team/BoardMembersPublicPage'));
const ManagementTeamPublicPage  = lazy(() => import('./pages/public/team/ManagementTeamPublicPage'));
const UpcomingEventsPublicPage       = lazy(() => import('./pages/public/events/UpcomingEventsPublicPage'));
const PastEventsPublicPage           = lazy(() => import('./pages/public/events/PastEventsPublicPage'));
const UpcomingEventDetailPublicPage  = lazy(() => import('./pages/public/events/UpcomingEventDetailPublicPage'));
const PastEventDetailPublicPage      = lazy(() => import('./pages/public/events/PastEventDetailPublicPage'));
const SuccessStoryPublicPage         = lazy(() => import('./pages/public/stories/SuccessStoryPublicPage'));
const TestimonyPublicPage            = lazy(() => import('./pages/public/stories/TestimonyPublicPage'));

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

            {/* Donations tracking */}
            <Route path="/donations" element={
              <Protected><DonationsPage /></Protected>
            } />
            <Route path="/donations/:id" element={
              <Protected><DonationDetailPage /></Protected>
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

            {/* Component detail — Data + Design tabs */}
            <Route path="/sites/:siteId/components/:componentId" element={
              <Protected><ComponentDetailPage /></Protected>
            } />


            {/* Global settings */}
            <Route path="/settings" element={
              <Protected>
                <ComingSoonPage title="Settings" description="Global settings coming soon." />
              </Protected>
            } />

            {/* Public site pages — wrapped in MainLayout (Navbar + Footer) */}
            <Route element={<MainLayout />}>
              {/* Public team pages (data-driven, no auth) */}
              <Route path="/board-member" element={<BoardMembersPublicPage />} />
              <Route path="/executive-team" element={<ManagementTeamPublicPage />} />

              {/* Public event pages (data-driven, no auth) */}
              <Route path="/upcoming-event" element={<UpcomingEventsPublicPage />} />
              <Route path="/upcoming-event/:id" element={<UpcomingEventDetailPublicPage />} />
              <Route path="/past-event" element={<PastEventsPublicPage />} />
              <Route path="/past-event/:id" element={<PastEventDetailPublicPage />} />

              {/* Public impact/story pages (data-driven, no auth) */}
              <Route path="/success-story" element={<SuccessStoryPublicPage />} />
              <Route path="/testimony" element={<TestimonyPublicPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate/success" element={<DonationSuccess />} />
              <Route path="/donate/failed" element={<DonationFailed />} />

              {/* ── Public page renderer ─────────────────────────── */}
              {/* Must be LAST so admin routes match first */}
              <Route path="/:slug" element={<PublicPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
