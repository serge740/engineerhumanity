import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    TrendingUp,
    Users,
    GraduationCap,
    Droplets,
    Heart,
    Globe,
    DollarSign
} from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';
import { getDonationStats, getDonationImpacts } from '../../services/donationService';

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

const OurImpact = () => {
    const location = useLocation();
    const [stats, setStats] = useState<DonationStats | null>(null);
    const [impacts, setImpacts] = useState<DonationImpact[]>([]);

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

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
                linkTitle="Our Impact"
                linkHref="/impact/our-impact"
                backgroundImage={image}
            />

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

export default OurImpact;
