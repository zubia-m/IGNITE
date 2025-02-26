import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import About from '../components/about';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Branding */}
        <div style={styles.branding}>
          <img src="logoIgnite.jpg" alt="Logo" style={styles.logo} />
          <p style={styles.tagline}>Helping homeowners & investors make informed decisions.</p>
        </div>

        {/* Quick Links */}
        <div style={styles.links}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
          <Link to="/about" style={styles.link}>About Us</Link> {/* Use Link for About */}
          {/* <li><a href="/contact" style={styles.link}>Contact</a></li> */}
            <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
            <li><a href="/terms" style={styles.link}>Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div style={styles.contact}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>Email: info@ignite.com</p>
          <p style={styles.text}>Phone: +1 (123) 456-7890</p>
          <p style={styles.text}>Address: 8 Leland Avenue, Pennsylvania, USA</p>
        </div>

        {/* <li>
            <NavLink
                to="/about"
                style={({ isActive }) => ({
                ...styles.link,
                color: isActive ? '#007bff' : '#fff', // Highlight active link
                })}
            >
                About Us
            </NavLink>
        </li> */}

        {/* Social Media Links */}
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

      {/* Copyright Notice */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>© 2025 Ignite. All rights reserved.</p>
      </div>
    </footer>
    
  );
  <About />
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '0px 10px',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1300px',
    margin: '0 auto',
    gap: '10px', // Reduced gap between sections
  },
  branding: {
    flex: 1,
    minWidth: '250px',
    marginBottom: '20px',
  },
  logo: {
    height: '50px',
    marginBottom: '5px',
  },
  tagline: {
    fontSize: '14px',
    color: '#ccc',
  },
  links: {
    flex: 1,
    minWidth: '150px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: '2',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#007bff',
  },
  contact: {
    flex: 1,
    minWidth: '200px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '14px',
    color: '#ccc',
    lineHeight: '1.6',
  },
  social: {
    flex: 1,
    minWidth: '150px',
    marginBottom: '20px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  socialLink: {
    color: '#fff',
    fontSize: '20px',
    transition: 'color 0.3s ease',
  },
  socialLinkHover: {
    color: '#007bff',
  },
  copyright: {
    marginTop: '5px',
    borderTop: '1px solid #444',
    paddingTop: '5px',
  },
  copyrightText: {
    fontSize: '10px',
    color: '#ccc',

  },
};



export default Footer;