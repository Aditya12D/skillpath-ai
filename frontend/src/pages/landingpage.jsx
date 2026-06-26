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
      <div className="flex flex-wrap md:flex-nowrap gap-6 p-6 justify-center">
      <FeatureCard 
        icon="🚀" 
        title="AI-Driven Paths" 
        description="Get personalized study routes tailored specifically to your learning pace and career goals."
        color="bg-blue-600"
      />
      <FeatureCard 
        icon="📚" 
        title="Quality Content" 
        description="Rigorous educational pathways built strictly in alignment with SDG 4 quality standards."
        color="bg-green-600"
      />
      <FeatureCard 
        icon="👥" 
        title="Peer Networks" 
        description="Collaborate directly with global student communities working on the same modules."
        color="bg-purple-600"
      />
      </div>
      <TestimonialSection />
      <CTABanner />
      <Footer />
      </>
  );
}

export default LandingPage;