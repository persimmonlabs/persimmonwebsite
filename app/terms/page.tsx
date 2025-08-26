import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-persimmon-brown">
      <NavBar />
      
      <section className="section-spacing relative">
        <div className="content-max px-6 sm:px-8 lg:px-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-brand-primary hover:text-brand-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-gray-400 mb-12">Last updated: January 2025</p>
          
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Persimmon Labs&apos; services, you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p>
                  Persimmon Labs provides AI-powered content automation services for social media and 
                  digital marketing. Our services include content generation, scheduling, and multi-platform 
                  publishing. Features and pricing are subject to change with notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                <p className="mb-4">To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update any changes to your information</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
                <p className="mb-4">You agree NOT to use our services to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Distribute malware or harmful code</li>
                  <li>Engage in fraudulent or deceptive practices</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
                <p className="mb-4">For paid services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pricing is as specified at time of purchase</li>
                  <li>Payments are processed securely through third-party providers</li>
                  <li>Subscriptions auto-renew unless cancelled</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>We reserve the right to change prices with 30 days notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                <p className="mb-4">
                  You retain ownership of content you provide. By using our services, you grant us a 
                  license to use, modify, and distribute your content as necessary to provide our services.
                </p>
                <p>
                  Our platform, including all software, designs, and content, is protected by intellectual 
                  property laws and remains the property of Persimmon Labs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
                <p>
                  Our services are provided &quot;as is&quot; without warranties of any kind, either express or 
                  implied. We do not guarantee uninterrupted, secure, or error-free operation of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Persimmon Labs shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages resulting from your 
                  use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
                <p>
                  You agree to indemnify and hold Persimmon Labs harmless from any claims, losses, or 
                  damages arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
                <p>
                  We may terminate or suspend your account at any time for violations of these terms. 
                  You may cancel your account at any time through your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the United States and the State of California, 
                  without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our services 
                  after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                <p>For questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 p-4 bg-brand-dark/20 border border-brand-wine/30 rounded-xl">
                  <p>Persimmon Labs</p>
                  <p>Email: legal@persimmonlabs.com</p>
                  <p>Phone: +1 (234) 567-890</p>
                  <p>Address: San Francisco, CA</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}