import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StylistsPreview } from "@/components/home/StylistsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <StylistsPreview />
      <GalleryPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
