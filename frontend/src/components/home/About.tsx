import { Link } from 'react-router-dom';
import image1 from '../../assets/image.jpeg';

const pillars = [
    { num: "01", title: "Connect", desc: "Matching engineers and volunteers with communities where their skills create the most impact." },
    { num: "02", title: "Build", desc: "Designing and deploying real-world solutions in public health engineering and vocational skills development." },
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
                    Engineers4Humanity's <em className="italic text-sky-500">Mission</em>
                </h2>
                <p className="text-base leading-[1.8] text-[#3A5068] mb-5">
                    To build a dignified life for refugees and underserved communities in Rwanda, and promote country development by:
                </p>
                <ul className="space-y-3 mb-8">
                    {[
                        "Enhancing education & vocational skills development;",
                        "Fostering self-reliance through job creation and entrepreneurship;",
                        "Advancing engineering solutions for environmental protection, water, sanitation, and hygiene services; and",
                        "Encouraging servant leadership and peacebuilding",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-base text-[#3A5068] leading-relaxed">
                            <span className="text-sky-500 mt-1.5 flex-shrink-0">•</span>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="border-t border-sky-200 pt-6 mb-8 space-y-4">
                    <p className="text-base leading-[1.8] text-[#3A5068]">
                        Engineers4Humanity is a registered <strong className="text-[#0A1628]">501(c)(3) nonprofit organization</strong> based in Texas which guides and supports the Engineers4Humanity Consultancy social enterprise in Rwanda that fosters resilience and self-reliance in refugee camps through education, engineering, and servant leadership.
                    </p>
                    <p className="text-base leading-[1.8] text-[#3A5068]">
                        Founded by <strong className="text-[#0A1628]">Eric Kamanzi</strong> — civil engineer, Project Management Professional, and former refugee — the organization has positively impacted more than <strong className="text-emerald-600">2,000 young refugees</strong> across Rwanda.
                    </p>
                </div>

                <Link to="/about/who-we-are" className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm tracking-wide no-underline hover:text-sky-800 transition-colors">
                    Learn More About Us →
                </Link>
            </div>

            {/* Right */}
            <div>
                <img src={image1} alt="Community Impact" className="w-full h-[650px] object-cover rounded-[4px] block" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0.5 mt-4">
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
