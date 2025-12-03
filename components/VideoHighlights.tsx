"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { videos } from "@/constants/videos";

const VideoHighlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

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

    const section = document.getElementById("video-highlights");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Match":
        return "from-rhea-red/20 to-rhea-red/5 border-rhea-red/50 text-rhea-red";
      case "Promo":
        return "from-rhea-purple/20 to-rhea-purple/5 border-rhea-purple/50 text-rhea-purple";
      case "Entrance":
        return "from-rhea-magenta/20 to-rhea-magenta/5 border-rhea-magenta/50 text-rhea-magenta";
      default:
        return "from-rhea-purple/20 to-rhea-purple/5 border-rhea-purple/50 text-rhea-purple";
    }
  };

  // Keep only first 4 videos
  const displayVideos = videos.slice(0, 4);
  const featuredVideo = displayVideos[0];
  const otherVideos = displayVideos.slice(1);

  return (
    <>
      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 animate-fadeIn"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-6xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-16 right-0 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-rhea-purple to-rhea-magenta hover:from-rhea-purple-dark hover:to-rhea-magenta/80 border-2 border-rhea-purple/50 flex items-center justify-center text-rhea-text transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg shadow-rhea-purple/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-rhea-purple/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube.com/embed/${displayVideos.find(v => v.id === selectedVideo)?.youtubeId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            {displayVideos.find(v => v.id === selectedVideo) && (
              <div className="mt-6 text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-black text-rhea-text mb-2">
                  {displayVideos.find(v => v.id === selectedVideo)?.title}
                </h3>
                <p className="text-rhea-muted">
                  {displayVideos.find(v => v.id === selectedVideo)?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <section
        id="video-highlights"
        className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg2 via-rhea-bg to-rhea-bg2 relative overflow-hidden"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,0,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(228,0,255,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
            }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-rhea-purple/20 to-rhea-magenta/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-bold mb-4 backdrop-blur-sm">
              VIDEO COLLECTION
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple animate-gradient" style={{ backgroundSize: "200% 200%" }}>Highlights</span>
            </h2>
            <p className="text-lg text-rhea-muted max-w-2xl mx-auto">
              Relive the most intense moments and championship victories
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
          </div>

          {/* Video Grid - Improved Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Featured Video - Takes full width on mobile, left side on desktop */}
            {featuredVideo && (
              <div
                className="lg:col-span-1 group relative cursor-pointer"
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out 0.1s both` : "none",
                }}
                onClick={() => setSelectedVideo(featuredVideo.id)}
                onMouseEnter={() => setHoveredVideo(featuredVideo.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-rhea-border hover:border-rhea-purple transition-all duration-500 shadow-2xl hover:shadow-[0_0_60px_rgba(122,0,255,0.4)] h-full min-h-[500px] md:min-h-[600px]">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-rhea-bg/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 via-transparent to-rhea-purple/30 group-hover:to-rhea-magenta/40 transition-all duration-700" />
                  
                  {/* Animated Shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  
                  {/* Large Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-rhea-purple to-rhea-magenta backdrop-blur-md border-4 border-rhea-purple/50 flex items-center justify-center transition-all duration-300 shadow-2xl shadow-rhea-purple/50 ${hoveredVideo === featuredVideo.id ? "scale-125 rotate-12" : "scale-100 rotate-0"}`}>
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-rhea-text ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-lg text-xs font-black uppercase bg-gradient-to-r ${getCategoryColor(featuredVideo.category)} backdrop-blur-sm border shadow-lg`}>
                      {featuredVideo.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-rhea-text mb-3 leading-tight">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-base md:text-lg text-rhea-muted mb-4 leading-relaxed line-clamp-2">
                      {featuredVideo.description}
                    </p>
                    <div className="flex items-center gap-3 text-rhea-purple font-bold text-sm md:text-base">
                      <span>Watch Now</span>
                      <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Multi-layer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 -z-10" />
                </div>
              </div>
            )}

            {/* Other Videos - Right side on desktop, stacked on mobile */}
            <div className="lg:col-span-1 space-y-6">
              {otherVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative cursor-pointer"
                  style={{
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${(index + 2) * 0.1}s both` : "none",
                  }}
                  onClick={() => setSelectedVideo(video.id)}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="relative rounded-xl overflow-hidden border-2 border-rhea-border bg-rhea-bg2/50 hover:border-rhea-purple transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-rhea-purple/30 backdrop-blur-sm transform hover:-translate-y-1 h-full">
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 md:h-56 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-rhea-bg/70 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 via-transparent to-rhea-purple/25 group-hover:to-rhea-magenta/35 transition-all duration-700" />
                      
                      {/* Animated Shimmer */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-rhea-purple to-rhea-magenta backdrop-blur-md border-2 border-rhea-purple/50 flex items-center justify-center transition-all duration-300 shadow-xl shadow-rhea-purple/50 ${hoveredVideo === video.id ? "scale-125 rotate-12" : "scale-100 rotate-0"}`}>
                          <svg className="w-6 h-6 text-rhea-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase bg-gradient-to-r ${getCategoryColor(video.category)} backdrop-blur-sm border shadow-lg`}>
                          {video.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-black text-rhea-text mb-2 group-hover:text-rhea-purple transition-colors duration-300 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-rhea-muted mb-3 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-2 text-rhea-purple font-bold text-xs md:text-sm">
                        <span>Play Video</span>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredVideo === video.id ? "translate-x-2" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>

                    {/* Enhanced Multi-layer Glow Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watch More Button */}
          <div
            className="text-center mt-12 md:mt-16"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out 0.6s both` : "none",
            }}
          >
            <a
              href="https://www.youtube.com/@WWE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rhea-purple to-rhea-magenta hover:from-rhea-purple-dark hover:to-rhea-magenta/80 text-rhea-text font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-rhea-purple/50 group"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch More on WWE YouTube
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
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
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </section>
    </>
  );
};

export default VideoHighlights;

