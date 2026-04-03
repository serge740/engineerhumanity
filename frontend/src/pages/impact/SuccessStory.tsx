import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

const SuccessStory = () => {
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
                title="Success Story"
                linkTitle="Success Story"
                linkHref="/impact/success-story"
                backgroundImage={image}
            />

            <section id="success-story" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Star className="w-10 h-10 text-green-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Success Stories
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Behind every number is a human story of resilience and transformation. Our beneficiaries have gone from refugee camps to becoming engineers, financial experts, educators, and community leaders.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: 'Bosco Izabayo — From Refugee Camp to Professional Accountant',
                                story: 'One of our beneficiaries grew up in Gihembe Refugee Camp with limited access to education. Through Engineers4Humanity\'s scholarship program and mentorship from our founder, he completed high school with top marks, earned a university degree in Business Administration, and is now a professional accountant helping others in his community.',
                            },
                            {
                                name: 'Bernard Ndizeye — Top Graduate Inspiring the Next Generation',
                                story: 'A Hope School alumnus who studied in difficult conditions graduated with distinction at the national exam. With support from partner organizations, he completed a Bachelor\'s degree in Education as the top student. Today, he teaches at a high school in Rwanda and mentors young refugee students as a volunteer with Engineers4Humanity.',
                            },
                            {
                                name: 'Delice Kiracunda — Empowering Women Through Vocational Skills',
                                story: 'A young woman from the refugee camp gained admission to study Leisure, Tourism, and Hotel Management at university. She credits her tailoring skills from TVET school and the guidance of Engineers4Humanity mentors for giving her the confidence to pursue higher education and uplift her community.',
                            },
                            {
                                name: 'Bahati Musuhuke — Global Youth Advisor at UNHCR',
                                story: 'Starting from Gihembe Refugee Camp, one of our alumni rose to become a Global Youth Advisor at UNHCR and a Financial Compliance Officer, representing refugees worldwide. He is currently pursuing an MBA and continues to support Engineers4Humanity\'s mission of empowering vulnerable communities.',
                            },
                        ].map((story, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{story.story}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="/about/our-story"
                            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition text-lg"
                        >
                            Read Full Stories on Our About Page
                            <ChevronRight className="w-5 h-5" />
                        </a>
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

export default SuccessStory;
