import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import { CheckCircle, Award, ArrowRight, Wrench, TrendingUp, Users, BookOpen } from 'lucide-react';
import headerBg from '../../assets/image6.jpg';
import img1 from '../../assets/home/WhatsApp Image 2026-05-20 at 18.12.28 (1).jpeg';
import img2 from '../../assets/home/research.png';

const ProfessionalSkills = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header
                title="Professional Skills Development"
                linkTitle="Professional Skills Development"
                linkHref="/programs/professional-skills"
                backgroundImage={headerBg}
            />

            {/* Intro */}
            <section id="professional-skills" className="py-16 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    {/* Heading */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-6 h-6 text-sky-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Engineers4Humanity Institute</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Professional Skills Development &amp; Vocational Training Department</h2>
                        </div>
                    </div>
                    <div className="w-16 h-1 bg-sky-500 rounded mb-8" />

                    {/* Intro text + first image */}
                    <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                The Professional Skills Development &amp; Vocational Training Department is the workforce-development engine of Engineers4Humanity Institute. It equips refugee and host-community youth with market-relevant technical, vocational skills that lead directly to employment, entrepreneurship, and community resilience.
                            </p>
                            <p>
                                The department strengthens Rwanda's human capital, supports national development priorities, and expands opportunities for vulnerable youth through practical, competency-based training.
                            </p>
                        </div>
                        <div>
                            <img
                                src={img1}
                                alt="Professional Skills Training"
                                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>

                    {/* What We Do */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">What We Do</h3>

                    <div className="space-y-10 mb-14">

                        {/* 1. TVET */}
                        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                <h4 className="text-xl font-bold text-gray-900">Technical &amp; Vocational Training (TVET)</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We deliver hands-on, competency-based training in fields that match labor-market demand, including:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Construction trades',
                                    'Public health Engineering Technician, WASH operations & maintenance,',
                                    'Irrigation, borehole installation & water-system maintenance',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. Professional Skills Development */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                <h4 className="text-xl font-bold text-gray-900">Professional Skills Development</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We prepare youth for the workplace through:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Employability & soft-skills training',
                                    'Leadership & teamwork development',
                                    'Entrepreneurship & small-business incubation',
                                    'Career guidance, mentorship & job-readiness coaching',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Workforce Pathways */}
                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                <h4 className="text-xl font-bold text-gray-900">Workforce Pathways &amp; Job Creation</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We connect trained youth to real opportunities through:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Apprenticeships with construction private-sector companies and sub-contracting jobs;',
                                    'On-the-job training placements',
                                    'Implement community-based service projects in Refugee camp',
                                    'Support for micro-enterprise creation',
                                    'Skills certification aligned with Rwanda TVET national standards',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. Education Support */}
                        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                                <h4 className="text-xl font-bold text-gray-900">Education Support &amp; Academic Pathways</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We strengthen long-term learning through:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'High-school and university education support',
                                    'Engineering/Environment & STEM clubs, innovation labs & youth leadership programs',
                                    'E-learning platforms for flexible, accessible training',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Second image */}
                    <div className="mb-14">
                        <img
                            src={img2}
                            alt="Vocational Training Activities"
                            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </div>

                    {/* How We Work + Key Outcomes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-sky-600 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <ArrowRight className="w-5 h-5" /> How We Work
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Competency-based training aligned with Rwanda TVET standards',
                                    'Partnerships with government, private sector, universities & NGOs',
                                    'Community-based learning inside refugee camps, local host districts and e-learning platform',
                                    'Youth leadership and peer-to-peer training models',
                                    'Sustainability & local ownership through community trainers and alumni networks',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-white/90 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <Award className="w-5 h-5 text-sky-600" /> Key Outcomes
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'A skilled workforce ready for employment and entrepreneurship',
                                    'Increased youth employment and income generation',
                                    'Improved community infrastructure through youth-led projects',
                                    'Reduced dependency and increased self-reliance among refugee families',
                                    'Scalable vocational training models for Rwanda and the region',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <h4 className="font-bold text-blue-800 mb-3">Benefits to Refugee Camps</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    'Skilled youth maintaining camp infrastructure and improved WASH, energy, and construction services',
                                    'Increased household income and reduced aid dependency',
                                    'Youth-led innovation and community resilience',
                                ].map((b, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                            <h4 className="font-bold text-emerald-800 mb-3">Benefits to Rwanda</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    'Expanded technical workforce supporting NST2 priorities',
                                    'Stronger TVET ecosystem and employer-aligned training',
                                    'Increased productivity in construction, WASH, agriculture & energy sectors',
                                ].map((b, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">•</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-emerald-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Be Part of the Story</h2>
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

export default ProfessionalSkills;
