import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

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
            }
        ]
    }
]);

export default router;
