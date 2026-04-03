import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';
import image12 from '../../assets/about/image5.png';

import {
    BookOpen,
    Heart,
    Users,
    Award,
    Sun,
    TrendingUp,
    Shield
} from 'lucide-react';

const WhoWeAre = () => {
    const location = useLocation();

    // Scroll to hash section on navigation
    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    return (
        <div className="font-sans text-gray-800">
            <Header
                title="Who We Are"
                linkTitle="Who We Are"
                linkHref="/about/who-we-are"
                backgroundImage={image}
            />

            {/* Our History Section */}
            <section id="who-we-are" className="py-12 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12">
                        <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Our History
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-8 md:mb-12">
                        <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
                            <p>
                                Founded by philanthropist Eric Kamanzi, Engineers4Humanity is a refugee-founded non-profit organization 501(c)(3) registered in Dallas, Texas.
                            </p>
                            <p>
                                It was inspired by Eric's experience as a refugee and founder of Engineers4Humanity Consultancy, a social enterprise operating in East Africa since 2020.
                            </p>
                            <p>
                                After witnessing firsthand the struggles of refugees and displaced communities, Eric was determined to develop a solution to foster long-term resilience and self-reliance among refugees and to play a key role in peacebuilding in the East African region.
                            </p>
                            <p>
                                Eric's humanitarian journey began in 2008, when he gathered other young refugee students to explore how they could find lasting solutions to their daily challenges.
                            </p>
                        </div>
                        <div>
                            <img
                                src={image12}
                                alt="Community gathering"
                                className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-xl md:rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
                        <p>
                            They founded the Forum for Congolese refugee students. Eric served as the organization's first president and later as board chair. One notable achievement of the Forum is the establishment of Hope School in 2009, a refugee initiative school in the Gihembe refugee camp. The non-profit organization, including UNHCR, stopped the 12-year education program due to a funding shortage.
                        </p>
                        <p>
                            Eric, along with his refugee friends, founded Hope School; more than 500 students graduated from the school. More than 400 students graduate from high school, and their lives have changed.
                        </p>
                        <p>
                            After graduating as a civil engineer, Eric found that engineering could fulfill his mission. Then, he launched Engineers4Humanity Consultant, a social enterprise that provides engineering consultancy and promotes public health engineering, STEM, and vocational training for young refugees.
                        </p>
                        <p>
                            As an immigrant, Eric pursued his humanitarian mission by establishing the Engineers4Humanity Initiative, which operates in the U.S. and supports its affiliated organization, Engineers4Humanity Consultancy, a social enterprise that operates in Rwanda and across Africa. Together, these organizations focus on sustainable development through engineering solutions and education, thereby improving the lives of underserved communities.
                        </p>
                        <p className="font-semibold text-gray-900">
                            For more about our story, check out our founder's book, Breaking Boundaries, and Hope School Alumnae's Testimony at the link below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values & Culture Section */}
            <section id="values-culture" className="py-12 md:py-20 bg-slate-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600" />
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                                Values & Culture
                            </h2>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-sky-600 mb-6">
                            The RUSINE Principles Value
                        </h3>
                        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-sky-600 mb-12 text-left">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 font-serif">Our Identity</h4>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our organization is built on a simple conviction: every person carries dignity, potential, and the capacity to transform their own future when given opportunity, support, and community. The RUSINE Principles—<span className="font-semibold text-sky-600">Resilience, Ubuntu, Self Reliance, Integrity, Non Violence, and Excellence</span>—anchor who we are, how we lead, and how we serve. These values guide our decisions, shape our partnerships, and define the culture we cultivate across teams, communities, and countries.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Resilience */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-500 group">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sun className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Resilience</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">Strength that rises, adapts, and transforms.</p>
                            <p className="text-gray-600 leading-relaxed">
                                We stand with communities facing displacement, poverty, and systemic barriers, helping them rebuild with courage and dignity. Resilience shapes how we design programs, respond to challenges, and empower individuals to turn adversity into opportunity. Our culture celebrates perseverance, innovation under pressure, and the belief that every setback can spark new growth.
                            </p>
                        </div>

                        {/* Ubuntu */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500 group">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-red-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Ubuntu</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">I am because we are.</p>
                            <p className="text-gray-600 leading-relaxed">
                                Ubuntu grounds our identity in shared humanity. We honor the dignity, wisdom, and lived experience of every person we serve. Collaboration, compassion, and community-centered leadership guide our decisions. We build relationships that uplift everyone—because true progress is collective.
                            </p>
                        </div>

                        {/* Self Reliance */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 group">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Self Reliance</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">Empowerment that lasts.</p>
                            <p className="text-gray-600 leading-relaxed">
                                We equip individuals and communities with the skills, tools, and opportunities to stand on their own. Our programs prioritize capacity-building, economic mobility, and leadership development. Self reliance is our commitment to sustainable change—ensuring people can shape their own futures long after our work is done.
                            </p>
                        </div>

                        {/* Integrity */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 group">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Integrity</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">Do the right thing, always.</p>
                            <p className="text-gray-600 leading-relaxed">
                                Integrity is the foundation of trust. We lead with honesty, transparency, and accountability in every action—from resource stewardship to community engagement to donor reporting. Our culture demands ethical decision-making and responsible leadership at every level of the organization.
                            </p>
                        </div>

                        {/* Non Violence */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 group">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6 text-purple-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Non Violence</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">Peace as a practice, not an ideal.</p>
                            <p className="text-gray-600 leading-relaxed">
                                We promote healing, reconciliation, and safety in all our work. Non violence means rejecting harm and embracing empathy, dialogue, and restorative approaches. We create trauma sensitive environments where dignity is protected, and communities can rebuild relationships rooted in respect.
                            </p>
                        </div>

                        {/* Excellence */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500 group">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Excellence</h4>
                            <p className="text-sky-600 font-semibold mb-4 text-sm">Quality that honors the people we serve.</p>
                            <p className="text-gray-600 leading-relaxed">
                                Excellence is our standard in engineering, leadership, and service. We pursue innovation, technical rigor, and measurable impact. Our teams strive to deliver work that is safe, effective, and transformative—because communities deserve the highest level of care and professionalism.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default WhoWeAre;
