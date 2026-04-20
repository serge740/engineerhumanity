import { useState, useEffect } from 'react';
import heroImage1 from '../../assets/events/pictures vocationaltraining (1)/508D0046.jpg';
import heroImage2 from '../../assets/events/Parent Visit in 2019 at Gihembe Refugee Camp/4784C9FB-E5D8-4530-808B-F90379DEA33F.jpg';
import heroImage3 from '../../assets/events/pictures vocationaltraining (1)/508D0030.jpg';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: heroImage1,
            title: "Building Dignified Lives",
            description: "Empowering refugees and underserved communities through education, engineering, and servant leadership"
        },
        {
            image: heroImage2,
            title: "Education Changes Everything",
            description: "From refugee camps to universities — we open doors that were never meant to be closed"
        },
        {
            image: heroImage3,
            title: "Creating Opportunities",
            description: "Vocational training, mentorship, and social entrepreneurship transforming lives across East Africa and beyond"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[85vh] mt-24 overflow-hidden" id="home">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover brightness-50"
                    />


                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white max-w-4xl px-6">
                            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl animate-[slideUp_0.8s_ease-out]">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-xl animate-[slideUp_0.8s_ease-out_0.2s_backwards]">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slider Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-10'
                                : 'bg-white/50 w-3 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
