import defaultHeroBackground from '../../../assets/hero-header.jpg';

export function EventHero({ title, linkTitle, linkHref, backgroundImage }: {
  title: string; linkTitle: string; linkHref: string; backgroundImage?: string;
}) {
  return (
    <div className="relative h-[42vh] min-h-[280px] flex items-center overflow-hidden">
      <img src={backgroundImage || defaultHeroBackground} alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,115,171,0.55) 0%, rgba(37,99,235,0.25) 60%, transparent 100%)' }} />
      <div className="relative z-10 px-4 sm:px-8 lg:px-16">
        <h1 className="text-[clamp(24px,3.6vw,48px)] font-bold leading-tight tracking-tight text-white mb-4 max-w-3xl">
          {title}
        </h1>
        <div className="inline-flex items-center gap-2 text-sm text-white/60">
          <a href="/" className="text-white/60 hover:text-white transition-colors no-underline">Home</a>
          <span className="text-white/40">›</span>
          <a href={linkHref} className="text-white/80 hover:text-white transition-colors no-underline font-medium">{linkTitle}</a>
        </div>
      </div>
    </div>
  );
}
