import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';
import image8 from '../../assets/program/image8.png';

const Entrepreneurship = () => {
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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header
                title="Entrepreneurship"
                linkTitle="Entrepreneurship"
                linkHref="/programs/entrepreneurship"
                backgroundImage={image}
            />

            <div id="engineering-consultancy" className="container mx-auto px-4 py-16 scroll-mt-24">
                <div className="max-w-8xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-purple-700 mb-6">ENTREPRENEURSHIP PROGRAM</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Engineers4Humanity Consultancy</h3>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Engineers4Humanity Consultancy is a social enterprise registered in East Africa, dedicated to delivering a dynamic range of Engineering consultancy services, social-environmental study consultancy, education & skills development services.
                                </p>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Engineers4Humanity Consultancy is a skills development hub that transforms unskilled young people, primarily refugees and underserved communities in Rwanda, into competent, skilled technicians through hands-on training, career guidance, and an entrepreneurship incubation process. This results in job creation and the socioeconomic transformation of the community.
                                </p>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Our social entrepreneurship approach aims to create a profound and lasting impact in Africa and globally. As a proudly registered firm specializing in engineering, environmental services, and social safeguarding in East Africa, we are determined to make a significant difference in the lives of the communities we serve, championing progress and resilience at every turn.
                                </p>
                                <p className="text-gray-700 mb-8 leading-relaxed">
                                    We have a skilled, experienced, committed, and competent team of engineers, environmental experts, and Real Estate and social environmental experts ready to serve you across Africa.
                                </p>
                            </div>
                            <div>
                                <img
                                    src={image8}
                                    alt="Business Consulting"
                                    className="w-full h-[500px] object-top object-cover rounded-lg shadow-md"
                                />
                                <p className="text-gray-700 italic mt-2 text-sm text-center">
                                    "Eric Kamanzi attended 2 days of training & Expo on Resilient City and disaster preparedness."
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3 mt-1">•</span>
                                    <span>Engineering & Construction Services</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3 mt-1">•</span>
                                    <span>Project management & Business study consultancy</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3 mt-1">•</span>
                                    <span>Public health engineering & environmental Service</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                At Engineers4Humanity, we are actively contributing to the realization of the African Agenda 2063 and the SDGs 2030 through engineering projects. Attracting International investors, youth capacity building, and transferring knowledge and skills. We strive to unlock the continent's boundless potential and drive meaningful change for a brighter, more prosperous future.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Guided by the principles of self-reliance and the desire to create meaningful job opportunities for vulnerable communities, refugee, and immigrant youth, we are excited to establish the Engineers4Humanity Consultancy- USA.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                This initiative aims to empower refugees and foster positive development within the country, creating a constructive pathway for integration and growth.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Our comprehensive consultancy offerings focus on engineering, construction, project management, and environmental studies. These services will create valuable job opportunities for trainees from the Engineers4Humanity Institute by collaborating with civil society organizations, government agencies, and private-sector companies in the construction industry.
                            </p>
                        </div>

                        <div className="text-center">
                            <p className="text-xl font-semibold text-gray-800 mb-4">
                                Join us as we embark on this journey to make a meaningful impact together!
                            </p>
                            <a
                                href="https://e4hinitiative.org/job-seekers-apply-for-employment-opportunity/"
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md border-0"
                            >
                                For Job Seekers - Apply for Employment Opportunity
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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
                        className="inline-block bg-white text-sky-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline border-0"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Entrepreneurship;
