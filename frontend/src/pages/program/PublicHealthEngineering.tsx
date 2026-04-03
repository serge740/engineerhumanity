import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';
import image1 from '../../assets/program/image1.png';
import image2 from '../../assets/program/image2.png';

const PublicHealthEngineering = () => {
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
                title="Public Health Engineering"
                linkTitle="Public Health Engineering"
                linkHref="/programs/public-health-engineering"
                backgroundImage={image}
            />

            <div id="wash" className="container mx-auto px-4 py-16 scroll-mt-24">
                <div className="max-w-8xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-700 mb-6">Public Health Engineering</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    As an engineering humanitarian organization, Engineers4Humanity aims to address vital public health engineering issues in refugee camps, urban areas, and rural areas in underdeveloped African countries by providing water, improved sanitation, waste management solutions, and support for clean energy projects.
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Our projects include support for disaster emergency preparedness, environmental protection, and enhanced public safety in Texas through partnerships with the Government, the Private sector, Civil society organizations, and the community.
                                </p>
                                <p className="text-gray-700 mb-8 leading-relaxed">
                                    For Africa and other rural areas, we focus on designing affordable water supply systems, constructing proper sanitation facilities, transforming waste into renewable energy sources, and using available natural resources to serve the community.
                                </p>
                                <div>
                                    <img
                                        src={image2}
                                        alt="Community Water Project"
                                        className="w-full h-[300px] object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-gray-700 text-center italic mt-2 text-sm">
                                        "Eric with President of Engineers without Borders Manuel Calderon, Matthew Craig and other fellow members of North Texas -EWB during fundraising event to support community Water Supply Projects"
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={image1}
                                    alt="Water Engineering"
                                    className="w-full h-[700px] object-cover object-center rounded-lg shadow-md"
                                />
                                <p className="text-gray-700 text-center italic mt-2 text-sm">
                                    "Eric attended International Conference and Expo on Resilient City, and disasters management, held in Houston-Texas, 2025"
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Outcomes:</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Engineers4Humanity Consultancy (EHC Ltd) is an officially registered environmental and social safeguarding firm in East Africa, led by licensed environmental experts.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Conducted 100+ environmental and social safeguarding studies, including a study on a project benefiting the Gihembe Refugee camp in Gicumbi and the Mahama Refugee camp in Kirehe District.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Supported in disaster emergencies and the public safety community outreach program, and organized different training for refugee youth.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Support the WASH project to promote sustainable waste management practices that protect the environment, improve hygiene, and reduce waterborne diseases in refugee camps and rural areas.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Support and conduct community outreach and awareness campaigns on public safety and disaster preparedness.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 mt-1">•</span>
                                    <span>Support the SDG implementation program in Africa and Texas.</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="https://e4hinitiative.org/apply-for-paid-training/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
                        >
                            Apply for Paid Training
                        </a>
                    </div>
                </div>
            </div>

            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Support Our Public Health Initiatives
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

export default PublicHealthEngineering;
