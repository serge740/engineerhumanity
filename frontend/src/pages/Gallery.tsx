import { useState, useMemo } from 'react';
import Header from '../components/Header';
import image from '../assets/image6.jpg';

const gihembeModules = import.meta.glob(
  '../assets/events/Parent Visit in 2019 at Gihembe Refugee Camp/*.{JPG,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const graduationModules = import.meta.glob(
  '../assets/events/Past Event -Gallely _ Refugee student graduation November 2021 at Latayole-Kigali Rwanda/*.{jpeg,jpg,JPG}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const vocGradModules = import.meta.glob(
  '../assets/events/Past Event Refugee Youth Vocational Training Graduation La Tayole November 2021-Kigali Rwanda/*.{jpg,JPG,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const vocPicsModules = import.meta.glob(
  '../assets/events/pictures vocationaltraining (1)/*.{jpg,JPG,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const rwandaModules = import.meta.glob(
  '../assets/events/rwandaconvention July 2025 (1)/*.{jpg,JPG,jpeg}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  date: string;
}

function buildImages(): GalleryImage[] {
  const result: GalleryImage[] = [];
  let id = 1;

  for (const src of Object.values(gihembeModules).sort()) {
    result.push({ id: id++, src, title: "Parent Engagement Visit – Gihembe", category: "Community Events", location: "Gihembe Refugee Camp, Rwanda", date: "2019" });
  }
  for (const src of Object.values(graduationModules).sort()) {
    result.push({ id: id++, src, title: "Refugee Student Graduation Ceremony", category: "Education", location: "Latayole, Kigali, Rwanda", date: "November 2021" });
  }
  for (const src of [...Object.values(vocGradModules), ...Object.values(vocPicsModules)].sort()) {
    result.push({ id: id++, src, title: "Vocational Training Graduation", category: "Training", location: "La Tayole, Kigali, Rwanda", date: "November 2021" });
  }
  for (const src of Object.values(rwandaModules).sort()) {
    result.push({ id: id++, src, title: "Rwanda National Convention", category: "Conferences", location: "Kigali, Rwanda", date: "July 2025" });
  }

  return result;
}

function Gallery() {
  const images = useMemo(() => buildImages(), []);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(images.map(img => img.category))];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    setSelectedImage(filteredImages[(currentIndex + 1) % filteredImages.length]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    setSelectedImage(filteredImages[(currentIndex - 1 + filteredImages.length) % filteredImages.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header
        title="Photo Gallery"
        linkTitle="Gallery"
        linkHref="/gallery"
        backgroundImage={image}
      />

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredImages.length}</span> {filteredImages.length === 1 ? 'image' : 'images'}
          </div>
        </div>
      </div>

      {/* Masonry Gallery Grid */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid mb-6 group cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-blue-100">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {image.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {image.date}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-3 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-6xl w-full mx-auto">
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[100vh] object-contain rounded-lg shadow-2xl"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
                <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2 text-white">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <div className="flex items-center gap-6 text-sm text-blue-100">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedImage.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedImage.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
            {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
