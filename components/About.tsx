"use client";

import React, { useState, useEffect } from "react";

const About: React.FC = () => {
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

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "The Mami",
      description: "Dominant persona and leadership within The Judgment Day",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Championship Legacy",
      description: "Championships captured at every level of WWE",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Unmatched Intensity",
      description: "Aggressive in-ring style and unwavering determination",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(122,0,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(228,0,255,0.1),transparent_50%)]" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(122,0,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(122,0,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
            THE LEGEND
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple to-rhea-magenta">Rhea Ripley</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column - Main Story */}
          <div className="space-y-6">
            <div
              className="space-y-6"
              style={{
                animation: isVisible ? `fadeInLeft 0.8s ease-out both` : "none",
              }}
            >
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-rhea-purple to-rhea-magenta rounded-full" />
                <p className="text-lg md:text-xl text-rhea-muted leading-relaxed pl-6">
                  Rhea Ripley is one of the most <span className="text-rhea-purple font-bold">dominant and feared competitors</span> in WWE history. 
                  Known for her aggressive in-ring style, imposing presence, and unwavering determination, 
                  she has established herself as a force to be reckoned with in the women's division.
                </p>
              </div>
              
              <p className="text-lg md:text-xl text-rhea-muted leading-relaxed">
                As a key member of <span className="text-rhea-magenta font-bold">The Judgment Day</span>, Ripley has showcased her championship pedigree 
                by capturing multiple titles including the WWE Women's World Championship, Raw Women's 
                Championship, and Women's Tag Team Championship. Her victory in the 2023 Royal Rumble 
                and subsequent main event at WrestleMania 39 solidified her status as a top-tier superstar.
              </p>
              
              <p className="text-lg md:text-xl text-rhea-muted leading-relaxed">
                With her signature moves, commanding presence, and relentless pursuit of excellence, 
                Rhea Ripley continues to <span className="text-rhea-purple font-bold">redefine what it means to be a champion</span> in WWE.
              </p>
            </div>
          </div>
          
          {/* Right Column - Feature Cards */}
          <div className="space-y-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative bg-rhea-bg/50 backdrop-blur-sm border border-rhea-border rounded-xl p-6 md:p-8 hover:border-rhea-purple hover:bg-rhea-bg transition-all duration-500 hover:shadow-xl hover:shadow-rhea-purple/20 transform hover:-translate-y-1"
                style={{
                  animation: isVisible ? `fadeInRight 0.8s ease-out ${index * 0.2}s both` : "none",
                }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-rhea-purple/20 to-rhea-magenta/20 border border-rhea-purple/30 flex items-center justify-center text-rhea-purple group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-rhea-purple/30 group-hover:to-rhea-magenta/30 transition-all duration-300">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-rhea-text mb-3 group-hover:text-rhea-purple transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    <p className="text-rhea-muted leading-relaxed text-base md:text-lg">
                      {highlight.description}
                    </p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple/0 via-rhea-purple/20 to-rhea-purple/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          style={{
            animation: isVisible ? `fadeInUp 0.8s ease-out 0.6s both` : "none",
          }}
        >
          {[
            { label: "Championships", value: "6", colorClass: "text-rhea-purple" },
            { label: "Years Active", value: "6+", colorClass: "text-rhea-magenta" },
            { label: "Brands", value: "4", colorClass: "text-rhea-gold" },
            { label: "Intensity", value: "100%", colorClass: "text-rhea-purple" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-rhea-bg/30 backdrop-blur-sm border border-rhea-border rounded-xl hover:border-rhea-purple transition-all duration-300 group"
            >
              <div className={`text-3xl md:text-4xl font-black mb-2 ${stat.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-rhea-muted uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
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
      `}</style>
    </section>
  );
};

export default About;



