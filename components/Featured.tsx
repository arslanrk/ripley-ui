"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Featured: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById("featured");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="featured" className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/10 via-transparent to-rhea-magenta/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,0,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-12"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
            }}
          >
            <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
              FEATURED MATCH
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple">
                WrestleMania 41
              </span>
            </h2>
            <p className="text-xl text-rhea-muted max-w-2xl mx-auto">
              Women's World Championship Match
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
          </div>

          {/* Featured Image Card */}
          <div
            className="relative group"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out 0.2s both` : "none",
            }}
          >
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border-2 border-rhea-border hover:border-rhea-purple transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(122,0,255,0.3)]">
              <Image
                src="/images/wrestlemania-41-iyo-bianca-rhea-wallpaper-4k.jpg"
                alt="WrestleMania 41 Women's World Championship Match featuring Rhea Ripley, Iyo Sky, and Bianca Belair"
                fill
                priority
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                quality={90}
              />
              
              {/* Enhanced Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-rhea-bg/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 via-transparent to-rhea-purple/20 group-hover:to-rhea-magenta/30 transition-all duration-700" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="max-w-3xl">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-rhea-text mb-3 transform group-hover:translate-y-0 transition-transform duration-500">
                    The Grandest Stage of Them All
                  </h3>
                  <p className="text-lg md:text-xl text-rhea-muted mb-4 leading-relaxed">
                    Rhea Ripley faces off against Iyo Sky and Bianca Belair in a historic 
                    Women's World Championship Triple Threat Match at WrestleMania 41.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-rhea-purple/30 backdrop-blur-sm border border-rhea-purple/60 rounded-lg text-rhea-purple font-bold text-sm hover:bg-rhea-purple/40 transition-all duration-300">
                      Championship Match
                    </span>
                    <span className="px-4 py-2 bg-rhea-magenta/30 backdrop-blur-sm border border-rhea-magenta/60 rounded-lg text-rhea-magenta font-bold text-sm hover:bg-rhea-magenta/40 transition-all duration-300">
                      Triple Threat
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Multi-layer Glow effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
            <div className="absolute -inset-2 bg-gradient-to-r from-rhea-purple/20 via-rhea-magenta/20 to-rhea-purple/20 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;


