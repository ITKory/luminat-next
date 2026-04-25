"use client"

import { useState } from "react"
import { Header } from "@/widgets/layout/header"
import { Footer } from "@/widgets/layout/footer"
import { CartModal } from "@/widgets/cart/cart-modal"
import { HeroSection } from "@/widgets/home/hero-section"
import { AboutSection } from "@/widgets/home/about-section"
import { CollectionsSection } from "@/widgets/home/collections-section"
import { ProjectsSection } from "@/widgets/home/projects-section"
import { ProcessSection } from "@/widgets/home/process-section"
import { CooperationSection } from "@/widgets/home/cooperation-section"
import { FAQSection } from "@/widgets/home/faq-section"
import { ContactSection } from "@/widgets/home/contact-section"
import { SmoothSectionScroll } from "@/widgets/home/smooth-section-scroll";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <main className="bg-bwhite">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <SmoothSectionScroll>
        <HeroSection />
        <AboutSection />
        <CollectionsSection />
        <ProjectsSection />
        <ProcessSection />
        <CooperationSection />
        <FAQSection />
        <ContactSection />

        <section className="footer" id="footer-section" data-snap-section="true">
          <Footer />
        </section>
      </SmoothSectionScroll>
    </main>
  )
}
