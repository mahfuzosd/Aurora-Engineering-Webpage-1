/*
  # Aurora Engineering Database Schema
  
  ## Overview
  Complete database schema for Aurora Engineering enterprise website and admin portal.
  
  ## New Tables
  
  ### 1. `leads`
  Stores contact form submissions and RFP requests from potential clients
  - `id` (uuid, primary key)
  - `name` (text) - Client name
  - `email` (text) - Contact email
  - `phone` (text, optional) - Contact phone
  - `company` (text, optional) - Company name
  - `message` (text) - Inquiry message
  - `rfp_file_url` (text, optional) - URL to uploaded RFP document
  - `rfp_file_name` (text, optional) - Original filename
  - `status` (text) - Lead status: new, contacted, qualified, converted, closed
  - `notes` (text, optional) - Admin notes
  - `source` (text) - Lead source: website, referral, etc.
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. `projects`
  Portfolio projects and case studies
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `slug` (text, unique) - URL slug
  - `client` (text) - Client name
  - `description` (text) - Full description
  - `short_description` (text) - Summary for listings
  - `year` (integer) - Completion year
  - `budget` (text, optional) - Project budget
  - `area` (text, optional) - Project area/size
  - `location` (text) - Project location
  - `category` (text) - residential, commercial, infrastructure, industrial
  - `tags` (text[]) - Array of tags
  - `featured_image` (text) - Main project image URL
  - `gallery_images` (text[]) - Array of gallery image URLs
  - `published` (boolean) - Published status
  - `featured` (boolean) - Featured on homepage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. `services`
  Service offerings
  - `id` (uuid, primary key)
  - `title` (text) - Service name
  - `slug` (text, unique) - URL slug
  - `description` (text) - Full description
  - `short_description` (text) - Summary
  - `icon` (text) - Icon name
  - `order` (integer) - Display order
  - `published` (boolean)
  - `created_at` (timestamptz)
  
  ### 4. `team_members`
  Team profiles
  - `id` (uuid, primary key)
  - `name` (text) - Full name
  - `position` (text) - Job title
  - `bio` (text) - Biography
  - `email` (text, optional) - Contact email
  - `photo_url` (text, optional) - Profile photo
  - `linkedin_url` (text, optional)
  - `order` (integer) - Display order
  - `published` (boolean)
  - `created_at` (timestamptz)
  
  ### 5. `testimonials`
  Client testimonials
  - `id` (uuid, primary key)
  - `client_name` (text) - Client name
  - `client_position` (text) - Position/title
  - `client_company` (text) - Company name
  - `content` (text) - Testimonial text
  - `photo_url` (text, optional) - Client photo
  - `rating` (integer) - 1-5 rating
  - `published` (boolean)
  - `created_at` (timestamptz)
  
  ### 6. `blog_posts`
  News and blog articles
  - `id` (uuid, primary key)
  - `title` (text) - Post title
  - `slug` (text, unique) - URL slug
  - `excerpt` (text) - Short excerpt
  - `content` (text) - Full content (markdown)
  - `author` (text) - Author name
  - `featured_image` (text, optional)
  - `category` (text) - news, insights, projects
  - `tags` (text[])
  - `published` (boolean)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 7. `clients`
  Client logos and information
  - `id` (uuid, primary key)
  - `name` (text) - Client name
  - `logo_url` (text) - Logo image URL
  - `website` (text, optional)
  - `order` (integer) - Display order
  - `published` (boolean)
  - `created_at` (timestamptz)
  
  ### 8. `careers`
  Job postings
  - `id` (uuid, primary key)
  - `title` (text) - Job title
  - `slug` (text, unique) - URL slug
  - `department` (text) - Department
  - `location` (text) - Job location
  - `type` (text) - full-time, part-time, contract
  - `description` (text) - Full job description
  - `requirements` (text[]) - Job requirements
  - `benefits` (text[]) - Benefits
  - `published` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Public read access for published content
  - Authenticated admin access for all operations
  - Lead submissions require authenticated service role
*/

-- Create tables
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  rfp_file_url text,
  rfp_file_name text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  notes text,
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  client text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  year integer NOT NULL,
  budget text,
  area text,
  location text NOT NULL,
  category text NOT NULL CHECK (category IN ('residential', 'commercial', 'infrastructure', 'industrial')),
  tags text[] DEFAULT '{}',
  featured_image text NOT NULL,
  gallery_images text[] DEFAULT '{}',
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  icon text NOT NULL,
  "order" integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text NOT NULL,
  email text,
  photo_url text,
  linkedin_url text,
  "order" integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_position text NOT NULL,
  client_company text NOT NULL,
  content text NOT NULL,
  photo_url text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  featured_image text,
  category text DEFAULT 'news' CHECK (category IN ('news', 'insights', 'projects')),
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website text,
  "order" integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text DEFAULT 'full-time' CHECK (type IN ('full-time', 'part-time', 'contract')),
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_careers_published ON careers(published);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Leads: Only authenticated users (admins) can view and manage
CREATE POLICY "Authenticated users can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert leads"
  ON leads FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

-- Projects: Public read for published, authenticated for all operations
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Services: Public read for published
CREATE POLICY "Anyone can view published services"
  ON services FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Team members: Public read for published
CREATE POLICY "Anyone can view published team members"
  ON team_members FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials: Public read for published
CREATE POLICY "Anyone can view published testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts: Public read for published
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Clients: Public read for published
CREATE POLICY "Anyone can view published clients"
  ON clients FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Careers: Public read for published
CREATE POLICY "Anyone can view published careers"
  ON careers FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage careers"
  ON careers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();