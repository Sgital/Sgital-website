import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'February 1, 2026';

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Sgital</title>
        <meta name="description" content="Sgital's Privacy Policy explaining how we collect, use, and protect your personal information when you use our website and services." />
        <link rel="canonical" href="https://www.sgital.com/privacy" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Hero */}
      <section className="bg-neutral-950 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-neutral-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-950 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="legal-content space-y-6 text-neutral-300 leading-relaxed">
            <p>
              Sgital Pte. Ltd. ("<strong className="text-white">Sgital</strong>", "we", "us", or "our") is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website <a href="https://www.sgital.com" className="text-amber-400 hover:underline">sgital.com</a>,
              interact with our services, or engage with us through other channels (collectively, the "Services").
            </p>
            <p>
              By using our Services, you agree to the collection and use of information in accordance
              with this policy. If you do not agree with this policy, please do not use our Services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, information collected automatically, and information from third parties.</p>

            <h3>1.1 Information You Provide</h3>
            <ul>
              <li><strong className="text-white">Contact information</strong> — name, email address, phone number, company, job title — when you fill out forms, request a proposal, subscribe to updates, or contact us.</li>
              <li><strong className="text-white">Job application information</strong> — resume, cover letter, LinkedIn/portfolio links, work experience, and other details you submit through our careers page.</li>
              <li><strong className="text-white">Communications</strong> — records of correspondence when you contact us (emails, support requests, meeting notes).</li>
            </ul>

            <h3>1.2 Information Collected Automatically</h3>
            <ul>
              <li><strong className="text-white">Usage data</strong> — pages viewed, time spent, links clicked, referring URLs, browser type, device type, and approximate location (derived from IP address).</li>
              <li><strong className="text-white">Cookies and similar technologies</strong> — small data files that help us remember your preferences, measure performance, and improve user experience.</li>
            </ul>

            <h3>1.3 Information From Third Parties</h3>
            <p>
              We may receive information from partners, service providers, and publicly available sources
              (e.g., LinkedIn, ServiceNow partner portals) to verify credentials or enhance our records.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Provide, operate, and improve our Services.</li>
              <li>Respond to inquiries, proposals, and support requests.</li>
              <li>Process job applications and communicate about hiring.</li>
              <li>Send transactional emails (confirmation, follow-ups) and, where permitted, marketing updates about Sgital offerings.</li>
              <li>Analyze usage patterns to enhance performance, security, and user experience.</li>
              <li>Comply with legal obligations and enforce our agreements.</li>
            </ul>

            <h2>3. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share information in the following limited circumstances:</p>
            <ul>
              <li><strong className="text-white">Service providers</strong> — vendors who help us operate our business (e.g., AWS for hosting and storage, email delivery providers, analytics tools), under contractual confidentiality obligations.</li>
              <li><strong className="text-white">Partners</strong> — when jointly delivering a solution (e.g., ServiceNow or other certified partners) with your consent.</li>
              <li><strong className="text-white">Legal compliance</strong> — when required by law, regulation, legal process, or to protect Sgital's rights, property, and safety or those of others.</li>
              <li><strong className="text-white">Business transfers</strong> — in connection with a merger, acquisition, reorganization, or sale of assets.</li>
            </ul>

            <h2>4. International Data Transfers</h2>
            <p>
              Sgital operates across multiple regions including Singapore, India, and ASEAN. Your information
              may be transferred to, stored in, and processed in these jurisdictions. Where required, we use
              appropriate safeguards (such as standard contractual clauses) for cross-border transfers.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your information only as long as necessary to fulfill the purposes outlined in this
              policy, comply with legal obligations, resolve disputes, and enforce our agreements. Job applications
              are retained for up to 24 months unless you request earlier deletion.
            </p>

            <h2>6. Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards designed to protect your
              information, including encryption in transit (TLS), secure cloud infrastructure (AWS), and
              access controls. However, no method of transmission over the Internet or electronic storage
              is 100% secure; we cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction (e.g., PDPA in Singapore, GDPR in the EU, CCPA in California), you may have rights to:</p>
            <ul>
              <li>Access, correct, or delete your personal information.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Receive a copy of your data in a portable format.</li>
              <li>Lodge a complaint with your local data protection authority.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:info@sgital.com" className="text-amber-400 hover:underline">info@sgital.com</a>.
              We will respond within the timeframes required by applicable law.
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use essential cookies to operate our website, and analytics cookies to understand site usage.
              You can control cookies through your browser settings. Disabling some cookies may impact functionality.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our Services are not directed to individuals under 16 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected such information, please contact us.
            </p>

            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites (e.g., ServiceNow Store, LinkedIn, YouTube).
              We are not responsible for the privacy practices of those sites. We encourage you to read their
              privacy policies.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated"
              date above and, where changes are material, provide prominent notice on our website.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact:
            </p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 mt-3">
              <p className="m-0"><strong className="text-white">Sgital Pte. Ltd.</strong></p>
              <p className="m-0 mt-1">Email: <a href="mailto:info@sgital.com" className="text-amber-400 hover:underline">info@sgital.com</a></p>
              <p className="m-0 mt-1">Website: <a href="https://www.sgital.com" className="text-amber-400 hover:underline">sgital.com</a></p>
            </div>
          </article>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
              <Link to="/terms">
                View Terms of Service
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
