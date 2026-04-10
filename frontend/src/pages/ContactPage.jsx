import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, MapPin, Mail, Phone, Linkedin, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { contactInfo } from '../data/mock';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Get in Touch - Sgital</title>
        <meta name="description" content="Contact Sgital for ServiceNow consulting, implementation, and support services. Book a free consultation or get a workflow assessment." />
        <meta name="keywords" content="contact Sgital, ServiceNow consultation, workflow assessment, digital transformation inquiry" />
        <link rel="canonical" href="https://sgital.com/contact" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Start a
              <span className="text-amber-400"> Conversation</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Ready to transform your enterprise workflows? We'd love to hear from you. 
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-neutral-400 hover:text-amber-400 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Phone</div>
                    <span className="text-neutral-400">{contactInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Location</div>
                    <span className="text-neutral-400">{contactInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">LinkedIn</div>
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors">
                      Follow us on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-12 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <h3 className="text-white font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    'We\'ll review your inquiry within 24 hours',
                    'Schedule a discovery call at your convenience',
                    'Receive a tailored proposal for your needs'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-400 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-neutral-400">
                    Your message has been received. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="+65 XXXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-medium mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="assessment">Workflow Assessment</option>
                      <option value="goai">GoAI 2.0 Demo</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="support">Support Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6 group"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
