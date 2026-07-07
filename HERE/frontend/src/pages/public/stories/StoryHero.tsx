import heroBackground from '../../../assets/hero-header.jpg';

export function StoryHero({ title, linkTitle, linkHref }: { title: string; linkTitle: string; linkHref: string }) {
  return (
    <div className="relative h-[42vh] min-h-[280px] flex items-center overflow-hidden">
      <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,115,171,0.55) 0%, rgba(5,150,105,0.25) 60%, transparent 100%)' }} />
      <div className="relative z-10 px-4 sm:px-8 lg:px-16">
        <h1 className="font-serif text-[clamp(28px,4vw,56px)] font-light leading-none tracking-tight text-white mb-4">
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
