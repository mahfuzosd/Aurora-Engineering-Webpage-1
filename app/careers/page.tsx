import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Metadata } from 'next';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Careers - Aurora Engineering',
  description: 'Join our team of talented engineers. Explore career opportunities at Aurora Engineering.',
};

type Career = Database['public']['Tables']['careers']['Row'];

async function getCareers(): Promise<Career[]> {
  const { data } = await supabase
    .from('careers')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (data as Career[]) || [];
}

export const revalidate = 3600;

export default async function CareersPage() {
  const positions = await getCareers();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold text-[#240046] mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Build your career with a team that values innovation, collaboration, and professional growth
          </p>
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-gradient-brand">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-brand">20+</div>
              <div className="text-gray-600">Licensed PEs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-brand">98%</div>
              <div className="text-gray-600">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#240046] mb-8">Open Positions</h2>
        <div className="space-y-6">
          {positions.map((position) => (
            <Card key={position.id} className="border-2 border-[#9d4edd]/20 hover:border-[#7b2cbf] shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#240046] mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} className="text-[#7b2cbf]" />
                        <span>{position.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-[#7b2cbf]" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-[#7b2cbf]" />
                        <Badge className="bg-[#9d4edd] hover:bg-[#7b2cbf]">{position.type}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 line-clamp-2">{position.description}</p>
                  </div>
                  <Button asChild className="bg-gradient-brand hover:opacity-90 border-0">
                    <Link href={`/careers/${position.slug}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {positions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                No open positions at this time, but we're always looking for talented engineers.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact">Send Us Your Resume</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
