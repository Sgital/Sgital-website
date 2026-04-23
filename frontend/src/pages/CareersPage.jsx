import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, MapPin, Clock, ChevronRight, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { jobListings } from '../data/mock';
import ApplicationForm from '../components/ApplicationForm';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplication, setShowApplication] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  return (
    <>
      <Helmet>
        <title>Careers | Join Our Team - Sgital</title>
        <meta name="description" content="Join Sgital's team of ServiceNow experts. Explore career opportunities in Singapore and Bengaluru." />
        <link rel="canonical" href="https://sgital.com/careers" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">Careers at Sgital</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-amber-400">Team</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Be part of a dynamic team delivering AI-powered ServiceNow solutions across Asia Pacific.
              We're always looking for talented individuals to join our growing team.
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Open <span className="text-amber-400">Positions</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Explore current opportunities and take the next step in your ServiceNow career
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 hover:border-amber-400/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm rounded-full">
                        <MapPin className="w-4 h-4" />
                        {job.locations.join(' / ')}
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full">
                        <Clock className="w-4 h-4" />
                        {job.workMode}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApply(job)}
                    className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold whitespace-nowrap group"
                  >
                    Apply Now
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="text-neutral-400 mb-6 leading-relaxed">{job.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {job.responsibilities.slice(0, 4).map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-400 text-sm">
                          <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.slice(0, 4).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-400 text-sm">
                          <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplication && selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h3>
                <p className="text-neutral-400 text-sm mt-1">{selectedJob.locations.join(' / ')}</p>
              </div>
              <button
                onClick={() => setShowApplication(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ApplicationForm
              job={selectedJob}
              onClose={() => setShowApplication(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CareersPage;