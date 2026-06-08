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
        <div className="font-sans text-[#0A1628]">
            <Navbar scrolled={scrolled} />
            <main>
                <Outlet />
            </main>
            <Footer />

            {/* WhatsApp floating button */}
            <a
                href="https://wa.me/14699670444"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="wa-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl hover:scale-110"
                style={{ backgroundColor: '#25D366' }}
            >
                {/* Pulsing red notification badge */}
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5">
                    <span className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="relative flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold leading-none">1</span>
                </span>

                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.47 2.027 7.77L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.854l-.486-.29-5.01 1.194 1.218-4.874-.317-.5A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.353-1.161-2.718-1.294-.365-.133-.63-.199-.896.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.399-.663.132-.265.066-.497-.033-.696-.1-.2-.896-2.161-1.228-2.96-.323-.777-.651-.672-.896-.684l-.763-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.323s1.427 3.855 1.626 4.12c.199.265 2.808 4.287 6.803 6.016.951.41 1.693.655 2.272.839.954.304 1.823.261 2.51.158.765-.114 2.353-.962 2.685-1.891.332-.929.332-1.726.232-1.891-.099-.166-.364-.265-.763-.464z"/>
                </svg>
            </a>
        </div>
    );
};

export default MainLayout;
