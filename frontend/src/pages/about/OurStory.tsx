import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

import image1 from '../../assets/home/image3.png';
import image2 from '../../assets/about/image6.png'
import image3 from '../../assets/about/image3.png'
import image4 from '../../assets/about/image4.png'
import image5 from '../../assets/about/testimonies/image1.png'
import image6 from '../../assets/about/testimonies/image2.png'
import image7 from '../../assets/about/testimonies/image3.png'
import image8 from '../../assets/about/testimonies/image4.png'
import image9 from '../../assets/about/testimonies/image5.png'
import image10 from '../../assets/about/testimonies/image6.png'
import image11 from '../../assets/about/book.png'

import {
    X,
    Building,
    Sparkles,
    ChevronRight,
    ExternalLink,
    Award
} from 'lucide-react';

const OurStory = () => {
    const [selectedStory, setSelectedStory] = useState<any>(null);
    const location = useLocation();

    // Scroll to hash section on navigation
    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location.hash]);

    const successStories = [
        {
            id: 1,
            name: "Bosco Izabayo",
            role: "Alumnae / Beneficiary",
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
            role: "Alumnae / Beneficiary",
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
            role: "Alumnae / Beneficiary",
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
            role: "Alumnae / Beneficiary",
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
                        content: "In 2018, my determination led to my competing for a scholarship at Kepler University, where I earned a spot in their esteemed program. I studied Management with a concentration in Logistics and Operations, embarking on a new academic and professional chapter.\n\nAlongside my studies, I was a Teaching and Learning Assistant for first-year students in a course called \"Methods of Thinking for Business.\" Through this role, I began cultivating teaching and mentoring skills, laying the groundwork for a career devoted to education and support for others.\n\nUpon graduating from Kepler in 2020, my professional journey took a remarkable leap; I secured two pivotal roles: serving as a Global Youth Advisor at the United Nations High Commissioner for Refugees (UNHCR) and as a Global Financial Compliance Officer with One Acre Fund.\n\nAt UNHCR, I represented Rwandan refugees, collaborating with refugee representatives worldwide to communicate challenges and advocate for improved support. Concurrently, at One Acre Fund—a leading organization empowering farmers to address global food demand. Managing payment processes, ensuring compliance with international financial standards. This period marked a milestone in my career as I balanced responsibilities across two impactful roles and developed a robust skill set in global advocacy and financial compliance."
                    },
                    {
                        title: "Continued Growth",
                        content: "Driven by a passion for continuous growth, I began an MBA at the University of Kigali, specializing in Finance and Accounting. My pursuit of higher education was motivated by my professional aspirations and desire to give back to my community with enhanced expertise.\n\nBy August 2022, I took on a new role as an Academic Reviewer with the Global Education Movement in partnership with Southern New Hampshire University. In this position, I support students from various countries enrolled in SNHU's online program by reviewing assignments, grading submissions, and offering academic tutoring. My dedication to student success and academic excellence underscores my commitment to education and mentorship, values deeply instilled in me from my educational journey."
                    },
                    {
                        title: "Personal Life and Giving Back",
                        content: "In July 2024, I marked a new chapter in my personal life by marrying, bringing together two individuals committed to positively impacting their community.\n\nMy commitment to supporting others remains steadfast. I support Engineers4Humanity and Brother Malisaba's efforts to extend aid to refugees and vulnerable individuals facing educational and financial challenges. My contributions to community initiatives reflect my belief in \"paying it back to the community\" and ensuring that others can access the opportunities and support I once received."
                    },
                    {
                        title: "Future Aspirations",
                        content: "My life is guided by diverse skills, spanning office management, leadership, and interpersonal and intrapersonal abilities that equip me to excel in professional and community-centered roles. After completing my MBA in 2024, I am determined to continue my academic pursuits with a Doctorate in Education on the horizon. I aspire to make a lasting impact in education while furthering my involvement in humanitarian efforts to support vulnerable populations.\n\nMy journey is a story of resilience, gratitude, and community-centered ambition. My life is a tribute to the power of mentorship, and I remain devoted to fostering opportunities for others and uplifting those who, like myself, seek a path forward amidst challenging circumstances."
                    }
                ]
            }
        },
        {
            id: 5,
            name: "Emmanuel Sebagisha",
            role: "Alumnae / Beneficiary",
            image: image9,
            summary: "From Gihembe Refugee Camp to African Leadership University, Emmanuel's story showcases the power of education and mentorship.",
            fullStory: {
                intro: "I grew up in Gihembe Refugee Camp as a Congolese refugee in Rwanda, where my mother primarily raised me. Despite the many challenges, I excelled academically, achieving 3rd place in my senior year at Gihembe Secondary School. This accomplishment opened the door for me to pursue a nine-year Education at Inyange High School, even though finding Rwf 5000, approximately $5 for registration, was a struggle.\n\nUltimately, my hard work and determination led to a transformative opportunity, thanks to Frere Malisaba Straton in partnership with the Engineers4humanity team, Forum- Amis de la Paix, who helped my peers and me secure admission to the Teacher Training College of Save (TTC Save).",
                sections: [
                    {
                        title: "Discovery of Teaching Passion",
                        content: "At TTC Save, I uncovered my passion for teaching, a journey I hadn't anticipated. Initially, I helped my colleagues who struggled with various subjects, which sparked my interest in education. After graduation, I gained valuable experience working briefly as an elementary school teacher and in other roles before receiving a scholarship to attend Kepler.\n\nThis opportunity led me to positions at One Acre Fund, Kepler College, and now at African Leadership University.\n\nMy life has changed positively, but one principle remains clear: \"Education is one of the most impactful gifts you can give, especially to individuals from marginalized communities.\" As Frere Malisaba wisely stated, \"I support you because you will support others.\" Keeping this support cycle alive is essential, fostering a culture of empowerment and growth for all."
                    },
                    {
                        title: "Strength in Identity",
                        content: "The invaluable advice we received from our mentors and older siblings at Engineers4Humanity has greatly influenced our lives, reminding us that our humanity goes beyond any labels. Being a refugee can be a source of strength; it inspires us to pursue excellence in all areas. I recall how other students acknowledged our backgrounds, often highlighting refugee students' unique skills and capabilities. This recognition helps foster a spirit of camaraderie and unwavering support, showcasing the collective strength and resilience we contribute to our community."
                    },
                    {
                        title: "Giving Back",
                        content: "I actively volunteer with Engineers4Humanity to ensure young refugees access quality education. In my professional capacity, I contribute financial resources and time, taking on a hands-on role in guiding students.\n\nI am dedicated to helping these young individuals expand their perspectives beyond the confines of their refugee camps. I am committed to empowering them to effect meaningful change through education, and I strongly encourage others to join this essential initiative."
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
            role: "Alumnae / Beneficiary",
            image: image10,
            summary: "From Hope School to Kepler University graduate in Management, Emmy's journey proves refugees can excel when given opportunities.",
            fullStory: {
                intro: "My name is Kagiraneza Bukayire Emmy, and I proudly share my story as someone born in Gihembe Refugee Camp in the Gicumbi district of northern Rwanda. As the firstborn in my family, I carry the legacy of my parents, who sought refuge in Rwanda after fleeing the DRC in 1996 due to political instability and ethnic conflict. Life in the camp has been challenging, but I am determined to rise above these hardships. The difficulties faced by the refugee community continue to grow, particularly affecting our young people, but I believe in our strength and resilience to overcome them.",
                sections: [
                    {
                        title: "Educational Barriers",
                        content: "Education was the foremost issue among the many challenges my parents faced, leaving me with little hope of ever attending school. Yet, at the age of five, I began my journey in education, completing my primary schooling and part of my secondary education at the Gihembe refugee camp.\n\nAs I looked ahead to advanced secondary schooling, a daunting barrier emerged: refugees were deemed ineligible for such education, and refugee education was limited to Grade 9 only.\n\nFortunately, in 2009, the Hope School, established by young refugee students under Forum Amis de la Paix to support the education of young refugees for their own children, provided a unique opportunity for further studies from Grade 10 to G12, and many young refugees graduate from Hope School.\n\nTragically, in 2016, this opportunity was short-lived because the government refused to give Hope School official accreditation. It felt like a pivotal moment in my life—one where continuing my education was within reach—yet the reality of my circumstances forced me to drop out."
                    },
                    {
                        title: "A Second Chance",
                        content: "This situation underscores the need for more significant support and resources for refugee education, a vital issue that deserves our attention and action.\n\nOften, refugees are wrongly viewed as lacking potential, but the truth tells a different story.\n\nDuring that agony and confusion about what happened to Hope School, as we became hopeless, Malisaba Straton intervened, and I got a scholarship to pursue my high school education from G10 to G12 at TT Save.\n\nMy experience at TTC Save, where the Marist Brothers educated me in teaching sciences and mathematics education (SME), made it clear that refugees possess immense capabilities.\n\nWe truly need discipline and commitment to doing what is right within our community and beyond. I wholeheartedly believe that anything is achievable."
                    },
                    {
                        title: "University Success",
                        content: "After graduating from high school at TTC Save, I continued to university, thanks to a Kepple University scholarship, my aspirations materialized. I achieved my Management in Logistics and Operations degree, which has further fueled my ambition. I am committed to pursuing postgraduate studies in 2025, proving that refugees can excel when given the opportunity.\n\nI firmly believe that providing refugees with high-quality education can improve our community.\n\nFor example, while running my own business as a side hustle, I also work in logistics and pursue a teaching career, inspired by the education I received. The saying goes, \"It's never too late to mend.\""
                    },
                    {
                        title: "Calling Message",
                        content: "Investing in refugees' education empowers them to discover their potential, just like the opportunities available to others in our society. The diverse skills fostered in schools by individuals from various backgrounds can broaden refugees' horizons. Together, we can play a crucial role in supporting their educational journey, ultimately enriching our community. Let's take action now!"
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
                            <img
                                src={story.image}
                                alt={story.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-sky-600"
                            />
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                                    {story.name}
                                </h2>
                                <p className="text-sky-600 font-semibold text-lg">{story.role}</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-green-600">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {story.fullStory.intro}
                                </p>
                            </div>

                            {story.fullStory.sections.map((section: any, index: number) => (
                                <div key={index} className="mb-8">
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-sky-600" />
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {section.content}
                                    </p>
                                </div>
                            ))}

                            <div className="mt-8 pt-8 border-t-2 border-gray-200">
                                <p className="text-right font-serif text-xl italic text-gray-600">
                                    - {story.name}
                                </p>
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
                title="Our Story"
                linkTitle="Our Story"
                linkHref="/about/our-story"
                backgroundImage={image}
            />

            {/* Founder Section */}
            <section id="our-story" className="py-12 md:py-20 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            MEET OUR FOUNDER
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
                        <div>
                            <img
                                src={image1}
                                alt="Eric Kamanzi"
                                className="w-full object-cover rounded-xl md:rounded-2xl shadow-2xl mb-4 md:mb-6"
                            />
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                                <img
                                    src={image11}
                                    alt="Breaking Boundaries Book"
                                    className="w-full h-48 sm:h-64 object-contain rounded-lg mb-4"
                                />
                                <a
                                    href="https://www.amazon.com/dp/1949513467"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-sky-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-sky-700 transition"
                                >
                                    Buy Founder Book at Amazon
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-gradient-to-br from-sky-600 to-green-600 text-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl">
                                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
                                    Eric KAMANZI, PE, PMP
                                </h3>
                                <p className="text-lg opacity-95">
                                    Founder & CEO, Engineers4Humanity
                                </p>
                                <p className="text-base opacity-80 mt-1 italic">
                                    A God-Given Calling Shaped by Faith, Tragedy, Purpose, and Impact
                                </p>
                            </div>

                            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Eric Kamanzi's life and work are rooted in a profound journey of survival, faith, and a deep commitment to restoring dignity for refugee youth. Born in 1986 in the Democratic Republic of Congo and raised as the eldest of five, his childhood was marked by responsibility and leadership. At age 10, he fled with his family to Rwanda, and one year later survived the 1997 Mudende Massacre, where his father was killed while protecting him and his siblings. This tragedy became the defining moment that shaped his lifelong mission.
                                </p>
                                <p>
                                    Growing up in the Gihembe Refugee Camp for 25 years, Eric developed a philosophy rooted in self-reliance, education, and God's promises. His father's wisdom — "Teach a man to fish and you feed him for a lifetime" — shaped his understanding of responsibility and dignity. Eric expanded this into his own conviction: <span className="font-bold italic">"If you teach a child, you give him a lifetime gift."</span>
                                </p>
                                <p>
                                    His purpose was strengthened by Nelson Mandela's belief in the power of education and by the Scriptures that shaped his identity. He held tightly to God's assurance: <em>"Before I formed you in the womb I knew you, before you were born I set you apart."</em> — Jeremiah 1:5 and God's promise of hope: <em>"For I know the plans I have for you… plans to give you hope and a future."</em> — Jeremiah 29:11
                                </p>
                                <p>
                                    Today, Eric is a father of four and a global advocate — author of <span className="font-semibold">Breaking Boundaries</span> — and a leader in refugee empowerment with 17+ years of measurable impact, where more than 2,000 youth have changed their lives through education and mentorship. His life vision is <span className="font-bold italic">"Living a happy and impactful life."</span>
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-600 space-y-3">
                                <p className="font-semibold text-gray-900">Key milestones:</p>
                                <ul className="space-y-2 text-base text-gray-700">
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2004:</span> Served 70+ orphaned students through the Survivors' Association AERG at high school.</li>
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2007:</span> Met Pastor Rick Warren in Kigali — a moment that spiritually confirmed his calling.</li>
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2008:</span> Co-founded the Refugee Youth Club – Forum Amis de la Paix.</li>
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2009:</span> Helped establish Hope School, a refugee-led secondary school in Gihembe.</li>
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2020:</span> Launched Engineers4Humanity Consultancy in Rwanda.</li>
                                    <li className="flex items-start gap-2"><span className="font-bold text-sky-600 flex-shrink-0">2024:</span> Established Engineers4Humanity 501(c)(3) in Texas, USA.</li>
                                </ul>
                            </div>

                            <div className="bg-sky-50 p-4 sm:p-6 rounded-xl border-2 border-sky-600">
                                <div className="flex flex-col gap-2 sm:gap-3">
                                    <a
                                        href="https://breakingboundaries.net/connect/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition text-sky-600 text-sm sm:text-base font-semibold"
                                    >
                                        Visit Founder's Author Page
                                        <ChevronRight className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/watch?v=9FrxORFsE9A"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg hover:bg-gray-50 transition text-sky-600 font-semibold"
                                    >
                                        Impact & Videos of Testimonies
                                        <ChevronRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Champion Section */}
            <section id="executive-team" className="py-12 md:py-20 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Engineers4Humanity's Education Program Champion
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                        <div>
                            <img
                                src={image2}
                                alt="Frere Malisaba Straton"
                                className="w-full h-80 sm:h-96 md:h-[500px] object-cover object-top rounded-xl md:rounded-2xl shadow-2xl"
                            />
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-gradient-to-br from-sky-600 to-green-600 text-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl">
                                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                                    Mr. Frere Malisaba Straton
                                </h3>
                                <p className="text-base opacity-90 mt-1">Board Vice Chair for Education Programs</p>
                            </div>

                            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg border-l-4 border-green-600 space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Frère Malisaba Straton is a Catholic Marist Brother, an accomplished educator, and a humanitarian leader whose five decades of service have strengthened schools and communities across East Africa. A former Deputy Provincial Superior of the Marist Brothers and a trained human-rights educator, he has championed child protection, academic excellence, and the dignity of vulnerable learners throughout his career.
                                </p>
                                <p>
                                    We are profoundly grateful for his compassion and leadership, which have shaped refugee education for more than twenty years and continue to guide Engineers4Humanity today. After visiting Hope School in 2013 at the request of his friend Mrs. Lycie, he saw firsthand the challenges refugee students faced and immediately began advocating for mobilizing support, writing to partners, and contributing his own resources. His 2014 meeting with Eric in Kigali deepened their shared commitment to vocational training and youth empowerment.
                                </p>
                                <p>
                                    Through partnerships with Rwabuye Vocational Center and Engineers4Humanity, he launched short-course training programs from 2015, enabling more than 200 refugee youth to gain practical skills and access scholarships from centers including Latoye in Kigali.
                                </p>
                                <p className="font-semibold text-gray-900">
                                    After Hope School closed, Frère Malisaba continued working closely with Eric and played a key role in establishing Engineers4Humanity, where he now serves as Board Vice Chair for Education Programs. His mentorship, advocacy, and unwavering belief in refugee youth have transformed countless lives — he remains a cornerstone of Engineers4Humanity's mission.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Forum and Hope School Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12">
                        <Building className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                            Hope School Success Story &amp; Inspiration of Engineers4Humanity
                        </h2>
                    </div>

                    <div className="bg-sky-50 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl mb-8 md:mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
                        <p>
                            Engineers4Humanity was born from the inspiration of Hope School — a journey of resilience, faith, and the belief that refugee youth can rise when given opportunity. Our founder, Eric, spent 25 years in the Gihembe Refugee Camp, where he learned that education, skills, and hope are the most powerful tools a young person can have.
                        </p>
                    </div>

                    {/* Forum Amis de la Paix */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            Where It Began: Forum Amis de la Paix (2008)
                        </h3>
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>
                                In 2008, Eric co-founded the Refugee Youth Club — Forum Amis de la Paix — the first youth-led movement in the camp. The Forum united young people around education, peacebuilding, and community service. But one challenge became impossible to ignore: refugee students had no access to secondary education.
                            </p>
                            <p>
                                This realization sparked a bold idea that changed the future of the camp.
                            </p>
                        </div>
                    </div>

                    {/* Hope School Success Story */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            Hope School: A Seed of Hope (2009–2016)
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                            <img
                                src={image3}
                                alt="Forum Members"
                                className="w-full h-48 sm:h-64 md:max-h-[400px] object-cover rounded-xl shadow-lg"
                            />
                            <img
                                src={image4}
                                alt="Hope School Graduation"
                                className="w-full h-48 sm:h-64 md:max-h-[400px] object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>
                                With no classrooms, no funding, and no infrastructure, Forum leaders launched what would become Hope School. On January 19, 2009, Inkurunziza Church opened its doors to the first students. To encourage them, Eric wrote a message on the cover of three teacher syllabus books — History, Geography, and Economics — books he had received from Riviera High School in Kigali:
                            </p>
                            <blockquote className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-600 italic text-gray-800 font-medium">
                                "Never give up, never lose hope. In God we trust."
                            </blockquote>
                            <p>
                                A student named Shyengo was inspired to give the school its name — Hope School.
                            </p>
                            <p>
                                The school grew through sacrifice and unity. Teachers volunteered for a full year without pay. The community built classrooms from plastic sheeting, mud walls, and timber. Families contributed 70 RWF (about $0.12) to keep the school alive.
                            </p>
                            <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-600">
                                <p className="font-semibold text-gray-900 mb-3">Remarkable Impact:</p>
                                <p>
                                    Despite these conditions, Hope School became the top-performing school in the district. Every student passed the national exam, and one earned a perfect 100%. Over seven years, more than 500 students graduated — many now leaders in Rwanda, the USA, Canada, and Europe, and many serving today as Engineers4Humanity volunteers.
                                </p>
                            </div>
                            <p>
                                Hope School closed in 2016 due to infrastructure and financial challenges, but its legacy lives on. Eric is deeply grateful to Forum Members, school Principal Mr. Baudouin Ntabareshya, former refugee leaders Nsengiyera Jean and Bahati Justine, the dedicated teachers, staff, churches, youth volunteers, and the partner schools who supported Hope School with scholarships and supplies.
                            </p>
                        </div>
                    </div>

                    {/* New Challenge and E4H Today */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            A New Challenge: Skills and Employment (2013)
                        </h3>
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>
                                Even before the school closed, Eric saw the next barrier: graduates had no jobs, no practical skills, no access to college or university education, and no opportunities.
                            </p>
                            <p>
                                In 2013, he launched an on-the-job training pilot for 10 Hope School graduates. They learned masonry, steel fixing, carpentry, and construction directly on worksites. Within months, they were earning income and supporting their families. This pilot became the first spark of Engineers4Humanity.
                            </p>
                            <p>
                                Partners who believed in refugee potential — including Impact Hope (Mindy Thygeson), ADRA, World Vision, and many churches, schools, and community leaders — helped open doors for thousands of refugee youth.
                            </p>
                        </div>
                    </div>

                    {/* Engineers4Humanity Today */}
                    <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            Engineers4Humanity Today
                        </h3>
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>Engineers4Humanity is the natural evolution of this story:</p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><span className="mt-1.5 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />Forum awakened youth leadership.</li>
                                <li className="flex items-start gap-2"><span className="mt-1.5 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />Hope School opened access to education.</li>
                                <li className="flex items-start gap-2"><span className="mt-1.5 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />The 2013 pilot proved that skills create dignity and income.</li>
                            </ul>
                            <p>
                                Today, Engineers4Humanity equips refugee youth with engineering skills, vocational training, innovation, and pathways to employment — building sustainable solutions for families who still face the hardships Eric once lived through.
                            </p>
                            <p className="font-semibold text-gray-900">
                                The seed of hope planted in 2009 continues to grow — transforming lives, communities, and futures.
                            </p>
                            <a
                                href="https://www.impact-hope.org/aboutus/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition"
                            >
                                Learn more about Impact Hope
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section id="success-stories" className="py-12 md:py-20 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 md:mb-16">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
                            <Award className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600" />
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                                Success Stories & Testimony
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            The refugee education program has hundreds of success stories, and beneficiaries' testimonials highlight its positive impacts. Let's share a few of them.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {successStories.map((story) => (
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
                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                        {story.name}
                                    </h3>
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

            {/* CTA Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                        Your Support Can Make a World of Difference
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 opacity-95">
                        Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities.
                    </p>
                    <a
                        href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
                        className="inline-block bg-white text-sky-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
                    >
                        Donate Now
                    </a>
                </div>
            </section>

            {/* Modal */}
            {selectedStory && (
                <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
            )}

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

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

export default OurStory;
