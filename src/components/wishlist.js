// src/pages/wishlist.js
import React from "react";
import { useWishlist } from "../context/wishlistcontext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="p-6 text-espresso min-h-screen bg-[#F6EEE0]">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist 🏡</h2>

      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-600">No properties in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((house, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={house.image || "/placeholder.jpg"} // fallback image
                alt={`House at ${house.address}`}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-xl font-semibold">{house.address}</h3>
              <p className="text-gray-700">Price: ${house.price?.toLocaleString()}</p>
              <p className="text-gray-700">Estimated Rent: ${house.rentEstimate}</p>
              <p className="text-gray-700">ROI: {house.roi}</p>
              <button
                onClick={() => removeFromWishlist(house.address)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;