import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const navLinkStyle = ({ isActive }) => {
        return isActive
            ? "text-blue-600 font-bold"
            : "text-gray-600";
    };
    return (
        <nav className="flex justify-between items-center px-8 py-4">

            <Link to="/" className="text-xl font-black text-slate-950">
                SkillPath
            </Link>

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

            <Link
                to="/register"
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
            >
                Join Now
            </Link>

        </nav>
    );
}

export default Navbar;
