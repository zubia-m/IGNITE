import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.branding}>
          <img src="logoIgnite.jpg" alt="Logo" style={styles.logo} />
          <p style={styles.tagline}>Helping homeowners & investors make informed decisions.</p>
        </div>

        <div style={styles.links}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><Link to="/about" style={styles.link}>About Us</Link></li>
            <li><Link to="/privacy" style={styles.link}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={styles.link}>Terms of Service</Link></li>
          </ul>
        </div>

        <div style={styles.contact}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>Email: info@ignite.com</p>
          <p style={styles.text}>Phone: +1 (123) 456-7890</p>
        </div>

        <div style={styles.social}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" style={styles.socialLink}><FaFacebook /></a>
            <a href="https://twitter.com" style={styles.socialLink}><FaTwitter /></a>
            <a href="https://instagram.com" style={styles.socialLink}><FaInstagram /></a>
            <a href="https://linkedin.com" style={styles.socialLink}><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        <p style={styles.copyrightText}>© 2025 Ignite. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Styles
const styles = {  
  footer: { backgroundColor: '#333', color: '#D4AA04', padding: '5px 10px', textAlign: 'center' },
  container: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '5px' },
  branding: { flex: 1, minWidth: '200px', marginBottom: '10px' },
  logo: { height: '40px', marginBottom: '3px' },
  tagline: { fontSize: '12px', color: '#ccc' },
  links: { flex: 1, minWidth: '120px', marginBottom: '10px' },
  heading: { fontSize: '16px', marginBottom: '8px' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '12px', lineHeight: '1.8' },
  socialIcons: { display: 'flex', justifyContent: 'center', gap: '10px' },
  socialLink: { color: '#fff', fontSize: '16px', transition: 'color 0.3s ease' },
  copyright: { marginTop: '3px', borderTop: '1px solid #444', paddingTop: '3px' },
  copyrightText: { fontSize: '10px', color: '#ccc' },
};

// ✅ Correctly export the Footer component
export default Footer;