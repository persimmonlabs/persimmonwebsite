import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-gray-400 mb-12">Last updated: January 2025</p>
          
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Account credentials</li>
                  <li>Content you provide for automation</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communications between you and Persimmon Labs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Develop new products and services</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
                <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our service and 
                  hold certain information. You can instruct your browser to refuse all cookies or to 
                  indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Children&apos;s Privacy</h2>
                <p>
                  Our service is not directed to individuals under the age of 13. We do not knowingly 
                  collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 p-4 bg-brand-dark/20 border border-brand-wine/30 rounded-xl">
                  <p>Persimmon Labs</p>
                  <p>Email: privacy@persimmonlabs.com</p>
                  <p>Phone: +1 (234) 567-890</p>
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