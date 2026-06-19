'use client';

import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    usingServiceNow: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (MOCK)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Thank you for your message! We\'ll be in touch soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      usingServiceNow: 'no'
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform
              <span className="text-amber-400"> Your Operations?</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
              Discover how Sgital and ServiceNow can work for you. Reach out to our dedicated 
              team today and discover how we can tailor solutions to meet your specific needs.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-neutral-500 text-sm">Headquarters</div>
                  <div className="text-white">Singapore</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-neutral-500 text-sm">Email</div>
                  <a href="mailto:contact@sgital.com" className="text-white hover:text-amber-400 transition-colors">
                    contact@sgital.com
                  </a>
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Global Presence</h3>
              <div className="flex flex-wrap gap-3">
                {['Singapore', 'India', 'Malaysia', 'Australia', 'New Zealand', 'UK'].map((region) => (
                  <span
                    key={region}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Book a Free Meeting</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-300">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-neutral-300">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-400"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-neutral-300">Is your company currently using ServiceNow?</Label>
                <RadioGroup
                  value={formData.usingServiceNow}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, usingServiceNow: value }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" className="border-neutral-600 text-amber-400" />
                    <Label htmlFor="yes" className="text-neutral-300 cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" className="border-neutral-600 text-amber-400" />
                    <Label htmlFor="no" className="text-neutral-300 cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-neutral-300">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-400 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6 group"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
