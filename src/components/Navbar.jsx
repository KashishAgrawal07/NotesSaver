import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="flex flex-row gap-6 bg-gray-800 p-4 rounded-xl shadow-lg">
            <NavLink
                to="/"
                className="text-white text-lg font-semibold hover:text-gray-400"
            >
                Home
            </NavLink>
            <NavLink
                to="/pastes"
                className="text-white text-lg font-semibold hover:text-gray-400"
            >
                View
            </NavLink>
        </div>
    );
};

export default Navbar;
