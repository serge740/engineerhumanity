import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';
import scholarshipImage from '../../assets/image5.jpg';
import image3 from '../../assets/program/image3.png';
import image4 from '../../assets/program/image4.png';
import image5 from '../../assets/program/image5.png';

const EducationProgram = () => {
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
                title="Education Program"
                linkTitle="Education Program"
                linkHref="/programs/education-program"
                backgroundImage={image}
            />

            <div id="education" className="bg-gradient-to-br from-blue-50 to-white py-16 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-8xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-blue-700 mb-6">Education Program</h2>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Engineers4Humanity provides formal education and vocational skills development scholarships to young refugees in various trades. Equipping them with practical skills empowers them to find jobs and become financially independent.
                                    </p>
                                </div>
                                <div>
                                    <img
                                        src={scholarshipImage}
                                        alt="Education Program"
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-gray-600 italic mt-2 text-center">"Empowering refugee youth through quality education and STEM scholarships"</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                In the African refugee camps- Rwanda, we are dedicated to fostering growth and opportunity by offering high school and university scholarships focused on STEM fields. By collaborating with partner organizations and government of Rwanda, we provide valuable vocational training for refugee youth, equipping them with the essential skills for success in the job market. This approach not only enhances their individual prospects but also benefits their communities.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                In the USA, our program aggressively targets partnerships with government agencies, academic institutions, universities, the City ISD, and refugee resettlement agencies to ensure that refugee youth receive the education they deserve.
                            </p>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                We actively conduct community outreach campaigns, engage directly with youth, and offer mentorship and career guidance to empower them with essential information about scholarships and universities. We assert that an educated community is crucial for advancing national development and integrating successfully into American society. Education serves as a powerful catalyst for change, driving progress and making a significant impact both locally and globally.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Outcomes:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>We are providing high school scholarships and vocational short-course training for young refugees in Rwanda, and 250 refugee students completed vocational training and found employment.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>Through advocacy and partnership, 2000+ refugee students have completed high school and have seen their lives change.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>Conducted mentorship activity to inspire Refugee youth/immigrants to pursue education, especially STEM & vocational careers.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Focus Areas:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>Mobilize High School and university Scholarships in STEM and Vocational Training.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>Partnership with universities and colleges worldwide to offer refugee scholarships.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 mt-1">•</span>
                                        <span>Partnership with an international e-learning platform to provide scholarships for refugee students.</span>
                                    </li>
                                </ul>
                            </div>

                            <a
                                href="https://e4hinitiative.org/apply-for-education-scholarships-empower-your-copy/"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
                            >
                                For Refugee Youth - Apply for Education Scholarships
                            </a>

                            <div className="mt-10 grid md:grid-cols-3 gap-6">
                                <div>
                                    <img
                                        src={image3}
                                        alt="Students in classroom"
                                        className="w-full h-48 object-cover object-top rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-center text-gray-700 italic mt-2">
                                        "Chief of Operations, Mr Innocent and Muneza visited some of our students at ETEKA-Kabgayi, 2025"
                                    </p>
                                </div>
                                <div>
                                    <img
                                        src={image4}
                                        alt="Graduation ceremony"
                                        className="w-full h-48 object-cover object-top rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-center text-gray-700 italic mt-2">
                                        "Some of the Alumnae graduated from the University, with bachelor's and master's degrees. From right is Mr. Emmanuel Sebagisha, Musuhuke Bahati, with his classmate."
                                    </p>
                                </div>
                                <div>
                                    <img
                                        src={image5}
                                        alt="Student mentorship"
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-sm text-center text-gray-700 italic mt-2">
                                        "Eric, Malisaba and Fred, Meeting with some of the beneficiary women whose children are sponsored by the Engineers4Humanity Education Program, Gihembe Refugee Camp 2020"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Support Education
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

export default EducationProgram;
