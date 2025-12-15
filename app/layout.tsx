import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Aurora Engineering - Award-Winning Structural, Civil & MEP Engineering',
  description: 'Leading engineering firm specializing in structural, civil, and MEP design for complex projects. 20+ years of excellence serving clients across North America.',
  keywords: 'structural engineering, civil engineering, MEP engineering, project management, sustainable design, BIM, infrastructure, architecture, construction',
  authors: [{ name: 'Aurora Engineering' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://auroraengineering.com',
    title: 'Aurora Engineering - Award-Winning Engineering Services',
    description: 'Leading engineering firm specializing in structural, civil, and MEP design for complex projects.',
    siteName: 'Aurora Engineering',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
