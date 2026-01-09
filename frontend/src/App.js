import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import GoAISection from "./components/GoAISection";
import IndustriesSection from "./components/IndustriesSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <GoAISection />
        <IndustriesSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
