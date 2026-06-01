const items = [
    "Clean Water & Sanitation", "Education & Scholarships", "Vocational Training",
    "Servant Leadership", "Peacebuilding", "Social Entrepreneurship",
    "Engineering Consultancy", "Community Empowerment",
];

const Ticker = () => {
    const doubled = [...items, ...items];
    return (
        <div className="bg-emerald-600 py-3.5 overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-[ticker_32s_linear_infinite]">
                {doubled.map((item, i) => (
                    <span key={i} className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-white mx-9">
                        <span className="opacity-55 mr-3.5">◆</span>{item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
