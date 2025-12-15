'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('leads').insert([
        {
          ...formData,
          status: 'new' as const,
          source: 'website',
        },
      ] as any);

      if (error) throw error;

      toast({
        title: 'Message sent successfully!',
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setFileName('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-brand-subtle border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-[#240046] mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="border-2 border-[#9d4edd]/20 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#240046] mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Attach RFP or Project Documents (Optional)</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.dwg"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file')?.click()}
                      >
                        <Upload className="mr-2" size={16} />
                        Upload File
                      </Button>
                      {fileName && <span className="text-sm text-gray-600">{fileName}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: PDF, DOC, DOCX, DWG (Max 10MB)
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto px-12 bg-gradient-brand hover:opacity-90 border-0" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[#9d4edd]/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#7b2cbf] rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#240046] mb-1">Email</h3>
                    <a
                      href="mailto:info@auroraeng.com"
                      className="text-gray-600 hover:text-[#ff6d00] transition-colors"
                    >
                      info@auroraeng.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#9d4edd]/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#ff8500] rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#240046] mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-[#ff6d00] transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#9d4edd]/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#9d4edd] rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#240046] mb-1">Office</h3>
                    <p className="text-gray-600">
                      123 Engineering Plaza
                      <br />
                      Metro City, CA 90210
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-brand text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Download Capability Statement</h3>
                <p className="text-white/90 text-sm mb-4">
                  Learn more about our services, past projects, and technical expertise.
                </p>
                <Button variant="secondary" className="w-full bg-white text-[#240046] hover:bg-white/90">
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
}
