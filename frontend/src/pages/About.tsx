import { useState } from 'react';
import {
    X,
    BookOpen,
    Heart,
    Users,
    Award,
    GraduationCap,
    Building,
    Sparkles,
    ChevronRight,
    ExternalLink
} from 'lucide-react';

const AboutUs = () => {
    const [selectedStory, setSelectedStory] = useState<any>(null);

    const successStories = [
        {
            id: 1,
            name: "Bosco Izabayo",
            role: "Alumnae / Beneficiary",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
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
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
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
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
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
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
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
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
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
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
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

    const StoryModal = ({ story, onClose }) => {
        if (!story) return null;

        return (
            <div className="fixed inset-0 bg-black /75 z-50 flex items-center justify-center p-4 overflow-y-auto">
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

                            {story.fullStory.sections.map((section, index) => (
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
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-sky-600 to-green-600 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
                        Refugee-founded nonprofit fostering resilience and self-reliance among displaced communities
                    </p>
                </div>
            </section>

            {/* Our History Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-12">
                        <BookOpen className="w-10 h-10 text-sky-600" />
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
                            Our History
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                            <p>
                                Founded by philanthropist Eric Kamanzi, Engineers4Humanity is a refugee-founded non-profit organization 501(c)(3) registered in Dallas, Texas.
                            </p>
                            <p>
                                It was inspired by Eric's experience as a refugee and founder of Engineers4Humanity Consultancy, a social enterprise operating in East Africa since 2020.
                            </p>
                            <p>
                                After witnessing firsthand the struggles of refugees and displaced communities, Eric was determined to develop a solution to foster long-term resilience and self-reliance among refugees and to play a key role in peacebuilding in the East African region.
                            </p>
                            <p>
                                Eric's humanitarian journey began in 2008, when he gathered other young refugee students to explore how they could find lasting solutions to their daily challenges.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80"
                                alt="Community gathering"
                                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl space-y-6 text-lg leading-relaxed text-gray-700">
                        <p>
                            They founded the Forum for Congolese refugee students. Eric served as the organization's first president and later as board chair. One notable achievement of the Forum is the establishment of Hope School in 2009, a refugee initiative school in the Gihembe refugee camp. The non-profit organization, including UNHCR, stopped the 12-year education program due to a funding shortage.
                        </p>
                        <p>
                            Eric, along with his refugee friends, founded Hope School; more than 500 students graduated from the school. More than 400 students graduate from high school, and their lives have changed.
                        </p>
                        <p>
                            After graduating as a civil engineer, Eric found that engineering could fulfill his mission. Then, he launched Engineers4Humanity Consultant, a social enterprise that provides engineering consultancy and promotes public health engineering, STEM, and vocational training for young refugees.
                        </p>
                        <p>
                            As an immigrant, Eric pursued his humanitarian mission by establishing the Engineers4Humanity Initiative, which operates in the U.S. and supports its affiliated organization, Engineers4Humanity Consultancy, a social enterprise that operates in Rwanda and across Africa. Together, these organizations focus on sustainable development through engineering solutions and education, thereby improving the lives of underserved communities.
                        </p>
                        <p className="font-semibold text-gray-900">
                            For more about our story, check out our founder's book, Breaking Boundaries, and Hope School Alumnae's Testimony at the link below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                            MEET OUR FOUNDER
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                                alt="Eric Kamanzi"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl mb-6"
                            />
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <img
                                    src="https://via.placeholder.com/400x500/0ea5e9/ffffff?text=Breaking+Boundaries+Book+Cover"
                                    alt="Breaking Boundaries Book"
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                                <a
                                    href="https://www.amazon.com/dp/1949513467"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
                                >
                                    Buy Founder Book at Amazon
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-sky-600 to-green-600 text-white p-8 rounded-2xl">
                                <h3 className="font-serif text-3xl font-bold mb-2">
                                    Eric KAMANZI, PE, PMP
                                </h3>
                                <p className="text-lg opacity-95">
                                    Founder & CEO, Engineers4Humanity
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Eric Kamanzi is a refugee/Immigrant from the Democratic Republic of Congo, a father, a #1 best-selling author, a philanthropist, the founder of Engineers4Humanity, and a civil engineer with a Master's in Engineering Project Management and global sustainability.
                                </p>
                                <p>
                                    His passion for humanitarian work stems from his father's humanitarian work and his life experiences as a refugee in East Africa.
                                </p>
                                <p>
                                    With over 17 years of service in refugee communities, Eric has dedicated his life to building a better world free from discrimination and violence and to advancing sustainable solutions for those affected by conflict and displacement through capacity-building programs.
                                </p>
                                <p>
                                    His mentorship and education program have benefited hundreds of refugees in East Africa and America. His life vision is <span className="font-bold italic">"Living a happy and impactful life."</span>
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
                                <p className="text-gray-700 italic mb-4">
                                    Inspired by a famous quotation:
                                </p>
                                <p className="text-lg font-semibold text-gray-900 mb-4">
                                    "Give a man a fish, and you feed him for a day; teach him how to fish, and you feed him for a lifetime."
                                </p>
                                <p className="text-gray-700">
                                    Based on his life experience, he believes, <span className="font-bold">"If you teach a child, you give him a lifetime gift."</span>
                                </p>
                            </div>

                            <div className="bg-sky-50 p-6 rounded-xl border-2 border-sky-600">
                                <p className="text-gray-900 font-semibold mb-4">
                                    Let's join the social and economic community's transformative movement through education sponsorship.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    Today, you can sponsor a child for <span className="font-bold text-green-600">$750 annually</span>, or we can connect you directly with a child to serve.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href="https://breakingboundaries.net/connect/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg hover:bg-gray-50 transition text-sky-600 font-semibold"
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                            Meet Engineers4Humanity's Education Program Champion
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                                alt="Frere Malisaba Straton"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-sky-600 to-green-600 text-white p-8 rounded-2xl">
                                <h3 className="font-serif text-3xl font-bold">
                                    Mr. Frere Malisaba Straton
                                </h3>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-600 space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Malisaba is a dedicated Catholic Church Marist brother. In 2024, he celebrated the 50th anniversary of his dedication to God and his community.
                                </p>
                                <p>
                                    Malisaba is the Board Vice Chair and the leading partner in the Engineers4Humanity education program
                                </p>
                                <p>
                                    For the past 2 decades and to date, Malisaba has played a key role in the Refugee youth education, advocating for young refugees, sponsoring high school students, and financing vocational training.
                                </p>
                                <p className="font-semibold text-gray-900">
                                    He is a cornerstone for Engineers4Humanity's achievements, and we are very grateful to have him in our team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Forum and Hope School Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-12">
                        <Building className="w-10 h-10 text-sky-600" />
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
                            Forum and Hope School Initiatives
                        </h2>
                    </div>

                    {/* Forum Amis de la Paix */}
                    <div className="mb-16">
                        <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                            Forum-Amis de la Paix
                        </h3>
                        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
                            <p>
                                Forum for Congolese refugee students /FCRS – Amis de la Paix is more than just a forum; it is a vibrant and empowering collective of Congolese refugee students founded in the Gihembe refugee camp in Rwanda in 2008.
                            </p>
                            <p>
                                We are grateful for the educational support provided by the Jesuit Refugee Service (JRS), UNHCR, and the Government of Rwanda, which has opened doors to our future.
                            </p>
                            <p>
                                Our organization brings together high school students, university graduates, and aspiring scholars, all driven by a shared vision of a brighter future for all.
                            </p>
                            <div className="bg-sky-50 p-6 rounded-xl border-l-4 border-sky-600">
                                <p className="font-semibold text-gray-900 mb-3">Our Mission:</p>
                                <p>
                                    We are committed to igniting profound social and economic transformation within our community through passionate advocacy and unwavering support for education for all and the right to repatriation in our home country, the Democratic Republic of Congo.
                                </p>
                            </div>
                            <p>
                                We inspire young refugees to embrace their educational journeys and foster a supportive environment where they uplift one another in their academic pursuits.
                            </p>
                            <p>
                                We are dedicated to empowering young refugees to cultivate strong self-confidence, elevate their living conditions, and create transformative opportunities for themselves and their communities.
                            </p>
                            <p>
                                One of the Forum's key accomplishments is establishing Hope School in 2009. This initiative emerged when all donors had stopped supporting high school education for refugees. As a team, we crafted a future filled with hope, resilience, patriotism, and boundless possibilities.
                            </p>
                            <p>
                                This achievement reflects our dedication to creating educational pathways for refugees and underserved communities and fostering support for future initiatives in refugee education.
                            </p>
                            <p>
                                Our journey is significant, as our community faces considerable challenges while residing in refugee camps in East Africa. A few of them have been resettled in the USA and Europe, but many are still living a miserable life in refugee camps; therefore, we are requesting the USA administration to help achieve sustainable peace in the region and repatriate refugees.
                            </p>
                            <p className="font-semibold text-gray-900">
                                As Engineers4Humanity and Forum Amis de la Paix, we are prepared to actively participate in initiatives that promote unity and reconciliation and support community empowerment and development. Together, we can work toward building a more prosperous and peaceful future for our community.
                            </p>
                        </div>
                    </div>

                    {/* Hope School Success Story */}
                    <div>
                        <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                            Hope School: A Success Story
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <img
                                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80"
                                alt="Forum Members"
                                className="w-full h-64 object-cover rounded-xl shadow-lg"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                                alt="Hope School Graduation"
                                className="w-full h-64 object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
                            <p>
                                Hope School is an initiative by the Forum, FCRS-Amis de la Paix, designed to provide educational support for refugees. In 2009, the Jesuit Refugee Service (JRS) and other donors stopped funding students transitioning from Ordinary Level to Senior 4 and Senior 6, which left many young refugees feeling lost and discouraged.
                            </p>
                            <p>
                                In response, the Forum initiated the Hope School to help these youths.
                            </p>
                            <p>
                                We began in churches, thanks to Pastor Rugamba of Inkurunziza church, who dedicated his church for refugee youth education.
                            </p>
                            <p>
                                Later, we engaged the Refugee camp leadership under Nsengiyera Jean and Bahati Justine. We mobilized the entire refugee community and accepted the Hope School Initiative's voluntary support by donating 70 Rwandan Francs (around 5 cents of USD). Even though this amount was small, it played a key role in purchasing school supplies and essential needs for teachers.
                            </p>
                            <p>
                                We are very thankful to the volunteer teachers. Under the leadership of the famous school principal, Mr Bauduoin Ntabareshya, they did an excellent job for the community.
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
                                <p className="font-semibold text-gray-900 mb-3">Impact:</p>
                                <p>
                                    The school has successfully helped hundreds of students from various camps improve and change their lives. The Hope School Alumni include engineers, lawyers, financial experts, Military personnel, and police.
                                </p>
                            </div>
                            <p>
                                More than 400 students graduated from Hope School, but the school's impact is enormous. Due to advocacy, hundreds of refugee students get access to education under the government's and UNHCR's support through a 12-year basic education program.
                            </p>
                            <p>
                                The Hope School initiative inspires everyone to see that a little effort can significantly impact community change.
                            </p>
                            <p>
                                We are thankful that Hope School Alumni are leaders in their communities and are contributing to helping other young refugees in East Africa.
                            </p>
                            <p>
                                Hope School ceased operations in 2016 after the government introduced new regulations for independent schools and a 12-year program.
                            </p>
                            <p>
                                We stopped the activity, and then Impact Hope, an American nonprofit organization, stepped in to support our students in gaining admission to other Boarding Schools. To date, Hope Impact has been helping high school refugee students in Rwanda.
                            </p>
                            <p>
                                Inspired by the Hope school experience, we established Engineers4Humanity to continue the education mission and to promote STEM, Technical, and vocational training, as many high school graduates lack jobs.
                            </p>
                            <p>
                                So, we equip them with hands-on skills, giving them the potential to compete in the job market.
                            </p>
                            <p className="font-semibold text-gray-900">
                                We need additional support to continue this vital work. With your help, we can further empower these young individuals and ensure a brighter future for all.
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Award className="w-12 h-12 text-sky-600" />
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
                                Success Stories & Testimony
                            </h2>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The refugee education program has hundreds of success stories, and beneficiaries' testimonials highlight its positive impacts. Let's share a few of them.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {successStories.map((story) => (
                            <div
                                key={story.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                                        {story.name}
                                    </h3>
                                    <p className="text-sky-600 font-semibold mb-4">{story.role}</p>
                                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                        {story.summary}
                                    </p>
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="w-full bg-gradient-to-r from-sky-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
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
            <section className="py-20 bg-gradient-to-br from-sky-600 to-green-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                        Your Support Can Make a World of Difference
                    </h2>
                    <p className="text-xl mb-10 opacity-95">
                        Whether through donations, volunteering, or spreading the word, you can help empower vulnerable communities.
                    </p>
                    <a
                        href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE"
                        className="inline-block bg-white text-sky-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
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

export default AboutUs;