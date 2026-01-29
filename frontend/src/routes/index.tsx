import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import GetInvolved from '../pages/GetInvolvd';
import Contact from '../pages/Contact';
import Program from '../pages/Program';
import Upcoming from '../pages/Upcoming';
import PastEvent from '../pages/pasteEvent';
import Gallery from '../pages/Gallery';

const Home = lazy(() => import('../pages/Home'));

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
                path:"get-involved",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <GetInvolved />
                    </Suspense>
                )
            },
              {
                path:"contact",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <Contact />
                    </Suspense>
                )
            },
             {
                path:"programs",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                        <Program />
                    </Suspense>
                )
            },
             {
                path:"upcoming-event",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                     <Upcoming />
                    </Suspense>
                )
            },
              {
                path:"past-event",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                     <PastEvent />
                    </Suspense>
                )
            },
                {
                path:"gallery",
                element: (
                    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                     <Gallery />
                    </Suspense>
                )
            }
        ]
    }
]);

export default router;
