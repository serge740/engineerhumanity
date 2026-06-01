import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import image from '../../assets/image6.jpg';

import image1 from '../../assets/home/image3.png';
import image2 from '../../assets/about/image6.png'
import image3 from '../../assets/about/image3.jpeg'
import image4 from '../../assets/about/image4.png'
import image11 from '../../assets/about/book.png'

import {
    Building,
    ChevronRight,
    ExternalLink,
} from 'lucide-react';

const OurStory = () => {
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
                                <p className="text-base opacity-80 mt-2 font-semibold">Eric Kamanzi & Engineers4Humanity</p>
                                <p className="text-base opacity-80 mt-1 italic">
                                    A God-Given Calling Shaped by Faith, Tragedy, Purpose, and Impact
                                </p>
                            </div>

                            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Eric Kamanzi's life and work are rooted in a profound journey of survival, faith, and a deep commitment to restoring dignity for refugee youth. Born in 1986 in the Democratic Republic of Congo and raised as the eldest of five, his childhood was marked by responsibility and leadership. At age 10, he fled with his family to Rwanda, and one year later survived the <strong>1997 Mudende Massacre</strong>, where his father was killed while protecting him and his siblings. This tragedy became the defining moment that shaped his lifelong mission.
                                </p>
                                <p>
                                    Growing up in the Gihembe Refugee Camp in Rwanda for 25 years, Eric developed a philosophy rooted in <strong>self-reliance, education, and God's promises</strong>. His father's wisdom and principle <em>"Teach a man to fish and you feed him for a lifetime"</em> — shaped his understanding of responsibility and dignity. Eric expanded this into his own conviction: <strong>"If you teach a child, you give him a lifetime gift."</strong> These principles became the foundation of <strong>Engineers4Humanity</strong>.
                                </p>
                                <p>
                                    His purpose was strengthened by <strong>Nelson Mandela's belief</strong> in the power of education and by the Scriptures that shaped his identity. He held tightly to God's assurance: <strong>"Before I formed you in the womb I knew you, before you were born I set you apart."</strong> — Jeremiah 1:5 and to God's promise of hope: <strong>"For I know the plans I have for you… plans to give you hope and a future."</strong> — Jeremiah 29:11
                                </p>
                                <p>
                                    Eric's calling was shaped not only by tragedy and resilience, but by a deep family devotion to faith. In 2007, Eric met American Pastor Rick Warren in Kigali, Rwanda at a youth meeting — a moment that spiritually confirmed his calling. Anchored in the declaration, <strong>"As for me and my house, we will serve the Lord."</strong> — Joshua 24:15, his family held firmly to God's promises through years of hardship. Eric's family's restoration — now reunited and living together in Dallas, Texas — is a living testimony of God's faithfulness. Thankfully, Eric's mother and brothers are U.S. citizens, and Eric and his wife, Gentile, have U.S. Permanent Residence (green cards).
                                </p>
                                <p>
                                    This same faith fuels Eric's <strong>lifelong commitment to serve and advocate for refugee families</strong> who remain in camps today — families still facing the same misery, uncertainty, and daily struggle he once lived through. He carries their stories in his heart, and every initiative he leads is driven by the conviction that <strong>no child should grow up without opportunity, and no family should remain trapped in hopelessness.</strong>
                                </p>
                                <p>
                                    Today, as a father of four, Eric is intentional about raising his children with the same values of <strong>faith, service, and purpose</strong> that shaped his own life — and with a deep awareness of the responsibility to uplift those still waiting for the chance he was given.
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
                                    Frère Malisaba Straton is a Catholic Marist Brother, an accomplished educator, and a humanitarian leader whose five decades of service have strengthened schools and communities across East Africa. A former Deputy Provincial Superior of the Marist Brothers in Rwanda and a trained human-rights educator, he has championed child protection, academic excellence, and the dignity of vulnerable learners throughout his career.
                                </p>
                                <p>
                                    We are profoundly grateful for his compassion and leadership, which have shaped refugee education for more than twenty years and continue to guide Engineers4Humanity today. After visiting Hope School in 2013 at the request of his friend Mrs. Lycie, he saw firsthand the challenges refugee students faced and immediately began advocating for mobilizing support, writing to partners, and contributing his own resources. His 2014 meeting with Eric in Kigali deepened their shared commitment to vocational training and youth empowerment.
                                </p>
                                <p>
                                    Through partnerships with Rwabuye Vocational Center and Engineers4Humanity, he launched short-course training programs from 2015, enabling more than 200 refugee youth to gain practical skills and access scholarships from centers including Latoye in Kigali.
                                </p>
                                <p className="font-semibold text-gray-900">
                                    After Hope School closed in 2016, Frère Malisaba continued working closely with Eric and played a key role in establishing Engineers4Humanity, where he now serves as Board Vice Chair for Education Programs. His mentorship, advocacy, and unwavering belief in refugee youth have transformed countless lives — he remains a cornerstone of Engineers4Humanity's mission.
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
                            Engineers4Humanity was born from the inspiration of Hope School — a journey of resilience, faith, and the belief that refugee youth can rise when given opportunity. Our founder, Eric, spent 25 years in the Gihembe Refugee Camp in Rwanda, where he learned that education, skills, and hope are the most powerful tools a young person can have.
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

                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 ">
                            <img
                                src={image3}
                                alt="Forum Members"
                                className="w-full h-[500px] sm:h-[400px] md:max-h-[600px] object-cover rounded-xl shadow-lg"
                            />
                            <img
                                src={image4}
                                alt="Hope School Graduation"
                                className="w-full h-[500px] sm:h-[400px] md:max-h-[600px] object-cover rounded-xl shadow-lg"
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
                                The school grew through sacrifice and unity. Teachers volunteered for a full year without pay. The community built classrooms from plastic sheeting, mud walls, and timber. Families contributed small amounts to keep the school alive.
                            </p>
                            <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-600">
                                <p className="font-semibold text-gray-900 mb-3">Remarkable Impact:</p>
                                <p>
                                    Despite these conditions, Hope School became the top-performing school in the district. Every student passed the national exam, and one earned a perfect 100%. Over seven years, more than 500 students graduated — many now leaders in Rwanda, the USA, Canada, and Europe, and many serving today as Engineers4Humanity volunteers.
                                </p>
                            </div>
                            <p>
                                Hope School closed in 2016 due to infrastructure and financial challenges, but its legacy lives on.
                            </p>
                        </div>
                    </div>

                    {/* New Challenge */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            A New Challenge: Skills and Employment (2013)
                        </h3>
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>
                                Even before the school closed, Eric saw the next barrier: <strong>graduates had no jobs, no practical skills, no access to college or university education, and no opportunities.</strong>
                            </p>
                            <p>
                                In 2013, he launched an on-the-job training pilot for 10 Hope School graduates. They learned masonry, steel fixing, carpentry, and construction directly on worksites. Within months, they were earning income and supporting their families.
                            </p>
                            <p>
                                This pilot became the <strong>first spark of Engineers4Humanity.</strong>
                            </p>
                        </div>
                    </div>

                    {/* Partners Who Carried the Mission */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            Partners Who Carried the Mission
                        </h3>
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg text-base md:text-lg text-gray-700 leading-relaxed">
                            <p className="mb-5">Our journey has been strengthened by partners who believe in refugee potential, including:</p>
                            <ul className="space-y-3 mb-6">
                                {["Impact Hope (Mindy Thygeson)", "ADRA", "World Vision", "These Numbers Have Faces", "Many churches, schools, and community leaders"].map((partner, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-2 w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />
                                        <span className="font-semibold">{partner}</span>
                                    </li>
                                ))}
                            </ul>
                            <p>Their support has opened doors for thousands of refugee youth.</p>
                        </div>
                    </div>

                    {/* Gratitude */}
                    <div className="mb-12 md:mb-16">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            Gratitude to Those Who Carried the Mission
                        </h3>
                        <div className="bg-sky-50 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border-l-4 border-sky-600 text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
                            <p>
                                Eric is deeply grateful to Forum Members, school Principal Mr. Baudouin Ntabareshya, Nsengiyera Jean — former refugee leaders who are both resettled in the USA — the dedicated teachers, staff, churches, youth volunteers, and the partner schools who supported Hope School with scholarships and supplies.
                            </p>
                            <p>
                                He honors the students who trusted the mission and worked hard to succeed, and the entire Gihembe refugee community, whose small voluntary contributions helped make secondary education possible for more than 500 students. Their unity and sacrifice helped shape leaders now serving globally and many who continue giving back through Engineers4Humanity. Their journey proves that hope, once planted, grows across generations and continents.
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
                            <div className="mt-6">
                                <a
                                    href="/impact/success-story"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-sky-700 hover:to-green-700 transition-all shadow-md no-underline"
                                >
                                    Read Our Success Stories
                                    <ChevronRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
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
                        href="/donate"
                        className="inline-block bg-white text-sky-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
                    >
                        Donate Now
                    </a>
                </div>
            </section>

            <style>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'DM Sans', sans-serif; }
            `}</style>
        </div>
    );
};

export default OurStory;
