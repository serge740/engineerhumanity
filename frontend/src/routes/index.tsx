import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import GetInvolved from '../pages/GetInvolvd';
import Contact from '../pages/Contact';
import Program from '../pages/Program';
import Upcoming from '../pages/Upcoming';
import PastEvent from '../pages/pasteEvent';
import Gallery from '../pages/Gallery';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Donate = lazy(() => import('../pages/Donate'));
const Impact = lazy(() => import('../pages/Impact'));
const ManagementTeamPage = lazy(() => import('../pages/team/ManagementTeam'));
const BoardMembers = lazy(() => import('../pages/team/BoardMember'));

const SuspenseWrap = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        {children}
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <SuspenseWrap><Home /></SuspenseWrap>
            },

            // ── About (hash-scrolled sections: #who-we-are, #our-story) ──
            {
                path: "about",
                element: <SuspenseWrap><About /></SuspenseWrap>
            },
            {
                path: "about/executive-team",
                element: <SuspenseWrap><ManagementTeamPage /></SuspenseWrap>
            },
            {
                path: "about/board-member",
                element: <SuspenseWrap><BoardMembers /></SuspenseWrap>
            },

            // ── Legacy team routes ──
            {
                path: "management-team",
                element: <SuspenseWrap><ManagementTeamPage /></SuspenseWrap>
            },
            {
                path: "board-members",
                element: <SuspenseWrap><BoardMembers /></SuspenseWrap>
            },

            // ── Programs (single page, hash-scrolled sections) ──
            {
                path: "programs",
                element: <SuspenseWrap><Program /></SuspenseWrap>
            },

            // ── Impact (single page, hash-scrolled sections) ──
            {
                path: "impact",
                element: <SuspenseWrap><Impact /></SuspenseWrap>
            },

            // ── Get Involved ──
            {
                path: "get-involved",
                element: <SuspenseWrap><GetInvolved /></SuspenseWrap>
            },

            // ── Contact ──
            {
                path: "contact",
                element: <SuspenseWrap><Contact /></SuspenseWrap>
            },

            // ── Events ──
            {
                path: "upcoming-event",
                element: <SuspenseWrap><Upcoming /></SuspenseWrap>
            },
            {
                path: "past-event",
                element: <SuspenseWrap><PastEvent /></SuspenseWrap>
            },

            // ── Gallery ──
            {
                path: "gallery",
                element: <SuspenseWrap><Gallery /></SuspenseWrap>
            },

            // ── Donate ──
            {
                path: "donate",
                element: <SuspenseWrap><Donate /></SuspenseWrap>
            },
        ]
    }
]);

export default router;
