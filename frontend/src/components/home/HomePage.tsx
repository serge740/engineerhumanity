import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Mission from './Mission';
import About from './About';
import Programs from './Programs';
import CTA from './CTA';
import HistoryCards from './HistoryCards';

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Stats />
            <About />
            <HistoryCards />
            <Mission />
            <Programs />
            <CTA />
        </main>
    );
};

export default HomePage;
