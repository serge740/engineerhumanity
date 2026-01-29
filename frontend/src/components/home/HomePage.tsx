import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Mission from './Mission';
import About from './About';
import Programs from './Programs';
import CTA from './CTA';

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Stats />
            <Mission />
            <About />
            <Programs />
            <CTA />
        </main>
    );
};

export default HomePage;
