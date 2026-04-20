import { Link } from 'react-router-dom';

const joinCards = [
    { icon: "", title: "Volunteer Engineer", desc: "Apply your technical skills to a real humanitarian project, near or far." },
    { icon: "", title: "Student Programs", desc: "Chapter memberships, scholarships, and mentorship for engineering students." },
    { icon: "", title: "Corporate Partnership", desc: "Partner your company's engineering talent with our on-the-ground programs." },
    { icon: "", title: "Donate", desc: "Fund the tools, travel, and time that turns engineering into humanitarian relief." },
];

const CTA = () => (
    <section className="py-28 px-16 bg-[#E1EEF9] grid grid-cols-2 gap-20 items-start" id="join">
        {/* Left */}
        <div>
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-600 mb-6">
                <span className="w-7 h-0.5 bg-sky-600 block flex-shrink-0" />
                Get Involved
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,52px)] font-normal leading-[1.1] tracking-tight text-[#0A1628] mb-6">
                Your support<br />can change <em className="italic text-sky-500">lives</em>
            </h2>
            <p className="text-base leading-[1.8] text-[#3A5068] mb-10">
                Whether through donations, volunteering, or spreading the word — you can help empower vulnerable communities and create lasting change across East Africa and beyond.
            </p>
            <div className="flex gap-4 flex-wrap">
                <Link to="/get-involved" className="bg-sky-600 hover:bg-sky-700 text-white px-9 py-4 text-[13px] font-bold tracking-[0.08em] uppercase rounded-[3px] no-underline transition-colors">
                    Join the Movement
                </Link>
                <a href="https://donate.stripe.com/8wM3fJeRjekd0i4aEE" className="bg-emerald-600 hover:bg-emerald-700 text-white px-9 py-4 text-[13px] font-bold tracking-[0.08em] uppercase rounded-[3px] no-underline transition-colors">
                    Donate Now
                </a>
            </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
            {joinCards.map(card => (
                <div key={card.title} className="bg-white rounded-[8px] p-7 flex gap-5 items-start shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <span className="text-3xl leading-none">{card.icon}</span>
                    <div>
                        <div className="font-serif text-[20px] font-semibold text-[#0A1628] mb-1.5">{card.title}</div>
                        <p className="text-sm leading-[1.7] text-[#3A5068]">{card.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default CTA;
