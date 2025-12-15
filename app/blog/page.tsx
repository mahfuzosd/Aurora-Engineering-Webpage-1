import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Insights & News - Aurora Engineering',
  description: 'Engineering insights, project updates, and industry news from Aurora Engineering.',
};

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (data as BlogPost[]) || [];
}

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-[#240046] mb-4">Insights & News</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Engineering insights, project updates, and industry trends
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-2 border-[#9d4edd]/20 hover:border-[#7b2cbf] shadow-lg hover:shadow-xl transition-all">
              {post.featured_image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#7b2cbf] hover:bg-[#9d4edd]">{post.category}</Badge>
                  {post.published_at && (
                    <span className="text-sm text-gray-500">
                      {format(new Date(post.published_at), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-[#240046] mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-[#7b2cbf] hover:text-[#ff6d00]">
                    Read more →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
