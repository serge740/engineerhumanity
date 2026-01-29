import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                        alt="Eric Kamanzi"
                        className="w-full h-[500px] object-cover rounded-xl shadow-2xl"
                    />
                    <div>
                        <h2 className="font-serif text-4xl font-bold mb-6 text-gray-900">
                            Our Story & Inspiration
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Engineers4Humanity is a registered 501(c)(3) nonprofit organization based in Texas, fostering resilience and self-reliance among displaced communities worldwide.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We support our affiliated organization, the Engineers4Humanity Consultancy, a social enterprise founded in 2020 in Kigali, Rwanda.
                        </p>
                        <div className="bg-gray-50 p-6 border-l-4 border-green-600 rounded-lg mb-6">
                            <h4 className="font-serif text-xl font-semibold mb-2 text-gray-900">
                                Founded by Eric Kamanzi
                            </h4>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                A professional civil engineer, Project Management Professional, environmental expert, and philanthropist with a master's degree in engineering project management and global sustainability and over 15 years of experience in humanitarian efforts.
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Inspired by his personal journey as a former refugee and his commitment to community advocacy, Eric established Engineers4Humanity to address critical gaps in education, refugee youth unemployment, public health engineering, and youth development within refugee and host communities.
                        </p>
                        <p className="text-gray-900 font-semibold">
                            More than 2,000 young refugees have been positively impacted by our humanitarian activities in East Africa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
