'use client'

import { NavBar } from '@/components/NavBar'
import { HeroSection } from '@/components/sections/HeroSectionV2'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { N8nDemoGenerator } from '@/components/sections/N8nDemoGenerator'
import { PricingSection } from '@/components/sections/PricingSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <HeroSection />
      <HowItWorksSection />
      <N8nDemoGenerator />
      <PricingSection />
      <SocialProofSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}