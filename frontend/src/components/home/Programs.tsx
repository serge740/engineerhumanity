import React from 'react';
import {
    Droplet,
    GraduationCap,
    Hammer,
    Users,
    Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/home/program/image1.png'
import image2 from '../../assets/home/program/image2.png'
import image3 from '../../assets/home/program/image3.png'
import image4 from '../../assets/home/program/image4.png'

const Programs = () => {
    const programs = [
        {
            icon: Droplet,
            title: "Public Health Engineering",
            backgroundImage: image1,
            content: [
                "Addressing Water, Sanitation, and Hygiene (WASH) challenges in refugee camps and rural African communities through sustainable engineering systems."
            ]
        },
        {
            icon: GraduationCap,
            title: "Education Program",
            backgroundImage: image2,
            content: [
                "Providing scholarships in STEM and vocational training to empower refugee youth toward self-reliance and productive futures."
            ]
        },
        {
            icon: Hammer,
            title: "Skills Development Institute",
            backgroundImage: image3,
            content: [
                "Equipping refugee and immigrant youth with engineering, project management, and entrepreneurship skills to break the cycle of poverty."
            ]
        },
        {
            icon: Users,
            title: "Servant Leadership & Peacebuilding",
            backgroundImage: image4,
            content: [
                "Empowering youth and women affected by conflict through mentorship, creative healing, and multicultural peace-building initiatives."
            ]
        },
        {
            icon: Building2,
            title: "Social Entrepreneurship",
            backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            content: [
                "A registered social enterprise providing engineering and environmental consultancy services, creating jobs and supporting sustainable development in East Africa."
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="programs">
            <div className="  mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Our Programs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                            >
                                <div className="md:flex h-full">
                                    <div className="md:w-80 relative p-8 text-white flex flex-col justify-between flex-shrink-0 overflow-hidden">
                                        {/* Background Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${program.backgroundImage})`
                                            }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.85) 0%, rgba(12, 74, 110, 0.75) 50%, rgba(30, 58, 138, 0.65) 100%)'
                                            }}
                                        />

                                        <div className='flex-auto relative z-10'>
                                            <Icon className="w-12 h-12 mb-4 drop-shadow-lg" strokeWidth={1.5} />
                                            <h3 className="font-serif text-2xl font-bold drop-shadow-md">
                                                {program.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8">
                                        <div className="space-y-4">
                                            {program.content.map((item, idx) => {
                                                if (typeof item === 'string') {
                                                    return (
                                                        <p key={idx} className="text-gray-600 leading-relaxed">
                                                            {item}
                                                        </p>
                                                    );
                                                } else {
                                                    return (
                                                        <div key={idx} className="pl-4 border-l-2 border-gray-200">
                                                            <p className="font-semibold text-sky-600 mb-1">
                                                                {item.label}:
                                                            </p>
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {item.text}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center">
                    <Link
                        to="/programs"
                        className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-md"
                    >
                        See All Programs →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Programs;
