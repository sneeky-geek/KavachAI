import HeroSection from "@/components/landing/HeroSection";
import Features from "@/components/landing/Features";
import Quote from "@/components/landing/Quote";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <Quote />
    </div>
  );
}
