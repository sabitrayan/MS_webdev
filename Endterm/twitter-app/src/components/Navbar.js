import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;
