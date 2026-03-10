import React from 'react';

const Stats = () => {
    const stats = [
        { number: "500+", label: "Hope School Graduates" },
        { number: "2,000+", label: "Lives Transformed" },
        { number: "17+", label: "Years of Service" }
    ];

    return (
        <section className="bg-sky-600 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="font-serif text-4xl md:text-5xl font-bold text-green-400 mb-2">
                            {stat.number}
                        </div>
                        <div className="text-sm opacity-90 leading-snug">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
