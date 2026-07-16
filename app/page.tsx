import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Expertise } from "@/components/home/Expertise";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FurnitureFeature } from "@/components/home/FurnitureFeature";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ContactCTA } from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <TrustStrip />
      <Expertise />
      <FeaturedServices />
      <FeaturedProjects />
      <FurnitureFeature />
      <Process />
      <About />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
