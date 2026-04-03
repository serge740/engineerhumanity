import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';
import image6 from '../../assets/program/image6.png';

const Institute = () => {
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
                title="Engineers4Humanity Institute"
                linkTitle="E4H Institute"
                linkHref="/programs/institute"
                backgroundImage={image}
            />

            <div id="vocational-training" className="container mx-auto px-4 py-16 scroll-mt-24">
                <div className="max-w-8xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-700 mb-6">Engineers4Humanity Institute</h2>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Responding to the scarcity of jobs, the unemployment issue among refugee /immigrant youth, and the gap between industry and skilled labor, we observed that it is necessary to establish career paths for young people and those who need to change careers or upgrade their skills to meet the labor market's needs.
                                </p>
                            </div>
                            <div>
                                <img
                                    src={image6}
                                    alt="Vocational Training"
                                    className="w-full h-64 object-cover object-top rounded-lg shadow-md"
                                />
                                <p className="text-sm text-gray-600 italic mt-2 text-center">"Instructor Mapendo with the Engineers4Humanity Vocational Training Short Course trainees, Gihember 2020."</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The Engineers4Humanity Institute is an e-learning platform that will serve as a skill development, research, and innovation hub, providing affordable, accessible education to vulnerable youth, primarily refugees worldwide.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            This Institute serves as a center of excellence and a career-path program that helps refugees, Immigrants, and vulnerable youth acquire the tools and skills needed to break the cycle of poverty and become self-reliant.
                        </p>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            We are committed to collaborating with career development centers, the construction industry, academia, the private sector, and the government to transform refugee youth and immigrants into a highly skilled, competitive workforce that excels globally and contributes positively to national development.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Area:</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Engineering and Technical Skills Development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Project Management</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Leadership & Interpersonal skills development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Entrepreneurship and Finance Literacy</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Environmental protection & disaster management</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md border-0"
                        >
                            Log in to our e-Learning Portal here
                        </a>
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
                        className="inline-block bg-white text-sky-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Institute;
