import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
    const [impactDropdownOpen, setImpactDropdownOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
    const [mobileImpactOpen, setMobileImpactOpen] = useState(false);
    const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 no-underline ${isActive
            ? 'text-sky-600 bg-sky-50'
            : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
        }`;

    const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-3 font-medium transition-all duration-200 rounded-lg block no-underline ${isActive
            ? 'text-sky-600 bg-sky-50'
            : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
        }`;

    const dropdownItemClass =
        'px-4 py-2.5 text-sm font-medium transition-all duration-200 block no-underline rounded-lg text-gray-700 hover:text-sky-600 hover:bg-gray-50 cursor-pointer';

    const dropdownLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2.5 text-sm font-medium transition-all duration-200 block no-underline rounded-lg ${isActive
            ? 'text-sky-600 bg-sky-50'
            : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
        }`;

    const closeMobile = () => setMobileMenuOpen(false);

    /** Navigate to a page with a hash, then scroll to the section */
    const scrollToSection = (path: string, hash: string) => {
        navigate(`${path}#${hash}`);
        // If already on the page, scroll manually
        setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-lg py-2'
                : 'bg-white/98 shadow-md py-3'
                }`}
        >
            <div className="mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group no-underline">
                        <img
                            src="/logo.png"
                            alt="Engineers4Humanity Logo"
                            className="w-20 h-20 scale-120 object-contain transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
                        <li>
                            <NavLink to="/" className={navLinkClasses}>
                                Home
                            </NavLink>
                        </li>

                        {/* ── About Us Dropdown ── */}
                        <li
                            className="relative"
                            onMouseEnter={() => setAboutDropdownOpen(true)}
                            onMouseLeave={() => setAboutDropdownOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 cursor-pointer outline-none border-none bg-transparent ${aboutDropdownOpen
                                    ? 'text-sky-600 bg-sky-50'
                                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                                    }`}
                            >
                                About Us
                                <ChevronDown size={16} className={`transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300 origin-top ${aboutDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <NavLink to="/about/who-we-are" className={dropdownLinkClasses} onClick={() => setAboutDropdownOpen(false)}>
                                    Who We Are
                                </NavLink>
                                <NavLink to="/about/our-story" className={dropdownLinkClasses} onClick={() => setAboutDropdownOpen(false)}>
                                    Our Story
                                </NavLink>
                                <NavLink to="/about/executive-team" className={dropdownLinkClasses} onClick={() => setAboutDropdownOpen(false)}>
                                    Executive Team
                                </NavLink>
                                <NavLink to="/about/board-member" className={dropdownLinkClasses} onClick={() => setAboutDropdownOpen(false)}>
                                    Board Member
                                </NavLink>
                                <NavLink to="/get-involved" className={dropdownLinkClasses} onClick={() => setAboutDropdownOpen(false)}>
                                    Join Us
                                </NavLink>
                            </div>
                        </li>

                        {/* ── Programs Mega Menu ── */}
                        <li
                            className="relative"
                            onMouseEnter={() => setProgramsDropdownOpen(true)}
                            onMouseLeave={() => setProgramsDropdownOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 cursor-pointer outline-none border-none bg-transparent ${programsDropdownOpen
                                    ? 'text-sky-600 bg-sky-50'
                                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                                    }`}
                            >
                                Programs
                                <ChevronDown size={16} className={`transition-transform duration-300 ${programsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 transition-all duration-300 origin-top ${programsDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Humanitarian */}
                                    <div>
                                        <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2 px-3">Humanitarian</h4>
                                
                                        
                                        <NavLink to="/programs/public-health-engineering" className={dropdownLinkClasses} onClick={() => setProgramsDropdownOpen(false)}>
                                            WASH & Environment
                                        </NavLink>
                                        <NavLink to="/programs/leadership-and-peace" className={dropdownLinkClasses} onClick={() => setProgramsDropdownOpen(false)}>
                                            Leadership & Peace Building
                                        </NavLink>
                                    </div>

                                    {/* Consultancy */}
                                    <div>
                                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 px-3">Consultancy</h4>
                                        <NavLink to="/programs/entrepreneurship" className={dropdownLinkClasses} onClick={() => setProgramsDropdownOpen(false)}>
                                            Engineering Consultancy
                                        </NavLink>
                                      <NavLink to="/programs/education-program" className={dropdownLinkClasses} onClick={() => setProgramsDropdownOpen(false)}>
                                            Education
                                        </NavLink>
                                    </div>

                                    {/* E4H Institute */}
                                    <div>
                                        <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 px-3">E4H Institute</h4>
                                      
                                        <NavLink to="/programs/institute" className={dropdownLinkClasses} onClick={() => setProgramsDropdownOpen(false)}>
                                            Vocational Technical Training
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* ── Impact Dropdown ── */}
                        <li
                            className="relative"
                            onMouseEnter={() => setImpactDropdownOpen(true)}
                            onMouseLeave={() => setImpactDropdownOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 cursor-pointer outline-none border-none bg-transparent ${impactDropdownOpen
                                    ? 'text-sky-600 bg-sky-50'
                                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                                    }`}
                            >
                                Impact
                                <ChevronDown size={16} className={`transition-transform duration-300 ${impactDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300 origin-top ${impactDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <NavLink to="/impact/our-impact" className={dropdownLinkClasses} onClick={() => setImpactDropdownOpen(false)}>
                                    Our Impact
                                </NavLink>
                                <NavLink to="/impact/success-story" className={dropdownLinkClasses} onClick={() => setImpactDropdownOpen(false)}>
                                    Success Story
                                </NavLink>
                                <NavLink to="/impact/testimony" className={dropdownLinkClasses} onClick={() => setImpactDropdownOpen(false)}>
                                    Testimony
                                </NavLink>
                                <NavLink to="/impact/documentary" className={dropdownLinkClasses} onClick={() => setImpactDropdownOpen(false)}>
                                    Documentary
                                </NavLink>
                                <NavLink to="/impact/article-publication" className={dropdownLinkClasses} onClick={() => setImpactDropdownOpen(false)}>
                                    Article and Publication
                                </NavLink>
                            </div>
                        </li>

                        {/* ── Events Dropdown ── */}
                        <li
                            className="relative"
                            onMouseEnter={() => setEventsDropdownOpen(true)}
                            onMouseLeave={() => setEventsDropdownOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 cursor-pointer outline-none border-none bg-transparent ${eventsDropdownOpen
                                    ? 'text-sky-600 bg-sky-50'
                                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                                    }`}
                            >
                                Events
                                <ChevronDown size={16} className={`transition-transform duration-300 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300 origin-top ${eventsDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <NavLink to="/upcoming-event" className={dropdownLinkClasses} onClick={() => setEventsDropdownOpen(false)}>
                                    Upcoming Events
                                </NavLink>
                                <NavLink to="/past-event" className={dropdownLinkClasses} onClick={() => setEventsDropdownOpen(false)}>
                                    Past Events
                                </NavLink>
                            </div>
                        </li>

                        <li>
                            <NavLink to="/get-involved" className={navLinkClasses}>
                                Get Involved
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/gallery" className={navLinkClasses}>
                                Gallery
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={navLinkClasses}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                        
                            <Link
                                to="/donate"
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 no-underline inline-block"
                            >
                                Donate Now
                            </Link>
                        
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 border-none bg-transparent cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onClick={closeMobile}
                />

                {/* Mobile Sidebar */}
                <div
                    className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Sidebar Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-sky-600 to-green-600 text-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Menu</h2>
                                <p className="text-sm text-sky-100 mt-1">Engineers4Humanity</p>
                            </div>
                            <button onClick={closeMobile} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="Close menu">
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="p-4">
                        <div className="flex flex-col gap-1">
                            <NavLink to="/" onClick={closeMobile} className={mobileNavLinkClasses}>Home</NavLink>

                            {/* Mobile About Us */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>About Us</span>
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileAboutOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <NavLink to="/about/who-we-are" onClick={closeMobile} className={mobileNavLinkClasses}>Who We Are</NavLink>
                                        <NavLink to="/about/our-story" onClick={closeMobile} className={mobileNavLinkClasses}>Our Story</NavLink>
                                        <NavLink to="/about/executive-team" onClick={closeMobile} className={mobileNavLinkClasses}>Executive Team</NavLink>
                                        <NavLink to="/about/board-member" onClick={closeMobile} className={mobileNavLinkClasses}>Board Member</NavLink>
                                        <NavLink to="/get-involved" onClick={closeMobile} className={mobileNavLinkClasses}>Join Us</NavLink>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Programs */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>Programs</span>
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileProgramsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <p className="px-4 py-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider">Humanitarian</p>
                                        
                                        <NavLink to="/programs/public-health-engineering" onClick={closeMobile} className={mobileNavLinkClasses}>WASH & Environment</NavLink>
                                        <NavLink to="/programs/leadership-and-peace" onClick={closeMobile} className={mobileNavLinkClasses}>Leadership & Peace Building</NavLink>

                                        <p className="px-4 py-1.5 text-xs font-bold text-green-600 uppercase tracking-wider mt-2">Consultancy</p>
                                        <NavLink to="/programs/education-program" onClick={closeMobile} className={mobileNavLinkClasses}>Education</NavLink>
                                        <NavLink to="/programs/entrepreneurship" onClick={closeMobile} className={mobileNavLinkClasses}>Engineering Consultancy</NavLink>
                                        
                                        <p className="px-4 py-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider mt-2">E4H Institute</p>

                                        <NavLink to="/programs/institute" onClick={closeMobile} className={mobileNavLinkClasses}>Vocational Technical Training</NavLink>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Impact */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileImpactOpen(!mobileImpactOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>Impact</span>
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileImpactOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileImpactOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <NavLink to="/impact/our-impact" onClick={closeMobile} className={mobileNavLinkClasses}>Our Impact</NavLink>
                                        <NavLink to="/impact/success-story" onClick={closeMobile} className={mobileNavLinkClasses}>Success Story</NavLink>
                                        <NavLink to="/impact/testimony" onClick={closeMobile} className={mobileNavLinkClasses}>Testimony</NavLink>
                                        <NavLink to="/impact/documentary" onClick={closeMobile} className={mobileNavLinkClasses}>Documentary</NavLink>
                                        <NavLink to="/impact/article-publication" onClick={closeMobile} className={mobileNavLinkClasses}>Article and Publication</NavLink>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Events */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>Events</span>
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileEventsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileEventsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <NavLink to="/upcoming-event" onClick={closeMobile} className={mobileNavLinkClasses}>Upcoming Events</NavLink>
                                        <NavLink to="/past-event" onClick={closeMobile} className={mobileNavLinkClasses}>Past Events</NavLink>
                                    </div>
                                </div>
                            </div>

                            <NavLink to="/get-involved" onClick={closeMobile} className={mobileNavLinkClasses}>Get Involved</NavLink>
                            <NavLink to="/gallery" onClick={closeMobile} className={mobileNavLinkClasses}>Gallery</NavLink>
                            <NavLink to="/contact" onClick={closeMobile} className={mobileNavLinkClasses}>Contact</NavLink>

                            <Link
                                to="/donate"
                                onClick={closeMobile}
                                className="px-4 py-3.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg text-center mt-4 no-underline block"
                            >
                                Donate Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;