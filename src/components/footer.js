import './footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="logo-container">
            <IoMdHome className="footer-logo-icon" />
            <span className="footer-logo-text">UpHome</span>
          </div>
          <p className="footer-mission">
            Transforming properties into dream spaces through intelligent renovation solutions.
          </p>
          <div className="footer-contact">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>uphome.ai@gmail.com</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-nav">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/services" className="footer-link">Services</Link></li>
            <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
            {/* <li><Link to="/about" className="footer-link">About Us</Link></li> */}
            {/* <li><Link to="/contact" className="footer-link">Contact</Link></li> */}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-services">
            <li><Link to="/renovation" className="footer-link">Kitchen Remodeling</Link></li>
            <li><Link to="/renovation" className="footer-link">Bathroom Renovation</Link></li>
            <li><Link to="/renovation" className="footer-link">Full Home Makeovers</Link></li>
            {/* <li><Link to="/services/design" className="footer-link">Interior Design</Link></li> */}
            <li><Link to="/services/consultation" className="footer-link">Free Consultation</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-heading">Stay Updated</h3>
          <p className="footer-newsletter-text">
            Subscribe to our newsletter for renovation tips and special offers.
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
          <div className="footer-social">
            {/* <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a> */}
            <a href="https://twitter.com" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/uphome.ai?igsh=MWtsb3E5NWs4MGxnag%3D%3D&utm_source=qr" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} UpHome-Ignite. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
            <span className="divider">|</span>
            <Link to="/sitemap" className="footer-legal-link">Sitemap</Link>
          </div>
          <div className="footer-support">
            <RiCustomerService2Fill className="support-icon" />
            <span>24/7 Support: (555) 987-6543</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;