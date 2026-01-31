import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation()
     

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {

        document.body.scrollIntoView({ behavior: 'smooth' })
        
    }, [location.pathname]);
    return (
        <div className="font-sans text-gray-800">
            <Navbar scrolled={scrolled} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
