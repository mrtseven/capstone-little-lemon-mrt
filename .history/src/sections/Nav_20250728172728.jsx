import React, { useState } from 'react'
import logo from '../Logo.svg'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Little Lemon Restaurant Logo" />
        <span className="navbar-brand">LITTLE LEMON</span>
      </div>
      <button
        className="navbar-hamburger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
        onClick={handleMenuToggle}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <nav
        id="navbar-menu"
        className={`navbar-menu${menuOpen ? ' open' : ''}`}
        aria-label="Main navigation"
      >
        <Link to="/" onClick={handleLinkClick}>HOME</Link>
        <Link to="/about" onClick={handleLinkClick}>ABOUT</Link>
        <Link to="/menu" onClick={handleLinkClick}>MENU</Link>
        <Link to="/reservations" onClick={handleLinkClick}>RESERVATIONS</Link>
        <Link to="/order" onClick={handleLinkClick}>ORDER ONLINE</Link>
        <Link to="/login" onClick={handleLinkClick}>LOGIN</Link>
      </nav>
    </header>
  );
}


