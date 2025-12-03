"use client";

import Image from "next/image";
import { useEffect, useState, memo } from "react";
import { throttle } from "@/utils/throttle";

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    }, 50); // Throttle to 50ms (20fps)

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/rhea-ripley-wallpaper-4k.jpg"
          alt="Rhea Ripley - WWE Superstar"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Enhanced overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-rhea-bg via-rhea-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rhea-bg via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/20 via-transparent to-transparent" />
        
        {/* Dynamic spotlight effect */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(122,0,255,0.2), transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Subtitle */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold backdrop-blur-sm">
                WWE SUPERSTAR
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-rhea-text mb-6 leading-none tracking-tight">
              <span className="block animate-fadeInUp">RHEA</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple animate-gradient" style={{ animationDelay: "0.2s" }}>
                RIPLEY
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-rhea-text font-bold mb-4">
              The Mami
            </p>
            <p className="text-lg md:text-xl text-rhea-muted mb-8 max-w-2xl">
              Dominating the WWE Universe with unmatched intensity and championship excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rhea-purple to-rhea-magenta hover:from-rhea-purple-dark hover:to-rhea-magenta/80 text-rhea-text font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-rhea-purple/50 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rhea-magenta to-rhea-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#about"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-rhea-purple hover:border-rhea-magenta hover:bg-rhea-purple/10 text-rhea-text font-bold text-lg rounded-xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rhea-purple/0 to-rhea-magenta/0 group-hover:from-rhea-purple/10 group-hover:to-rhea-magenta/10 transition-all duration-300" />
                <span className="relative z-10">Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#about" className="group flex flex-col items-center gap-2">
          <span className="text-xs text-rhea-purple font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll
          </span>
          <div className="w-10 h-16 rounded-full border-2 border-rhea-purple/50 flex items-start justify-center p-2 group-hover:border-rhea-purple transition-colors duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-rhea-purple animate-bounce" style={{ animationDuration: "1.5s" }} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default memo(Hero);

