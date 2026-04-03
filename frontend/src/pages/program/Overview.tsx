import React from 'react';
import Header from "../../components/Header";
import image from '../../assets/image6.jpg';

const Overview = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header
                title="Programs Overview"
                linkTitle="Programs"
                linkHref="/programs/overview"
                backgroundImage={image}
            />

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b pb-4 border-gray-200">
                        OVERVIEW
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                        The Engineers4Humanity addresses critical needs through education, public health engineering, and capacity-building programs.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed bg-sky-50 p-6 rounded-xl border-l-4 border-sky-600">
                        We aim to build a better world for everyone through innovative engineering solutions. Promoting self-reliance and sustainable livelihood among refugees, migrants, and underserved communities.
                    </p>
                </div>
            </div>
            <section className="py-16 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Support Our Programs
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

export default Overview;
