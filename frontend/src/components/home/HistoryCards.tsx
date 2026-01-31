import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import image1 from "../../assets/home/history/image1.png";
import image2 from "../../assets/home/history/image2.png";
import image3 from "../../assets/home/history/image3.png";
import image4 from "../../assets/home/history/image4.png";
import image5 from "../../assets/home/history/image5.png";
import image6 from "../../assets/home/history/image6.png";
import image7 from "../../assets/home/history/image7.png";



interface GalleryImage {
  id: number;
  image: string;
  description: string;
}

const HistoryCards: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      image: image1,
      description: "Eric joins other civil society organization members in Dallas, presenting his Refugee Life journey to the Dallas County Commissioners Court for signing the resolution recognizing June 20, 2025, as the International World Refugee Day in Dallas"
    },
    {
      id: 2,
      image: image2,
      description: "Hope School 1st intake students of 2009"
    },
    {
      id: 3,
      image: image3,
      description: "Eric is in a meeting with our short-course trainees at the Engineers4Humanity Center for skills development, research, and Innovation 2020 in Gihembe Refugee camp."
    },
    {
      id: 4,
      image: image4,
      description: "Eng. Eric Kamanzi, with some of the Engineers4Humanity Staff -Rwanda Team, 2020, including the Eng. Karegesa, the Vice Board Chair in charge of Engineering, Rwanda Country Director, Eng.Fabrice Kayisire and many other staff members."
    },
    {
      id: 5,
      image: image5,
      description: "From Left is Mr Musuhuke, our Alumnae who is serving as a volunteer, and Fr. Malisaba, Engineers4Humanity Vice-Board Chair in charge of Education, in the middle during the visit of sponsored students."
    },
    {
      id: 6,
      image: image6,
      description: "Meeting with Dr. Apotre Paul Gitwaza and sharing my book during the Rwanda Convention held in Dallas, July 2025"
    },
    {
      id: 7,
      image: image7,
      description: "Attending the International World Refugee Conference in Dallas and sharing my book, \"Breaking Boundaries,\" with the audience in June 2025."
    }
  ];

  const ImageModal: React.FC<{ image: GalleryImage | null; onClose: () => void }> = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={image.image}
            alt={image.description}
            className="w-full h-auto  max-h-[80vh] object-contain rounded-lg"
          />

          <div className="bg-white p-6 mt-4 rounded-lg">
            <p className="text-gray-800 leading-relaxed text-lg">
              {image.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Explore the milestones and moments that have shaped Engineers4Humanity.
            From our humble beginnings to transformative partnerships, each image tells
            a story of hope, resilience, and impact in refugee communities.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className=" mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-sky-600 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-3 rounded-full">
                      <ZoomIn className="w-8 h-8 text-sky-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <button className="mt-4 text-sky-600 font-semibold hover:text-sky-700 transition flex items-center gap-2">
                    View Full Image
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
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

export default HistoryCards;