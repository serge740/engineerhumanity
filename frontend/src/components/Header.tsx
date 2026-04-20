import React from "react";
import defaultBackground from '../assets/events/pictures vocationaltraining (1)/PHOTO-2021-11-30-06-55-35_1.jpg';

interface HeaderProps {
    title: string;
    titleEm?: string;
    subtitle?: string;
    tag?: string;
    linkTitle: string;
    linkHref: string;
    backgroundImage?: string;
}

const Header: React.FC<HeaderProps> = ({ title, titleEm, subtitle, tag, linkTitle, linkHref, backgroundImage }) => {
    const bg = defaultBackground;

    return (
        <div className="relative h-[55vh] flex items-center overflow-hidden">
            <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, rgba(7,115,171,0.75) 0%, rgba(5,150,105,0.3) 60%, transparent 100%)' }}
            />
            <div className="relative z-10 px-16 pt-24">
                {tag && (
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/40 px-4 py-2 rounded-full mb-6">
                        <span className="text-[7px]">◆</span>
                        {tag}
                    </div>
                )}
                <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-light leading-none tracking-tight text-white mb-4">
                    {title}{titleEm && <> <em className="italic text-sky-300">{titleEm}</em></>}
                </h1>
                {subtitle && (
                    <p className="text-lg text-white/75 max-w-lg leading-relaxed mb-6">{subtitle}</p>
                )}
                {/* Breadcrumb */}
                <div className="inline-flex items-center gap-2 text-sm text-white/60">
                    <a href="/" className="text-white/60 hover:text-white transition-colors no-underline">Home</a>
                    <span className="text-white/40">›</span>
                    <a href={linkHref} className="text-white/80 hover:text-white transition-colors no-underline font-medium">{linkTitle}</a>
                </div>
            </div>
        </div>
    );
};

export default Header;
