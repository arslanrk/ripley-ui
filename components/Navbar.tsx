"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#video-highlights", label: "Videos" },
  { href: "#gallery", label: "Gallery" },
  { href: "#merchandise", label: "Store" },
  { href: "#contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-rhea-bg/98 backdrop-blur-xl border-b border-rhea-border shadow-lg shadow-rhea-purple/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="#home"
            className="text-xl md:text-2xl font-black text-rhea-text hover:text-rhea-purple transition-all duration-300 transform hover:scale-105 relative group"
          >
            <span className="relative z-10">Rhea Ripley</span>
            <span className="absolute inset-0 bg-gradient-to-r from-rhea-purple to-rhea-magenta opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 group ${
                      isActive
                        ? "text-rhea-purple"
                        : "text-rhea-text hover:text-rhea-purple"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rhea-purple to-rhea-magenta transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute inset-0 bg-rhea-purple/10 rounded-lg -z-10" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-rhea-text hover:text-rhea-purple transition-colors duration-300 relative w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-rhea-text hover:text-rhea-purple hover:bg-rhea-purple/10 rounded-lg transition-all duration-300 font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



