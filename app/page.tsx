'use client'

import { NavBar } from '@/components/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { UseCasesSection } from '@/components/sections/UseCasesSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <ProblemSolutionSection />
      <ServicesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}