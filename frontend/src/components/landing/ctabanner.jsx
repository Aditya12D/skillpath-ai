import { Link } from 'react-router-dom';

function CTABanner() {
    return (
        <section className="bg-blue-600 text-white py-16 px-6 text-center rounded-2xl my-12 max-w-7xl mx-auto shadow-sm">
            {/* Main Catchy Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                Ready to build your personalized skill path?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of students learning at their own pace with AI.
            </p>
            
            <Link 
                to="/contact" 
                className="inline-block bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl shadow hover:bg-blue-50 transition-colors duration-200"
            >
                Get Started Now
            </Link>
        </section>
    );
}

export default CTABanner;