import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Film } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

const Documentary = () => {
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
                title="Documentary"
                linkTitle="Documentary"
                linkHref="/impact/documentary"
                backgroundImage={image}
            />

            <section id="documentary" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Film className="w-10 h-10 text-green-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Documentary
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Watch our documentaries that capture the real stories, challenges, and triumphs of the communities we serve.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/LZHoOv5Lhn8?si=RxSPORmXcKZbk7Cm"
                                    title="Breaking Boundaries Book trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Breaking Boundaries Book trailer</h3>
                                <p className="text-gray-600">Hear from the beneficiaries themselves — how education and mentorship transformed their futures.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                            <div className="aspect-video bg-gradient-to-br from-sky-100 to-green-100 flex flex-col items-center justify-center p-8 text-center">
                                <Film className="w-16 h-16 text-sky-400 mb-4" />
                                <p className="text-gray-500 font-medium">More documentaries coming soon</p>
                                <p className="text-sm text-gray-400 mt-2">We are producing new content to share our expanding impact</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Documentary</h3>
                                <p className="text-gray-600">New documentaries covering our WASH projects and vocational training programs are in production.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
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

export default Documentary;
