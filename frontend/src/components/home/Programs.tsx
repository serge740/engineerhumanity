import React from 'react';
import {
    Droplet,
    GraduationCap,
    Hammer,
    Users,
    Building2
} from 'lucide-react';

const Programs = () => {
    const programs = [
        {
            icon: Droplet,
            title: "Public Health Engineering",
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
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Our Programs
                </h2>
                <div className="space-y-8">
                    {programs.map((program, index) => {
                        const Icon = program.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="md:flex">
                                    <div className="md:w-80 bg-gradient-to-br from-sky-600 to-green-600 p-8 text-white flex flex-col justify-between">
                                        <div>
                                            <Icon className="w-12 h-12 mb-4" strokeWidth={1.5} />
                                            <h3 className="font-serif text-2xl font-bold">
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
