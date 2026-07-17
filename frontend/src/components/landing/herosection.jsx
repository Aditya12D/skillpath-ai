import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-blue-50/50 to-white py-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 gap-12 w-full">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-6 max-w-xl text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full border border-blue-100">
            🚀 AI Powered Learning
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Personalized AI Roadmaps for{" "}
            <span className="text-blue-600 block sm:inline">LifeLong Learning</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-gray-600 leading-relaxed">
            Aligning with UN SDG 4 to make quality education and
            AI-guided learning free and accessible to all.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              to="/about"
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full">
          <img
            src="https://images.openai.com/static-rsc-4/L9eEx6QczpA-stXnRxplADCJ8SX993LPdV7DpjJhkwfO8PJqGAgj2L7I7b4i4Jl2QF5oNsESoNIw8Mv6qA1VXhYs1_rQN7JJyQYctDQtvxec0IXQD5k6jraxQz1kkluZgftc4JdDHqZunjdsG2Ah_f0hDg6heI6xV57EYZPsuGzcRpsZ0VMT93ro4o0TtOLt?purpose=fullsize"
            alt="Learning Illustration"
            className="w-full max-w-md md:max-w-full h-auto rounded-2xl shadow-sm border border-gray-100 object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
