import React, { useState } from 'react';

function Gallery() {
  const [images] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      title: "Water Filtration Workshop",
      category: "Workshops",
      location: "New York, US",
      date: "June 2025"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=900&fit=crop",
      title: "Community Health Meeting",
      category: "Community Events",
      location: "Kigali, Rwanda",
      date: "May 2025"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      title: "Engineers Summit",
      category: "Conferences",
      location: "Richardson, Texas",
      date: "December 2024"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&h=700&fit=crop",
      title: "Sanitation Training",
      category: "Training Programs",
      location: "Eastern Province, Rwanda",
      date: "November 2024"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop",
      title: "Water Quality Testing",
      category: "Field Work",
      location: "East Africa",
      date: "October 2024"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=800&fit=crop",
      title: "Youth STEM Fair",
      category: "Educational Events",
      location: "Houston, Texas",
      date: "September 2024"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=550&fit=crop",
      title: "Disaster Response Workshop",
      category: "Workshops",
      location: "Virtual Event",
      date: "August 2024"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=750&fit=crop",
      title: "Partnership Forum",
      category: "Community Events",
      location: "Kigali, Rwanda",
      date: "July 2024"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
      title: "Filtration Technology Demo",
      category: "Demonstrations",
      location: "Dallas, Texas",
      date: "June 2024"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=900&fit=crop",
      title: "Clean Water Initiative",
      category: "Field Work",
      location: "Rural Communities",
      date: "May 2024"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=650&fit=crop",
      title: "Healthcare Infrastructure",
      category: "Projects",
      location: "Multiple Locations",
      date: "April 2024"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=550&fit=crop",
      title: "Team Collaboration",
      category: "Workshops",
      location: "Kigali, Rwanda",
      date: "March 2024"
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=850&fit=crop",
      title: "Water Safety Education",
      category: "Educational Events",
      location: "New York, US",
      date: "February 2024"
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      title: "Engineering Volunteers",
      category: "Community Events",
      location: "Various Locations",
      date: "January 2024"
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=700&fit=crop",
      title: "Strategy Planning Session",
      category: "Conferences",
      location: "Dallas, Texas",
      date: "December 2023"
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(images.map(img => img.category))];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w78xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Photo Gallery</h1>
       
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
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
                
                {/* Overlay on Hover */}
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
                  
                  {/* Click to View Icon */}
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
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-3 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 bg-white/10 backdrop-blur-sm text-white rounded-full p-4 hover:bg-white/20 transition-all z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="max-w-6xl w-full mx-auto">
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[100vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image Info Overlay */}
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

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
            {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;