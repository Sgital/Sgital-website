import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import GoAIPage from "./pages/GoAIPage";
import IndustriesPage from "./pages/IndustriesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import OurBlogPage from "./pages/OurBlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Toaster position="top-right" richColors />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/goai" element={<GoAIPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/our-blog" element={<OurBlogPage />} />
              <Route path="/our-blog/:slug" element={<BlogDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
