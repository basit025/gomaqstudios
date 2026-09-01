import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import DraftDemo from "@/components/sections/DraftDemo";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

/**
 * Single scrolling marketing page. Section order is the visitor's journey:
 * hook -> proof of craft (interactive demo) -> what we do -> how -> evidence
 * -> price -> ask.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Ticker />
        <DraftDemo />
        <Services />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
