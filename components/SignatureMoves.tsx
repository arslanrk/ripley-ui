"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signatureMoves } from "@/constants/signatureMoves";

const SignatureMoves: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

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

    const section = document.getElementById("signature-moves");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <>
      {/* Video Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative max-w-5xl w-full aspect-video">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-12 right-0 z-10 w-12 h-12 rounded-full bg-rhea-purple/20 hover:bg-rhea-purple/40 border border-rhea-purple/50 flex items-center justify-center text-rhea-purple transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={signatureMoves.find(m => m.id === playingVideo)?.videoUrl + "?autoplay=1"}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <section
        id="signature-moves"
        className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg2 via-rhea-bg to-rhea-bg2 relative overflow-hidden"
      >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,0,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
          }}
        >
          <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
            SIGNATURE STYLE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple to-rhea-magenta">
              Signature Moves
            </span>
          </h2>
          <p className="text-lg text-rhea-muted max-w-2xl mx-auto">
            Devastating finishers and signature maneuvers that define her dominance
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
        </div>

        {/* Moves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {signatureMoves.map((move, index) => (
            <div
              key={move.id}
              className="group relative"
              style={{
                animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.15}s both` : "none",
              }}
              onMouseEnter={() => setSelectedMove(move.id)}
              onMouseLeave={() => setSelectedMove(null)}
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-rhea-border bg-rhea-bg2 hover:border-rhea-purple transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-rhea-purple/30 h-[400px] md:h-[450px]">
                {/* Image */}
                <div className="relative h-2/3 w-full cursor-pointer" onClick={() => move.videoUrl && setPlayingVideo(move.id)}>
                  <Image
                    src={move.imageUrl}
                    alt={move.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-rhea-bg/50 to-transparent" />
                  
                  {/* Play Button (if video exists) */}
                  {move.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-rhea-purple/80 backdrop-blur-sm border-2 border-rhea-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-rhea-purple transition-all duration-300">
                        <svg className="w-8 h-8 text-rhea-text ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                      move.type === "Finisher" 
                        ? "bg-rhea-red/80 text-rhea-text border border-rhea-red" 
                        : "bg-rhea-purple/80 text-rhea-text border border-rhea-purple"
                    }`}>
                      {move.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-rhea-bg via-rhea-bg/95 to-transparent">
                  <h3 className="text-2xl md:text-3xl font-black text-rhea-text mb-2">
                    {move.name}
                  </h3>
                  <p className="text-rhea-muted leading-relaxed">
                    {move.description}
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
              </div>
            </div>
          ))}
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

export default SignatureMoves;

