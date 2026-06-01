import { BookOpen, Briefcase, Wrench, Heart } from 'lucide-react';

const cards = [
    { icon: BookOpen, title: "Education & Skills", desc: "Enhancing education & vocational skills development;" },
    { icon: Briefcase, title: "Job Creation", desc: "Fostering self-reliance through job creation and entrepreneurship;" },
    { icon: Wrench, title: "Engineering Solutions", desc: "Advancing engineering solutions for environmental protection, water, sanitation, and hygiene services; and" },
    { icon: Heart, title: "Peacebuilding", desc: "Encouraging servant leadership and peacebuilding" },
];

const Mission = () => (
    <section className="py-12 px-4 sm:px-8 lg:px-16 lg:py-28 bg-[#E1EEF9]">
        <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-600 mb-6">
                <span className="w-7 h-0.5 bg-sky-600 block" />
                What we do
                <span className="w-7 h-0.5 bg-sky-600 block" />
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-normal leading-[1.1] tracking-tight text-[#0A1628]">
                Our <em className="italic text-sky-500">Mission</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed max-w-2xl mx-auto text-[#3A5068]">
                To build a dignified life for refugees and underserved communities in Rwanda, and promote country development by:
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                    <div key={i} className="bg-white p-6 md:p-10 rounded-sm group hover:bg-sky-600 hover:-translate-y-1 hover:shadow-2xl transition-all duration-250 cursor-default">
                        <Icon className="w-10 h-10 text-sky-600 group-hover:text-white mb-6 transition-colors duration-250" strokeWidth={1.5} />
                        <h3 className="font-serif text-[22px] font-semibold text-[#0A1628] group-hover:text-white mb-3 transition-colors duration-250">
                            {card.title}
                        </h3>
                        <p className="text-sm leading-[1.75] text-[#3A5068] group-hover:text-white transition-colors duration-250">
                            {card.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    </section>
);

export default Mission;
