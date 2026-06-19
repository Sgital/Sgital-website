'use client';

import React, { useState } from 'react';
import { 
  Server, Users, Headphones, Settings, Shield, BarChart3, Layers, 
  GraduationCap, Database, Building2, MapPin, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { services } from '@/lib/data/mock';

const iconMap = {
  Server,
  Users,
  Headphones,
  Settings,
  Shield,
  BarChart3,
  Layers,
  GraduationCap,
  Database,
  Building2,
  MapPin,
  ShieldCheck
};

const categoryConfig = {
  "Technology Workflows": {
    color: "amber",
    description: "Run your enterprise IT on the ServiceNow AI Platform",
    icon: Server
  },
  "Employee Workflows": {
    color: "cyan",
    description: "Empower employees with AI-driven experiences",
    icon: Users
  },
  "Customer Workflows": {
    color: "emerald",
    description: "Transform customer and agent experiences with AI",
    icon: Headphones
  },
  "Security & Risk": {
    color: "rose",
    description: "Double down on security and reduce risk",
    icon: Shield
  },
  "Creator Workflows": {
    color: "violet",
    description: "Build smarter apps with AI-powered workflows",
    icon: Layers
  }
};

const colorClasses = {
  amber: {
    bg: "bg-amber-400/10",
    bgHover: "hover:bg-amber-400/20",
    border: "border-amber-400/30",
    text: "text-amber-400",
    pill: "bg-amber-400/20 text-amber-400"
  },
  cyan: {
    bg: "bg-cyan-400/10",
    bgHover: "hover:bg-cyan-400/20",
    border: "border-cyan-400/30",
    text: "text-cyan-400",
    pill: "bg-cyan-400/20 text-cyan-400"
  },
  emerald: {
    bg: "bg-emerald-400/10",
    bgHover: "hover:bg-emerald-400/20",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    pill: "bg-emerald-400/20 text-emerald-400"
  },
  rose: {
    bg: "bg-rose-400/10",
    bgHover: "hover:bg-rose-400/20",
    border: "border-rose-400/30",
    text: "text-rose-400",
    pill: "bg-rose-400/20 text-rose-400"
  },
  violet: {
    bg: "bg-violet-400/10",
    bgHover: "hover:bg-violet-400/20",
    border: "border-violet-400/30",
    text: "text-violet-400",
    pill: "bg-violet-400/20 text-violet-400"
  }
};

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState("Technology Workflows");
  const categories = [...new Set(services.map(s => s.category))];
  
  const filteredServices = services.filter(s => s.category === activeCategory);
  const activeCategoryConfig = categoryConfig[activeCategory];
  const activeColors = colorClasses[activeCategoryConfig.color];

  return (
    <section id="services" className="py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">ServiceNow Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Put AI to Work for
            <span className="text-amber-400"> Your Enterprise</span>
          </h2>
          <p className="text-lg text-neutral-400">
            Unite AI, data, and workflows on a single platform. We deliver ServiceNow solutions 
            that connect any workflow, any AI, and any data source—so everything and everyone finally works together.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => {
            const config = categoryConfig[category];
            const colors = colorClasses[config.color];
            const isActive = category === activeCategory;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive 
                    ? `${colors.bg} ${colors.text} border ${colors.border}` 
                    : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className="mb-10">
          <h3 className={`text-2xl font-bold ${activeColors.text} mb-2`}>
            {activeCategory}
          </h3>
          <p className="text-neutral-400">{activeCategoryConfig.description}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            const colors = colorClasses[service.color];
            
            return (
              <div
                key={service.id}
                className={`group relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300`}
              >
                {/* Category Pill */}
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${colors.pill}`}>
                  {service.category}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {IconComponent && <IconComponent className={`w-6 h-6 ${colors.text}`} />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <div className={`flex items-center ${colors.text} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Message */}
        <div className="mt-16 bg-neutral-950 border border-neutral-800 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-amber-400 text-4xl font-bold mb-2">Any AI</div>
              <p className="text-neutral-400 text-sm">
                Power AI agents with ServiceNow models, your models, or any model
              </p>
            </div>
            <div>
              <div className="text-amber-400 text-4xl font-bold mb-2">Any Data</div>
              <p className="text-neutral-400 text-sm">
                Real-time data from any source on a single unified platform
              </p>
            </div>
            <div>
              <div className="text-amber-400 text-4xl font-bold mb-2">Any Workflow</div>
              <p className="text-neutral-400 text-sm">
                Automate any process with AI-powered workflow generation
              </p>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mt-12 pt-12 border-t border-neutral-800">
          <h3 className="text-xl font-semibold text-white mb-6">ServiceNow Certified Specializations</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'IT Service Management',
              'HR Service Delivery',
              'Customer Service Management',
              'IT Operations Management',
              'Now Platform App Engine',
              'Governance Risk & Compliance',
              'Strategic Portfolio Management',
              'NowAssist AI Agents'
            ].map((spec) => (
              <span
                key={spec}
                className="px-4 py-2 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg text-sm hover:border-amber-400/50 hover:text-amber-400 transition-colors cursor-default"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
