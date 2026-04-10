import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Server, Settings, Database, BarChart3, Users, Building2, Headphones, MapPin, Shield, ShieldCheck, Layers, GraduationCap, ArrowRight, Cpu, Bot, Eye, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { services } from '../data/mock';

const iconMap = {
  Server, Settings, Database, BarChart3, Users, Building2,
  Headphones, MapPin, Shield, ShieldCheck, Layers, GraduationCap,
  Cpu, Bot, Eye, LayoutDashboard
};

const categories = [
  { id: 'all', name: 'All Solutions', description: 'Complete portfolio of ServiceNow solutions' },
  { id: 'AI Workflows', name: 'AI Workflows', description: 'AI-Powered Workflow Capabilities' },
  { id: 'Technology Workflows', name: 'Technology Workflows', description: 'Run your enterprise IT on the ServiceNow AI Platform' },
  { id: 'Employee Workflows', name: 'Employee Workflows', description: 'Create seamless employee experiences across the organization' },
  { id: 'Customer Workflows', name: 'Customer Workflows', description: 'Transform customer service with AI-powered support' },
  { id: 'Security & Risk', name: 'Security & Risk', description: 'Protect your enterprise with intelligent security operations' },
  { id: 'Creator Workflows', name: 'Creator Workflows', description: 'Build and extend with low-code development' }
];

const aiWorkflowServices = [
  {
    id: 'ai-1',
    category: 'AI Workflows',
    title: 'AI Workflow Automation',
    description: 'Digitize and automate structured enterprise processes across functions',
    icon: 'Cpu',
    color: 'amber',
    isNew: false
  },
  {
    id: 'ai-2',
    category: 'AI Workflows',
    title: 'Agentic AI',
    description: 'Deploy autonomous agents to execute multi-step workflows with minimal human intervention',
    icon: 'Bot',
    color: 'amber',
    isNew: true
  },
  {
    id: 'ai-3',
    category: 'AI Workflows',
    title: 'AI Governance',
    description: 'Monitor, control, and audit AI decisions to ensure compliance and reduce risk',
    icon: 'Eye',
    color: 'amber',
    isNew: true
  },
  {
    id: 'ai-4',
    category: 'AI Workflows',
    title: 'AI Control Tower',
    description: 'Gain centralized visibility and control across all AI-driven workflows',
    icon: 'LayoutDashboard',
    color: 'amber',
    isNew: true
  }
];

const colorMap = {
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', hover: 'hover:border-amber-500/50' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hover: 'hover:border-cyan-500/50' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', hover: 'hover:border-emerald-500/50' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hover: 'hover:border-rose-500/50' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', hover: 'hover:border-violet-500/50' }
};

const SolutionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Combine all services including AI Workflows
  const allServices = [...aiWorkflowServices, ...services];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : activeCategory === 'AI Workflows'
    ? aiWorkflowServices
    : services.filter(s => s.category === activeCategory);

  const activeCategoryData = categories.find(c => c.id === activeCategory);

  return (
    <>
      <Helmet>
        <title>Solutions | ServiceNow Services - Sgital</title>
        <meta name="description" content="Comprehensive ServiceNow solutions including ITSM, ITOM, HRSD, CSM, IRM, and custom application development. Transform your enterprise workflows with AI." />
        <meta name="keywords" content="ServiceNow ITSM, ITOM, HR Service Delivery, Customer Service Management, Security Operations, App Engine, AI Workflows" />
        <link rel="canonical" href="https://sgital.com/solutions" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">ServiceNow Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Put AI to Work for
              <span className="text-amber-400"> Your Enterprise</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Unite AI, data, and workflows on a single platform. We deliver ServiceNow solutions 
              that connect any workflow, any AI, and any data source—so everything and everyone 
              finally works together.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-neutral-950 pb-8 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="bg-neutral-950 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-amber-400 mb-2">{activeCategoryData?.name}</h2>
            <p className="text-neutral-400">{activeCategoryData?.description}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid gap-6 ${activeCategory === 'AI Workflows' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Server;
              const colors = colorMap[service.color] || colorMap.amber;

              return (
                <div
                  key={service.id}
                  className={`bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 ${colors.hover} transition-all group`}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded-full mb-4`}>
                    {service.category}
                    {service.isNew && <span>⭐</span>}
                  </div>
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    {service.isNew && <span className="text-amber-400">⭐</span>}
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Workflows?</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how our ServiceNow solutions can help your organization achieve operational excellence.
          </p>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
          >
            <Link to="/contact">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SolutionsPage;
