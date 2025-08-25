'use client'

import { NavBar } from '@/components/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { DemoGeneratorSection } from '@/components/sections/DemoGeneratorSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavBar />
      <HeroSection />
      <SolutionSection />
      <DemoGeneratorSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </main>
  )
}