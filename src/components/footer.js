import './footer.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [notification, setNotification] = React.useState(null);

  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xqapjrgv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setEmail('');
        showNotification('Thank you for subscribing!', true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      showNotification('Failed to subscribe. Please try again later.', false);
    }
  };

  return (
    <footer className="footer">
      {/* Notification popup */}
      {notification && (
        <div className={`notification ${notification.isSuccess ? 'success' : 'error'}`}>
          {notification.message}
        </div>
      )}
      
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

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-services">
            <li><Link to="/renovation" className="footer-link">Home Transformations</Link></li>
            <li><Link to="/roi-analysis" className="footer-link">Investment Insights</Link></li>
            <li><Link to="/finance" className="footer-link">Valuation Reports</Link></li>
            <li><Link to="/consultation" className="footer-link">Free Consultation</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-heading">Stay Updated</h3>
          <p className="footer-newsletter-text">
            Subscribe to our newsletter for renovation tips and special offers.
          </p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
          <div className="footer-social">
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