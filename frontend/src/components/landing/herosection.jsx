function HeroSection() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
        <div>
          <div>
            🚀 AI Powered Learning
          </div>
          <h1>
            Personalized AI Roadmaps for{" "}
            <span>LifeLong Learning</span>
          </h1>
          <p>
            Aligning with UN SDG 4 to make quality education and
            AI-guided learning free and accessible to all.
          </p>

          <div className="flex gap-4">
            <button>Start Learning</button>
            <button>Learn More</button>
          </div>

        </div>
        <div>
          <img
            src="https://placehold.co/500x400"
            alt="Learning Illustration"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;