import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const ManagementTeamPage = lazy(() => import('../pages/team/ManagementTeam'));
const BoardMembers = lazy(() => import('../pages/team/BoardMember'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <About />
                    </Suspense>
                )
            },
            {
                path: "management-team",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <ManagementTeamPage />
                    </Suspense>
                )
            },
            {
                path: "board-members",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <BoardMembers />
                    </Suspense>
                )
            }   
        ]
    }
]);

export default router;
