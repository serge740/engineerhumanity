import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-lg py-3'
                : 'bg-white/95 backdrop-blur-md shadow-md py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-white font-bold text-xl">E4H</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="font-serif text-xl font-bold text-gray-900 leading-tight">
                                Engineers4Humanity
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                                Building Dignified Lives
                            </div>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-1">
                        <li>
                            <a
                                href="#home"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#programs"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                            >
                                Programs
                            </a>
                        </li>
                        <li>
                            <a
                                href="#events"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                            >
                                Events
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
                            >
                                Contact
                            </a>
                        </li>
                        <li className="ml-4">
                            <a
                                href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02"
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Donate Now
                            </a>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-sky-600 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
                        <div className="flex flex-col gap-2 mt-4">
                            <a
                                href="#home"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="#programs"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            >
                                Programs
                            </a>
                            <a
                                href="#events"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            >
                                Events
                            </a>
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-gray-700 font-medium hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            >
                                Contact
                            </a>
                            <a
                                href="https://buy.stripe.com/3cIfZi6Jj4BfcNm6QPbAs02"
                                className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md text-center mt-2"
                            >
                                Donate Now
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
