import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

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
                        { href: 'https://facebook.com', icon: <Facebook size={16} /> },
                        { href: 'https://twitter.com', icon: <Twitter size={16} /> },
                        { href: 'https://linkedin.com', icon: <Linkedin size={16} /> },
                        { href: 'https://instagram.com', icon: <Instagram size={16} /> },
                        { href: 'https://youtube.com', icon: <Youtube size={16} /> },
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
