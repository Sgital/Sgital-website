'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle, Zap, DollarSign, Users, Scale, Wrench, HelpCircle, Sparkles,
  ArrowUpCircle, Settings, Plug, ShieldCheck, BarChart3, Activity, User, Code,
  Layers, Compass, CheckCircle2, ArrowRight, Mail, ChevronDown, Brain, Award,
} from 'lucide-react';

const YELLOW = '#F3CA20';
const NAVY = '#003D59';
const TEAL = '#2AC3CB';

const PREMIER_BADGE = 'https://sgital-website-assets.s3.ap-south-1.amazonaws.com/images/partner-badges/premier-consulting-implementation.png';

const proofPoints = [
  'Premier ServiceNow Partner',
  '9 years on the Now Platform',
  '60 consultants',
  '2,000+ AI-powered workflows delivered',
  'CSAT 4.8',
];

const dwaasValues = [
  { icon: Zap, title: 'Flexible', text: 'spend your credits where they matter each month' },
  { icon: DollarSign, title: 'Cost-effective', text: 'pay for capacity you use, not a full-time headcount' },
  { icon: Users, title: 'Expert', text: 'the right skill level for each task, from business analyst to solution architect' },
  { icon: Scale, title: 'Scalable', text: 'move between plans as demand changes' },
];

const covered = [
  { icon: AlertTriangle, title: 'Incident resolution', text: 'Diagnose root cause and fix instance issues fast to minimise downtime.' },
  { icon: HelpCircle, title: 'Technical guidance', text: 'Answer "how do we…" questions on configuration, usage and best practice.' },
  { icon: Sparkles, title: 'New feature advisory', text: 'Brief you on each release and how to apply it to your workflows.' },
  { icon: ArrowUpCircle, title: 'ServiceNow upgrade services', text: 'Plan, test and execute upgrades with minimal risk.' },
  { icon: Wrench, title: 'Enhancements', text: 'Configure, customise and extend workflows, modules and scripts.' },
  { icon: Plug, title: 'Integrations', text: 'Build and troubleshoot connections to your third-party systems.' },
  { icon: Settings, title: 'Platform administration', text: 'Manage changes to your ServiceNow environment safely.' },
  { icon: BarChart3, title: 'Reporting and analytics', text: 'Dashboards and Performance Analytics that drive decisions.' },
  { icon: Activity, title: 'Architecture and health checks', text: 'Reduce technical debt, retire needless customisation, and keep the instance upgrade-safe and AI-ready.' },
];

const planRows = [
  { label: 'Workflow credits per month', values: ['120', '180', '240'] },
  { label: 'Incident resolution', values: ['Included', 'Included', 'Included'] },
  { label: 'Platform support and advisory', values: ['Included', 'Included', 'Included'] },
  { label: 'Upgrades and enhancements', values: ['Included', 'Included', 'Included'] },
  { label: 'Integrations, architecture and health checks', values: ['Included', 'Included', 'Included'] },
  { label: 'Discovery sprint in month 1', values: ['Included', 'Included', 'Included'] },
  { label: 'Unused credits', values: ['Roll over for 3 months', 'Roll over for 3 months', 'Roll over for 3 months'] },
  { label: 'Term', values: ['6 or 12 months', '6 or 12 months', '6 or 12 months'] },
  { label: 'Best for', values: ['Stable platform, steady small backlog', 'Growing platform, regular enhancements', 'Multi-module estate, active roadmap'] },
];
const planNames = ['Sustain', 'Evolve', 'Transform'];

const team = [
  { icon: User, role: 'Consultant: business analyst', rate: '1 credit/hour', text: 'gathers requirements, plans work and coordinates stakeholders' },
  { icon: Code, role: 'Consultant: developer', rate: '1 credit/hour', text: 'configures the platform, builds apps and resolves low-to-medium complexity issues' },
  { icon: Layers, role: 'Senior Consultant', rate: '2 credits/hour', text: 'designs complex solutions, integrations and workflows; owns technical architecture' },
  { icon: Compass, role: 'Solution Architect', rate: '3 credits/hour', text: 'defines data models and architecture, leads workshops and oversees implementations' },
];

