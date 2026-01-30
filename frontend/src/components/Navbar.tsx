import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
    const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
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

    const dropdownLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2.5 text-sm font-medium transition-all duration-200 block no-underline rounded-lg ${isActive
            ? 'text-sky-600 bg-sky-50'
            : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
        }`;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-lg py-2'
                : 'bg-white/98  shadow-md py-3'
                }`}
        >
            <div className="mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group no-underline">
                        <img
                            src="/logo.png"
                            alt="Engineers4Humanity Logo"
                            className="w-24 h-24  scale-110 object-contain  transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
                        <li>
                            <NavLink to="/" className={navLinkClasses}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={navLinkClasses}>
                                About
                            </NavLink>
                        </li>

                        {/* Team Dropdown */}
                        <li
                            className="relative"
                            onMouseEnter={() => setTeamDropdownOpen(true)}
                            onMouseLeave={() => setTeamDropdownOpen(false)}
                        >
                            <button
                                className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg flex items-center gap-1 cursor-pointer outline-none border-none bg-transparent ${teamDropdownOpen
                                    ? 'text-sky-600 bg-sky-50'
                                    : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50'
                                    }`}
                            >
                                Team
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${teamDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300 origin-top ${teamDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <NavLink
                                    to="/management-team"
                                    className={dropdownLinkClasses}
                                    onClick={() => setTeamDropdownOpen(false)}
                                >
                                    Management Team
                                </NavLink>
                                <NavLink
                                    to="/board-members"
                                    className={dropdownLinkClasses}
                                    onClick={() => setTeamDropdownOpen(false)}
                                >
                                    Board Members
                                </NavLink>
                            </div>
                        </li>

                        <li>
                            <NavLink to="/programs" className={navLinkClasses}>
                                Programs
                            </NavLink>
                        </li>

                        {/* Events Dropdown */}
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
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${eventsDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-300 origin-top ${eventsDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 visible'
                                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                                    }`}
                            >
                                <NavLink
                                    to="/upcoming-event"
                                    className={dropdownLinkClasses}
                                    onClick={() => setEventsDropdownOpen(false)}
                                >
                                    Upcoming Events
                                </NavLink>
                                <NavLink
                                    to="/past-event"
                                    className={dropdownLinkClasses}
                                    onClick={() => setEventsDropdownOpen(false)}
                                >
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
                        <li className="ml-2">
                            <a
                                href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 no-underline inline-block"
                            >
                                Donate Now
                            </a>
                        </li>
                    </ul>

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
                    className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Mobile Sidebar */}
                <div
                    className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Sidebar Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-sky-600 to-green-600 text-white p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Menu</h2>
                                <p className="text-sm text-sky-100 mt-1">Engineers4Humanity</p>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="p-4">
                        <div className="flex flex-col gap-1">
                            <NavLink
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                About
                            </NavLink>

                            {/* Mobile Team Accordion */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileTeamOpen(!mobileTeamOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>Team</span>
                                    <ChevronDown
                                        size={20}
                                        className={`transition-transform duration-300 ${mobileTeamOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileTeamOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <NavLink
                                            to="/management-team"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={mobileNavLinkClasses}
                                        >
                                            Management Team
                                        </NavLink>
                                        <NavLink
                                            to="/board-members"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={mobileNavLinkClasses}
                                        >
                                            Board Members
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <NavLink
                                to="/programs"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                Programs
                            </NavLink>

                            {/* Mobile Events Accordion */}
                            <div className="my-1">
                                <button
                                    onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                                    className="w-full px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center justify-between border-none bg-transparent cursor-pointer text-left"
                                >
                                    <span>Events</span>
                                    <ChevronDown
                                        size={20}
                                        className={`transition-transform duration-300 ${mobileEventsOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileEventsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-sky-200 ml-4">
                                        <NavLink
                                            to="/upcoming-event"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={mobileNavLinkClasses}
                                        >
                                            Upcoming Events
                                        </NavLink>
                                        <NavLink
                                            to="/past-event"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={mobileNavLinkClasses}
                                        >
                                            Past Events
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <NavLink
                                to="/get-involved"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                Get Involved
                            </NavLink>
                            <NavLink
                                to="/gallery"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                Gallery
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileNavLinkClasses}
                            >
                                Contact
                            </NavLink>

                            {/* Mobile Donate Button */}
                            <a
                                href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-3.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg text-center mt-4 no-underline block"
                            >
                                Donate Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;