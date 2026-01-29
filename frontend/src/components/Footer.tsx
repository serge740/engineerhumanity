const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-16" id="contact">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="font-serif text-xl font-bold text-white mb-4">
                            Engineers4Humanity
                        </h3>
                        <p className="mb-2">Registered 501(c)(3) nonprofit organization</p>
                        <p>EIN: 99-2264956</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-white mb-4">
                            Texas Office
                        </h3>
                        <p className="mb-2">908 Audelia RD, Suite 200, Box 139<br />Richardson, TX 75081</p>
                        <p className="mb-1">Phone: (+1) 469 967 0444</p>
                        <p>Email: contact@e4hinitiative.org</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-white mb-4">
                            Rwanda Office
                        </h3>
                        <p className="mb-2">Engineers4Humanity Consultancy Ltd<br />TIN: 111054632</p>
                        <p className="mb-2">Kigali City, Kicukiro Center<br />Diamond House, 2nd Floor</p>
                        <p className="mb-1">Phone: (+250) 788 307 186</p>
                        <p>Email: engineersforhumanity20@gmail.com</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-white mb-4">
                            Quick Links
                        </h3>
                        <a href="#about" className="block mb-2 hover:text-sky-500 transition">About Us</a>
                        <a href="#programs" className="block mb-2 hover:text-sky-500 transition">Programs</a>
                        <a href="#events" className="block mb-2 hover:text-sky-500 transition">Events</a>
                        <a href="#contact" className="block mb-2 hover:text-sky-500 transition">Contact</a>
                        <a href="#" className="block hover:text-sky-500 transition">Privacy Policy</a>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>© 2026 Engineers4Humanity. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
