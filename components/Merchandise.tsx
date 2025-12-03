"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { throttle } from "@/utils/throttle";

const Merchandise: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("merchandise");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    }, 100); // Throttle to 100ms

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="merchandise"
      className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,0,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(228,0,255,0.1),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}% ${mousePosition.y}%, rgba(122,0,255,0.1), transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
          }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rhea-purple/20 to-rhea-magenta/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-bold mb-4 backdrop-blur-sm">
            OFFICIAL MERCHANDISE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple animate-gradient" style={{ backgroundSize: "200% 200%" }}>Merchandise</span> & Store
          </h2>
          <p className="text-lg md:text-xl text-rhea-muted max-w-2xl mx-auto leading-relaxed">
            Get official Rhea Ripley merchandise and show your support for The Mami
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto mt-4" />
        </div>

        {/* Two Column Layout: Image and Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{
            animation: isVisible ? `fadeInUp 0.8s ease-out 0.2s both` : "none",
          }}
        >
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div
              className="group relative rounded-2xl overflow-hidden border-2 border-rhea-border hover:border-rhea-purple transition-all duration-500 shadow-2xl hover:shadow-[0_0_60px_rgba(122,0,255,0.4)]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-full overflow-hidden">
              <Image
                src="/images/merchent.jpg"
                alt="Rhea Ripley Official Merchandise"
                width={1200}
                height={800}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
                
                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-rhea-bg/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Multi-layer Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-rhea-purple/30 backdrop-blur-sm border border-rhea-purple/50 rounded-lg text-rhea-purple text-xs md:text-sm font-bold uppercase mb-4">
                Exclusive Collection
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-rhea-text mb-4 leading-tight">
              Official Rhea Ripley Merchandise
            </h3>
            
            <p className="text-lg md:text-xl text-rhea-muted mb-6 leading-relaxed">
              Show your support with official Mami merchandise. Get exclusive T-shirts, apparel, and more from the WWE Shop.
            </p>
            
            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-rhea-text">
                <svg className="w-5 h-5 text-rhea-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-base font-semibold">Official WWE Licensed</span>
              </div>
              <div className="flex items-center gap-3 text-rhea-text">
                <svg className="w-5 h-5 text-rhea-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-base font-semibold">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3 text-rhea-text">
                <svg className="w-5 h-5 text-rhea-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-base font-semibold">Worldwide Shipping</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="https://shop.wwe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-rhea-purple to-rhea-magenta hover:from-rhea-purple-dark hover:to-rhea-magenta/80 text-rhea-text font-bold text-lg md:text-xl rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-rhea-purple/50 overflow-hidden"
              >
                {/* Button Background Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Shop at WWE Store</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {/* Button Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300 -z-10" />
              </a>
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

export default memo(Merchandise);

