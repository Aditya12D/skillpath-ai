import React from "react";

function TestimonialSection() {
  const testimonials = [
    { name: "Rahul S.", role: "Computer Science Student", quote: "The AI doubt assistant answered my coding queries at midnight instantly!" },
    { name: "Priya M.", role: "Self-taught Developer", quote: "Following the personalized roadmap helped me build my first full-stack app." },
    { name: "David K.", role: "High School Teacher", quote: "A wonderful resource for students who cannot afford expensive private tutors." }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 max-w-7xl mx-auto rounded-2xl my-12">
      {/* Section Heading */}
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
        What Our <span className="text-blue-600">Students Say</span>
      </h2>
      
      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Quote Block */}
            <p className="text-gray-600 italic leading-relaxed mb-6">
              "{t.quote}"
            </p>
            
            {/* Author Attribution Area */}
            <div>
              <h4 className="text-base font-bold text-gray-900">
                {t.name}
              </h4>
              <p className="text-xs text-blue-600 font-medium mt-0.5">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;