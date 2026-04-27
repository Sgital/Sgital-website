import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, MapPin, Mail, Phone, Linkedin, CheckCircle2, Building2, ExternalLink, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';
import { contactInfo, officeLocations } from '../data/mock';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`${apiUrl}/api/contact/submit`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
        <title>Contact Sgital | ServiceNow Consulting in Singapore, Bengaluru & Jodhpur</title>
        <meta name="description" content="Get in touch for ServiceNow consulting, implementation, AI Workflows and managed services. Offices in Singapore, Bengaluru and Jodhpur — serving clients across Australia, India, and ASEAN." />
        <meta name="keywords" content="contact ServiceNow Partner Singapore, ServiceNow consulting Bengaluru, ServiceNow help India, ServiceNow services Australia, workflow assessment, NowAssist consultation" />
        <link rel="canonical" href="https://sgital.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sgital.com/contact" />
        <meta property="og:title" content="Contact Sgital — ServiceNow Consulting & AI Workflows" />
        <meta property="og:description" content="Talk to a ServiceNow expert. Offices in Singapore, Bengaluru, Jodhpur. Free workflow assessment available." />
        <meta property="og:image" content="https://sgital.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-40 pb-16">
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
                    <a href={`tel:${contactInfo.phone}`} className="text-neutral-400 hover:text-amber-400 transition-colors">
                      {contactInfo.phone}
                    </a>
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

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">YouTube</div>
                    <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors">
                      Watch our channel
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">ServiceNow Partner</div>
                    <a href={contactInfo.partnerFinder} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors">
                      View our partner profile
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
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}
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
                      <option value="careers">Career Opportunities</option>
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
                    disabled={submitting}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6 group"
                  >
                    {submitting ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-amber-400">Offices</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              With offices across Asia-Pacific, we're always close to our clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div
                key={index}
                className={`relative bg-neutral-950 border rounded-2xl p-8 transition-all hover:border-amber-400/50 group ${
                  office.isHQ ? 'border-amber-400/30' : 'border-neutral-800'
                }`}
              >
                {office.isHQ && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-400 text-neutral-950 text-xs font-bold rounded-full">
                    Headquarters
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    office.isHQ ? 'bg-amber-400/20' : 'bg-neutral-800'
                  }`}>
                    <Building2 className={`w-6 h-6 ${office.isHQ ? 'text-amber-400' : 'text-neutral-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{office.city}</h3>
                    <p className="text-neutral-500 text-sm">{office.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {office.address}
                  </p>
                </div>

                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/link"
                >
                  View on Google Maps
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
