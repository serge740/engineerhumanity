import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import { FlaskConical, CheckCircle, Award, ArrowRight, Building2, Leaf, Droplets } from 'lucide-react';
import headerBg from '../../assets/image.jpeg';
import imgUmwana from '../../assets/home/history/image5.png';
import imgAmazi from '../../assets/home/research.png';


const ResearchInnovation = () => {
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
                title="Innovation & Research Hub"
                linkTitle="Innovation & Research Hub"
                linkHref="/programs/research-innovation"
                backgroundImage={headerBg}
            />

            <section id="research-innovation" className="py-16 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    {/* Heading */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FlaskConical className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Engineers4Humanity Institute</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Innovation &amp; Research Hub Department</h2>
                        </div>
                    </div>
                    <div className="w-16 h-1 bg-emerald-500 rounded mb-8" />

                    {/* Intro + first image */}
                    <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
                        <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                            <p>
                                The Innovation &amp; Research Department is the engineering and scientific hub of Engineers4Humanity Institute. We design, test, and scale practical, low-cost, public health engineering resilient solutions that improve living conditions in refugee camps and advance Rwanda's national development goals.
                            </p>
                            <p>
                                Our work is grounded in lived experience, technical expertise, and a commitment to innovation, skills development, and environmental restoration.
                            </p>
                        </div>
                        <div>
                            <img
                                src={imgUmwana}
                                alt="Innovation and Research Hub"
                                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>

                    {/* What We Do */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">What We Do</h3>

                    <div className="space-y-10 mb-14">

                        {/* 1. Applied Research & Innovation */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                <h4 className="text-xl font-bold text-gray-900">Applied Research &amp; Innovation</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We develop affordable, scalable solutions for refugee camps and rural host communities, including:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Waste-to-energy briquettes and clean cooking & renewable energy',
                                    'Improved sanitation & wastewater systems',
                                    'Rainwater harvesting & drainage',
                                    'Low-cost irrigation systems and affordable boreholes & rural water supply designs',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. Camp Infrastructure Support */}
                        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                <h4 className="text-xl font-bold text-gray-900">Camp Infrastructure Support</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">Our teams help maintain and improve camp infrastructure through:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Water, sanitation & drainage maintenance',
                                    'Environmental restoration, and emergency response to flooding & erosion',
                                    'Technical assessments for MINEMA & UNHCR',
                                    'Small-scale irrigation for nutrition gardens',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Environmental Protection */}
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                <h4 className="text-xl font-bold text-gray-900">Environmental Protection</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We promote:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Reforestation and Soil erosion control',
                                    'Waste sorting & recycling',
                                    'Clean cooking alternatives',
                                    'Community environmental education',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. Low-Cost Irrigation & Water Supply */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                                <h4 className="text-xl font-bold text-gray-900">Low-Cost Irrigation &amp; Water Supply</h4>
                            </div>
                            <p className="text-gray-600 mb-4 ml-12">We design and implement:</p>
                            <ul className="ml-12 space-y-2">
                                {[
                                    'Gravity-fed & solar irrigation and drip irrigation kits',
                                    'Agricultural rainwater harvesting',
                                    'Low-cost boreholes with hand/solar pumps',
                                    'Water quality testing & community waterpoint training',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Second image */}
                    <div className="mb-14">
                        <img
                            src={imgAmazi}
                            alt="Water and irrigation projects"
                            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </div>

                    {/* How We Work + Key Outcomes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-emerald-600 text-white rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                                <ArrowRight className="w-5 h-5" /> How We Work
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Scientific research & field testing',
                                    'Youth leadership and innovation and Community co-design',
                                    'Strong partnerships with government, UN agencies, High schools, college & universities',
                                    'Sustainability and local ownership',
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
                                <Award className="w-5 h-5 text-emerald-600" /> Key Outcomes
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Better WASH and sanitation systems and expanded access to clean water',
                                    'Increased food production through irrigation',
                                    'Reduced deforestation and cleaner energy use',
                                    'Trained Public Health Engineering workforce and scalable engineering models for Rwanda',
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
                                    'Safer water, improved sanitation and irrigation for nutrition gardens',
                                    'Reduced Environmental Hazards',
                                    'Skilled youth maintaining infrastructure',
                                    'Improved health, dignity & resilience and reduced waterborne diseases in refugee camp',
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
                                    'Reduced pressure on forests, and contribute enhanced national WASH & environmental systems',
                                    'Expanded rural water access and higher agricultural productivity',
                                    'Skilled technical workforce',
                                    'Innovations aligned with NST2, SDGs & Africa Agenda 2063',
                                ].map((b, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-emerald-500 mt-0.5">•</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Key Partners */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                        <h4 className="font-bold text-gray-900 mb-3">Key Partners</h4>
                        <p className="text-gray-600 text-sm">
                            Government of Rwanda &bull; MINEMA &bull; Districts &bull; UNHCR &bull; Universities &bull; NGOs &bull; Private Sector
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 to-sky-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Be Part of the Story</h2>
                    <p className="text-lg md:text-xl opacity-95 mb-8">
                        Your support helps us continue transforming lives through education, engineering, and peace-building.
                    </p>
                    <a
                        href="/donate"
                        className="inline-block bg-white text-emerald-600 px-8 md:px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl no-underline"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ResearchInnovation;
