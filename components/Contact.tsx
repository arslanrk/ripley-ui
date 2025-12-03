"use client";

import React, { useState, useEffect } from "react";

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = React.useRef<HTMLElement>(null);

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

    const section = document.getElementById("contact");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

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

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/RheaRipley_WWE",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/rhearipley_wwe/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "hover:text-[#E4405F]",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@rhearipley_wwe",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: "hover:text-[#000000]",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@WWE",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: "hover:text-[#FF0000]",
    },
  ];

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "booking@rhearipley.com",
      link: "mailto:booking@rhearipley.com",
      color: "text-rhea-purple",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "Contact via Email",
      link: "mailto:booking@rhearipley.com",
      color: "text-rhea-magenta",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      value: "WWE Universe",
      link: "#",
      color: "text-rhea-gold",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-rhea-bg via-rhea-bg2 to-rhea-bg relative overflow-hidden"
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(122,0,255,0.15), transparent 70%)`,
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(122,0,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(228,0,255,0.1),transparent_50%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-rhea-purple/30 rounded-full animate-float"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-16"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out both` : "none",
            }}
          >
            <span className="inline-block px-4 py-2 bg-rhea-purple/20 border border-rhea-purple/50 rounded-full text-rhea-purple text-sm md:text-base font-semibold mb-4">
              CONNECT
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-rhea-text mb-4">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple animate-gradient">Touch</span>
            </h2>
            <p className="text-lg text-rhea-muted max-w-2xl mx-auto mb-4">
              For booking inquiries, appearances, and media requests, please contact us.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rhea-purple to-transparent mx-auto" />
          </div>

          {/* Contact Methods Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out 0.2s both` : "none",
            }}
          >
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group relative bg-rhea-bg2/50 backdrop-blur-sm border border-rhea-border rounded-xl p-6 hover:border-rhea-purple transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-rhea-purple/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-rhea-purple/20 to-rhea-magenta/20 border border-rhea-purple/30 flex items-center justify-center ${method.color} group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-rhea-purple/30 group-hover:to-rhea-magenta/30 transition-all duration-300`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rhea-text mb-1">{method.title}</h3>
                    <p className="text-sm text-rhea-muted">{method.value}</p>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
              </a>
            ))}
          </div>

          {/* Main Contact Card */}
          <div
            className="bg-rhea-bg2/50 backdrop-blur-sm border-2 border-rhea-border rounded-2xl p-8 md:p-12 hover:border-rhea-purple transition-all duration-500 group mb-12 relative overflow-hidden"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out 0.4s both` : "none",
            }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/5 via-transparent to-rhea-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 space-y-6 text-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-rhea-text mb-4">
                  Booking & <span className="text-rhea-purple">Inquiries</span>
                </h3>
                <p className="text-rhea-muted mb-8 text-lg">
                  Ready to bring the intensity? Let's make it happen.
                </p>
              </div>
              
              <a
                href="mailto:booking@rhearipley.com"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rhea-purple to-rhea-magenta hover:from-rhea-purple-dark hover:to-rhea-magenta/80 text-rhea-text font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-rhea-purple/50 group"
              >
                <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div
            className="text-center"
            style={{
              animation: isVisible ? `fadeInUp 0.8s ease-out 0.6s both` : "none",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-black text-rhea-text mb-3">
              Follow <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhea-purple to-rhea-magenta">Rhea Ripley</span>
            </h3>
            <p className="text-rhea-muted mb-8 text-lg">
              Stay connected and follow the journey
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center w-16 h-16 md:w-18 md:h-18 rounded-xl bg-rhea-bg2 border-2 border-rhea-border hover:border-rhea-purple text-rhea-muted ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-rhea-purple/40`}
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s both` : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rhea-purple/0 to-rhea-magenta/0 group-hover:from-rhea-purple/30 group-hover:to-rhea-magenta/30 rounded-xl transition-all duration-300" />
                  <div className="relative z-10 transform group-hover:rotate-6 transition-transform duration-300">
                    {social.icon}
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-rhea-bg/95 backdrop-blur-md border border-rhea-purple/50 rounded-lg text-xs font-bold text-rhea-text opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    {social.name}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-rhea-bg border-l border-t border-rhea-purple/50 rotate-45" />
                  </span>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-rhea-purple via-rhea-magenta to-rhea-purple rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10" />
                </a>
              ))}
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
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;



