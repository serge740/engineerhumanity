import React from 'react';

const CTA = () => {
    return (
        <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                    Your Support Makes a Difference
                </h2>
                <p className="text-xl mb-10 opacity-90">
                    Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities and create lasting change.
                </p>
                <a
                    href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
                    className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-700 hover:-translate-y-1 transition-all shadow-xl hover:shadow-2xl"
                >
                    Make a Donation
                </a>
            </div>
        </section>
    );
};

export default CTA;
