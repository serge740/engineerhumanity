import { Link } from 'react-router-dom';
import image1 from '../../assets/events/rwandaconvention July 2025 (1)/PHOTO-2025-07-06-18-29-44_1.jpg';

const pillars = [
    { num: "01", title: "Connect", desc: "Matching engineers and volunteers with communities where their skills create the most impact." },
    { num: "02", title: "Build", desc: "Designing and deploying real-world solutions — from WASH systems to vocational centers." },
    { num: "03", title: "Sustain", desc: "Training local communities to maintain solutions and lead long after our support ends." },
];

const About = () => (
    <section className="py-12 px-4 sm:px-8 lg:px-16 lg:py-28 bg-[#F0F7FF]" id="mission">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20 items-start">
            {/* Left */}
            <div>
                <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-600 mb-8">
                    <span className="w-7 h-0.5 bg-sky-600 block flex-shrink-0" />
                    Who we are
                </div>
                <h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-normal leading-[1.1] tracking-tight text-[#0A1628] mb-7">
                    Engineers4Humanity's <em className="italic text-sky-500">Inspiration</em>
                </h2>
                <p className="text-base leading-[1.8] text-[#3A5068] mb-5">
                    Engineers4Humanity is a registered <strong className="text-[#0A1628]">501(c)(3) nonprofit organization</strong> based in Texas, fostering resilience and self-reliance among displaced communities through education, engineering, and servant leadership.
                </p>
                <p className="text-base leading-[1.8] text-[#3A5068] mb-8">
                    Founded by <strong className="text-[#0A1628]">Eric Kamanzi</strong> — civil engineer, PMP, and former refugee — the organization has positively impacted more than <strong className="text-emerald-600">2,000 young refugees</strong> across East Africa and beyond.
                </p>
                <Link to="/about/who-we-are" className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm tracking-wide no-underline hover:text-sky-800 transition-colors">
                    Learn More About Us →
                </Link>
            </div>

            {/* Right */}
            <div>
                <img src={image1} alt="Community Impact" className="w-full h-[360px] object-cover rounded-[4px] block" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0.5 mt-2 sm:mt-0.5">
                    {pillars.map(p => (
                        <div key={p.num} className="bg-[#E1EEF9] p-8 rounded-[2px] group hover:bg-sky-600 transition-colors duration-250 cursor-default">
                            <span className="font-serif text-[13px] font-bold text-emerald-600 group-hover:text-white mb-3.5 block transition-colors duration-250">{p.num}</span>
                            <div className="font-serif text-[22px] font-semibold text-[#0A1628] group-hover:text-white mb-2.5 transition-colors duration-250">{p.title}</div>
                            <p className="text-[13px] leading-[1.7] text-[#3A5068] group-hover:text-white transition-colors duration-250">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default About;
