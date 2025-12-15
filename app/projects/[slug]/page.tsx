import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Calendar, DollarSign, Ruler } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Metadata } from 'next';
import type { Database } from '@/types/database';

type Project = Database['public']['Tables']['projects']['Row'];

async function getProject(slug: string): Promise<Project | null> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  return data as Project | null;
}

async function getRelatedProjects(category: string, currentSlug: string): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', currentSlug)
    .limit(3);

  return (data as Project[]) || [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Aurora Engineering`,
    description: project.short_description,
    openGraph: {
      title: project.title,
      description: project.short_description,
      images: [project.featured_image],
    },
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.category, project.slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-4">{project.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600">{project.short_description}</p>
            </div>

            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
              <Image
                src={project.featured_image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {project.gallery_images && project.gallery_images.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery_images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Location</div>
                      <div className="text-gray-900">{project.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-500">Completed</div>
                      <div className="text-gray-900">{project.year}</div>
                    </div>
                  </div>
                  {project.budget && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Project Value</div>
                        <div className="text-gray-900">{project.budget}</div>
                      </div>
                    </div>
                  )}
                  {project.area && (
                    <div className="flex items-start gap-3">
                      <Ruler className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Area</div>
                        <div className="text-gray-900">{project.area}</div>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium text-gray-500 mb-2">Client</div>
                    <div className="text-gray-900 font-medium">{project.client}</div>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium text-gray-500 mb-3">Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full">
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProject.featured_image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{relatedProject.client}</span>
                        <span>{relatedProject.year}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
