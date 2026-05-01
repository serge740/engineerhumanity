import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import image1 from '../../assets/home/program/image1.png';
import image2 from '../../assets/home/program/image2.png';
import image3 from '../../assets/home/program/image3.png';
import image4 from '../../assets/home/program/image4.png';

const programs = [
    {
        image: image1,
        tag: "Humanitarian",
        tagColor: "text-sky-300",
        title: "Public Health Engineering",
        subtitle: "WASH & Environment",
        desc: "Addressing Water, Sanitation, and Hygiene (WASH) challenges in refugee camps and rural African communities through sustainable engineering systems that protect health and restore dignity.",
        to: "/programs/public-health-engineering",
        accent: "from-sky-900/90 via-sky-800/30",
    },
    {
        image: image2,
        tag: "Education",
        tagColor: "text-emerald-300",
        title: "Education Program",
        subtitle: "Scholarships & STEM",
        desc: "Providing scholarships in STEM and vocational training to empower refugee youth toward self-reliance and productive futures — opening doors that were never meant to be closed.",
        to: "/programs/education-program",
        accent: "from-emerald-900/90 via-emerald-800/30",
    },
    {
        image: image3,
        tag: "E4H Institute",
        tagColor: "text-purple-300",
        title: "Skills Development Institute",
        subtitle: "Vocational Technical Training",
        desc: "Equipping refugee and immigrant youth with engineering, project management, and entrepreneurship skills to break the cycle of poverty and build sustainable livelihoods.",
        to: "/programs/institute",
        accent: "from-purple-900/90 via-purple-800/30",
    },
    {
        image: image4,
        tag: "Humanitarian",
        tagColor: "text-sky-300",
        title: "Leadership & Peacebuilding",
        subtitle: "Servant Leadership",
        desc: "Empowering youth and women affected by conflict through mentorship, creative healing, and multicultural peace-building initiatives across East Africa.",
        to: "/programs/leadership-and-peace",
        accent: "from-sky-900/90 via-sky-800/30",
    },
    {
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        tag: "Consultancy",
        tagColor: "text-amber-300",
        title: "Social Entrepreneurship",
        subtitle: "Engineering Consultancy",
        desc: "A registered social enterprise providing engineering and environmental consultancy services, creating jobs and supporting sustainable development across East Africa.",
        to: "/programs/entrepreneurship",
        accent: "from-amber-900/90 via-amber-800/30",
    },
];

const Overview = () => (
    <div className="min-h-screen bg-[#F0F7FF] font-sans">
        <Header
            title="Our"
            titleEm="Programs"
            tag="What we do"
            subtitle="Five targeted programs tackling humanitarian challenges through engineering, education, and servant leadership."
            linkTitle="Programs"
            linkHref="/programs"
            backgroundImage={image1}
        />

        {/* Intro */}
        <div className="px-4 sm:px-8 lg:px-16 py-12 lg:py-16 max-w-4xl">
            <p className="text-base leading-[1.9] text-[#3A5068]">
                Engineers4Humanity addresses critical needs through education, public health engineering, and capacity-building programs.
                We aim to build a better world for everyone — promoting self-reliance and sustainable livelihood among refugees, migrants, and underserved communities.
            </p>
        </div>

        {/* Programs Grid */}
        <div className="px-4 sm:px-8 lg:px-16 pb-12 lg:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((p, i) => (
                    <Link
                        key={i}
                        to={p.to}
                        className="group relative rounded-[6px] overflow-hidden min-h-[420px] flex flex-col justify-end no-underline hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} to-transparent`} />

                        {/* Tag badge */}
                        <div className="absolute top-5 left-5 z-10">
                            <span className={`text-[10px] font-bold tracking-[0.18em] uppercase ${p.tagColor} bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full`}>
                                {p.tag}
                            </span>
                        </div>

                        {/* Body */}
                        <div className="relative z-10 p-8">
                            <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 mb-2">{p.subtitle}</div>
                            <div className="font-serif text-[28px] font-semibold leading-[1.15] text-white mb-3">{p.title}</div>
                            <p className="text-sm leading-[1.65] text-white/75 mb-5 line-clamp-3">{p.desc}</p>
                            <span className="inline-flex items-center gap-2 text-white text-[13px] font-semibold tracking-wide group-hover:gap-3 transition-all">
                                Explore Program
                                <span className="text-base">↗</span>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* CTA Banner */}
        <section className="mx-4 sm:mx-8 lg:mx-16 mb-12 lg:mb-20 bg-[#0A1628] rounded-[6px] px-6 py-10 md:px-14 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="flex-1">
                <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-300/60 mb-5">
                    <span className="w-6 h-0.5 bg-sky-300/50 block" />
                    Make an Impact
                </div>
                <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-normal leading-[1.2] text-white">
                    Support our programs — <em className="italic text-sky-300">transform lives</em>
                </h2>
            </div>
            <p className="text-[15px] leading-[1.8] text-white/60 flex-1">
                Your support helps us continue transforming lives through education, engineering, and peace-building across East Africa and beyond.
            </p>
            <a
                href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-9 py-4 text-[13px] font-bold tracking-[0.08em] uppercase rounded-[3px] no-underline whitespace-nowrap flex-shrink-0 transition-colors"
            >
                Donate Now
            </a>
        </section>
    </div>
);

export default Overview;
