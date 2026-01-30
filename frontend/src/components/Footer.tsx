import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300" id="contact">
            {/* Main Footer Content */}
            <div className=" mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* About Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">E4H</span>
                            </div>
                            <h3 className="font-serif text-xl font-bold text-white">
                                Engineers4Humanity
                            </h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            Empowering refugees and underserved communities through education, engineering solutions, and sustainable development.
                        </p>
                        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                            <p className="text-xs text-gray-400 mb-1">Registered 501(c)(3) nonprofit</p>
                            <p className="text-sm font-semibold text-white">EIN: 99-2264956</p>
                        </div>
                    </div>

                    {/* Texas Office */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-sky-500" />
                            Texas Office
                        </h3>
                        <div className="space-y-3 text-sm">
                            <p className="leading-relaxed">
                                908 Audelia RD, Suite 200<br />
                                Box 139, Richardson<br />
                                TX 75081, USA
                            </p>
                            <a href="tel:+14699670444" className="flex items-center gap-2 hover:text-sky-400 transition group">
                                <Phone className="w-4 h-4 text-green-500 group-hover:text-green-400" />
                                <span>+1 (469) 967-0444</span>
                            </a>
                            <a href="mailto:contact@e4hinitiative.org" className="flex items-center gap-2 hover:text-sky-400 transition group">
                                <Mail className="w-4 h-4 text-sky-500 group-hover:text-sky-400" />
                                <span className="break-all">contact@e4hinitiative.org</span>
                            </a>
                        </div>
                    </div>

                    {/* Rwanda Office */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-500" />
                            Rwanda Office
                        </h3>
                        <div className="space-y-3 text-sm">
                            <p className="leading-relaxed">
                                Engineers4Humanity Consultancy Ltd<br />
                                Diamond House, 2nd Floor<br />
                                Kigali City, Kicukiro Center
                            </p>
                            <p className="text-xs text-gray-400">TIN: 111054632</p>
                            <a href="tel:+250788307186" className="flex items-center gap-2 hover:text-sky-400 transition group">
                                <Phone className="w-4 h-4 text-green-500 group-hover:text-green-400" />
                                <span>+250 788 307 186</span>
                            </a>
                            <a href="mailto:engineersforhumanity20@gmail.com" className="flex items-center gap-2 hover:text-sky-400 transition group">
                                <Mail className="w-4 h-4 text-sky-500 group-hover:text-sky-400" />
                                <span className="break-all text-xs">engineersforhumanity20@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links & Newsletter */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-white mb-4">
                            Quick Links
                        </h3>
                        <div className="space-y-2 mb-6">
                            <Link to="/about" className="block text-sm hover:text-sky-400 hover:translate-x-1 transition-all">
                                → About Us
                            </Link>
                            <Link to="/programs" className="block text-sm hover:text-sky-400 hover:translate-x-1 transition-all">
                                → Programs
                            </Link>
                            <Link to="/upcoming-event" className="block text-sm hover:text-sky-400 hover:translate-x-1 transition-all">
                                → Events
                            </Link>
                            <Link to="/gallery" className="block text-sm hover:text-sky-400 hover:translate-x-1 transition-all">
                                → Gallery
                            </Link>
                            <Link to="/contact" className="block text-sm hover:text-sky-400 hover:translate-x-1 transition-all">
                                → Contact
                            </Link>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-sky-900/30 to-green-900/30 p-4 rounded-lg border border-sky-800/30">
                            <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
                            <p className="text-xs text-gray-400 mb-3">Get our latest news and updates</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition"
                                />
                                <button className="bg-gradient-to-r from-sky-600 to-green-600 text-white px-3 py-2 rounded hover:from-sky-700 hover:to-green-700 transition">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Social Media Links */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-white">Follow Us:</span>
                            <div className="flex gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-end gap-2">
                                © {new Date().getFullYear()} Engineers4Humanity. Made By <a className='underline text-blue-500' href="http://abytechhub.com/">Abytech Hub</a>
                                
                            </p>
                            <p className="text-xs text-gray-500 mt-1"> 
                                All Rights Reserved. | <a href="#" className="hover:text-sky-400 transition">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

