import { NavLink } from "react-router-dom";

function Navbar() {
    const navLinkStyle = ({ isActive }) => {
        return isActive
            ? "text-blue-600 font-bold"
            : "text-gray-600";
    };
    return (
        <nav className="flex justify-between items-center px-8 py-4">

            <h1>SkillPath</h1>

            <ul className="flex gap-6">

                <li>
                    <NavLink
                        to="/"
                        className={navLinkStyle}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/about"
                        className={navLinkStyle}>
                        About
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/contact"
                        className={navLinkStyle}>
                        Contact
                    </NavLink>
                </li>

            </ul>

            <button>Join Now</button>

        </nav>
    );
}

export default Navbar;