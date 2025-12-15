import Link from 'next/link';
import { Building2, Mail, Phone, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#240046] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-[#ff9e00]" />
              <span className="text-lg font-semibold text-white">Aurora Engineering</span>
            </div>
            <p className="text-sm mb-4">
              Leading engineering excellence in structural, civil, and MEP design for over 20 years.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="hover:text-[#ff9e00] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-[#ff9e00] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-[#ff9e00] transition-colors">Structural Engineering</Link></li>
              <li><Link href="/services" className="hover:text-[#ff9e00] transition-colors">Civil Engineering</Link></li>
              <li><Link href="/services" className="hover:text-[#ff9e00] transition-colors">MEP Engineering</Link></li>
              <li><Link href="/services" className="hover:text-[#ff9e00] transition-colors">Project Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[#ff9e00] transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-[#ff9e00] transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="hover:text-[#ff9e00] transition-colors">Insights</Link></li>
              <li><Link href="/careers" className="hover:text-[#ff9e00] transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:info@auroraeng.com" className="hover:text-[#ff9e00] transition-colors">
                  info@auroraeng.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-[#ff9e00] transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3c096c] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Aurora Engineering. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#ff9e00] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#ff9e00] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
