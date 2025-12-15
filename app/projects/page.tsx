import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase/client';
import { Metadata } from 'next';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Projects - Aurora Engineering',
  description: 'Explore our portfolio of award-winning engineering projects including commercial, residential, infrastructure, and industrial developments.',
};

type Project = Database['public']['Tables']['projects']['Row'];

async function getProjects(category?: string): Promise<Project[]> {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('year', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data } = await query;
  return (data as Project[]) || [];
}

export const revalidate = 3600;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category || 'all';
  const projects = await getProjects(category);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'industrial', label: 'Industrial' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-[#240046] mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            A portfolio of innovative engineering solutions delivered across diverse sectors
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/projects${cat.value !== 'all' ? `?category=${cat.value}` : ''}`}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat.value
                  ? 'bg-gradient-brand text-white'
                  : 'bg-white text-[#240046] hover:bg-gradient-brand-subtle border-2 border-[#9d4edd]/30 hover:border-[#7b2cbf]'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.featured_image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-white text-gray-900">{project.category}</Badge>
                    {project.featured && (
                      <Badge className="bg-yellow-400 text-gray-900">Featured</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.short_description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
