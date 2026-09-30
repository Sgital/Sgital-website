'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calendar, Clock, Users, MapPin, Ticket, Utensils, Flower2, CheckCircle2,
  Eye, Workflow, Activity, Layers, ShieldCheck, AlertCircle,
} from 'lucide-react';
import { partnershipBadges } from '@/lib/data/mock';

const PREMIER_BADGE =
  'https://sgital-website-assets.s3.ap-south-1.amazonaws.com/images/partner-badges/premier-consulting-implementation.png';

// --- Malaysian touch 1: thin songket-style diamond band (brand colours only) ---
const SongketBand = () => (
  <div
    aria-hidden="true"
    className="h-4 w-full"
    style={{
      backgroundColor: '#0a0a0a',
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(245,158,11,0.35) 0, rgba(245,158,11,0.35) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, rgba(245,158,11,0.35) 0, rgba(245,158,11,0.35) 1px, transparent 1px, transparent 12px)',
    }}
  />
);

// --- Malaysian touch 2: simple line-art KL skyline (Twin Towers + KL Tower) ---
const KLSkyline = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 600 140"
    className="w-full max-w-2xl h-auto text-amber-400/20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    {/* KL Tower */}
    <line x1="90" y1="140" x2="90" y2="60" />
    <ellipse cx="90" cy="55" rx="12" ry="7" />
    <line x1="90" y1="48" x2="90" y2="28" />
    <circle cx="90" cy="24" r="3" />
    {/* Petronas Twin Tower 1 */}
    <path d="M250 140 L250 70 L258 70 L258 55 L266 55 L266 44 L274 44 L274 55 L282 55 L282 70 L290 70 L290 140 Z" />
    <line x1="270" y1="44" x2="270" y2="24" />
    {/* Skybridge */}
    <line x1="290" y1="86" x2="330" y2="86" />
    <line x1="290" y1="90" x2="330" y2="90" />
    {/* Petronas Twin Tower 2 */}
    <path d="M330 140 L330 70 L338 70 L338 55 L346 55 L346 44 L354 44 L354 55 L362 55 L362 70 L370 70 L370 140 Z" />
    <line x1="350" y1="44" x2="350" y2="24" />
    {/* small buildings */}
    <path d="M150 140 L150 100 L180 100 L180 140 Z" />
    <path d="M420 140 L420 92 L455 92 L455 140 Z" />
    <path d="M470 140 L470 110 L500 110 L500 140 Z" />
    <line x1="0" y1="140" x2="600" y2="140" />
  </svg>
);

const FACTS = [
  { icon: Calendar, label: 'Date', value: 'Wed 21 or Thu 22 Oct 2026 (TBC)' },
  { icon: Clock, label: 'Time', value: '12:00 – 14:30 MYT' },
  { icon: Ticket, label: 'Format', value: 'Invitation-only lunch' },
  { icon: Users, label: 'Seats', value: '15' },
  { icon: MapPin, label: 'Venue', value: '[VENUE], Kuala Lumpur' },
  { icon: Utensils, label: 'Cost', value: 'Complimentary, lunch provided' },
];

