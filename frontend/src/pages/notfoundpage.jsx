import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      
      {/* 404 Visual Indicator */}
      <h1 className="text-7xl md:text-8xl font-black text-gray-300 tracking-wider mb-2 animate-pulse">
        404 <span className="text-xl md:text-2xl inline-block align-middle">🔍</span>
      </h1>
      
      {/* Primary Error Heading */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
        Page Not Found
      </h2>
      
      {/* Context Description */}
      <p className="text-gray-600 mb-8 max-w-sm">
        Sorry, the page you are looking for does not exist.
      </p>
      
      {/* Home Navigation Link Component */}
      <Link 
        to="/" 
        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go to Home Page
      </Link>
      
    </div>
  );
}

export default NotFoundPage;