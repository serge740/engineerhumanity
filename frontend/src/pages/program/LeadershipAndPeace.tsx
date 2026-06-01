import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';
import image7 from '../../assets/program/image7.png';

const LeadershipAndPeace = () => {
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
                title="Leadership & Peace Building"
                linkTitle="Leadership & Peace"
                linkHref="/programs/leadership-and-peace"
                backgroundImage={image}
            />

            <div id="leadership-peace" className="bg-gradient-to-br from-green-50 to-white py-16 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-8xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-green-700 mb-6">Leadership & Peace Building Program</h2>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        We have boldly confronted the challenges of conflict and are passionately dedicated to advancing peacebuilding efforts in Rwanda.
                                    </p>
                                </div>
                                <div>
                                    <img
                                        src={image7}
                                        alt="Community Leadership"
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-gray-600 italic mt-2 text-center"> "Eric Kamanzi, a keynote Speaker at Northwest Community Center-Dallas, sharing refugee story and resilience journey"</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Promote peacebuilding through research, launch impactful community outreach campaigns, and actively engage leaders, youth, women, policymakers, and decision-makers to confront the root causes of the conflict. Our goal is to develop innovative and sustainable solutions that will establish lasting peace in Rwanda and in the region.
                            </p>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                We are committed to uplifting young people and women and encouraging them to become servant leaders and passionate advocates for sustainable peace. We inspire them to foster positive change within their communities by equipping them with the essential tools and knowledge they need.
                            </p>

                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-3 mt-1">•</span>
                                        <span>Empower youth & women through peacebuilding initiatives and promote cohabitation and coexistence among communities through organized festivals, Youth Summer Camps, debates, Essay Competitions, and peacebuilding initiatives.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Join Our Mission
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

export default LeadershipAndPeace;
