"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import { galleryImages } from "@/constants/gallery";
import { throttle } from "@/utils/throttle";

const Gallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("gallery");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Create masonry-style layout with varied heights (more consistent)
  const getImageHeight = (index: number) => {
    const heights = [
      "h-[350px] md:h-[400px] lg:h-[450px]",
      "h-[380px] md:h-[420px] lg:h-[480px]",
      "h-[340px] md:h-[380px] lg:h-[420px]",
      "h-[360px] md:h-[410px] lg:h-[460px]",
      "h-[370px] md:h-[400px] lg:h-[440px]",
      "h-[350px] md:h-[390px] lg:h-[450px]",
      "h-[380px] md:h-[420px] lg:h-[470px]",
      "h-[340px] md:h-[380px] lg:h-[430px]",
      "h-[360px] md:h-[400px] lg:h-[450px]",
      "h-[370px] md:h-[410px] lg:h-[460px]",
      "h-[350px] md:h-[390px] lg:h-[440px]",
      "h-[380px] md:h-[420px] lg:h-[480px]",
    ];
    return heights[index % heights.length];
  };

  const encodeImageSrc = (src: string) => {
    if (src.includes('#')) {
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      const encodedFilename = encodeURIComponent(filename);
      return parts.slice(0, -1).join('/') + '/' + encodedFilename;
    }
    return src;
  };

  return (
    <>
      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-rhea-purple/20 hover:bg-rhea-purple/40 border border-rhea-purple/50 flex items-center justify-center text-rhea-purple transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={encodeImageSrc(galleryImages[selectedImage].src)}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Navigation */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : (prev || 0) - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-rhea-purple/20 hover:bg-rhea-purple/40 border border-rhea-purple/50 flex items-center justify-center text-rhea-purple transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => ((prev || 0) + 1) % galleryImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-rhea-purple/20 hover:bg-rhea-purple/40 border border-rhea-purple/50 flex items-center justify-center text-rhea-purple transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-rhea-bg/80 backdrop-blur-md border border-rhea-border rounded-xl px-6 py-4">
              <h3 className="text-xl font-bold text-rhea-text mb-1">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-sm text-rhea-muted">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <section
        id="gallery"
        ref={sectionRef}
        className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg2 via-rhea-bg to-rhea-bg2 relative overflow-hidden"
      >
      {/* Dynamic Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(122,0,255,0.15), transparent 70%)`,
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(122,0,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(228,0,255,0.1),transparent_50%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-rhea-purple/30 rounded-full animate-float"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${10 + (i % 4) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(122,0,255,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(122,0,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
            VISUAL COLLECTION
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple">
              Gallery
            </span>
          </h2>
          <p className="text-lg text-rhea-muted max-w-2xl mx-auto">
            Capturing the intensity, dominance, and championship moments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
        </div>
        
        {/* Enhanced Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {galleryImages.map((image, index) => {
            const delay = index * 0.1;
            
            return (
              <div
                key={image.id}
                className="group relative cursor-pointer"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${delay}s both` : "none",
                }}
                onMouseEnter={() => setHoveredId(image.id)}
                onClick={() => setSelectedImage(index)}
                onMouseMove={throttle((e: React.MouseEvent<HTMLDivElement>) => {
                  const card = e.currentTarget.querySelector('.card-container') as HTMLElement;
                  if (card) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                  }
                }, 16)} // ~60fps
                onMouseLeave={(e) => {
                  setHoveredId(null);
                  const card = e.currentTarget.querySelector('.card-container') as HTMLElement;
                  if (card) {
                    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
                  }
                }}
              >
                <div className={`card-container relative rounded-xl overflow-hidden border-2 border-rhea-border bg-rhea-bg2 hover:border-rhea-purple transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-rhea-purple/30 transform-gpu w-full ${getImageHeight(index)}`}>
                  {/* Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={encodeImageSrc(image.src)}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      quality={90}
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg/90 via-rhea-bg/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 via-transparent to-rhea-purple/20 group-hover:to-rhea-magenta/30 transition-all duration-700" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div
                        className={`transform transition-all duration-500 ${
                          hoveredId === image.id
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-rhea-purple/40 backdrop-blur-md border border-rhea-purple/60 rounded-full text-rhea-purple text-xs font-bold uppercase tracking-wider">
                            {image.title}
                          </span>
                        </div>
                        <p className="text-rhea-text font-semibold text-sm md:text-base">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Hover Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rhea-purple/40 to-rhea-magenta/40 backdrop-blur-md border-2 border-rhea-purple/60 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-6 h-6 text-rhea-text"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Click to View Badge */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <span className="inline-block px-3 py-1.5 bg-rhea-bg/80 backdrop-blur-md border border-rhea-purple/50 rounded-full text-rhea-purple text-xs font-bold uppercase tracking-wider">
                      Click to View
                    </span>
                  </div>

                  {/* Enhanced Multi-layer Glow Effects */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-rhea-purple/30 via-rhea-magenta/30 to-rhea-purple/30 rounded-xl opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 -z-20" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-rhea-purple/20 to-transparent rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-rhea-magenta/20 to-transparent rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-rhea-bg/50 backdrop-blur-sm border border-rhea-border rounded-full">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-rhea-purple mb-1">
                {galleryImages.length}
              </div>
              <div className="text-xs text-rhea-muted uppercase tracking-wider">
                Images
              </div>
            </div>
            <div className="w-px h-12 bg-rhea-border" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-rhea-magenta mb-1">
                100%
              </div>
              <div className="text-xs text-rhea-muted uppercase tracking-wider">
                Intensity
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      </section>
    </>
  );
};

export default Gallery;


