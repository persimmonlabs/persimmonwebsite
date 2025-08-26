'use client'

import { NavBar } from '@/components/NavBar'
import { HeroSection } from '@/components/sections/HeroSectionV2'
import { DemoGeneratorSection } from '@/components/sections/DemoGeneratorSectionV2'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <HeroSection />
      <DemoGeneratorSection />
      <SocialProofSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}