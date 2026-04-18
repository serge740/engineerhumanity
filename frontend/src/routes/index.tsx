import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import GetInvolved from '../pages/GetInvolvd';
import Contact from '../pages/Contact';
import Upcoming from '../pages/Upcoming';
import PastEvent from '../pages/pasteEvent';
import EventDetail from '../pages/EventDetail';
import Gallery from '../pages/Gallery';

const Home = lazy(() => import('../pages/Home'));
const WhoWeAre = lazy(() => import('../pages/about/WhoWeAre'));
const OurStory = lazy(() => import('../pages/about/OurStory'));
const Donate = lazy(() => import('../pages/Donate'));
const OurImpact = lazy(() => import('../pages/impact/OurImpact'));
const SuccessStory = lazy(() => import('../pages/impact/SuccessStory'));
const Testimony = lazy(() => import('../pages/impact/Testimony'));
const Documentary = lazy(() => import('../pages/impact/Documentary'));
const ArticlePublication = lazy(() => import('../pages/impact/ArticlePublication'));
const ManagementTeamPage = lazy(() => import('../pages/team/ManagementTeam'));
const BoardMembers = lazy(() => import('../pages/team/BoardMember'));

const ProgramOverview = lazy(() => import('../pages/program/Overview'));
const PublicHealthEngineering = lazy(() => import('../pages/program/PublicHealthEngineering'));
const EducationProgram = lazy(() => import('../pages/program/EducationProgram'));
const Institute = lazy(() => import('../pages/program/Institute'));
const LeadershipAndPeace = lazy(() => import('../pages/program/LeadershipAndPeace'));
const Entrepreneurship = lazy(() => import('../pages/program/Entrepreneurship'));

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

            // ── About (separated into who-we-are and our-story) ──
            {
                path: "about/who-we-are",
                element: <SuspenseWrap><WhoWeAre /></SuspenseWrap>
            },
            {
                path: "about/our-story",
                element: <SuspenseWrap><OurStory /></SuspenseWrap>
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

            // ── Programs ──
            {
                path: "programs/overview",
                element: <SuspenseWrap><ProgramOverview /></SuspenseWrap>
            },
            {
                path: "programs/public-health-engineering",
                element: <SuspenseWrap><PublicHealthEngineering /></SuspenseWrap>
            },
            {
                path: "programs/education-program",
                element: <SuspenseWrap><EducationProgram /></SuspenseWrap>
            },
            {
                path: "programs/institute",
                element: <SuspenseWrap><Institute /></SuspenseWrap>
            },
            {
                path: "programs/leadership-and-peace",
                element: <SuspenseWrap><LeadershipAndPeace /></SuspenseWrap>
            },
            {
                path: "programs/entrepreneurship",
                element: <SuspenseWrap><Entrepreneurship /></SuspenseWrap>
            },

            // ── Contact ──
            {
                path: "contact",
                element: <SuspenseWrap><Contact /></SuspenseWrap>
            },

            // ── Get Involved ──
            {
                path: "get-involved",
                element: <SuspenseWrap><GetInvolved /></SuspenseWrap>
            },

            // ── Impact ──
            {
                path: "impact/our-impact",
                element: <SuspenseWrap><OurImpact /></SuspenseWrap>
            },
            {
                path: "impact/success-story",
                element: <SuspenseWrap><SuccessStory /></SuspenseWrap>
            },
            {
                path: "impact/testimony",
                element: <SuspenseWrap><Testimony /></SuspenseWrap>
            },
            {
                path: "impact/documentary",
                element: <SuspenseWrap><Documentary /></SuspenseWrap>
            },
            {
                path: "impact/article-publication",
                element: <SuspenseWrap><ArticlePublication /></SuspenseWrap>
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
            {
                path: "past-event/:id",
                element: <SuspenseWrap><EventDetail /></SuspenseWrap>
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
