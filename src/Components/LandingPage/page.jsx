import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Pricing from "./Pricing";
import FeaturesSection from "./FeatureSelection";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Contact_us from "./contact_us";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <FeaturesSection />
      <Testimonials />
      <Faq />
      <Pricing />
      <Contact_us />
      <Footer />
    </div>
  );
}
