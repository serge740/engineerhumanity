import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import {
    Wrench, BookOpen, Users, TrendingUp, Leaf, CheckCircle, Building2, FlaskConical,
    Droplets, Flame, Recycle, Sun, Award, ArrowRight
} from 'lucide-react';
import headerBg from '../../assets/image6.jpg';
import profImg from '../../assets/image.jpeg';
import researchImg1 from '../../assets/home/WhatsApp Image 2026-05-20 at 18.12.28 (1).jpeg';
import researchImg2 from '../../assets/home/image.png';
import researchImg3 from '../../assets/home/imaged.png';

const Institute = () => {
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
                title="Engineers4Humanity Institute"
                linkTitle="E4H Institute"
                linkHref="/programs/institute"
                backgroundImage={headerBg}
            />

            {/* ── PROFESSIONAL SKILLS DEVELOPMENT ── */}
            <section id="professional-skills" className="py-16 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                            <Wrench className="w-6 h-6 text-sky-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Engineers4Humanity Institute</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Professional Skills Development</h2>
                        </div>
                    </div>
                    <div className="w-16 h-1 bg-sky-500 rounded mb-8" />

                    <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                The Professional Skills Development &amp; Vocational Training Department is the workforce-development engine of Engineers4Humanity Institute. It equips refugee and host-community youth with market-relevant technical and vocational skills that lead directly to employment, entrepreneurship, and community resilience.
                            </p>
                            <p>
                                The department strengthens Rwanda's human capital, supports national development priorities, and expands opportunities for vulnerable youth through practical, competency-based training.
                            </p>
                        </div>
                        <div>
                            <img
                                src={profImg}
                                alt="Professional Skills Graduates receiving certificates"
                                className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl"
                            />
                            <p className="text-xs text-gray-500 italic mt-2 text-center">
                                Vocational training graduates receiving their certificates — Engineers4Humanity Institute
                            </p>
                        </div>
                    </div>

                    {/* What We Do */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-sky-600" /> What We Do
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            {
                                icon: <Wrench className="w-6 h-6 text-sky-600" />,
                                bg: 'bg-sky-50 border-sky-200',
                                title: 'Technical & Vocational Training (TVET)',
                                items: ['Construction trades', 'Public health Engineering Technician', 'WASH operations & maintenance', 'Irrigation, borehole & water-system maintenance'],
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
                                bg: 'bg-emerald-50 border-emerald-200',
                                title: 'Professional Skills Development',
                                items: ['Employability & soft-skills training', 'Leadership & teamwork development', 'Entrepreneurship & small-business incubation', 'Career guidance, mentorship & job-readiness'],
                            },
                            {
                                icon: <Users className="w-6 h-6 text-orange-600" />,
                                bg: 'bg-orange-50 border-orange-200',
                                title: 'Workforce Pathways & Job Creation',
                                items: ['Apprenticeships with private-sector companies', 'On-the-job training placements', 'Community-based service projects in refugee camp', 'Support for micro-enterprise creation'],
                            },
                            {
                                icon: <BookOpen className="w-6 h-6 text-purple-600" />,
                                bg: 'bg-purple-50 border-purple-200',
                                title: 'Education Support & Academic Pathways',
                                items: ['High-school and university education support', 'STEM clubs, innovation labs & youth leadership', 'E-learning platforms for flexible training', 'Engineering/Environment clubs'],
                            },
                        ].map((card, i) => (
                            <div key={i} className={`${card.bg} border rounded-2xl p-6`}>
                                <div className="mb-3">{card.icon}</div>
                                <h4 className="font-bold text-gray-900 mb-3 text-sm">{card.title}</h4>
                                <ul className="space-y-1.5">
                                    {card.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* How We Work + Outcomes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-sky-600 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <ArrowRight className="w-5 h-5" /> How We Work
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Competency-based training aligned with Rwanda TVET standards',
                                    'Partnerships with government, private sector, universities & NGOs',
                                    'Community-based learning inside refugee camps & local host districts',
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
                                    'Skilled youth maintaining camp infrastructure',
                                    'Improved WASH, energy, and construction services',
                                    'Increased household income and reduced aid dependency',
                                    'Youth-led innovation and community resilience',
                                ].map((b, i) => <li key={i} className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>{b}</li>)}
                            </ul>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                            <h4 className="font-bold text-emerald-800 mb-3">Benefits to Rwanda</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    'Expanded technical workforce supporting NST2 priorities',
                                    'Stronger TVET ecosystem and employer-aligned training',
                                    'Increased productivity in construction, WASH, agriculture & energy sectors',
                                ].map((b, i) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>{b}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DIVIDER ── */}
            <div className="bg-gradient-to-r from-sky-600 via-emerald-600 to-sky-600 h-1" />

            {/* ── INNOVATION & RESEARCH HUB ── */}
            <section id="research-innovation" className="py-16 md:py-20 bg-slate-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <FlaskConical className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Engineers4Humanity Institute</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Innovation &amp; Research Hub</h2>
                        </div>
                    </div>
                    <div className="w-16 h-1 bg-emerald-500 rounded mb-8" />

                    <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                The Innovation &amp; Research Department is the engineering and scientific hub of Engineers4Humanity Institute. We design, test, and scale practical, low-cost, public health engineering solutions that improve living conditions in refugee camps and advance Rwanda's national development goals.
                            </p>
                            <p>
                                Our work is grounded in lived experience, technical expertise, and a commitment to innovation, skills development, and environmental restoration.
                            </p>
                        </div>
                        <div>
                            <img
                                src={researchImg1}
                                alt="Innovation and Research Hub"
                                className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>

                    {/* What We Do */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-emerald-600" /> What We Do
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            {
                                icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
                                bg: 'bg-emerald-50 border-emerald-200',
                                title: 'Applied Research & Innovation',
                                items: ['Waste-to-energy briquettes & clean cooking', 'Improved sanitation & wastewater systems', 'Rainwater harvesting & drainage', 'Low-cost irrigation & affordable boreholes'],
                            },
                            {
                                icon: <Building2 className="w-6 h-6 text-sky-600" />,
                                bg: 'bg-sky-50 border-sky-200',
                                title: 'Camp Infrastructure Support',
                                items: ['Water, sanitation & drainage maintenance', 'Environmental restoration & emergency response', 'Technical assessments for MINEMA & UNHCR', 'Small-scale irrigation for nutrition gardens'],
                            },
                            {
                                icon: <Leaf className="w-6 h-6 text-green-600" />,
                                bg: 'bg-green-50 border-green-200',
                                title: 'Environmental Protection',
                                items: ['Reforestation and soil erosion control', 'Waste sorting & recycling', 'Clean cooking alternatives', 'Community environmental education'],
                            },
                            {
                                icon: <Droplets className="w-6 h-6 text-blue-600" />,
                                bg: 'bg-blue-50 border-blue-200',
                                title: 'Low-Cost Irrigation & Water Supply',
                                items: ['Gravity-fed & solar irrigation', 'Drip irrigation kits', 'Low-cost boreholes with hand/solar pumps', 'Water quality testing & community training'],
                            },
                        ].map((card, i) => (
                            <div key={i} className={`${card.bg} border rounded-2xl p-6`}>
                                <div className="mb-3">{card.icon}</div>
                                <h4 className="font-bold text-gray-900 mb-3 text-sm">{card.title}</h4>
                                <ul className="space-y-1.5">
                                    {card.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Images row */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        <img src={researchImg2} alt="Research field work" className="w-full h-56 object-cover rounded-2xl shadow-lg" />
                        <img src={researchImg3} alt="Innovation hub activities" className="w-full h-56 object-cover rounded-2xl shadow-lg" />
                    </div>

                    {/* How We Work + Outcomes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-emerald-600 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <ArrowRight className="w-5 h-5" /> How We Work
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Scientific research & field testing',
                                    'Youth leadership, innovation & community co-design',
                                    'Strong partnerships with government, UN agencies, colleges & universities',
                                    'Sustainability and local ownership',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-white/90 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <Award className="w-5 h-5 text-emerald-600" /> Key Outcomes
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Better WASH and sanitation systems & clean water access',
                                    'Increased food production through irrigation',
                                    'Reduced deforestation and cleaner energy use',
                                    'Trained Public Health Engineering workforce',
                                    'Scalable engineering models for Rwanda',
                                    'Healthier, safer, more resilient communities',
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
                    <div className="grid sm:grid-cols-2 gap-6 mb-10">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <h4 className="font-bold text-blue-800 mb-3">Benefits to Refugee Camps</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    'Safer water, improved sanitation & irrigation for nutrition gardens',
                                    'Reduced environmental hazards',
                                    'Skilled youth maintaining infrastructure',
                                    'Improved health, dignity & resilience',
                                    'Reduced waterborne diseases',
                                ].map((b, i) => <li key={i} className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>{b}</li>)}
                            </ul>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                            <h4 className="font-bold text-emerald-800 mb-3">Benefits to Rwanda</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                {[
                                    'Reduced pressure on forests',
                                    'Enhanced national WASH & environmental systems',
                                    'Expanded rural water access & higher agricultural productivity',
                                    'Skilled technical workforce',
                                    'Innovations aligned with NST2, SDGs & Africa Agenda 2063',
                                ].map((b, i) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span>{b}</li>)}
                            </ul>
                        </div>
                    </div>

                    {/* Partners */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                        <h4 className="font-bold text-gray-900 mb-3">Key Partners</h4>
                        <p className="text-gray-600 text-sm">
                            Government of Rwanda &bull; MINEMA &bull; Districts &bull; UNHCR &bull; Universities &bull; NGOs &bull; Private Sector
                        </p>
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

export default Institute;
