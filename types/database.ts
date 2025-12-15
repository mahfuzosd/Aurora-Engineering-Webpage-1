export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          message: string;
          rfp_file_url: string | null;
          rfp_file_name: string | null;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          notes: string | null;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          message: string;
          rfp_file_url?: string | null;
          rfp_file_name?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          notes?: string | null;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          message?: string;
          rfp_file_url?: string | null;
          rfp_file_name?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          notes?: string | null;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client: string;
          description: string;
          short_description: string;
          year: number;
          budget: string | null;
          area: string | null;
          location: string;
          category: 'residential' | 'commercial' | 'infrastructure' | 'industrial';
          tags: string[];
          featured_image: string;
          gallery_images: string[];
          published: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client: string;
          description: string;
          short_description: string;
          year: number;
          budget?: string | null;
          area?: string | null;
          location: string;
          category: 'residential' | 'commercial' | 'infrastructure' | 'industrial';
          tags?: string[];
          featured_image: string;
          gallery_images?: string[];
          published?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          client?: string;
          description?: string;
          short_description?: string;
          year?: number;
          budget?: string | null;
          area?: string | null;
          location?: string;
          category?: 'residential' | 'commercial' | 'infrastructure' | 'industrial';
          tags?: string[];
          featured_image?: string;
          gallery_images?: string[];
          published?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          short_description: string;
          icon: string;
          order: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          short_description: string;
          icon: string;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          icon?: string;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          position: string;
          bio: string;
          email: string | null;
          photo_url: string | null;
          linkedin_url: string | null;
          order: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position: string;
          bio: string;
          email?: string | null;
          photo_url?: string | null;
          linkedin_url?: string | null;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string;
          bio?: string;
          email?: string | null;
          photo_url?: string | null;
          linkedin_url?: string | null;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          client_position: string;
          client_company: string;
          content: string;
          photo_url: string | null;
          rating: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_position: string;
          client_company: string;
          content: string;
          photo_url?: string | null;
          rating?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_position?: string;
          client_company?: string;
          content?: string;
          photo_url?: string | null;
          rating?: number;
          published?: boolean;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          featured_image: string | null;
          category: 'news' | 'insights' | 'projects';
          tags: string[];
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author: string;
          featured_image?: string | null;
          category?: 'news' | 'insights' | 'projects';
          tags?: string[];
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          featured_image?: string | null;
          category?: 'news' | 'insights' | 'projects';
          tags?: string[];
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string;
          website: string | null;
          order: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url: string;
          website?: string | null;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string;
          website?: string | null;
          order?: number;
          published?: boolean;
          created_at?: string;
        };
      };
      careers: {
        Row: {
          id: string;
          title: string;
          slug: string;
          department: string;
          location: string;
          type: 'full-time' | 'part-time' | 'contract';
          description: string;
          requirements: string[];
          benefits: string[];
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          department: string;
          location: string;
          type?: 'full-time' | 'part-time' | 'contract';
          description: string;
          requirements?: string[];
          benefits?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          department?: string;
          location?: string;
          type?: 'full-time' | 'part-time' | 'contract';
          description?: string;
          requirements?: string[];
          benefits?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
