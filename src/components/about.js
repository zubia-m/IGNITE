import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div
      style={{
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f8f9fa',
        color: '#333',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url("signInSignUpBackground.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          borderRadius: '10px',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#fff'}}>About Ignite</h1>
        <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
          Empowering homeowners and investors with AI-driven property valuation, renovation planning, and a trusted contractor marketplace.
        </p>
      </div>

      {/* Mission Statement */}
      <div style={{ margin: '60px 0' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Our Mission</h2>
        <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          At Ignite, our mission is to revolutionize the way people make decisions about their properties. We combine cutting-edge AI technology with a user-friendly platform to provide accurate property valuations, personalized renovation plans, and access to a network of trusted contractors. Whether you're a homeowner or an investor, Ignite is your one-stop solution for all property-related needs.
        </p>
      </div>

      {/* Key Features */}
      <div style={{ backgroundColor: '#fff', padding: '40px 20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '40px' }}>Why Choose Ignite?</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Feature 1 */}
          <div style={{ flex: 1, minWidth: '250px', maxWidth: '300px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>AI-Driven Property Valuation</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Get instant, accurate property valuations powered by advanced AI algorithms. Make informed decisions with confidence.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{ flex: 1, minWidth: '250px', maxWidth: '300px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Renovation Planning</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Plan your renovations with ease. Our platform provides personalized recommendations and cost estimates tailored to your needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{ flex: 1, minWidth: '250px', maxWidth: '300px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Trusted Contractor Marketplace</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Connect with verified contractors in your area. Read reviews, compare quotes, and choose the best professional for your project.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div style={{ margin: '60px 0' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Ready to Get Started?</h2>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Join thousands of satisfied users who trust Ignite for their property needs. Sign up today and take the first step toward smarter property decisions.
        </p>
        <Link
          to="/signup"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default About;