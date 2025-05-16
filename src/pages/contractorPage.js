import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './contractorPage.css';

const ContractorPage = () => {
  const location = useLocation();
  const { state } = location;
  
  // Get data passed from renovation page or use defaults
  const renovationData = state?.renovationData || {
    formattedAddress: '',
    renovation_type: ''
  };

  // Sample contractor data - replace with your API calls
  const allContractors = [
    {
      id: 1,
      name: 'Dream Kitchen Renovations',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      specialties: ['Kitchen', 'Bathroom'],
      rating: 4.8,
      reviews: 124,
      projects: [
        { id: 1, image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d', title: 'Modern Kitchen' },
        { id: 2, image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab', title: 'Rustic Kitchen' }
      ],
      testimonials: [
        { id: 1, author: 'Sarah J.', rating: 5, text: 'Excellent work! Finished ahead of schedule.' },
        { id: 2, author: 'Michael T.', rating: 4, text: 'Great quality but slightly over budget.' }
      ],
      location: 'New York, NY',
      budget: '$5,000 - $15,000'
    },
    {
      id: 2,
      name: 'Bathroom Specialists LLC',
      image: 'https://images.unsplash.com/photo-1600566752225-220f29665238',
      specialties: ['Bathroom'],
      rating: 4.5,
      reviews: 89,
      projects: [
        { id: 1, image: 'https://images.unsplash.com/photo-1630699144867-37acec96a8e3', title: 'Luxury Bathroom' },
        { id: 2, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3', title: 'Small Bathroom' }
      ],
      testimonials: [
        { id: 1, author: 'Emily R.', rating: 5, text: 'Transformed my tiny bathroom into a spa!' },
        { id: 2, author: 'David K.', rating: 4, text: 'Good work but took longer than expected.' }
      ],
      location: 'Chicago, IL',
      budget: '$0 - $5,000'
    }
  ];

  // State management
  const [contractors, setContractors] = useState(allContractors);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [filters, setFilters] = useState({
    projectType: mapRenovationType(renovationData.renovation_type),
    budget: '',
    location: renovationData.formattedAddress || ''
  });
  const [loading, setLoading] = useState(false);

  // Map renovation types to contractor specialties
  function mapRenovationType(renovationType) {
    switch(renovationType) {
      case 'Kitchen Remodel': return 'Kitchen';
      case 'Bathroom Upgrade': return 'Bathroom';
      case 'Full Home Remodel': return 'Full Home';
      default: return '';
    }
  }

  // Filter contractors based on selections
  useEffect(() => {
    setLoading(true);
    const filtered = allContractors.filter(contractor => {
      const matchesProject = !filters.projectType || 
        contractor.specialties.includes(filters.projectType);
      const matchesBudget = !filters.budget || 
        contractor.budget === filters.budget;
      const matchesLocation = !filters.location || 
        contractor.location.toLowerCase().includes(filters.location.toLowerCase());
      return matchesProject && matchesBudget && matchesLocation;
    });
    
    setTimeout(() => {
      setContractors(filtered);
      setLoading(false);
    }, 500);
  }, [filters]);

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
            {i < rating ? (i + 1 <= rating ? '★' : '½') : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="contractor-page">
      <header className="page-header">
        <h1>Recommended Contractors for Your {renovationData.renovation_type || 'Project'}</h1>
        {renovationData.formattedAddress && (
          <p>Near {renovationData.formattedAddress}</p>
        )}
      </header>

      {/* Filters Section - Pre-populated from renovation data */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Project Type</label>
          <select 
            value={filters.projectType}
            onChange={(e) => setFilters({...filters, projectType: e.target.value})}
          >
            <option value="">All Projects</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Full Home">Full Home</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Budget Range</label>
          <select 
            value={filters.budget}
            onChange={(e) => setFilters({...filters, budget: e.target.value})}
          >
            <option value="">Any Budget</option>
            <option value="$0 - $5,000">$0 - $5,000</option>
            <option value="$5,000 - $15,000">$5,000 - $15,000</option>
            <option value="$15,000+">$15,000+</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <input 
            type="text" 
            placeholder="City or ZIP code"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        {loading ? (
          <div className="loading">Loading contractors...</div>
        ) : contractors.length === 0 ? (
          <div className="no-results">No contractors match your filters. Try adjusting your search.</div>
        ) : (
          <div className="contractor-grid">
            {contractors.map(contractor => (
              <div 
                key={contractor.id} 
                className="contractor-card"
                onClick={() => setSelectedContractor(contractor)}
              >
                <div 
                  className="contractor-image"
                  style={{ backgroundImage: `url(${contractor.image})` }}
                ></div>
                <div className="contractor-info">
                  <h3>{contractor.name}</h3>
                  <div className="specialties">{contractor.specialties.join(', ')}</div>
                  <div className="rating">
                    {renderStars(contractor.rating)}
                    <span>({contractor.reviews} reviews)</span>
                  </div>
                  <div className="location">{contractor.location}</div>
                  <div className="budget">{contractor.budget}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contractor Modal */}
      {selectedContractor && (
        <div className="contractor-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedContractor(null)}>×</button>
            
            <div className="modal-header">
              <div 
                className="contractor-image"
                style={{ backgroundImage: `url(${selectedContractor.image})` }}
              ></div>
              <div className="header-info">
                <h2>{selectedContractor.name}</h2>
                <div className="rating">
                  {renderStars(selectedContractor.rating)}
                  <span>({selectedContractor.reviews} reviews)</span>
                </div>
                <div className="specialties">Specializes in: {selectedContractor.specialties.join(', ')}</div>
                <div className="location">{selectedContractor.location}</div>
                <div className="budget">Typical project range: {selectedContractor.budget}</div>
              </div>
            </div>

            <div className="modal-section">
              <h3>Past Projects</h3>
              <div className="project-gallery">
                {selectedContractor.projects.map(project => (
                  <div key={project.id} className="project-item">
                    <div 
                      className="project-image"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                    <p>{project.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h3>Customer Testimonials</h3>
              <div className="testimonials">
                {selectedContractor.testimonials.map(testimonial => (
                  <div key={testimonial.id} className="testimonial">
                    <div className="testimonial-header">
                      <span className="author">{testimonial.author}</span>
                      <span className="rating">{renderStars(testimonial.rating)}</span>
                    </div>
                    <p className="text">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="contact-btn">Contact This Contractor</button>
              <button className="back-btn" onClick={() => setSelectedContractor(null)}>Back to List</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorPage;