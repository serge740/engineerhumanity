import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    TrendingUp,
    Star,
    MessageCircle,
    Film,
    FileText,
    Users,
    GraduationCap,
    Droplets,
    Heart,
    Globe,
    ChevronRight,
    Quote,
    DollarSign
} from 'lucide-react';
import Header from '../components/Header';
import image from '../assets/image6.jpg';
import { getDonationStats, getDonationImpacts } from '../services/donationService';

interface DonationImpact {
    id: number;
    firstName: string;
    lastName: string;
    amount: number;
    programArea: string;
    impactMessage: string;
    createdAt: string;
}

interface DonationStats {
    totalDonations: number;
    totalAmount: number;
    byProgram: { programArea: string; count: string; total: string }[];
}

const Impact = () => {
    const location = useLocation();
    const [stats, setStats] = useState<DonationStats | null>(null);
    const [impacts, setImpacts] = useState<DonationImpact[]>([]);

    // Scroll to hash section on navigation
    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    // Fetch donation stats and impacts from backend
    useEffect(() => {
        getDonationStats()
            .then(data => setStats(data))
            .catch(() => { });
        getDonationImpacts()
            .then(data => setImpacts(data.impacts || []))
            .catch(() => { });
    }, []);

    return (
        <div className="font-sans text-gray-800">
            <Header
                title="Our Impact"
                linkTitle="Impact"
                linkHref="/impact"
                backgroundImage={image}
            />

            {/* ── Our Impact Section ── */}
            <section id="our-impact" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <TrendingUp className="w-10 h-10 text-sky-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Our Impact
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Since 2008, Engineers4Humanity has been transforming lives across East Africa and beyond. Through education scholarships, vocational training, environmental stewardship, and peace-building programs, we empower refugees and underserved communities to build self-reliant, dignified futures.
                    </p>

                    {/* Impact Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                        {[
                            { icon: <GraduationCap className="w-8 h-8" />, stat: '500+', label: 'Hope School Graduates', color: 'sky' },
                            { icon: <Users className="w-8 h-8" />, stat: '2,000+', label: 'Lives Transformed', color: 'green' },
                            { icon: <Droplets className="w-8 h-8" />, stat: '100+', label: 'Environmental Studies', color: 'blue' },
                            { icon: <Globe className="w-8 h-8" />, stat: '17+', label: 'Years of Service', color: 'purple' },
                        ].map((item, i) => (
                            <div key={i} className={`bg-${item.color}-50 border-2 border-${item.color}-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300`}>
                                <div className={`text-${item.color}-600 flex justify-center mb-3`}>{item.icon}</div>
                                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{item.stat}</p>
                                <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Key Impact Areas */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Education & Scholarships',
                                desc: 'Providing high school and university scholarships in STEM fields, vocational training, and mentorship programs that have empowered hundreds of refugee youth to build professional careers.',
                                icon: <GraduationCap className="w-6 h-6" />,
                                color: 'sky'
                            },
                            {
                                title: 'Public Health Engineering',
                                desc: 'Designing affordable water supply systems, constructing sanitation facilities, and conducting environmental and social safeguarding studies across Rwanda and East Africa.',
                                icon: <Droplets className="w-6 h-6" />,
                                color: 'green'
                            },
                            {
                                title: 'Leadership & Peace Building',
                                desc: 'Empowering African youth and women as servant leaders and peace advocates through research, community outreach campaigns, and collaborative partnerships with regional organizations.',
                                icon: <Heart className="w-6 h-6" />,
                                color: 'purple'
                            }
                        ].map((area, i) => (
                            <div key={i} className={`bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-${area.color}-300 hover:shadow-lg transition-all duration-300`}>
                                <div className={`w-12 h-12 bg-${area.color}-100 rounded-xl flex items-center justify-center text-${area.color}-600 mb-4`}>
                                    {area.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Success Story Section ── */}
            <section id="success-story" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Star className="w-10 h-10 text-green-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Success Stories
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Behind every number is a human story of resilience and transformation. Our beneficiaries have gone from refugee camps to becoming engineers, financial experts, educators, and community leaders.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: 'Bosco Izabayo — From Refugee Camp to Professional Accountant',
                                story: 'One of our beneficiaries grew up in Gihembe Refugee Camp with limited access to education. Through Engineers4Humanity\'s scholarship program and mentorship from our founder, he completed high school with top marks, earned a university degree in Business Administration, and is now a professional accountant helping others in his community.',
                            },
                            {
                                name: 'Bernard Ndizeye — Top Graduate Inspiring the Next Generation',
                                story: 'A Hope School alumnus who studied in difficult conditions graduated with distinction at the national exam. With support from partner organizations, he completed a Bachelor\'s degree in Education as the top student. Today, he teaches at a high school in Rwanda and mentors young refugee students as a volunteer with Engineers4Humanity.',
                            },
                            {
                                name: 'Delice Kiracunda — Empowering Women Through Vocational Skills',
                                story: 'A young woman from the refugee camp gained admission to study Leisure, Tourism, and Hotel Management at university. She credits her tailoring skills from TVET school and the guidance of Engineers4Humanity mentors for giving her the confidence to pursue higher education and uplift her community.',
                            },
                            {
                                name: 'Bahati Musuhuke — Global Youth Advisor at UNHCR',
                                story: 'Starting from Gihembe Refugee Camp, one of our alumni rose to become a Global Youth Advisor at UNHCR and a Financial Compliance Officer, representing refugees worldwide. He is currently pursuing an MBA and continues to support Engineers4Humanity\'s mission of empowering vulnerable communities.',
                            },
                        ].map((story, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{story.story}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="/about#success-stories"
                            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition text-lg"
                        >
                            Read Full Stories on Our About Page
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Testimony Section ── */}
            <section id="testimony" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <MessageCircle className="w-10 h-10 text-sky-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Testimonies
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Hear directly from the individuals and communities whose lives have been changed by Engineers4Humanity's work.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "Engineers4Humanity and my mentors gave me the courage to believe in my potential. Today I am a university graduate and I support my family. Education is truly a lifetime gift.",
                                author: "Hope School Alumnus",
                                role: "University Graduate & Volunteer"
                            },
                            {
                                quote: "The vocational training I received changed my life. I learned tailoring skills that allowed me to start my own business and provide for my community. I am forever grateful.",
                                author: "TVET Training Beneficiary",
                                role: "Entrepreneur & Community Leader"
                            },
                            {
                                quote: "As a refugee, I thought my education journey was over. But the scholarship and mentorship from Engineers4Humanity opened doors I never imagined possible.",
                                author: "Scholarship Recipient",
                                role: "MBA Student & UNHCR Advisor"
                            },
                        ].map((testimony, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-6 md:p-8 border-l-4 border-sky-600 hover:shadow-lg transition-shadow duration-300">
                                <Quote className="w-8 h-8 text-sky-300 mb-4" />
                                <p className="text-gray-700 leading-relaxed italic mb-6">
                                    "{testimony.quote}"
                                </p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimony.author}</p>
                                    <p className="text-sm text-sky-600">{testimony.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Documentary Section ── */}
            <section id="documentary" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Film className="w-10 h-10 text-green-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Documentary
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Watch our documentaries that capture the real stories, challenges, and triumphs of the communities we serve.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/LZHoOv5Lhn8?si=RxSPORmXcKZbk7Cm"
                                    title="Breaking Boundaries Book trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Breaking Boundaries Book trailer</h3>
                                <p className="text-gray-600">Hear from the beneficiaries themselves — how education and mentorship transformed their futures.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                            <div className="aspect-video bg-linear-to-br from-sky-100 to-green-100 flex flex-col items-center justify-center p-8 text-center">
                                <Film className="w-16 h-16 text-sky-400 mb-4" />
                                <p className="text-gray-500 font-medium">More documentaries coming soon</p>
                                <p className="text-sm text-gray-400 mt-2">We are producing new content to share our expanding impact</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Documentary</h3>
                                <p className="text-gray-600">New documentaries covering our WASH projects and vocational training programs are in production.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Article and Publication Section ── */}
            <section id="article-publication" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <FileText className="w-10 h-10 text-purple-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Articles & Publications
                        </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        Explore our research, publications, and media coverage that documents our journey and insights on refugee empowerment, engineering solutions, and sustainable development.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Breaking Boundaries',
                                type: 'Book',
                                desc: 'A #1 best-selling book by founder Eric Kamanzi sharing his refugee journey and the founding story of Engineers4Humanity. Available on Amazon.',
                                link: 'https://www.amazon.com/dp/1949513467',
                                linkText: 'Get the Book',
                                color: 'sky'
                            },
                            {
                                title: 'Hope School Initiative Report',
                                type: 'Report',
                                desc: 'A comprehensive report on the Hope School initiative that provided education to 500+ refugee students in the Gihembe refugee camp since 2009.',
                                link: '/about#who-we-are',
                                linkText: 'Learn More',
                                color: 'green'
                            },
                            {
                                title: "Founder's Author Page",
                                type: 'Publication',
                                desc: 'Visit our founder\'s author page for more publications, speaking engagements, and resources on refugee empowerment and humanitarian engineering.',
                                link: 'https://breakingboundaries.net/connect/',
                                linkText: 'Visit Author Page',
                                color: 'purple'
                            }
                        ].map((article, i) => (
                            <div key={i} className={`bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-${article.color}-300 hover:shadow-lg transition-all duration-300`}>
                                <span className={`inline-block bg-${article.color}-100 text-${article.color}-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4`}>
                                    {article.type}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-5">{article.desc}</p>
                                <a
                                    href={article.link}
                                    target={article.link.startsWith('http') ? '_blank' : undefined}
                                    rel={article.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`inline-flex items-center gap-1.5 text-${article.color}-600 font-semibold hover:text-${article.color}-700 transition`}
                                >
                                    {article.linkText}
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Donor Impact Wall (Live from API) ── */}
            {(stats || impacts.length > 0) && (
                <section id="donor-impact" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center gap-3 mb-10">
                            <DollarSign className="w-10 h-10 text-green-600" />
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                                Donor Impact Wall
                            </h2>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                            See how your generous donations are making a real difference. Every contribution counts.
                        </p>

                        {/* Live Stats */}
                        {stats && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
                                <div className="bg-white border-2 border-green-100 rounded-2xl p-6 text-center">
                                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 font-medium">Total Raised</p>
                                </div>
                                <div className="bg-white border-2 border-sky-100 rounded-2xl p-6 text-center">
                                    <Heart className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-900">{stats.totalDonations}</p>
                                    <p className="text-sm text-gray-600 font-medium">Donations Received</p>
                                </div>
                                <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 text-center col-span-2 md:col-span-1">
                                    <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-900">{stats.byProgram?.length || 0}</p>
                                    <p className="text-sm text-gray-600 font-medium">Program Areas Supported</p>
                                </div>
                            </div>
                        )}

                        {/* Individual Donor Impacts */}
                        {impacts.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {impacts.map(impact => (
                                    <div key={impact.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                                {impact.firstName[0]}{impact.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{impact.firstName} {impact.lastName}</p>
                                                <p className="text-sm text-gray-500">${Number(impact.amount).toLocaleString()} · {impact.programArea}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed italic">"{impact.impactMessage}"</p>
                                        <p className="text-xs text-gray-400 mt-3">{new Date(impact.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="text-center mt-10">
                            <Link
                                to="/donate"
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg no-underline"
                            >
                                <Heart className="w-5 h-5" />
                                Make Your Impact
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 md:py-20 bg-linear-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Be Part of the Story
                    </h2>
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

export default Impact;
