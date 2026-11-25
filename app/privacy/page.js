import Link from 'next/link';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <p className="text-xs text-gray-400 mb-6">Last updated: November 2026</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, organizational affiliation, and fund-related data uploaded through our platform. We also collect usage data such as pages visited, features used, and interaction patterns to improve our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Information</h2>
            <p>Your information is used to provide, maintain, and improve our PE LP reporting services. This includes processing uploaded documents, extracting key performance indicators, generating investor reports, and providing analytical insights. We do not sell your personal or financial data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS 1.3), encryption at rest, role-based access controls, and regular security audits. All financial documents are processed in secure, isolated environments and access is logged for compliance purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Data Retention</h2>
            <p>Uploaded documents and extracted data are retained for the duration of your subscription or as required by applicable financial regulations. You may request deletion of your data at any time, subject to regulatory retention requirements.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also request a copy of the data we hold about you or restrict its processing. To exercise these rights, please contact our support team.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
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
