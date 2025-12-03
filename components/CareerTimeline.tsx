"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { timelineEvents } from "@/constants/timeline";

const CareerTimeline: React.FC = () => {
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

    const section = document.getElementById("career-timeline");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Championship":
        return "bg-rhea-gold/20 border-rhea-gold text-rhea-gold";
      case "Debut":
        return "bg-rhea-purple/20 border-rhea-purple text-rhea-purple";
      case "Milestone":
        return "bg-rhea-magenta/20 border-rhea-magenta text-rhea-magenta";
      default:
        return "bg-rhea-purple/20 border-rhea-purple text-rhea-purple";
    }
  };

  return (
    <section
      id="career-timeline"
      className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(122,0,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(228,0,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
          }}
        >
          <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
            CAREER JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple to-rhea-magenta">Timeline</span>
          </h2>
          <p className="text-lg text-rhea-muted max-w-2xl mx-auto">
            A journey of dominance from NXT UK to the main roster
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rhea-purple via-rhea-magenta to-rhea-purple transform md:-translate-x-1/2" />

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                const delay = index * 0.1;

                return (
                  <div
                    key={event.id}
                    className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                    style={{
                      animation: isVisible ? `fadeInUp 0.8s ease-out ${delay}s both` : "none",
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-rhea-purple border-4 border-rhea-bg transform md:-translate-x-1/2 z-10 shadow-lg" />

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                      <div className="bg-rhea-bg2/50 backdrop-blur-sm border border-rhea-border rounded-xl p-6 hover:border-rhea-purple transition-all duration-300 group hover:shadow-xl hover:shadow-rhea-purple/20">
                        <div className="flex items-start gap-4">
                          {event.imageUrl && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="80px"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="mb-2">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${getTypeColor(event.type)}`}>
                                {event.type}
                              </span>
                            </div>
                            <div className="text-rhea-purple font-bold text-lg mb-1">{event.year}</div>
                            <h3 className="text-xl md:text-2xl font-black text-rhea-text mb-2">
                              {event.title}
                            </h3>
                            <p className="text-rhea-muted leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      `}</style>
    </section>
  );
};

export default CareerTimeline;

