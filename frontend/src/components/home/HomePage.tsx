import Hero from './Hero';
import Ticker from './Ticker';
import About from './About';
import HistoryCards from './HistoryCards';
import Mission from './Mission';
import Programs from './Programs';
import CTA from './CTA';

const HomePage = () => (
    <main className="font-sans text-[#0A1628] bg-[#F0F7FF]">
        <Hero />
        <Ticker />
        <About />
        <HistoryCards />
        <Mission />
        <Programs />
        <CTA />
    </main>
);

export default HomePage;
