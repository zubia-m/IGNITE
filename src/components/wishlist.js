import React from "react";
import { useWishlist } from "../context/wishlistcontext";
import "./wishlist.css"; // Import the CSS file

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-header">Your Wishlist <span>🏡</span></h2>

      {wishlist.length === 0 ? (
        <p className="wishlist-empty">No properties in your wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((house, index) => (
            <div key={index} className="wishlist-card">
              <img
                src={house.image || "/placeholder.jpg"}
                alt={`House at ${house.address}`}
                className="property-image"
              />
              <div className="property-details">
                <h3 className="property-address">{house.address}</h3>
                <p className="property-info"><strong>Price:</strong> ${house.price?.toLocaleString()}</p>
                <p className="property-info"><strong>Estimated Rent:</strong> ${house.rentEstimate}</p>
                <p className="property-info"><strong>ROI:</strong> {house.roi}</p>
                <button
                  onClick={() => removeFromWishlist(house.address)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;