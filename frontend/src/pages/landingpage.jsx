import Navbar from "../components/layout/navbar";
import HeroSection from "../components/landing/herosection";
import FeatureCard from "../components/landing/featurecard";
import TestimonialSection from "../components/landing/testimonialsection";
import CTABanner from "../components/landing/ctabanner";
import Footer from "../components/layout/footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureCard />
      <TestimonialSection />
      <CTABanner />
      <Footer />
    </>
  );
}

export default LandingPage;