import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const TermsOfServicePage = () => {
  const lastUpdated = 'February 1, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service - Sgital</title>
        <meta name="description" content="The terms and conditions governing your use of Sgital's website and services." />
        <link rel="canonical" href="https://sgital.com/terms" />
      </Helmet>

      {/* Hero */}
      <section className="bg-neutral-950 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-neutral-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-neutral-950 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="legal-content space-y-6 text-neutral-300 leading-relaxed">
            <p>
              These Terms of Service ("<strong className="text-white">Terms</strong>") govern your access to and use
              of the website <a href="https://sgital.com" className="text-amber-400 hover:underline">sgital.com</a>,
              content, and services made available by Sgital Pte. Ltd. ("<strong className="text-white">Sgital</strong>",
              "we", "us", or "our"). By accessing or using our website or services, you agree to be bound by these
              Terms. If you do not agree, please do not use the website.
            </p>

            <h2>1. Use of the Website</h2>
            <p>
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul>
              <li>Violate any applicable law or regulation.</li>
              <li>Infringe the intellectual property or other rights of Sgital or third parties.</li>
              <li>Upload or transmit viruses, malware, or other malicious code.</li>
              <li>Attempt to gain unauthorized access to any part of the website, systems, or networks.</li>
              <li>Use automated means (scrapers, bots) to access the website in a way that interferes with its operation.</li>
              <li>Submit false, misleading, or fraudulent information through any form (contact, job application, etc.).</li>
            </ul>

            <h2>2. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, icons, images, video clips,
              trademarks, software, and case studies — is the property of Sgital or its licensors and is
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may view, download, and print pages for personal, non-commercial use only. Any other use —
              including reproduction, modification, distribution, or republication — requires our prior written consent.
            </p>
            <p>
              "Sgital", the Sgital logo, and "GoAI" are trademarks of Sgital. "ServiceNow" and related marks
              are the property of ServiceNow, Inc. Other trademarks are property of their respective owners.
            </p>

            <h2>3. Services &amp; Engagements</h2>
            <p>
              This website describes our services at a high level. Any professional services engagement
              (including consulting, implementation, managed services, or GoAI deployments) is governed by a
              separate, signed Master Services Agreement or Statement of Work between you (or your organization)
              and Sgital. Nothing on this website constitutes an offer to provide such services on specific terms.
            </p>

            <h2>4. Job Applications</h2>
            <p>
              When you submit a job application through our careers page, you confirm that the information
              provided is true and accurate to the best of your knowledge. We use this information solely to
              evaluate your candidacy, as described in our <Link to="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>.
              Submission of an application does not create an employment relationship or guarantee further contact.
            </p>

            <h2>5. Third-Party Links &amp; Integrations</h2>
            <p>
              Our website may link to third-party websites (e.g., ServiceNow Store, LinkedIn, YouTube) or embed
              third-party content. Sgital does not control and is not responsible for the content, policies, or
              practices of third parties. Your use of third-party sites is at your own risk and subject to their terms.
            </p>

            <h2>6. User Submissions</h2>
            <p>
              If you submit content, feedback, testimonials, or suggestions to Sgital through the website or
              any other channel, you grant Sgital a non-exclusive, royalty-free, worldwide, perpetual license
              to use, reproduce, and display that content in connection with operating and promoting our services,
              provided we do so in a manner consistent with our Privacy Policy.
            </p>

            <h2>7. Disclaimers</h2>
            <p>
              The website and its content are provided <strong className="text-white">"as is" and "as available"</strong>
              without warranties of any kind, either express or implied, including but not limited to warranties
              of merchantability, fitness for a particular purpose, accuracy, non-infringement, or uninterrupted
              availability. We do not warrant that the website will be error-free, secure, or free of harmful
              components.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Sgital and its affiliates, officers, employees, and agents
              shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive
              damages, or any loss of profits, revenue, data, or business opportunities, arising out of or related
              to your use of — or inability to use — the website. Our total aggregate liability for any claim
              arising out of or related to the website shall not exceed <strong className="text-white">SGD 100</strong>.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability;
              in those jurisdictions, our liability is limited to the greatest extent permitted by law.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Sgital and its affiliates from any claims,
              damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out
              of your use of the website or violation of these Terms.
            </p>

            <h2>10. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of <strong className="text-white">Singapore</strong>, without
              regard to its conflict-of-laws principles. Any dispute arising out of or in connection with these
              Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.
            </p>

            <h2>11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we do, we will revise the "Last updated" date above.
              Your continued use of the website after changes are posted constitutes your acceptance of the updated Terms.
            </p>

            <h2>12. Termination</h2>
            <p>
              We may suspend or terminate your access to the website at any time, without notice, if we believe
              you have violated these Terms or for any other reason at our sole discretion.
            </p>

            <h2>13. Contact Us</h2>
            <p>Questions about these Terms? Please contact us:</p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 mt-3">
              <p className="m-0"><strong className="text-white">Sgital Pte. Ltd.</strong></p>
              <p className="m-0 mt-1">Email: <a href="mailto:info@sgital.com" className="text-amber-400 hover:underline">info@sgital.com</a></p>
              <p className="m-0 mt-1">Website: <a href="https://sgital.com" className="text-amber-400 hover:underline">sgital.com</a></p>
            </div>
          </article>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
              <Link to="/privacy">
                View Privacy Policy
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

export default TermsOfServicePage;
