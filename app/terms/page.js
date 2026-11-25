import Link from 'next/link';

export const metadata = { title: 'Terms of Service' };

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <p className="text-xs text-gray-400 mb-6">Last updated: November 2026</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Apex Horizon Capital LP Reporting Platform, you agree to be bound by these Terms of Service. If you do not agree, you may not access or use our services. These terms apply to all users, including fund managers, limited partners, analysts, and reviewers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Use of Services</h2>
            <p>Our platform is provided for the purpose of private equity fund reporting, document analysis, KPI extraction, and investor report generation. You agree to use the services only for lawful purposes and in accordance with applicable financial regulations and industry standards.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Account Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. You must immediately notify us of any unauthorized use. Each user account is personal and may not be shared with others without prior written authorization.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>All content, features, and functionality of the platform are owned by Apex Horizon Capital and are protected by intellectual property laws. Your uploaded documents remain your property; however, you grant us a limited license to process them for the purpose of providing our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>Our platform provides AI-generated analysis and insights for informational purposes only. We do not guarantee the accuracy of extracted data or generated reports. All AI-processed outputs should be reviewed by qualified professionals before use in investment decisions or regulatory filings.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or use of our services shall be resolved through binding arbitration in accordance with established commercial arbitration rules.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or platform notification at least 30 days before they take effect. Continued use of the platform after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:support@apexhorizon.com" className="text-blue-600 hover:underline">
                support@apexhorizon.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
