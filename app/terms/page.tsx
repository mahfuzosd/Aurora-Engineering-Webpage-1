import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Aurora Engineering',
  description: 'Terms of service for Aurora Engineering website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#240046] mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none prose-headings:text-[#240046]">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Aurora Engineering website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2>Use of Services</h2>
          <p>
            Our services are provided for lawful purposes only. You agree not to use our website or services:
          </p>
          <ul>
            <li>In any way that violates applicable laws or regulations</li>
            <li>To transmit harmful or malicious code</li>
            <li>To infringe upon intellectual property rights</li>
            <li>To harass, abuse, or harm others</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of Aurora Engineering and protected by copyright and trademark laws.
          </p>

          <h2>Professional Services</h2>
          <p>
            Engineering services provided by Aurora Engineering are subject to separate professional service agreements. These Terms of Service apply only to the use of our website.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Aurora Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Continued use of our website following any changes constitutes acceptance of the modified terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at info@auroraeng.com
          </p>
        </div>
      </section>
    </div>
  );
}
