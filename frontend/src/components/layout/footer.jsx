import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
    const footerLinkStyle = ({ isActive }) => {
        return isActive 
            ? "text-blue-400 font-semibold underline" 
            : "text-gray-400 hover:text-white transition-colors";
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-4 text-center mt-auto">
            <p>© 2026 SkillPath AI. SDG 4: Quality Education.</p>
            <div className="flex justify-center gap-6 mt-4">
                <NavLink to="/" className={footerLinkStyle}>Home</NavLink>
                <NavLink to="/about" className={footerLinkStyle}>About</NavLink>
                <NavLink to="/contact" className={footerLinkStyle}>Contact</NavLink>
            </div>
        </footer>
    );
}

export default Footer;