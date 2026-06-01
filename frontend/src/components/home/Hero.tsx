import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage1 from '../../assets/events/pictures vocationaltraining (1)/508D0046.jpg';
import heroImage2 from '../../assets/events/Parent Visit in 2019 at Gihembe Refugee Camp/4784C9FB-E5D8-4530-808B-F90379DEA33F.JPG';
import heroImage3 from '../../assets/events/pictures vocationaltraining (1)/508D0030.jpg';

const slides = [
    { image: heroImage1, title: "Building Dignified", em: "Lives", desc: "Empowering refugees and underserved communities through education, engineering, and servant leadership" },
    { image: heroImage2, title: "Education Changes", em: "Everything", desc: "From refugee camps to universities — we open doors that were never meant to be closed" },
    { image: heroImage3, title: "Creating", em: "Opportunities", desc: "Vocational training, mentorship, and social entrepreneurship transforming lives across Rwanda and beyond" },
];

const stats = [
    { target: 500, suffix: "+", label: "Hope School Graduates" },
    { target: 2000, suffix: "+", label: "Lives Transformed" },
    { target: 17, suffix: "+", label: "Years of Founder in Humanitarian Service" },
    { target: 2020, suffix: "", label: "Year Founded" },
];

function useCountUp(target: number, duration = 1800, active = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        setCount(0);
        const steps = 60;
        const stepTime = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (step >= steps) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [target, duration, active]);
    return count;
}

function StatItem({ target, suffix, label, active, className }: { target: number; suffix: string; label: string; active: boolean; className?: string }) {
    const count = useCountUp(target, 3500, active);
    const display = target === 2000
        ? (!(count == 2020) && count >= 1000  ) ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1).replace(/\.0$/, '')},000` : count.toString()
        : count.toLocaleString();
    return (
        <div className={className}>
            <div className="font-serif text-2xl sm:text-[32px] lg:text-[38px] font-bold text-white leading-none">
                {display}{suffix}
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-white/55 mt-1">{label}</div>
        </div>
    );
}

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [counting, setCounting] = useState(false);
    const stripRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setCounting(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        if (stripRef.current) observer.observe(stripRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative min-h-[calc(110vh+50px)] overflow-hidden flex flex-col">
            {/* Background slides */}
            {slides.map((slide, i) => (
                <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.image} alt={slide.em} className="w-full h-full object-cover brightness-[0.45] saturate-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,115,171,0.72) 0%, rgba(5,150,105,0.3) 60%, transparent 100%)' }} />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 flex-1 flex items-center pb-24 sm:pb-20">
                <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/40 px-4 py-2 rounded-full mb-6 sm:mb-9 w-fit">
                        <span className="text-[7px]">◆</span>
                        Engineering for Good
                    </div>
                    <h1 className="font-serif text-[clamp(28px,4.5vw,72px)] font-light leading-none tracking-tight text-white mb-5 sm:mb-7">
                        {slides[current].title}<br />
                        <em className="italic text-sky-300">{slides[current].em}</em>
                    </h1>
                    <p className="text-sm sm:text-base leading-[1.75] text-white/75 max-w-[480px] mb-8">
                        {slides[current].desc}
                    </p>
                </div>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-24 sm:bottom-20 left-4 sm:left-16 flex gap-3 z-10">
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                        className={`h-[3px] rounded-full transition-all border-none cursor-pointer ${i === current ? 'bg-white w-10' : 'bg-white/40 w-5'}`}
                    />
                ))}
            </div>

            {/* Stats strip */}
            <div ref={stripRef} className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 sm:grid-cols-4 bg-[rgba(7,115,171,0.85)] backdrop-blur-[10px] border-t border-sky-300/20">
                {stats.map((s, i) => (
                    <StatItem
                        key={i}
                        target={s.target}
                        suffix={s.suffix}
                        label={s.label}
                        active={counting}
                        className={`px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6 ${i < stats.length - 1 ? 'border-r border-sky-300/15' : ''} ${i === 1 ? 'sm:border-r border-sky-300/15' : ''}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
