import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Quote } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

const Testimony = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    return (
        <div className="font-sans text-gray-800">
            <Header
                title="Testimonials"
                linkTitle="Testimonials"
                linkHref="/impact/testimony"
                backgroundImage={image}
            />

            <section id="testimony" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <MessageCircle className="w-10 h-10 text-sky-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Testimonies
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Hear directly from the individuals and communities whose lives have been changed by Engineers4Humanity's work.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "Engineers4Humanity and my mentors gave me the courage to believe in my potential. Today I am a university graduate and I support my family. Education is truly a lifetime gift.",
                                author: "Hope School Alumnus",
                                role: "University Graduate & Volunteer"
                            },
                            {
                                quote: "The vocational training I received changed my life. I learned tailoring skills that allowed me to start my own business and provide for my community. I am forever grateful.",
                                author: "TVET Training Beneficiary",
                                role: "Entrepreneur & Community Leader"
                            },
                            {
                                quote: "As a refugee, I thought my education journey was over. But the scholarship and mentorship from Engineers4Humanity opened doors I never imagined possible.",
                                author: "Scholarship Recipient",
                                role: "MBA Student & UNHCR Advisor"
                            },
                        ].map((testimony, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6 md:p-8 border-l-4 border-sky-600 hover:shadow-lg transition-shadow duration-300">
                                <Quote className="w-8 h-8 text-sky-300 mb-4" />
                                <p className="text-gray-700 leading-relaxed italic mb-6">
                                    "{testimony.quote}"
                                </p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimony.author}</p>
                                    <p className="text-sm text-sky-600">{testimony.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-linear-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Be Part of the Story
                    </h2>
                    <p className="text-lg md:text-xl opacity-95 mb-8">
                        Your support helps us continue transforming lives through education, engineering, and peace-building.
                    </p>
                    <a
                        href="/donate"
                        className="inline-block bg-white text-sky-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Testimony;
