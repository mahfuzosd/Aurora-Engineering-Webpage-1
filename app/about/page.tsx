import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Target, Leaf } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Metadata } from 'next';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'About Us - Aurora Engineering',
  description: '20+ years of engineering excellence. Learn about our team, values, and commitment to innovative solutions.',
};

type TeamMember = Database['public']['Tables']['team_members']['Row'];

async function getTeam(): Promise<TeamMember[]> {
  const { data } = await supabase
    .from('team_members')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true });

  return (data as TeamMember[]) || [];
}

export const revalidate = 3600;

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-[#240046] mb-6">About Aurora Engineering</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over two decades, Aurora Engineering has been at the forefront of innovative engineering
              solutions, delivering excellence across structural, civil, and MEP disciplines.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#240046] mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2003, Aurora Engineering began with a vision to transform the engineering
                landscape through innovative design, sustainable practices, and unwavering commitment to
                client success.
              </p>
              <p>
                Today, we're proud to be recognized as one of Engineering News-Record's Top 100 Design
                Firms, with a portfolio spanning over 150 completed projects and $1.2 billion in
                construction value.
              </p>
              <p>
                Our multidisciplinary team brings together structural engineers, civil engineers, MEP
                specialists, and project managers who share a passion for solving complex challenges and
                delivering projects that stand the test of time.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Aurora Engineering Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-brand-subtle py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#240046] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#240046] mb-2">Excellence</h3>
                <p className="text-gray-600">
                  Delivering industry-leading solutions that exceed expectations
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7b2cbf] mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#240046] mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  Working together to achieve extraordinary results
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff8500] mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#240046] mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Pushing boundaries with creative engineering solutions
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9d4edd] mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#240046] mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Designing for environmental responsibility
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#240046] mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  {member.photo_url && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#240046] mb-1">{member.name}</h3>
                  <p className="text-sm text-[#7b2cbf] mb-3">{member.position}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-brand text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-white/80">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$1.2B</div>
              <div className="text-white/80">Project Value</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-white/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