const MATURITY = [
  { stage: 'Reactive', desc: 'Spreadsheets, annual assessments, audit-driven fixes', color: 'bg-red-500/20 border-red-500/40 text-red-300' },
  { stage: 'Managed', desc: 'Central risk register, manual control testing', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
  { stage: 'Continuous', desc: 'Automated control monitoring and live risk signals', color: 'bg-lime-500/20 border-lime-500/40 text-lime-300' },
  { stage: 'Autonomous', desc: 'AI-assisted decisions, governed AI at scale', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
];

const AGENDA = [
  { time: '12:00', dur: '20 min', session: 'Arrival and networking', speaker: '', desc: 'Welcome drinks, with CIOs, CROs and CISOs seated together.', lunch: false },
  { time: '12:20', dur: '10 min', session: 'Welcome and framing', speaker: 'Sachin Khatri, Sgital', desc: 'Why autonomous governance matters now, and a quick read of where the room sits on the Reactive to Autonomous path.', lunch: false },
  { time: '12:30', dur: '20 min', session: 'From risk management to autonomous governance', speaker: 'Ashish Pandey, ServiceNow', desc: 'How enterprise risk, compliance, control monitoring and AI governance come together on one platform.', lunch: false },
  { time: '12:50', dur: '40 min', session: 'Lunch (Lunch served)', speaker: '', desc: 'Time to eat and talk informally. No presentations.', lunch: true },
  { time: '13:30', dur: '20 min', session: 'Live demo: AI governance in action', speaker: 'Riduan Zaini, Sgital', desc: 'A walkthrough built on a Malaysian scenario, covering AI inventory, automated controls and continuous monitoring.', lunch: false },
  { time: '13:50', dur: '30 min', session: 'Executive roundtable: AI risk, who owns it and what the board is asking (Coffee and dessert)', speaker: 'Opened by Tahsin Alam, ServiceNow; facilitated by Sachin Khatri and Ashish Pandey', desc: 'An open discussion across the CIO, CRO and CISO perspectives, held under the Chatham House Rule.', lunch: false },
  { time: '14:20', dur: '10 min', session: 'Takeaways and next steps', speaker: 'Evelyn Chow, ServiceNow, and Sachin Khatri, Sgital', desc: 'Key points from the discussion and practical next steps for each organisation.', lunch: false },
  { time: '14:30', dur: '', session: 'Close and one-to-ones', speaker: '', desc: '', lunch: false },
];

const MALAYSIA_CARDS = [
  { title: 'AIGE · MOSTI', sub: 'National Guidelines on AI Governance & Ethics.', desc: 'See how to map AI systems, owners and controls to the AIGE principles so accountability and transparency are built in from day one.' },
  { title: 'Financial services', sub: 'Bank Negara Malaysia RMiT.', desc: 'Automate technology risk controls and evidence collection so RMiT reporting is continuous, not a year-end scramble.' },
  { title: 'Data protection', sub: 'PDPA obligations.', desc: 'Link privacy risk, data processing and AI use cases in one register, so data protection is part of AI governance.' },
];

const COVERS = [
  { icon: Eye, title: 'AI visibility', sub: 'Establish enterprise-wide AI visibility and governance.', desc: 'Build an inventory of AI systems and models, and assign ownership, risk tiering and policy to each.' },
  { icon: Workflow, title: 'Automation', sub: 'Automate risk, controls and compliance processes.', desc: 'Replace manual attestations and spreadsheet testing with workflow-driven control evidence.' },
  { icon: Activity, title: 'Monitoring', sub: 'Continuously monitor emerging and AI-related risks.', desc: 'Move from point-in-time assessments to live signals across your risk and control landscape.' },
  { icon: Layers, title: 'Integration', sub: 'Connect AI governance with enterprise risk management.', desc: 'Treat AI risk as part of your enterprise risk register, not a separate silo.' },
  { icon: ShieldCheck, title: 'Resilience', sub: 'Use AI and automation to improve risk decisions.', desc: 'Apply AI to prioritise issues, speed up decisions and strengthen operational resilience.' },
];

const SPEAKERS = [
  { name: 'Sachin Khatri', title: 'CEO', company: 'Sgital' },
  { name: 'Riduan Zaini', title: 'Head of Customer Success', company: 'Sgital' },
  { name: 'Ashish Pandey', title: 'Solution Sales Executive, Risk Solutions (Asia)', company: 'ServiceNow' },
  { name: 'Tahsin Alam', title: 'GTM Leader, South East Asia', company: 'ServiceNow' },
  { name: 'Evelyn Chow', title: 'Partner Manager', company: 'ServiceNow' },
];

const ABOUT_STATS = [
  '9 yrs building on ServiceNow',
  '60 delivery consultants',
  '4 ServiceNow partner designations',
  '2,000+ AI-powered workflows delivered',
  '4.8 customer CSAT',
];

const COUNTRIES = ['Malaysia', 'Singapore', 'India', 'Australia', 'New Zealand', 'United Kingdom', 'United States', 'Other'];
const MATURITY_PILLS = ['Reactive', 'Managed', 'Continuous', 'Autonomous'];
const SN_OPTIONS = [
  'Live on ServiceNow IRM',
  'On ServiceNow, not using IRM yet',
  'Evaluating ServiceNow',
  'Not on ServiceNow',
];

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const inputCls =
  'w-full px-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-400';
const labelCls = 'block text-sm text-neutral-300 mb-1.5';

const RegistrationForm = () => {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', company: '', job_title: '',
    country: '', maturity: '', servicenow_status: '', consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required';
    if (!form.last_name.trim()) e.last_name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.company.trim()) e.company = 'Required';
    if (!form.job_title.trim()) e.job_title = 'Required';
    if (!form.country) e.country = 'Required';
    if (!form.consent) e.consent = 'Please agree to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/events/kl-risk-ai-governance/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDone({ first_name: data.first_name, email: data.email });
      } else {
        setErrors({ _form: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setErrors({ _form: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-neutral-900/70 border border-amber-400/30 rounded-2xl p-8 text-center" data-testid="event-form-success">
        <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-3">Request received</h3>
        <p className="text-neutral-300 leading-relaxed">
          Thanks, {done.first_name}. The Sgital team will be in touch at{' '}
          <span className="text-amber-400">{done.email}</span> to confirm your seat.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 md:p-8" data-testid="event-form">
      <h3 className="text-xl font-bold text-white mb-1">Request an invitation</h3>
      <p className="text-neutral-400 text-sm mb-6">
        A closed lunch for 15 CIOs, CROs and CISOs. Seats are confirmed personally by the Sgital team.
      </p>

      {errors._form && (
        <div className="mb-4 flex items-start gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> <span>{errors._form}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>First name *</label>
          <input className={inputCls} value={form.first_name} onChange={(e) => set('first_name', e.target.value)} />
          {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>}
        </div>
        <div>
          <label className={labelCls}>Last name *</label>
          <input className={inputCls} value={form.last_name} onChange={(e) => set('last_name', e.target.value)} />
          {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Work email *</label>
        <input type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Company *</label>
          <input className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} />
          {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
        </div>
        <div>
          <label className={labelCls}>Job title *</label>
          <input className={inputCls} value={form.job_title} onChange={(e) => set('job_title', e.target.value)} />
          {errors.job_title && <p className="text-red-400 text-xs mt-1">{errors.job_title}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Country *</label>
        <select className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)}>
          <option value="">Select a country</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
      </div>

      <div className="mb-4">
        <label className={labelCls}>Where is your organisation today?</label>
        <div className="flex flex-wrap gap-2">
          {MATURITY_PILLS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => set('maturity', p)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                form.maturity === p
                  ? 'bg-amber-400 text-neutral-950 border-amber-400'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-amber-400/40'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>ServiceNow GRC / IRM today</label>
        <select className={inputCls} value={form.servicenow_status} onChange={(e) => set('servicenow_status', e.target.value)}>
          <option value="">Select an option</option>
          {SN_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-2 text-sm text-neutral-400 cursor-pointer">
          <input type="checkbox" className="mt-1 accent-amber-400" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
          <span>
            I agree to Sgital contacting me about this event and related services. Sgital will handle my details in line with its{' '}
            <Link href="/privacy" className="text-amber-400 hover:underline">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent}</p>}
      </div>

      <Button type="submit" disabled={submitting} className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6">
        {submitting ? 'Sending…' : 'Request invitation'}
      </Button>
    </form>
  );
};

const EventKLPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-950 pt-32 pb-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
          <KLSkyline />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: hero content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={PREMIER_BADGE} alt="ServiceNow Premier Partner" className="h-12 w-auto" />
                <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-semibold rounded-full">Premier ServiceNow Partner</span>
              </div>
              <p className="text-amber-400 text-sm font-medium mb-3">Executive lunch · Kuala Lumpur · October 2026</p>
              <p className="flex items-center gap-2 text-neutral-300 text-sm mb-5">
                <Flower2 className="w-4 h-4 text-red-500" />
                Selamat datang. Join us in KL.
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                From Risk Management to Autonomous Governance:{' '}
                <span className="text-amber-400">The Future of Risk &amp; AI with ServiceNow</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
                As organisations accelerate AI adoption and navigate an increasingly complex risk landscape,
                traditional risk and compliance approaches are no longer enough. Join us to explore how
                Autonomous Risk &amp; AI Governance can help you move from reactive risk management to proactive,
                continuous and intelligent governance.
              </p>

              {/* Fact chips */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {FACTS.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3">
                    <f.icon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-neutral-500 text-xs uppercase tracking-wider">{f.label}</div>
                      <div className="text-white text-sm font-medium">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: sticky form (desktop) / below facts (mobile) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <RegistrationForm />
              </div>
            </div>
          </div>

          {/* Maturity strip */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {MATURITY.map((m, i) => (
                <div key={m.stage} className={`rounded-xl border p-4 ${m.color}`}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1">{i + 1}. {m.stage}</div>
                  <div className="text-sm text-neutral-300">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SongketBand />

      {/* Why attend */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            One platform for enterprise risk, compliance, controls and AI governance
          </h2>
          <p className="text-neutral-400 leading-relaxed">
            Discover how ServiceNow brings together enterprise risk, regulatory compliance, control monitoring
            and AI governance on a unified platform. See how it gives you visibility across AI systems, automates
            risk and compliance processes, and enables responsible AI at scale.
          </p>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Agenda <span className="text-neutral-500 text-lg font-normal">(Malaysia time, MYT)</span></h2>
          <div className="space-y-3">
            {AGENDA.map((row, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row md:items-start gap-2 md:gap-6 rounded-xl border p-4 ${
                  row.lunch ? 'bg-amber-400/10 border-amber-400/40' : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="md:w-28 flex-shrink-0">
                  <div className="text-white font-semibold">{row.time}</div>
                  {row.dur && <div className="text-neutral-500 text-xs">{row.dur}</div>}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${row.lunch ? 'text-amber-400' : 'text-white'}`}>{row.session}</div>
                  {row.speaker && <div className="text-neutral-400 text-sm mt-0.5">{row.speaker}</div>}
                  {row.desc && <div className="text-neutral-500 text-sm mt-1">{row.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters in Malaysia */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Why this matters in Malaysia</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MALAYSIA_CARDS.map((c) => (
              <div key={c.title} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                <h3 className="text-amber-400 font-semibold mb-1">{c.title}</h3>
                <div className="text-white font-medium mb-3">{c.sub}</div>
                <p className="text-neutral-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the session covers */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">What the session covers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COVERS.map((c) => (
              <div key={c.title} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                <div className="w-11 h-11 bg-amber-400/10 rounded-xl flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-amber-400 font-semibold mb-1">{c.title}</h3>
                <div className="text-white font-medium mb-2">{c.sub}</div>
                <p className="text-neutral-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who should attend */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">A closed table for the leaders accountable for risk and AI</h2>
          <ul className="inline-flex flex-col gap-3 text-left">
            {['Chief Information Officers', 'Chief Risk Officers', 'Chief Information Security Officers', 'Limited to 15 guests, held under the Chatham House Rule.'].map((it) => (
              <li key={it} className="flex items-start gap-2 text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" /> {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Speakers */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Hosted by Sgital, Premier ServiceNow Partner, with ServiceNow
          </h2>
          <p className="text-neutral-500 text-sm text-center mb-10">Speaker line-up subject to change.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SPEAKERS.map((s) => (
              <div key={s.name} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {initials(s.name)}
                </div>
                <div className="text-white font-semibold">{s.name}</div>
                <div className="text-neutral-400 text-xs mt-1">{s.title}</div>
                <div className="text-amber-400 text-xs mt-1">{s.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SongketBand />

      {/* About Sgital */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">A Premier ServiceNow Partner across APAC and the UK</h2>
          <p className="text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-8">
            Sgital helps organisations get more from ServiceNow, with delivery teams across Singapore, India,
            Malaysia, Australia, New Zealand and the UK. Our capabilities span GRC, SecOps, ITSM, ITOM, HRSD, CSM and more.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {ABOUT_STATS.map((s) => (
              <span key={s} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300 text-sm">{s}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-70">
            {partnershipBadges.map((b, i) => (
              <img key={i} src={b.image} alt={b.alt} title={b.name} className="h-14 w-auto object-contain" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer question line */}
      <section className="bg-neutral-950 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neutral-400 text-sm">
            Questions?{' '}
            <a href="mailto:info@sgital.com" className="text-amber-400 hover:underline">info@sgital.com</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default EventKLPage;
