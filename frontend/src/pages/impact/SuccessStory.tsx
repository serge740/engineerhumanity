import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Award, X, Sparkles, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

import image5 from '../../assets/about/testimonies/image1.png'
import image6 from '../../assets/about/testimonies/image2.png'
import image7 from '../../assets/about/testimonies/image3.png'
import image8 from '../../assets/about/testimonies/image4.png'
import image9 from '../../assets/about/testimonies/image5.png'
import image10 from '../../assets/about/testimonies/image6.png'

const SuccessStory = () => {
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    const summaryStories = [
        {
            name: 'Bosco Izabayo — From Refugee Camp to Professional Accountant',
            story: "Born in Gihembe Refugee Camp and raised by his aunt, Bosco faced poverty and limited schooling. Through Hope School and the mentorship of Eric Kamanzi and Impact Hope, he returned to school, graduated with 100%, earned a Business Administration degree from AUCA University, and became a professional accountant — now employed by Impact Hope itself. He married in June 2024 and credits faith and community for his transformation.",
        },
        {
            name: 'Bernard Ndizeye — Top Graduate Inspiring the Next Generation',
            story: "A Hope School alumnus who studied in difficult conditions, Bernard graduated with an A+ grade and 100% marks at the Rwandan National exam — inspiring the entire Gihembe Refugee Camp. Sponsored by These Numbers Have Faces, he earned a Bachelor's degree in Education from AUCA University as the top student. Today he is a high school teacher in Rwanda and an active Engineers4Humanity volunteer, mentoring young refugee students.",
        },
        {
            name: 'Delice Kiracunda — Empowering Women Through Vocational Skills',
            story: "A Congolese refugee from Gihembe, Delice was selected for sponsorship when hope seemed out of reach. She completed tailoring at Rwabuye TVET School and is now proudly pursuing Leisure, Tourism, and Hotel Management at Eastern Africa University in Rwanda. She credits Frère Marisaba and the Engineers4Humanity team for instilling in her the belief that education is the key to reshaping her family's future.",
        },
        {
            name: 'Bahati Musuhuke — Global Youth Advisor at UNHCR',
            story: "Born in Gihembe Refugee Camp in 1998, Bahati excelled academically despite financial barriers. Supported by Brother Malisaba, Forum Amis de la Paix, and Engineers4Humanity, he completed high school and earned a Management degree from Kepler University. He went on to serve as a Global Youth Advisor at UNHCR and a Global Financial Compliance Officer at One Acre Fund, while pursuing an MBA. He continues to support Engineers4Humanity's mission.",
        },
        {
            name: 'Emmanuel Sebagisha — From Gihembe Camp to African Leadership University',
            story: "Despite ranking 3rd in his class at Gihembe Secondary School, Emmanuel could barely afford the $5 registration fee to continue. Thanks to Frere Malisaba Straton and the Engineers4Humanity team, he was admitted to TTC Save where he discovered his passion for teaching. He later worked at One Acre Fund, Kepler College, and now African Leadership University — and volunteers with Engineers4Humanity to ensure young refugees access quality education.",
        },
        {
            name: 'Emmy Kagiraneza Bukayire — Kepler University Graduate in Management',
            story: "Born in Gihembe Refugee Camp, Emmy faced the closure of Hope School in 2016, just as she was close to finishing secondary school. Malisaba Straton intervened, sponsoring her through TTC Save. She later earned a Management in Logistics and Operations degree from Kepler University and is committed to postgraduate studies in 2025. She runs her own business, works in logistics, and champions refugee education — proving that anything is achievable.",
        },
    ];

    const fullStories = [
        {
            id: 1,
            name: "Bosco Izabayo",
            role: "Alum / Beneficiary",
            image: image5,
            summary: "From refugee camp to professional accountant, Bosco's journey shows the transformative power of education and mentorship.",
            fullStory: {
                intro: "I am Bosco Izabayo, born in 1996 in Rwanda's Rubavu District, at Mudende Refugee Camp, but raised in Gihembe Refugee Camp as a Congolese refugee. My life began in adversity, and like many in the camp, I faced a childhood marked by hardship. My biological parents were not there to guide me, but my aunt and her husband took me in and raised me with love, treating me as their own.\n\nLife in the camp was difficult; poverty was a constant companion, and basic needs like food, clothing, and education were often out of reach. Attending school hungry and in an environment where the classrooms were built from mud and dust was far from ideal, yet we persevered. However, our school only offered education up to grade nine, so continuing to higher grades was a near-impossible dream.",
                sections: [
                    {
                        title: "Education path and Resilience",
                        content: "I began my primary school journey in 2003, reaching grade nine in 2012, only to find no opportunities to continue to upper secondary. For refugees like me, the only option was Hope School—a humble institution created by refugees for refugees. The Forum for Congolese Refugee Students was founded in 2009 by resilient university students.\n\nHope School was not government-accredited, but was built to support students with nowhere else to turn and help them achieve their high school dreams. By 2015, I had reached grade 12 at Hope School, fully prepared to sit for national exams, only to receive the devastating news that we were not eligible to take them. It was a blow I'll never forget, as I tried to imagine what lay ahead with no path forward in education.\n\nIn 2016, by what felt like a miracle, Impact Hope, a U.S.-based NGO, arrived with the promise to support refugee students in boarding schools. I could return to grade ten and begin again at Gahogo Adventist Academy, where I studied until I graduated from upper secondary in 2018 with an A grade or 100%. Impact Hope's support was a lifeline, as was the mentorship from the Engineers4humanity team, Members of Forum Amis de la Paix, Hope school Alumnae, and other peers who visited us at school and encouraged us to pursue our dreams. I am deeply grateful for their unwavering support.\n\nAfter graduation, Impact Hope generously offered to support me through university. I joined the Adventist University of Central Africa, studying Business Administration with a focus on Finance. In his mentorship and career guidance program, Engineer Eric Kamanzi encouraged me to pursue CPA certification studies, which I embraced wholeheartedly to grow as a professional accountant. In 2023, I graduated as one of the top students in my university, fulfilling a dream that once seemed impossible."
                    },
                    {
                        title: "A New Career and Life",
                        content: "In an incredible turn of events, Impact Hope contacted me with a job offer—not because I had received their support, but because the university had recommended me as one of its best students. I accepted the position and began my career at the head office. This year, in June 2024, I married a wonderful woman who has brought even more happiness and strength into my life. Today, the bright future I once could only imagine is becoming my reality."
                    },
                    {
                        title: "Gratitude",
                        content: "I am profoundly thankful to everyone who has contributed to my journey. My most profound appreciation goes to my aunt and her family for the love and sacrifices they made for me. To Eric Kamanzi, Hope School Head Master Mr Baudouin and his colleagues at the Forum for Congolese Refugee Students, thank you for founding Hope School and for your mentorship, which was invaluable. My heartfelt thanks to Impact Hope for supporting my education and career. And to my dear wife, who has brought so much joy and encouragement into my life. I am also grateful to my friends, family, and church community, who have been there for me every step of the way."
                    },
                    {
                        title: "Calling message",
                        content: "Reflecting on my journey, it's remarkable how a child once devoid of hope can grow into a self-reliant adult, capable of making decisions and supporting family and community. My story is a testament to the potential within every refugee; with mentorship and support, we can transform lives. I urge organizations and individuals alike to reach out to refugees, for in doing so, they may help to uncover talents and possibilities the world may not yet have seen."
                    }
                ]
            }
        },
        {
            id: 2,
            name: "Bernard Ndizeye",
            role: "Alum / Beneficiary",
            image: image6,
            summary: "Graduated with A+ and 100% marks despite studying in difficult conditions. Now a top education graduate inspiring others.",
            fullStory: {
                intro: "One of Hope School's alumni, Bernard, inspires others with his academic achievement. Even though he studied in miserable conditions, he graduated with an A+ grade and 100% marks at the Rwandan National exam.\n\nThis inspired the Gihembe Refugee camp and motivated the volunteer teachers and school administration under Mr Baudouin, who dedicated their time and money to refugee kids.",
                sections: [
                    {
                        title: "Academic Excellence",
                        content: "Thank God for the American non-profit organization, These Numbers Have Faces, which has sponsored Mr. Bernard and many other Hope School alumni to complete their university studies. Bernard holds a Bachelor's degree in Education from AUCA University, graduating as the top student with an A+ grade. He is an inspiration, and I urge you to support his pursuit of a Master's and potentially a PhD, as he can significantly contribute to our country's development."
                    },
                    {
                        title: "Current Impact",
                        content: "Bernard is a father, a high school teacher in Rwanda, and a volunteer with Engineers4Humanity. He mentors and follows up with young refugee students. His story demonstrates that refugee youth can thrive when given the opportunity. Let's continue to provide them with opportunities in education and jobs, as they can achieve remarkable achievements.\n\nTogether, let's champion refugee and immigrant inclusion programs."
                    }
                ]
            }
        },
        {
            id: 3,
            name: "Delice Kiracunda",
            role: "Alum / Beneficiary",
            image: image7,
            summary: "From Gihembe camp to studying Leisure, Tourism, and Hotel Management, Delice's journey shows determination and the power of support.",
            fullStory: {
                intro: "I am a Congolese refugee living in the Mahama camp, and I am proudly pursuing my studies in Leisure, Tourism, and Hotel Management at Eastern Africa University in Rwanda.\n\nMy educational journey began at Gihembe camp, where I studied from primary school through my third year of high school. While facing the challenge of limited funding, I witnessed many talented students struggle to continue their education because they were refugees.",
                sections: [
                    {
                        title: "Finding Hope",
                        content: "Many young girls become teen mothers because of the lack of educational support. While I was confused and hopeless, God sent an angel informing me that a benevolent person was helping young refugees pursue high school.\n\nI was selected from a limited number of sponsored students. I felt joy and was inspired to believe in my own potential. Motivated by this hope, I took a bold step and was determined to use skills from RWABUYE TVET School to create a brighter future for myself and my community."
                    },
                    {
                        title: "Skills and Education",
                        content: "I studied tailoring at Rwabuye TVET School, where I gained valuable knowledge that can transform society and humanity. I cherish the support from Frère Marisaba, the Engineers4humanity team led by Eric Kamanzi, and our fellow students who completed their studies.\n\nFrère Marisaba instilled in us the belief that those with the opportunity to learn must strive for knowledge, opening doors to growth and change. We can reshape our families' futures and uplift our community."
                    },
                    {
                        title: "Philosophy",
                        content: "A saying that often inspires me is, \"If you give a fish to a child, you will feed him for a day; if you teach him to fish, you will feed him for a lifetime.\" This wisdom continues to guide my journey.\n\nI believe in serving others, using my financial resources, advice, and skills to uplift those around me. I embrace this calling, knowing I am here to make a positive impact. In conclusion, let us strive to be a unique force for good."
                    }
                ]
            }
        },
        {
            id: 4,
            name: "Bahati Musuhuke",
            role: "Alum / Beneficiary",
            image: image8,
            summary: "From refugee camp to Global Youth Advisor at UNHCR and pursuing an MBA, Bahati's story exemplifies resilience and determination.",
            fullStory: {
                intro: "My journey is a remarkable testament to resilience, ambition, and the power of support in the face of adversity. Born in 1998 in Gihembe Refugee Camp, my early years were shaped by the realities of life there, where educational and economic opportunities were limited. Nonetheless, my dedication to my studies shone through, beginning at Gihembe Primary School and later Gihembe Secondary School, where I completed Ordinary Level studies in 2015 with outstanding performance.",
                sections: [
                    {
                        title: "Educational Journey",
                        content: "My academic achievements earned me a placement to study Mathematics, Computer, and Economics at a prestigious school in the Gicumbi District. However, financial barriers presented a significant challenge. Undeterred, I enrolled at Muhondo Secondary School, a school known for accepting students facing academic or economic difficulties. It was a school under a 12-year basic education program.\n\nMy life-changing journey took a transformative turn thanks to the support of Brother Malisaba, a compassionate mentor who extended a helping hand to young refugees.\n\nIn partnership with the Forum-Amis de la Paix and Engineers4humanity, Brother Malisaba covered my tuition and expenses for three years of high school at the Teacher Training Center Save in Gisagara District. He provided essential guidance, mentorship, and counseling. Under this mentorship, I thrived, graduating with distinction and a renewed sense of purpose in 2017."
                    },
                    {
                        title: "Skills Development",
                        content: "Post-high school, I aspired to become a primary school teacher and improve his living standards. While preparing for the next steps, I was offered an opportunity to acquire technical skills, expanding my potential. I joined a short-course program in culinary arts at Rwabuye TVET School, where I learned technical skills with the support of Brother Malisaba, Forum-Amis de la Paix, and Engineers4Humanity, a humanitarian organization founded by Eric Kamanzi. This support system shaped my drive to pursue my dreams and develop a versatile skill set across multiple disciplines."
                    },
                    {
                        title: "University and Career",
                        content: "In 2018, my determination led to my competing for a scholarship at Kepler University, where I earned a spot in their esteemed program. I studied Management with a concentration in Logistics and Operations, embarking on a new academic and professional chapter.\n\nAlongside my studies, I was a Teaching and Learning Assistant for first-year students in a course called \"Methods of Thinking for Business.\" Through this role, I began cultivating teaching and mentoring skills, laying the groundwork for a career devoted to education and support for others.\n\nUpon graduating from Kepler in 2020, my professional journey took a remarkable leap; I secured two pivotal roles: serving as a Global Youth Advisor at the United Nations High Commissioner for Refugees (UNHCR) and as a Global Financial Compliance Officer with One Acre Fund."
                    },
                    {
                        title: "Continued Growth",
                        content: "Driven by a passion for continuous growth, I began an MBA at the University of Kigali, specializing in Finance and Accounting. By August 2022, I took on a new role as an Academic Reviewer with the Global Education Movement in partnership with Southern New Hampshire University, supporting students from various countries enrolled in SNHU's online program."
                    },
                    {
                        title: "Personal Life and Giving Back",
                        content: "In July 2024, I married, bringing together two individuals committed to positively impacting their community. I continue to support Engineers4Humanity and Brother Malisaba's efforts to extend aid to refugees and vulnerable individuals facing educational and financial challenges."
                    },
                    {
                        title: "Future Aspirations",
                        content: "After completing my MBA in 2024, I am determined to continue with a Doctorate in Education. My journey is a story of resilience, gratitude, and community-centered ambition — devoted to fostering opportunities for others who seek a path forward amidst challenging circumstances."
                    }
                ]
            }
        },
        {
            id: 5,
            name: "Emmanuel Sebagisha",
            role: "Alum / Beneficiary",
            image: image9,
            summary: "From Gihembe Refugee Camp to African Leadership University, Emmanuel's story showcases the power of education and mentorship.",
            fullStory: {
                intro: "I grew up in Gihembe Refugee Camp as a Congolese refugee in Rwanda, where my mother primarily raised me. Despite the many challenges, I excelled academically, achieving 3rd place in my senior year at Gihembe Secondary School. This accomplishment opened the door for me to pursue further education at Inyange High School, even though finding Rwf 5000, approximately $5 for registration, was a struggle.\n\nUltimately, my hard work and determination led to a transformative opportunity, thanks to Frere Malisaba Straton in partnership with the Engineers4humanity team and Forum Amis de la Paix, who helped my peers and me secure admission to the Teacher Training College of Save (TTC Save).",
                sections: [
                    {
                        title: "Discovery of Teaching Passion",
                        content: "At TTC Save, I uncovered my passion for teaching. Initially, I helped my colleagues who struggled with various subjects, which sparked my interest in education. After graduation, I gained valuable experience working briefly as an elementary school teacher before receiving a scholarship to attend Kepler.\n\nThis opportunity led me to positions at One Acre Fund, Kepler College, and now at African Leadership University.\n\n\"Education is one of the most impactful gifts you can give, especially to individuals from marginalized communities.\" As Frere Malisaba wisely stated, \"I support you because you will support others.\""
                    },
                    {
                        title: "Strength in Identity",
                        content: "The invaluable advice we received from our mentors at Engineers4Humanity has greatly influenced our lives, reminding us that our humanity goes beyond any labels. Being a refugee can be a source of strength; it inspires us to pursue excellence in all areas."
                    },
                    {
                        title: "Giving Back",
                        content: "I actively volunteer with Engineers4Humanity to ensure young refugees access quality education. I am dedicated to helping these young individuals expand their perspectives beyond the confines of their refugee camps and strongly encourage others to join this essential initiative."
                    },
                    {
                        title: "Calling Message",
                        content: "The only viable long-term solution for young refugees is education. I urge all who desire to contribute to a better world to support providing quality education for young refugees."
                    }
                ]
            }
        },
        {
            id: 6,
            name: "Emmy Kagiraneza Bukayire",
            role: "Alum / Beneficiary",
            image: image10,
            summary: "From Hope School to Kepler University graduate in Management, Emmy's journey proves refugees can excel when given opportunities.",
            fullStory: {
                intro: "My name is Kagiraneza Bukayire Emmy, and I proudly share my story as someone born in Gihembe Refugee Camp in the Gicumbi district of northern Rwanda. As the firstborn in my family, I carry the legacy of my parents, who sought refuge in Rwanda after fleeing the DRC in 1996 due to political instability and ethnic conflict.",
                sections: [
                    {
                        title: "Educational Barriers",
                        content: "Education was the foremost issue among the many challenges my parents faced. Fortunately, in 2009, Hope School provided a unique opportunity for further studies from Grade 10 to Grade 12. Tragically, in 2016, the government refused to give Hope School official accreditation, forcing me to drop out just as my education was within reach."
                    },
                    {
                        title: "A Second Chance",
                        content: "During that agony and confusion, Malisaba Straton intervened and I got a scholarship to pursue high school at TTC Save. My experience there made it clear that refugees possess immense capabilities. I wholeheartedly believe that anything is achievable."
                    },
                    {
                        title: "University Success",
                        content: "After graduating from TTC Save, I continued to university thanks to a Kepler University scholarship, earning my Management in Logistics and Operations degree. I am committed to pursuing postgraduate studies in 2025, proving that refugees can excel when given the opportunity. I also run my own business and work in logistics."
                    },
                    {
                        title: "Calling Message",
                        content: "Investing in refugees' education empowers them to discover their potential. Together, we can play a crucial role in supporting their educational journey, ultimately enriching our community. Let's take action now!"
                    }
                ]
            }
        }
    ];

    const StoryModal = ({ story, onClose }: any) => {
        if (!story) return null;
        return (
            <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="sticky top-4 float-right mr-4 mt-4 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="p-8">
                        <div className="flex items-center gap-6 mb-8">
                            <img src={story.image} alt={story.name} className="w-32 h-32 rounded-full object-cover border-4 border-sky-600" />
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">{story.name}</h2>
                                <p className="text-sky-600 font-semibold text-lg">{story.role}</p>
                            </div>
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-green-600">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{story.fullStory.intro}</p>
                            </div>
                            {story.fullStory.sections.map((section: any, index: number) => (
                                <div key={index} className="mb-8">
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-sky-600" />
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
                                </div>
                            ))}
                            <div className="mt-8 pt-8 border-t-2 border-gray-200">
                                <p className="text-right font-serif text-xl italic text-gray-600">- {story.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans text-gray-800">
            <Header
                title="Success Stories"
                linkTitle="Success Story"
                linkHref="/impact/success-story"
                backgroundImage={image}
            />

            {/* Section 1 — Summary cards */}
            <section id="success-story" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-3 mb-10">
                        <Star className="w-10 h-10 text-green-600" />
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Success Stories
                        </h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl">
                        The refugee education program has hundreds of success stories, and beneficiaries' testimonials highlight its positive impacts. Let's share a few of them.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {summaryStories.map((story, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{story.story}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2 — Image cards with full story modal */}
            <section id="full-stories" className="py-12 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
                            <Award className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600" />
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                                Read Their Full Stories
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Click on any profile below to read the full testimony in their own words.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {fullStories.map((story) => (
                            <div
                                key={story.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600"
                            >
                                <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                                    <p className="text-sky-600 font-semibold mb-4">{story.role}</p>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                                        {story.summary}
                                    </p>
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="w-full bg-gradient-to-r from-sky-600 to-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-sky-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Full Story
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

            {selectedStory && (
                <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
            )}

            <style>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'DM Sans', sans-serif; }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default SuccessStory;
