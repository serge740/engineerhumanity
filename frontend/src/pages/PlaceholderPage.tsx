import { useLocation, Link } from 'react-router-dom';
import { Construction, ArrowLeft, Heart } from 'lucide-react';
import Header from '../components/Header';
import image from '../assets/image6.jpg';

const PlaceholderPage = () => {
    const location = useLocation();

    // Derive a readable title from the URL path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const rawTitle = pathSegments[pathSegments.length - 1] || 'Page';
    const title = rawTitle
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const parentPath = pathSegments.length > 1 ? `/${pathSegments[0]}` : '/';
    const parentName = pathSegments.length > 1
        ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
        : 'Home';

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                title={title}
                linkTitle={title}
                linkHref={location.pathname}
                backgroundImage={image}
            />

            <section className="py-20 md:py-32">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Construction className="w-10 h-10 text-sky-600" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Coming Soon
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We're working hard to bring you great content for the <span className="font-semibold text-sky-600">{title}</span> section.
                            Check back soon for updates!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={parentPath}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-all duration-200 no-underline"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to {parentName}
                            </Link>
                            <Link
                                to="/donate"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 no-underline"
                            >
                                <Heart className="w-5 h-5" />
                                Support Our Mission
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlaceholderPage;