const whySgital = [
  { title: 'Premier ServiceNow Partner', text: 'Services Partner, Authorized Reseller, Authorized Training Partner and Built with Now Partner' },
  { title: 'We stay beyond go-live', text: 'we build platforms and then run them. You get a named team that learns your instance, not a rotating pool, so context is never lost between projects and support.' },
  { title: 'Skills that stay with you', text: 'as an Authorized ServiceNow Training Partner, we skill up your admins and process owners alongside the work, so your team grows with the platform.' },
  { title: 'Experience', text: '9 years and 2,000+ AI-powered workflows delivered across ITSM, ITOM, ITAM, HRSD, CSM, SPM, GRC, SecOps and App Engine' },
  { title: 'Transparent', text: 'a clear monthly report on credits used, work delivered and platform health' },
  { title: 'Rated 4.8 CSAT', text: 'by 40+ customers across Singapore, Malaysia, India, Australia, New Zealand and the UK' },
];

const steps = [
  { title: 'Discover', text: 'a short call and instance review to understand your platform and backlog. Your first month opens with a discovery sprint that maps existing configuration so nothing is rebuilt twice.' },
  { title: 'Choose a plan', text: 'Sustain, Evolve or Transform, sized to your needs.' },
  { title: 'Onboard', text: 'we get access, learn your processes and agree priorities.' },
  { title: 'Deliver', text: 'log requests; we assign the right expert and get to work.' },
  { title: 'Review', text: 'monthly report on credits used, work done and recommendations; adjust your plan anytime.' },
];

const faqs = [
  { q: 'How is DWaaS different from a dedicated resource?', a: 'You get access to a whole team of skills instead of one person, and you only commit to the credits you need.' },
  { q: 'Do all experts use credits at the same rate?', a: 'No. A consultant hour uses 1 credit, a senior consultant hour 2 and a solution architect hour 3. We match each task to the lowest level that can do it well, so your credits go further.' },
  { q: 'Can I change plans?', a: 'Yes. Move up or down as your demand changes.' },
  { q: 'How long is the commitment?', a: 'Plans run for 6 or 12 months. We review your plan every quarter in the first year so it keeps matching demand.' },
  { q: 'What happens to unused credits?', a: 'They roll forward and stay available for three months, or can go towards an agreed project.' },
  { q: 'Do you work with our existing admin team?', a: 'Yes. DWaaS is designed to extend your in-house team, not replace it.' },
  { q: 'Which ServiceNow modules do you support?', a: 'ITSM, ITOM, ITAM, HRSD, CSM, SPM, GRC, SecOps, Finance and custom App Engine applications.' },
  { q: 'Can you help us adopt Now Assist and AI agents?', a: 'Yes. AI readiness is part of every plan, and GoAI 2.0 covers full adoption programmes.' },
];

const caseStudies = [
  {
    title: 'From build to run: a custom application that kept growing',
    meta: 'A Singapore-headquartered multinational group · ITSM, ITOM Discovery, custom App Engine application',
    challenge: 'The group needed a custom compliance application on ServiceNow, plus someone to look after the wider platform once it went live. Its internal team had limited bandwidth for day-to-day support, discovery tuning and enhancements.',
    did: 'Sgital built the application, took it through go-live and hypercare, and then stayed on. We took over platform support and enhancements across ITSM, the custom application and ITOM Discovery, extending discovery to cloud and network infrastructure and improving CI reconciliation and normalisation in the CMDB.',
    result: 'What started as a build became a long-term managed service, renewed for another 12 months in 2026. The renewal added on-demand surge capacity for major incidents, upgrade windows and backlog spikes, so the platform has extra hands exactly when it needs them.',
  },
  {
    title: 'Clearing the backlog with a dedicated DWaaS team',
    meta: 'A global engineering group headquartered in Singapore · ITSM, Service Catalog',
    challenge: 'Internal delivery capacity was stretched. Requests sat idle, catalog items were delayed, and the in-house team was juggling delivery and maintenance at the same time.',
    did: 'We set up a named DWaaS team — a business analyst, a senior developer and a developer — working in two-week sprints against a backlog owned by the client\u2019s product owner. A discovery sprint mapped existing configuration first, so nothing was rebuilt twice. The first focus was high-visibility finance and procurement catalog items with approval chains, cost-centre lookups and SLA tracking.',
    result: 'A predictable monthly capacity, a backlog the business prioritises, and transparent monthly drawdown reporting. Once the finance backlog is cleared, the same team moves on to new catalogs, enhancements, break-fix and reporting.',
  },
];

