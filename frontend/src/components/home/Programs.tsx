import { Link } from 'react-router-dom';
import image1 from '../../assets/home/program/image1.png';
import image2 from '../../assets/home/program/image2.png';
import image3 from '../../assets/home/program/image3.png';

const cards = [
    {
        image: image2,
        tag: "Education",
        title: "Education",
        items: ["High School & University", "Leadership & Peacebuilding"],
        desc: "Encouraging servant leadership and peacebuilding initiatives in Rwanda for lasting impact.",
        to: "/programs/education-program",
        emerald: false,
    },
    {
        image: image1,
        tag: "Engineering",
        title: "Engineering",
        items: ["Public Health Engineering", "Social Entrepreneurship & Construction Service"],
        desc: "Addressing Water, Sanitation, and Hygiene (WASH) challenges in Rwanda refugee camps through sustainable engineering systems.",
        to: "/programs/public-health-engineering",
        emerald: false,
    },
    {
        image: image3,
        tag: "Institute",
        title: "Engineers4Humanity Institute",
        items: ["Professional Skills Development", "Research & Innovation Hub"],
        desc: "Equipping refugee and immigrant youth with engineering, project management, and entrepreneurship skills to build self-reliance.",
        to: "/programs/institute",
        emerald: true,
    },
];

const Programs = () => (
    <section className="px-4 sm:px-8 lg:px-16 pb-12 lg:pb-28 bg-[#F0F7FF]" id="programs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-8 sm:mb-12 border-t border-sky-200/60 pt-8 sm:pt-12">
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-normal leading-[1.1] tracking-tight text-[#0A1628]">
                Programs that<br /><em className="italic text-emerald-600">make a difference</em>
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#3A5068] sm:max-w-[300px] sm:text-right">
                Each program targets a specific humanitarian challenge with measurable outcomes and a clear engineering mandate.
            </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {cards.map((card, i) => (
                <div key={i} className="relative rounded-[6px] overflow-hidden min-h-[380px] flex flex-col justify-end group cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
                    <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute inset-0 ${card.emerald ? 'bg-gradient-to-t from-emerald-900/90 via-emerald-800/30 to-transparent' : 'bg-gradient-to-t from-sky-900/90 via-sky-800/30 to-transparent'}`} />
                    <div className="relative z-10 p-8">
                        <span className={`block text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5 ${card.emerald ? 'text-emerald-300' : 'text-sky-300'}`}>{card.tag}</span>
                        <div className="font-serif text-[26px] font-semibold leading-[1.2] text-white mb-4">{card.title}</div>
                        <ul className="space-y-2 mb-4">
                            {card.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-white/80 leading-relaxed">
                                    <span className={`mt-1.5 flex-shrink-0 ${card.emerald ? 'text-emerald-300' : 'text-sky-300'}`}>•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">{card.desc}</p>
                        <Link to={card.to} className="text-white text-[13px] font-semibold no-underline tracking-wide">Learn more ↗</Link>
                    </div>
                </div>
            ))}
        </div>

        {/* Featured band */}
        <div className="bg-[#0A1628] rounded-[6px] px-6 py-8 md:px-14 md:py-12 flex items-center gap-8 md:gap-12 flex-wrap">
            <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-300/60 mb-5">
                    <span className="w-6 h-0.5 bg-sky-300/50 block" />
                    Flagship Initiative
                </div>
                <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] font-normal leading-[1.2] text-white">
                    Servant Leadership & Peacebuilding — <em className="italic text-sky-300">empowering youth</em> across Rwanda
                </h3>
            </div>
            <p className="text-[15px] leading-[1.8] text-white/65 flex-1 min-w-[220px]">
                Empowering youth and women affected by conflict through mentorship, creative healing, and multicultural peace-building initiatives.
            </p>
            <Link to="/programs" className="bg-sky-600 hover:bg-sky-700 text-white px-9 py-4 text-[13px] font-bold tracking-[0.08em] uppercase rounded-[3px] no-underline whitespace-nowrap flex-shrink-0 transition-colors">
                See All Programs ↗
            </Link>
        </div>
    </section>
);

export default Programs;
