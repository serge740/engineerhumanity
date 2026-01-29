import React from 'react';
import {
    BookOpen,
    Briefcase,
    Wrench,
    Heart
} from 'lucide-react';

const Mission = () => {
    const missionCards = [
        {
            icon: BookOpen,
            title: "Education & Skills",
            description: "Enhancing education and vocational skills development to create pathways for success and self-sufficiency for refugees and underserved communities."
        },
        {
            icon: Briefcase,
            title: "Job Creation",
            description: "Fostering self-reliance through job creation and entrepreneurship opportunities that transform lives and communities."
        },
        {
            icon: Wrench,
            title: "Engineering Solutions",
            description: "Advancing sustainable engineering solutions for environmental protection, water, sanitation, and hygiene services."
        },
        {
            icon: Heart,
            title: "Peacebuilding",
            description: "Encouraging servant leadership and peacebuilding initiatives in the East African region for lasting impact."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className=" mx-auto px-6">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Our Mission
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {missionCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-transparent hover:border-sky-500"
                            >
                                <Icon className="w-10 h-10 text-sky-600 mb-4" strokeWidth={1.5} />
                                <h3 className="font-serif text-xl font-semibold mb-3 text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Mission;
