import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import image1 from "../../assets/home/history/image1.png";
import image2 from "../../assets/home/history/image2.png";
import image3 from "../../assets/home/history/image3.png";
import image4 from "../../assets/home/history/image4.png";
import image5 from "../../assets/home/history/image5.png";
import image6 from "../../assets/home/history/image6.png";
import image7 from "../../assets/home/history/image7.png";

interface GalleryImage { id: number; image: string; description: string; }

const galleryImages: GalleryImage[] = [
    { id: 1, image: image1, description: "Eric joins other civil society organization members in Dallas, presenting his Refugee Life journey to the Dallas County Commissioners Court for signing the resolution recognizing June 20, 2025, as the International World Refugee Day in Dallas" },
    { id: 2, image: image2, description: "Hope School 1st intake students of 2009" },
    { id: 3, image: image3, description: "Eric is in a meeting with our short-course trainees at the Engineers4Humanity Center for skills development, research, and Innovation 2020 in Gihembe Refugee camp." },
    { id: 4, image: image4, description: "Eng. Eric Kamanzi, with some of the Engineers4Humanity Staff — Rwanda Team, 2020, including Eng. Karegesa, Rwanda Country Director, Eng. Fabrice Kayisire and many other staff members." },
    { id: 5, image: image5, description: "From Left is Mr Musuhuke, our Alumnae who is serving as a volunteer, and Fr. Malisaba, Engineers4Humanity Vice-Board Chair in charge of Education, in the middle during the visit of sponsored students." },
    { id: 6, image: image6, description: "Meeting with Dr. Apotre Paul Gitwaza and sharing my book during the Rwanda Convention held in Dallas, July 2025" },
    { id: 7, image: image7, description: "Attending the International World Refugee Conference in Dallas and sharing my book, \"Breaking Boundaries,\" with the audience in June 2025." },
];

const HistoryCards: React.FC = () => {
    const [selected, setSelected] = useState<GalleryImage | null>(null);

    return (
        <section className="py-12 px-4 sm:px-8 lg:px-16 lg:py-24 bg-[#F0F7FF]">
            {/* Header */}
            <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase text-sky-600 mb-5">
                    <span className="w-7 h-0.5 bg-sky-600 block" />
                    Our Journey
                    <span className="w-7 h-0.5 bg-sky-600 block" />
                </div>
                <h2 className="font-serif text-[clamp(36px,4vw,52px)] font-normal leading-[1.1] tracking-tight text-[#0A1628]">
                    Milestones that shaped <em className="italic text-sky-500">our story</em>
                </h2>
                <p className="mt-4 text-base leading-relaxed max-w-2xl mx-auto text-[#3A5068]">
                    Explore the moments that have defined Engineers4Humanity — from humble beginnings to transformative partnerships in refugee communities.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryImages.map(item => (
                    <div
                        key={item.id}
                        className="group cursor-pointer overflow-hidden rounded-[4px] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        onClick={() => setSelected(item)}
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img src={item.image} alt={item.description} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-sky-600/0 group-hover:bg-sky-600/40 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3">
                                    <ZoomIn className="w-6 h-6 text-sky-600" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm leading-relaxed text-[#3A5068] line-clamp-3">{item.description}</p>
                            <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors bg-transparent border-none cursor-pointer p-0">
                                View Full Image <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0A1628]/92" onClick={() => setSelected(null)}>
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelected(null)} className="absolute -top-12 right-0 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors border-none cursor-pointer">
                            <X className="w-6 h-6 text-[#0A1628]" />
                        </button>
                        <img src={selected.image} alt={selected.description} className="w-full max-h-[75vh] object-contain rounded-[4px]" />
                        <div className="bg-white mt-3 p-6 rounded-[4px]">
                            <p className="text-[15px] leading-relaxed text-[#0A1628]">{selected.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HistoryCards;
