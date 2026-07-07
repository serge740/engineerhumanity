import { Link } from 'react-router-dom';

// lucide-react dropped brand/logo icons — small inline SVGs stand in for them.
const Facebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
);
const Twitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98A12.16 12.16 0 013 4.9a4.28 4.28 0 001.33 5.72 4.27 4.27 0 01-1.94-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.3 4.3 0 01-1.94.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.13 12.13 0 008.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53a8.35 8.35 0 002.5-2.6z"/></svg>
);
const Linkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z"/></svg>
);
const Instagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.74 3.74 0 01-1.38-.9 3.74 3.74 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.27.06-2.15.26-2.91.56a5.9 5.9 0 00-2.13 1.39A5.9 5.9 0 00.62 4.15c-.3.76-.5 1.64-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 001.39 2.13 5.9 5.9 0 002.13 1.39c.76.3 1.64.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 002.13-1.39 5.9 5.9 0 001.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.39-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/></svg>
);
const Youtube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 2.8 12 2.8 12 2.8h-.01s-4.9 0-8.2.34c-.46.05-1.46.06-2.36 1C.72 4.86.5 6.5.5 6.5S.27 8.42.27 10.34v1.8c0 1.92.23 3.84.23 3.84s.23 1.64.93 2.36c.9.95 2.08.92 2.6 1.02 1.9.18 8 .24 8 .24s4.9-.01 8.2-.34c.46-.06 1.46-.06 2.36-1.02.71-.72.94-2.36.94-2.36s.23-1.92.23-3.84v-1.8c0-1.92-.23-3.84-.23-3.84zM9.6 15.02V8.3l6.44 3.37-6.44 3.35z"/></svg>
);

const Footer = () => (
    <footer className="bg-[#0A1628] text-white/65" id="contact">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 px-4 sm:px-8 lg:px-16 pt-12 lg:pt-18 pb-8 lg:pb-12 border-b border-white/10">
            {/* Brand */}
            <div>
                <Link to="/" className="font-serif text-[22px] font-semibold tracking-tight text-white no-underline inline-block mb-4">
                    Engineers<span className="">4</span>Humanity
                </Link>
                <p className="text-sm leading-[1.8] mb-5">
                    Empowering refugees and underserved communities through education, engineering solutions, and sustainable development.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-[6px] px-4 py-3 mb-6">
                    <p className="text-xs text-white/40 mb-1">Registered 501(c)(3) nonprofit</p>
                    <p className="text-sm font-semibold text-white">EIN: 99-2264956</p>
                </div>
                <div className="flex gap-3">
                    {[
                        { href: 'https://facebook.com', icon: <Facebook /> },
                        { href: 'https://twitter.com', icon: <Twitter /> },
                        { href: 'https://linkedin.com', icon: <Linkedin /> },
                        { href: 'https://instagram.com', icon: <Instagram /> },
                        { href: 'https://youtube.com', icon: <Youtube /> },
                    ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-white/8 hover:bg-sky-600 flex items-center justify-center text-white/65 hover:text-white transition-all">
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Programs */}
            <div>
                <h4 className="font-serif text-base font-semibold text-white mb-5">Programs</h4>
                {[
                    { label: 'High School & University scholarships', to: '/programs/education-program' },
{ label: 'Leadership & Peacebuilding', to: '/programs/leadership-and-peace' },
                    { label: 'Public Health Engineering', to: '/programs/public-health-engineering' },
                    { label: 'Entrepreneurship & Construction Service', to: '/programs/entrepreneurship' },
                    { label: 'Professional Skills Development', to: '/programs/professional-skills' },
                    { label: 'Research & Innovation Hub', to: '/programs/research-innovation' },
                ].map(l => (
                    <Link key={l.to} to={l.to} className="block text-sm text-white/55 hover:text-white no-underline mb-2.5 transition-colors">{l.label}</Link>
                ))}
            </div>

            {/* Organization */}
            <div>
                <h4 className="font-serif text-base font-semibold text-white mb-5">Organization</h4>
                {[
                    { label: 'About Us', to: '/about/who-we-are' },
                    { label: 'Our Story', to: '/about/our-story' },
                    { label: 'Our Team', to: '/about/executive-team' },
                    { label: 'Board Member', to: '/about/board-member' },
                    { label: 'Upcoming Events', to: '/upcoming-event' },
                    { label: 'Past Events', to: '/past-event' },
                    { label: 'Gallery', to: '/gallery' },
                ].map(l => (
                    <Link key={l.to} to={l.to} className="block text-sm text-white/55 hover:text-white no-underline mb-2.5 transition-colors">{l.label}</Link>
                ))}
            </div>

            {/* Connect */}
            <div>
                <h4 className="font-serif text-base font-semibold text-white mb-5">Connect</h4>
                <div className="text-sm leading-[1.8] mb-5">
                    <p className="text-white font-semibold mb-1">Texas Office</p>
                    <p className="text-xs text-sky-400 font-medium mb-1">Engineers4Humanity</p>
                    <p className="text-white/55">2012 ELM Place, Northlake, TX 76247</p>
                    <a href="tel:+14699670444" className="block text-white/55 hover:text-white no-underline mt-1.5 transition-colors">+1 (469) 967-0444</a>
                    <a href="mailto:contact@engineers4humanity.org" className="block text-white/55 hover:text-white no-underline text-xs transition-colors">contact@engineers4humanity.org</a>
                </div>
                <div className="text-sm leading-[1.8]">
                    <p className="text-white font-semibold mb-1">Rwanda Office</p>
                    <p className="text-xs text-sky-400 font-medium mb-1">Engineers4Humanity Consultancy</p>
                    <p className="text-xs text-white/40 mb-1">TIN#111054632</p>
                    <p className="text-white/55">Diamond House, 2nd Floor, Kigali City, Kicukiro Center</p>
                    <a href="tel:+250785426752" className="block text-white/55 hover:text-white no-underline mt-1.5 transition-colors">+250 785 426 752</a>
                    <a href="mailto:kigalioffice@engineers4humanity.org" className="block text-white/55 hover:text-white no-underline text-xs transition-colors">kigalioffice@engineers4humanity.org</a>
                </div>
            </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-6 flex-wrap gap-3">
            <span className="text-[13px]">
                © {new Date().getFullYear()} Engineers4Humanity. Made by{' '}
                <a href="http://abytechhub.com/" className="text-sky-400 underline">Abytech Hub</a>
            </span>
            <div className="flex gap-6">
                <a href="#" className="text-[13px] text-white/45 hover:text-white no-underline transition-colors">Privacy</a>
                <a href="#" className="text-[13px] text-white/45 hover:text-white no-underline transition-colors">Terms</a>
            </div>
        </div>
    </footer>
);

export default Footer;
