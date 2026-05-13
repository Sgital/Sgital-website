import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Sgital</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Sgital — ServiceNow Premier Partner for Enterprise AI Workflows." />
        <link rel="canonical" href="https://sgital.com/" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="bg-neutral-950 min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-8">
            <span className="text-amber-400 text-sm font-medium">404 · Not Found</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Page <span className="text-amber-400">Not Found</span>
          </h1>

          <p className="text-neutral-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for may have moved, been renamed, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" data-testid="notfound-home-link">
              <Button className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact" data-testid="notfound-contact-link">
              <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-900 px-8 py-6 text-base">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800">
            <p className="text-neutral-500 text-sm mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link to="/solutions" className="text-amber-400 hover:text-amber-300 hover:underline">Solutions</Link>
              <span className="text-neutral-700">·</span>
              <Link to="/goai" className="text-amber-400 hover:text-amber-300 hover:underline">GoAI 2.0</Link>
              <span className="text-neutral-700">·</span>
              <Link to="/case-studies" className="text-amber-400 hover:text-amber-300 hover:underline">Case Studies</Link>
              <span className="text-neutral-700">·</span>
              <Link to="/our-blog" className="text-amber-400 hover:text-amber-300 hover:underline">Blog</Link>
              <span className="text-neutral-700">·</span>
              <Link to="/careers" className="text-amber-400 hover:text-amber-300 hover:underline">Careers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
