import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage1 from '../../assets/events/pictures vocationaltraining (1)/508D0046.jpg';
import heroImage2 from '../../assets/events/Parent Visit in 2019 at Gihembe Refugee Camp/4784C9FB-E5D8-4530-808B-F90379DEA33F.JPG';
import heroImage3 from '../../assets/events/pictures vocationaltraining (1)/508D0030.jpg';

const slides = [
    { image: heroImage1, title: "Building Dignified", em: "Lives", desc: "Empowering refugees and underserved communities through education, engineering, and servant leadership" },
    { image: heroImage2, title: "Education Changes", em: "Everything", desc: "From refugee camps to universities — we open doors that were never meant to be closed" },
    { image: heroImage3, title: "Creating", em: "Opportunities", desc: "Vocational training, mentorship, and social entrepreneurship transforming lives across East Africa and beyond" },
];

const stats = [
    { num: "500+", label: "Hope School Graduates" },
    { num: "2,000+", label: "Lives Transformed" },
    { num: "17+", label: "Years of Service" },
    { num: "2008", label: "Year Founded" },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden flex items-center">
            {/* Background slides */}
            {slides.map((slide, i) => (
                <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.image} alt={slide.em} className="w-full h-full object-cover brightness-[0.45] saturate-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,115,171,0.72) 0%, rgba(5,150,105,0.3) 60%, transparent 100%)' }} />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 px-16 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/40 px-4 py-2 rounded-full mb-9">
                    <span className="text-[7px]">◆</span>
                    Engineering for Good
                </div>
                <h1 className="font-serif text-[clamp(52px,6.5vw,90px)] font-light leading-none tracking-tight text-white mb-7">
                    {slides[current].title}<br />
                    <em className="italic text-sky-300">{slides[current].em}</em>
                </h1>
                <p className="text-lg leading-[1.75] text-white/75 max-w-[520px] mb-12">
                    {slides[current].desc}
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                    <Link to="/get-involved" className="bg-emerald-600 hover:bg-emerald-700 text-white px-9 py-4 text-[13px] font-bold tracking-[0.08em] uppercase rounded-[3px] transition-all hover:-translate-y-0.5 no-underline">
                        Get Involved
                    </Link>
                    <Link to="/about/who-we-are" className="border border-white/30 hover:border-white/70 text-white/80 hover:text-white px-9 py-4 text-[13px] font-semibold tracking-[0.08em] uppercase rounded-[3px] transition-all no-underline">
                        Our Mission
                    </Link>
                </div>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-28 left-16 flex gap-3 z-10">
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                        className={`h-[3px] rounded-full transition-all border-none cursor-pointer ${i === current ? 'bg-white w-10' : 'bg-white/40 w-5'}`}
                    />
                ))}
            </div>

            {/* Stats strip */}
            <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-4 bg-[rgba(7,115,171,0.85)] backdrop-blur-[10px] border-t border-sky-300/20">
                {stats.map((s, i) => (
                    <div key={i} className={`px-10 py-7 ${i < stats.length - 1 ? 'border-r border-sky-300/15' : ''}`}>
                        <div className="font-serif text-[44px] font-bold text-white leading-none">{s.num}</div>
                        <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/55 mt-1">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
