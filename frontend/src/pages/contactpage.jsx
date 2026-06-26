import { useState } from "react";
import Footer from "../components/layout/footer";
import Navbar from "../components/layout/navbar";

function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        if (!name || !email || !subject || !message) {
            setError("All fields are required!");
            setIsSubmitted(false);
            return;
        }

        setError("");
        setIsSubmitted(true); 
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
                    <p className="text-gray-600 mb-6">We'd love to hear from you.</p>
                    
                    {/* Conditional Rendering: Show success message after successful submission */}
                    {isSubmitted && (
                        <div className="p-4 mb-4 text-sm font-semibold text-green-800 bg-green-50 border border-green-100 rounded-xl">
                            Message sent successfully!
                        </div>
                    )}

                    {/* Show validation error message if fields are missing */}
                    {error && (
                        <div className="p-4 mb-4 text-sm font-semibold text-red-800 bg-red-50 border border-red-100 rounded-xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                            <input 
                                type="text" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)} 
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                placeholder="Write your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </form>
                    
                </div>
            </main>
            
            <Footer/>
        </div>
    );
}

export default ContactPage;