import { Card, CardContent } from '@/components/ui/card';
import { Building2, ConstructionIcon, Zap, ClipboardCheck, Leaf, Box } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Metadata } from 'next';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Engineering Services - Aurora Engineering',
  description: 'Comprehensive structural, civil, MEP engineering, project management, and sustainable design services.',
};

type Service = Database['public']['Tables']['services']['Row'];

async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true });

  return (data as Service[]) || [];
}

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  const iconMap: { [key: string]: any } = {
    Building2,
    ConstructionIcon,
    Zap,
    ClipboardCheck,
    Leaf,
    Box,
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold text-[#240046] mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Comprehensive engineering solutions delivered by industry-leading experts
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Building2;
            const isEven = index % 2 === 0;
            const colors = ['#ff6d00', '#7b2cbf', '#ff8500', '#9d4edd', '#ff9e00', '#5a189a'];
            const bgColors = ['bg-[#ff6d00]', 'bg-[#7b2cbf]', 'bg-[#ff8500]', 'bg-[#9d4edd]', 'bg-[#ff9e00]', 'bg-[#5a189a]'];

            return (
              <div
                key={service.id}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <Card className="border-2 border-[#9d4edd]/20 hover:border-[#7b2cbf] shadow-xl hover:shadow-2xl transition-all">
                    <CardContent className="p-12">
                      <div className={`inline-block p-4 rounded-lg ${bgColors[index % bgColors.length]} mb-6`}>
                        <Icon className="h-16 w-16 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#240046] mb-4">{service.title}</h2>
                      <p className="text-gray-700 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <div className="bg-gradient-brand-subtle p-8 rounded-lg border-2 border-[#9d4edd]/20">
                    <h3 className="text-xl font-semibold text-[#240046] mb-4">Key Capabilities</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Advanced analysis and design methodologies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Code compliance and regulatory expertise</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Collaborative project delivery</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Quality assurance and peer review</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
