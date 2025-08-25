'use client'

import { NavBar } from '@/components/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { DemoGeneratorSection } from '@/components/sections/DemoGeneratorSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { UseCasesSection } from '@/components/sections/UseCasesSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <DemoGeneratorSection />
      <HowItWorksSection />
      <UseCasesSection />
      <FAQSection />
      <Footer />
    </main>
  )
}