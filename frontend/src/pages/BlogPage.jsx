import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Blog posts data based on sgital.com/blog
const blogPosts = [
  {
    id: 1,
    title: "SGITAL Marks 8 Years of Powering Singapore's AI Workflows",
    description: "Founder Sachin Khatri's Bold Bet on Digital Transformation Now Drives Enterprise Productivity Across ASEAN. Eight years of innovation in workflow automation.",
    date: 'October 11, 2025',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/sgital-marks-8-years-of-powering-singapores-ai-workflows/',
    category: 'Company News'
  },
  {
    id: 2,
    title: "The Future of Customer Service: How ServiceNow's Xanadu Release is Transforming Business Operations",
    description: "In today's rapidly evolving digital landscape, the gap between customer expectations and service delivery capabilities continues to grow. Discover how Xanadu changes everything.",
    date: 'November 22, 2024',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-%f0%9f%9a%80/',
    category: 'ServiceNow'
  },
  {
    id: 3,
    title: '7 Best ESG Updates in ServiceNow Xanadu',
    description: 'Discover the Top ServiceNow Xanadu Release Updates that are transforming enterprise sustainability reporting and ESG compliance management.',
    date: 'October 7, 2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/7-best-esg-updates-in-servicenow-xanadu/',
    category: 'ServiceNow'
  },
  {
    id: 4,
    title: 'Sgital named Success Network Partner by ServiceNow',
    description: 'Helping our customers get more value out of the ServiceNow platform. A milestone achievement recognizing our expertise and commitment.',
    date: 'February 13, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/sgital-named-success-network-partner-by-servicenow/',
    category: 'Partnership'
  },
  {
    id: 5,
    title: 'Sgital partners with WalkMe to enable faster user adoption',
    description: 'Partnership to enable organizations to measure, drive, and realize the value of their software investments through enhanced digital adoption.',
    date: 'June 23, 2023',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/sgital-partners-with-walkme-to-enable-faster-user-adoption/',
    category: 'Partnership'
  },
  {
    id: 6,
    title: "Looking back at the year that's gone by!",
    description: 'Annual Update Oct 2020 - Sep 2021. Reflecting on our achievements, growth, and the milestones we reached together with our clients.',
    date: 'October 1, 2021',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/looking-back-at-the-year-thats-gone-by/',
    category: 'Company News'
  },
  {
    id: 7,
    title: 'CASE STUDY: Making finance workflows digital',
    description: 'Sgital helps French chemicals leader build digital workflows across finance, projects, legal and operations teams for enhanced efficiency.',
    date: 'November 20, 2020',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/case-study-making-finance-workflows-digital/',
    category: 'Case Study'
  },
  {
    id: 8,
    title: "The future of work: 'digital' and 'human'",
    description: "The world of work is changing rapidly, and with that, demand for new skills will evolve. Exploring the intersection of technology and human potential.",
    date: 'January 30, 2020',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/the-future-of-work-digital-and-human/',
    category: 'Insights'
  },
  {
    id: 9,
    title: '5 key takeaways from ServiceNow Knowledge 19',
    description: 'Snippets from a great week at Las Vegas from May 6-9 2019. Key insights and announcements from the premier ServiceNow conference.',
    date: 'May 14, 2019',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    link: 'https://www.sgital.com/5-key-takeaways-from-servicenow-knowledge-19/',
    category: 'Events'
  }
];

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Insights & Updates - Sgital</title>
        <meta name="description" content="Unveiling Digital Insights, Innovations, and Industry Best Practices. Explore SGITAL's blog for the latest in ServiceNow, AI workflows, and digital transformation." />
        <meta name="keywords" content="ServiceNow blog, digital transformation insights, AI workflows, enterprise automation, SGITAL updates" />
        <link rel="canonical" href="https://sgital.com/blog" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">SGITAL BLOG</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unveiling Digital <span className="text-amber-400">Insights</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Innovations and Industry Best Practices
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5"
              >
                <Link to="/contact">Get a Proposal</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800 px-6 py-5"
              >
                <a href="https://www.sgital.com/videos/" target="_blank" rel="noopener noreferrer">
                  Watch Videos
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-neutral-950 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <a 
            href={blogPosts[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/50 lg:block hidden" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">
                    {blogPosts[0].description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
              >
                {/* Image */}
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-48 overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </a>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h3>
                  </a>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Load More / Visit Full Blog */}
      <section className="bg-neutral-950 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-5 group"
          >
            <a href="https://www.sgital.com/blog/" target="_blank" rel="noopener noreferrer">
              View All Posts on SGITAL.com
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 rounded-3xl p-12 md:p-16 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stay Updated with Our Latest Insights
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
                Want to learn more about how AI and automation can transform your enterprise workflows? 
                Get in touch with our experts.
              </p>
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
              >
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
