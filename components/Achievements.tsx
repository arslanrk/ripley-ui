"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { achievements } from "@/constants/achievements";
import { throttle } from "@/utils/throttle";

const Achievements: React.FC = () => {
  const championships = achievements.filter((achievement) => achievement.image);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countedStats, setCountedStats] = useState({ championships: 0, years: 0, intensity: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking for spotlight effect
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

  // Intersection Observer for animations
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

    const section = document.getElementById("achievements");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Count-up animation for stats
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCountedStats({
        championships: Math.floor(championships.length * progress),
        years: Math.floor(6 * progress),
        intensity: Math.floor(100 * progress),
      });

      if (currentStep >= steps) {
        setCountedStats({
          championships: championships.length,
          years: 6,
          intensity: 100,
        });
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, championships.length]);

  // Sort by year (newest first)
  const sortedChampionships = [...championships].sort((a, b) => {
    const yearA = parseInt(a.year || "0");
    const yearB = parseInt(b.year || "0");
    return yearB - yearA;
  });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden"
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(122,0,255,0.15), transparent 70%)`,
        }}
      />

      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(122,0,255,0.15),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(228,0,255,0.15),transparent_50%)] animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Morphing Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-rhea-purple/5 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rhea-magenta/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rhea-purple/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "4s" }} />
      </div>
      
      {/* Enhanced Floating particles with trails */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-rhea-purple/40 rounded-full animate-float"
            style={{
              left: `${10 + (i * 7.5)}%`,
              top: `${5 + (i % 4) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
              boxShadow: "0 0 10px rgba(122,0,255,0.5)",
            }}
          />
        ))}
      </div>

      {/* Light Rays Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-rhea-purple to-transparent transform rotate-12 animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-rhea-magenta to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Stats */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4 animate-fade-in">
            CHAMPIONSHIP LEGACY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple animate-gradient">
              Achievements
            </span>{" "}
            & Championships
          </h2>
          <p className="text-lg text-rhea-muted max-w-2xl mx-auto mb-8">
            A legacy of dominance across every brand in WWE
          </p>
          
          {/* Enhanced Stats Counter with Count-up Animation */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-4xl md:text-5xl font-black text-rhea-purple mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {countedStats.championships}
                </div>
                <div className="absolute -inset-2 bg-rhea-purple/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-sm md:text-base text-rhea-muted uppercase tracking-wider font-semibold">
                Championships
              </div>
              <div className="mt-2 w-16 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-4xl md:text-5xl font-black text-rhea-magenta mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {countedStats.years}+
                </div>
                <div className="absolute -inset-2 bg-rhea-magenta/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-sm md:text-base text-rhea-muted uppercase tracking-wider font-semibold">
                Years Dominating
              </div>
              <div className="mt-2 w-16 h-1 bg-gradient-to-r from-transparent via-rhea-magenta to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-4xl md:text-5xl font-black text-rhea-gold mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {countedStats.intensity}%
                </div>
                <div className="absolute -inset-2 bg-rhea-gold/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-sm md:text-base text-rhea-muted uppercase tracking-wider font-semibold">
                Intensity
              </div>
              <div className="mt-2 w-16 h-1 bg-gradient-to-r from-transparent via-rhea-gold to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Enhanced Timeline Indicator with Progress */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="relative">
            {/* Animated Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-rhea-purple/30 to-transparent transform -translate-y-1/2 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple transition-all duration-1000"
                style={{
                  width: isVisible ? "100%" : "0%",
                }}
              />
            </div>
            
            {/* Timeline Points */}
            <div className="flex justify-between items-center relative">
              {sortedChampionships.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center group cursor-pointer"
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : "none",
                  }}
                >
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-rhea-purple border-2 border-rhea-bg shadow-lg transform group-hover:scale-150 transition-all duration-300 group-hover:bg-rhea-magenta" />
                    <div className="absolute inset-0 rounded-full bg-rhea-purple/50 animate-ping opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-xs text-rhea-muted mt-2 font-semibold hidden md:block group-hover:text-rhea-purple transition-colors duration-300">
                    {achievement.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Creative Grid Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sortedChampionships.map((achievement, index) => {
              const delay = index * 0.1;
              
              return (
                <div
                  key={achievement.id}
                  className="group relative"
                  style={{
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${delay}s both` : "none",
                  }}
                  onMouseMove={throttle((e: React.MouseEvent<HTMLDivElement>) => {
                    const card = e.currentTarget.querySelector('.card-container') as HTMLElement;
                    if (card) {
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 15;
                      const rotateY = (centerX - x) / 15;
                      
                      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    }
                  }, 16)} // ~60fps
                  onMouseLeave={(e) => {
                    const card = e.currentTarget.querySelector('.card-container') as HTMLElement;
                    if (card) {
                      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
                    }
                  }}
                >
                  <div className="card-container relative rounded-2xl overflow-hidden border-2 border-rhea-border bg-rhea-bg2 hover:border-rhea-purple transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-rhea-purple/30 transform-gpu h-[450px] md:h-[500px] lg:h-[550px]">
                    {/* Image Container */}
                    <div className="relative h-full w-full">
                      <Image
                        src={achievement.image!}
                        alt={achievement.alt || achievement.title}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                        priority={index < 3}
                      />
                      
                      {/* Dynamic Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-rhea-bg/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 via-transparent to-rhea-purple/30 group-hover:to-rhea-magenta/40 transition-all duration-700" />
                      
                      {/* Animated border glow with pulse */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-rhea-purple/50 rounded-2xl transition-all duration-500" />
                      
                      {/* Energy Pulse Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-rhea-purple/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:w-full group-hover:h-full group-hover:animate-pulse" />
                      </div>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Content Overlay with Reveal Animation */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-0 group-hover:translate-y-0 transition-all duration-500">
                      <div className="mb-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-rhea-purple/40 backdrop-blur-md border border-rhea-purple/60 rounded-full text-rhea-purple text-xs font-bold uppercase tracking-wider shadow-lg">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {achievement.year}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-rhea-text mb-2 leading-tight transform group-hover:translate-x-2 transition-transform duration-500">
                        {achievement.title}
                      </h3>
                      
                      {/* Hidden description on hover */}
                      <p className="text-rhea-muted text-sm mt-3 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 delay-200">
                        Championship victory showcasing dominance and excellence
                      </p>
                    </div>

                    {/* Enhanced Animated Trophy Badge with Glow */}
                    <div className="absolute top-6 right-6 transform rotate-0 group-hover:rotate-12 transition-transform duration-500 z-10">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rhea-purple/40 to-rhea-magenta/40 backdrop-blur-md border-2 border-rhea-purple/70 flex items-center justify-center shadow-2xl group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(122,0,255,0.8)] transition-all duration-500">
                          <svg
                            className="w-8 h-8 text-rhea-purple group-hover:text-rhea-magenta transition-colors duration-300 group-hover:animate-bounce"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        {/* Pulsing ring around badge */}
                        <div className="absolute inset-0 rounded-full border-2 border-rhea-purple/50 animate-ping opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Enhanced Multi-layer Glow Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-700 -z-10 animate-pulse" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-rhea-purple/30 via-rhea-magenta/30 to-rhea-purple/30 rounded-2xl opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-700 -z-20" />
                    <div className="absolute -inset-3 bg-gradient-to-r from-rhea-purple/10 via-rhea-magenta/10 to-rhea-purple/10 rounded-2xl opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-700 -z-30" />
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-rhea-purple/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-rhea-magenta/20 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
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
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
            transform: translate(-10px, 10px) scale(0.9);
          }
          75% {
            border-radius: 70% 30% 50% 50% / 30% 50% 50% 70%;
            transform: translate(10px, 20px) scale(1.05);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Achievements;



