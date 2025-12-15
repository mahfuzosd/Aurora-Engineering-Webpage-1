import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Zap, Leaf, ClipboardCheck, Award, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Project = Database['public']['Tables']['projects']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type Client = Database['public']['Tables']['clients']['Row'];

async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('year', { ascending: false })
    .limit(3);

  return (data as Project[]) || [];
}

async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true })
    .limit(6);

  return (data as Service[]) || [];
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .limit(3);

  return (data as Testimonial[]) || [];
}

async function getClients(): Promise<Client[]> {
  const { data } = await supabase
    .from('clients')
    .select('*')
    .eq('published', true)
    .order('order', { ascending: true });

  return (data as Client[]) || [];
}

export const revalidate = 3600;

export default async function Home() {
  const [projects, services, testimonials, clients] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
    getClients(),
  ]);

  const iconMap: { [key: string]: any } = {
    Building2,
    Zap,
    Leaf,
    ClipboardCheck,
  };

  return (
    <main>
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-brand-subtle">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Modern building"
            fill
            className="object-cover opacity-[0.07]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-gradient-brand">Engineering Excellence</span>
            <br />
            <span className="text-[#240046]">Built to Last</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Award-winning structural, civil, and MEP engineering services for
            complex projects across North America
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-gradient-brand hover:opacity-90 border-0">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-[#7b2cbf] text-[#240046] hover:bg-[#7b2cbf] hover:text-white">
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-gradient-brand">150+</div>
              <div className="text-sm text-gray-600 mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-brand">$1.2B</div>
              <div className="text-sm text-gray-600 mt-1">Project Value</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-brand">20+</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-brand">98%</div>
              <div className="text-sm text-gray-600 mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#240046] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive engineering solutions tailored to your project needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <Card key={service.id} className="border-2 hover:border-[#7b2cbf] transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6">
                    <div className="inline-block p-3 bg-gradient-brand-subtle rounded-lg mb-4">
                      <Icon className="h-12 w-12 text-[#7b2cbf]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#240046] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.short_description}</p>
                    <Link
                      href={`/services#${service.slug}`}
                      className="text-[#7b2cbf] font-medium inline-flex items-center group-hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Showcasing our commitment to innovation and excellence
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.featured_image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-900">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{project.short_description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#240046] mb-4">Why Choose Aurora Engineering</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading expertise backed by proven results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand-subtle mb-4">
                <Award className="h-8 w-8 text-[#ff6d00]" />
              </div>
              <h3 className="text-xl font-semibold text-[#240046] mb-2">Award-Winning Design</h3>
              <p className="text-gray-600">
                Recognized by ENR as a Top 100 Design Firm with multiple project awards
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand-subtle mb-4">
                <Users className="h-8 w-8 text-[#7b2cbf]" />
              </div>
              <h3 className="text-xl font-semibold text-[#240046] mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Licensed professional engineers with decades of combined experience
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand-subtle mb-4">
                <Leaf className="h-8 w-8 text-[#9d4edd]" />
              </div>
              <h3 className="text-xl font-semibold text-[#240046] mb-2">Sustainable Solutions</h3>
              <p className="text-gray-600">
                LEED-certified expertise delivering environmentally responsible designs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading organizations across diverse industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    {testimonial.photo_url && (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.photo_url}
                          alt={testimonial.client_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.client_name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.client_position}, {testimonial.client_company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Trusted by Leading Organizations</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-center">
                <Image
                  src={client.logo_url}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-brand text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how Aurora Engineering can bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-white text-[#240046] hover:bg-white/90 border-0">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-[#7b2cbf]">
              <Link href="/contact">Download Capability Statement</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
