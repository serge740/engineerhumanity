import React from 'react';
import {
    Droplet,
    GraduationCap,
    Hammer,
    Users,
    Building2
} from 'lucide-react';
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
                "The pressing challenges of Water, Sanitation, and Hygiene (WASH) across African countries and refugee camps demand our immediate commitment.",
                "In line with SDG 2030 and Africa Agenda 2063, we're dedicated to transforming critical WASH issues into opportunities for impactful change by implementing sustainable systems ensuring access to safe drinking water and improved sanitation.",
                { label: "Africa Program", text: "Building pedestrian suspended bridges and infrastructure connecting rural communities to education, markets, and healthcare." },
                { label: "USA Program", text: "Enhancing public safety, environmental protection, and disaster preparedness in Texas communities." }
            ]
        },
        {
            icon: GraduationCap,
            title: "Education Program",
            backgroundImage: image2,
            content: [
                '"Education is a powerful weapon to change the world" - Nelson Mandela',
                "We believe education is the key to achieving social and economic transformation. We're passionate about empowering refugees, immigrants, and underserved youth with essential skills for self-reliance.",
                "Our programs emphasize technical disciplines and STEM subjects at high school, college, and university levels, helping youth transition from reliance on aid to becoming skilled, productive contributors to their communities.",
                "We work with local administrations, education institutions, and universities to support transformative education programs."
            ]
        },
        {
            icon: Hammer,
            title: "Skills Development Institute",
            backgroundImage: image3,
            content: [
                "The Engineers4Humanity Institute provides sustainable engineering solutions to combat job scarcity and high unemployment among refugee and immigrant youth.",
                "As a center for skill development and innovation, we equip refugees and vulnerable youth with the skills needed to break the cycle of poverty and achieve self-reliance.",
                "We develop young leaders grounded in servant-leadership principles and collaborate with government, civil society, and the private sector to empower underprivileged individuals.",
                "By promoting self-reliance through capacity-building programs, we unlock potential and create transformative opportunities."
            ]
        },
        {
            icon: Users,
            title: "Servant Leadership & Peacebuilding",
            backgroundImage: image4,
            content: [
                "After nearly 30 years in refugee camps, we're committed to supporting peacebuilding initiatives and empowering youth and women to become champions of peace.",
                "Our innovative program promotes emotional healing and empowers individuals affected by conflict to articulate their stories and find their voices.",
                "Working with qualified psychologists, mentors, and coaches, we support participants in overcoming past challenges through creative methodologies including effective listening, painting, poetry, music, and book writing.",
                "We organize multicultural events, competitions, and international festivals to advance peace-building initiatives and honor victims of conflict."
            ]
        },
        {
            icon: Building2,
            title: "Social Entrepreneurship",
            backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            content: [
                "Engineers4Humanity Consultancy is a registered social enterprise in East Africa providing engineering, environmental, and social consultancy services.",
                "Founded in Rwanda in 2020, we offer services that support refugee youth education, job creation, and promote sustainable development across Africa.",
                "We're relaunching our consultancy program to support African Agenda 2063 and SDGs 2030, while planning to launch Engineers4Humanity Consultancy-USA.",
                "This will provide engineering, project management, and inspection services, creating jobs and contributing to economic growth in America."
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="programs">
            <div className="  mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Our Programs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>
        </section>
    );
};

export default Programs;
