import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Featured = dynamic(() => import("@/components/Featured"), { ssr: true });
const Achievements = dynamic(() => import("@/components/Achievements"), { ssr: true });
const VideoHighlights = dynamic(() => import("@/components/VideoHighlights"), { ssr: true });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: true });
const Merchandise = dynamic(() => import("@/components/Merchandise"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-rhea-bg">
      <Navbar />
      <Hero />
      <About />
      <Featured />
      <Achievements />
      <VideoHighlights />
      <Gallery />
      <Merchandise />
      <Contact />
      <Footer />
    </main>
  );
}
