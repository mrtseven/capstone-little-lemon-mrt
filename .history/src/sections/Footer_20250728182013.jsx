import React from 'react'
import logo from '../Logo2.png'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-col footer-logo-col">
          <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <nav>
            <ul className="footer-links">
              <li><a href="/about">About</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/reservations">Reservations</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <nav>
            <ul className="footer-links">
              <li><a href="tel:+989113177411">+98 911 317 7411</a></li>
              <li><a href="mailto:i@imrt.dev">i@imrt.dev</a></li>
              <li><a href="/">Iran, Sari</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Social</h4>
          <nav>
            <ul className="footer-links">
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Twitter</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
