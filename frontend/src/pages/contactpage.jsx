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
        <>
        <Navbar/>
        <main style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you.</p>
            
            {/* Conditional Rendering: Show success message after successful submission[cite: 1] */}
            {isSubmitted && (
                <div style={{ color: "green", marginBottom: "1rem", fontWeight: "bold" }}>
                    Message sent successfully![cite: 1]
                </div>
            )}

            {/* Show validation error message if fields are missing[cite: 1] */}
            {error && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>subject</label>
                    <input 
                        type="text" 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                    />
                </div>
                <div>
                    <label>message</label>
                    <textarea
                        id="message"
                        rows="5"
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main>
        <Footer/>
        </>
    );
}

export default ContactPage;