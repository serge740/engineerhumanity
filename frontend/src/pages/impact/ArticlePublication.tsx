import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

const ArticlePublication = () => {
    const location = useLocation();

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
                title="Articles & Publications"
                linkTitle="Articles & Publications"
                linkHref="/impact/article-publication"
                backgroundImage={image}
            />

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
                                link: '/about/who-we-are',
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

            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
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

export default ArticlePublication;