const COUNTRIES = ['Singapore', 'Malaysia', 'India', 'Australia', 'New Zealand', 'United Kingdom', 'Other'];
const MODULES = ['ITSM', 'ITOM', 'ITAM', 'HRSD', 'CSM', 'SPM', 'GRC', 'SecOps', 'Finance', 'App Engine (custom)'];

const scrollTo = (id) => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const ServiceNowManagedServicesPage = () => {
  const [showCases, setShowCases] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', modules: [], message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };
  const toggleModule = (m) => setForm((f) => ({ ...f, modules: f.modules.includes(m) ? f.modules.filter((x) => x !== m) : [...f.modules, m] }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!form.email.trim()) err.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email';
    if (!form.company.trim()) err.company = 'Required';
    if (!form.country) err.country = 'Required';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/dwaas/consultation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else { const d = await res.json().catch(() => ({})); setErrors({ form: d.error || 'Something went wrong. Please try again.' }); }
    } catch (e2) { setErrors({ form: 'Network error. Please try again.' }); }
    finally { setSubmitting(false); }
  };

  const inputCls = 'w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#003D59]';
  const labelCls = 'block text-sm font-medium text-neutral-800 mb-1.5';

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-40 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wide">ServiceNow Managed Services · Digital Workflows as a Service</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Go-live is <span className="text-amber-400">just the beginning.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-10">
            DWaaS is Sgital's ServiceNow managed service: a subscription team of analysts, developers and architects who stay with you after go-live. They resolve issues, deliver enhancements, run upgrades and skill up your people, so your platform keeps delivering value long after deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollTo('plans')} className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-3.5 rounded-lg transition-colors">Find your plan</button>
            <button onClick={() => scrollTo('contact')} className="bg-white/5 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">Talk to an expert</button>
          </div>
        </div>
        <img src={PREMIER_BADGE} alt="Sgital ServiceNow managed services team reviewing a platform roadmap — ServiceNow Premier Partner" className="sr-only" />
      </section>

      {/* Proof strip */}
      <section className="bg-neutral-900 border-y border-neutral-800 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <img src={PREMIER_BADGE} alt="ServiceNow Premier Partner badge" className="h-12 w-auto" />
          {proofPoints.map((p, i) => (
            <span key={i} className="text-white text-sm font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TEAL }} />{p}
            </span>
          ))}
        </div>
      </section>

      {/* ===== Section 2 — Problem ===== */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Deployment is day one. The real work starts after go-live.</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">Most ServiceNow programmes pour effort into the build, then hand over to a small admin team once hypercare ends. That's when the real demands arrive: new requests, twice-yearly upgrades, new AI features, and users who expect more every quarter. Without post go-live support, adoption stalls and the backlog grows.</p>
          <p className="text-neutral-400 leading-relaxed">Hiring a full bench of specialists is slow and expensive. Project-by-project vendors mean change requests, ramp-up time and lost context. DWaaS closes that gap.</p>
        </div>
      </section>

      {/* ===== Section 3 — What DWaaS is ===== */}
      <section className="py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">ServiceNow managed services, on subscription</h2>
          <h3 className="text-xl font-semibold mb-6" style={{ color: TEAL }}>An extension of your team, backed by a deep bench.</h3>
          <p className="text-white/80 leading-relaxed max-w-4xl mb-10">You subscribe to a monthly bank of Workflow credits. Use them for whatever your platform needs that month — a P1 incident, a family upgrade, a new catalog item, an integration, a dashboard for the CIO. No dedicated-resource commitment, no change request for every task.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dwaasValues.map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <v.icon className="w-8 h-8 mb-4" style={{ color: TEAL }} />
                <div className="text-white font-semibold mb-1">{v.title}</div>
                <div className="text-white/70 text-sm">{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4 — What's covered ===== */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">What our ServiceNow managed services cover</h2>
          <h3 className="text-xl font-semibold text-amber-400 mb-10">Run, fix and evolve — all in one plan.</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {covered.map((c, i) => (
              <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(42,195,203,0.12)' }}>
                  <c.icon className="w-5 h-5" style={{ color: TEAL }} />
                </div>
                <div className="text-white font-semibold mb-2">{c.title}</div>
                <div className="text-neutral-400 text-sm">{c.text}</div>
              </div>
            ))}
          </div>
          <p className="text-neutral-400 mt-8 max-w-4xl">Each month your credits are split between keeping the platform running and moving it forward, so support shifts from reactive fixes to steady improvement.</p>
        </div>
      </section>

      {/* ===== Section 5 — Plans ===== */}
      <section id="plans" className="py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Choose the capacity you need. Change it when you need to.</h2>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {planNames.map((name, col) => {
              const highlight = col === 1;
              return (
                <div key={name} className={`rounded-2xl p-6 flex flex-col ${highlight ? 'bg-white text-neutral-900 ring-4' : 'bg-white/5 text-white border border-white/10'}`} style={highlight ? { boxShadow: `0 0 0 4px ${YELLOW}` } : {}}>
                  {highlight && <span className="self-start text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: YELLOW, color: '#000' }}>MOST POPULAR</span>}
                  <h3 className={`text-2xl font-bold mb-4 ${highlight ? 'text-neutral-900' : 'text-white'}`}>{name}</h3>
                  <ul className="space-y-2 mb-6 flex-1">
                    {planRows.map((r, i) => (
                      <li key={i} className={`text-sm ${highlight ? 'text-neutral-700' : 'text-white/80'}`}>
                        <span className={`${highlight ? 'text-neutral-500' : 'text-white/50'}`}>{r.label}: </span>
                        <span className="font-medium">{r.values[col]}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} className={`w-full font-semibold px-5 py-3 rounded-lg transition-colors ${highlight ? 'bg-black text-white hover:bg-neutral-800' : 'text-black hover:opacity-90'}`} style={highlight ? {} : { backgroundColor: YELLOW }}>Get a plan recommendation</button>
                </div>
              );
            })}
          </div>

          {/* Credit weighting */}
          <div className="max-w-2xl mx-auto mt-14">
            <h3 className="text-xl font-semibold text-white mb-2 text-center">What's a Workflow credit?</h3>
            <p className="text-white/70 text-sm text-center mb-6">Credits buy expert hours, weighted by seniority:</p>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead><tr className="bg-white/10 text-white"><th className="text-left px-4 py-3 font-semibold">Role</th><th className="text-left px-4 py-3 font-semibold">Credits per hour</th></tr></thead>
                <tbody className="text-white/80">
                  <tr className="border-t border-white/10"><td className="px-4 py-3">Consultant (business analyst, developer)</td><td className="px-4 py-3">1</td></tr>
                  <tr className="border-t border-white/10"><td className="px-4 py-3">Senior Consultant (senior developer)</td><td className="px-4 py-3">2</td></tr>
                  <tr className="border-t border-white/10"><td className="px-4 py-3">Solution Architect</td><td className="px-4 py-3">3</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/70 text-sm mt-4">Every request draws from one bank, matched to the right level, and your monthly report shows exactly where your credits went.</p>
            <p className="text-white/90 text-sm mt-3 font-medium">Not sure which plan fits? We'll review your instance and backlog and recommend one.</p>
          </div>
        </div>
      </section>

      {/* ===== Section 6 — Team ===== */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The right expert for every task.</h2>
          <p className="text-neutral-400 max-w-4xl mb-10">Every task is matched to the right level, so you never pay architect rates for a catalog tweak — or get a junior on a complex integration.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <m.icon className="w-8 h-8" style={{ color: TEAL }} />
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: YELLOW, color: '#000' }}>{m.rate}</span>
                </div>
                <div className="text-white font-semibold mb-2">{m.role}</div>
                <div className="text-neutral-400 text-sm">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 7 — Ready for AI ===== */}
      <section className="py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Brain className="w-10 h-10 mx-auto mb-5" style={{ color: TEAL }} />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Keep your platform ready for what's next.</h2>
          <p className="text-white/80 leading-relaxed">Every ServiceNow release adds more AI — Now Assist, AI agents, smarter workspaces. DWaaS turns each upgrade cycle into a chance to adopt them safely: we assess what's new, clean up what blocks it, and switch on what pays off. When you're ready to go further, our GoAI 2.0 adoption programme takes you from pilot to production.</p>
        </div>
      </section>

      {/* ===== Section 8 — Why Sgital ===== */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Partner with the experts.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whySgital.map((w, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-amber-400" />
                <p className="text-neutral-300"><span className="text-white font-semibold">{w.title}:</span> {w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 9 — Case studies (hidden by default) ===== */}
      <section className="py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Life after go-live, in practice.</h2>
            <button onClick={() => setShowCases((s) => !s)} data-testid="toggle-case-studies" className="text-sm font-semibold px-4 py-2 rounded-lg" style={{ backgroundColor: YELLOW, color: '#000' }}>
              {showCases ? 'Hide case studies' : 'Show case studies'}
            </button>
          </div>
          {showCases && (
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((cs, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{cs.title}</h3>
                  <p className="text-white/50 text-sm italic mb-5">{cs.meta}</p>
                  {[['Challenge', cs.challenge], ['What we did', cs.did], ['Result', cs.result]].map(([h, body]) => (
                    <div key={h} className="mb-4">
                      <div className="text-sm font-semibold mb-1" style={{ color: TEAL }}>{h}</div>
                      <p className="text-white/80 text-sm leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Section 10 — How it works ===== */}
      <section className="bg-neutral-950 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">How it works</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold mb-3" style={{ backgroundColor: YELLOW, color: '#000' }}>{i + 1}</div>
                <div className="text-white font-semibold mb-2">{s.title}</div>
                <div className="text-neutral-400 text-sm">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 11 — FAQ ===== */}
      <section className="py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white font-medium">
                  {f.q}
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: TEAL }} />
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-white/80 text-sm leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 12 — Closing CTA + form ===== */}
      <section id="contact" className="bg-neutral-950 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Go-live was the beginning. Let's keep going.</h2>
          <p className="text-neutral-400 text-center mb-10">Tell us about your platform and we'll recommend the right DWaaS plan.</p>

          {submitted ? (
            <div className="bg-neutral-900 border border-amber-400/30 rounded-2xl p-10 text-center">
              <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Thank you, {form.name.split(' ')[0] || 'there'}!</h3>
              <p className="text-neutral-400">We've received your request and will be in touch shortly with a DWaaS plan recommendation.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 md:p-8" data-testid="dwaas-form">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><label className={labelCls + ' !text-neutral-300'}>Name *</label><input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} />{errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}</div>
                <div><label className={labelCls + ' !text-neutral-300'}>Work email *</label><input type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />{errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><label className={labelCls + ' !text-neutral-300'}>Company *</label><input className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} />{errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}</div>
                <div><label className={labelCls + ' !text-neutral-300'}>Country *</label>
                  <select className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)}>
                    <option value="">Select…</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label className={labelCls + ' !text-neutral-300'}>ServiceNow modules in use</label>
                <div className="flex flex-wrap gap-2">
                  {MODULES.map((m) => (
                    <button type="button" key={m} onClick={() => toggleModule(m)} className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${form.modules.includes(m) ? 'bg-amber-400 text-neutral-950 border-amber-400 font-medium' : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-amber-400/40'}`}>{m}</button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className={labelCls + ' !text-neutral-300'}>Message (optional)</label>
                <textarea rows={4} className={inputCls} value={form.message} onChange={(e) => set('message', e.target.value)} />
              </div>
              {errors.form && <p className="text-red-400 text-sm mb-4">{errors.form}</p>}
              <button type="submit" disabled={submitting} className="w-full font-semibold px-6 py-3.5 rounded-lg transition-colors disabled:opacity-60" style={{ backgroundColor: YELLOW, color: '#000' }}>
                {submitting ? 'Sending…' : 'Book a DWaaS consultation'}
              </button>
              <p className="text-neutral-500 text-sm text-center mt-4">Prefer email? <a href="mailto:info@sgital.com" className="text-amber-400 hover:underline">info@sgital.com</a></p>
            </form>
          )}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-neutral-950/95 border-t border-neutral-800">
        <button onClick={() => scrollTo('contact')} className="w-full font-semibold px-6 py-3 rounded-lg" style={{ backgroundColor: YELLOW, color: '#000' }}>Book a consultation</button>
      </div>
    </>
  );
};

export default ServiceNowManagedServicesPage;
