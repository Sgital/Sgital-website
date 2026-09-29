'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Building2,
  Workflow,
  Bot,
  Code2,
  Activity,
  GraduationCap,
  ShieldCheck,
  Award,
} from 'lucide-react';

const whyPoints = [
  {
    icon: Award,
    title: '9+ years of enterprise workflow delivery',
    description:
      'Nearly a decade operationalizing workflows and automation for large enterprises — we know how to take things from idea to production.',
  },
  {
    icon: Workflow,
    title: 'Claude inside ServiceNow — and standalone',
    description:
      'We deploy Claude as a standalone enterprise solution and inside ServiceNow, where Claude is the default model for Build Agent.',
  },
  {
    icon: GraduationCap,
    title: 'A training practice that drives real adoption',
    description:
      'Role-based enablement, skills libraries and change management so your teams actually use what we build.',
  },
];

const services = [
  {
    icon: Rocket,
    title: 'Claude Readiness Sprint',
    description:
      'Use-case discovery, data and security review, prioritised use cases and a pilot plan in 2–3 weeks.',
  },
  {
    icon: Building2,
    title: 'Claude Enterprise Rollout & Adoption',
    description:
      'Setup, SSO, connectors, a company skills library, role-based training and usage dashboards.',
  },
  {
    icon: Workflow,
    title: 'Claude on ServiceNow',
    description:
      'Build Agent enablement, AI Control Tower guardrails and Claude-to-ServiceNow connectors.',
  },
  {
    icon: Bot,
    title: 'Custom Agents on the Claude Platform',
    description:
      'Production agents for document intake, support triage, and finance and HR cases, with evaluations and human review built in.',
  },
  {
    icon: Code2,
    title: 'Claude Code for Engineering Teams',
    description:
      'Rollout, guardrails, legacy code modernisation and developer training.',
  },
  {
    icon: Activity,
    title: 'Managed AI Operations',
    description:
      'Monitoring, model upgrades, skill maintenance and quarterly value reports.',
  },
];

const engageSteps = [
  { step: '01', title: 'Readiness Sprint', description: 'Discover, assess and prioritise use cases.' },
  { step: '02', title: 'Pilot', description: 'Prove value on a focused, measurable use case.' },
  { step: '03', title: 'Production', description: 'Harden, integrate and roll out with guardrails.' },
  { step: '04', title: 'Managed Operations', description: 'Monitor, improve and report on value.' },
];

const ClaudePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-40 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wide">Anthropic · Claude Partner Network</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Claude, <span className="text-amber-400">in production.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            We help enterprises design, build and run Claude solutions — governed, integrated and measured.
          </p>

          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base group"
          >
            <Link href="/contact?source=claude" data-testid="claude-hero-cta">
              Book a Claude Readiness Sprint
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Sgital */}
      <section className="bg-neutral-950 py-20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why <span className="text-amber-400">Sgital</span>
            </h2>
            <p className="text-neutral-400">
              A delivery partner that takes Claude from promising demo to dependable production.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyPoints.map((point, i) => (
              <div
                key={i}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-amber-400/30 transition-all"
              >
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6">
                  <point.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Claude <span className="text-amber-400">Services</span>
            </h2>
            <p className="text-neutral-400">
              Everything you need to adopt Claude across your enterprise — end to end.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                data-testid={`claude-service-${i}`}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-amber-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-colors">
                  <service.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we engage */}
      <section className="bg-neutral-950 py-20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How we <span className="text-amber-400">engage</span>
            </h2>
            <p className="text-neutral-400">A clear path from first sprint to steady-state operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-stretch">
            {engageSteps.map((s, i) => (
              <div key={i} className="relative flex">
                <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                  <div className="text-amber-400 text-sm font-bold tracking-widest mb-3">{s.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{s.description}</p>
                </div>
                {i < engageSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-400/10 to-transparent border border-amber-400/20 rounded-2xl p-8 md:p-10 text-center">
            <div className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Credentials</h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Member of the <strong className="text-white">Claude Partner Network</strong>. Certified through
              the <strong className="text-white">Anthropic Partner Academy</strong>, with more of our team certifying now.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 rounded-3xl p-12 md:p-16 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to put Claude to work?
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
                Start with a Claude Readiness Sprint and leave with prioritised use cases and a pilot plan
                in two to three weeks.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
                >
                  <Link href="/contact?source=claude">
                    Book a Claude Readiness Sprint
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6"
                >
                  <Link href="/solutions">Explore ServiceNow services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClaudePage;
