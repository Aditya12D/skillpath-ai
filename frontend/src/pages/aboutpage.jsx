import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 text-center md:text-left">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Our Mission: <span className="text-blue-600">Quality Education for All</span>
        </h1>
        
        {/* Intro Paragraph */}
        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto md:mx-0">
          SkillPath AI directly addresses UN SDG 4 — Quality Education. We leverage advanced artificial intelligence to democratize education and build high-quality, personalized learning paths for everyone, everywhere.
        </p>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">SDG 4 Alignment</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              By providing free roadmap generation, instant 24/7 mentoring, and project planning, we remove financial and geographical barriers to expert tutoring.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Stack</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Built using the MERN stack (MongoDB, Express, React, Node.js) and powered by the Groq AI API for lightning-fast roadmaps.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AboutPage;