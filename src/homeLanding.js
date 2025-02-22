import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import only useNavigate

export default function HomeLanding() {
  const [location, setLocation] = useState("");
  const [houses, setHouses] = useState([]);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSearch = () => {
    setHouses([ // Hardcoded house data
      {
        name: "House 1",
        built: "1995",
        rooms: 3,
        bathrooms: 2,
        kitchen: 1,
        basement: 1,
        garage: true,
        lawn: true,
        renovationNeeded: true,
        renovationCost: "$20,000",
        valueIncrease: "$50,000",
        ROI: "150%",
        images: ["/house1-1.jpg", "/house1-2.jpg"],
      },
      {
        name: "House 2",
        built: "2005",
        rooms: 4,
        bathrooms: 3,
        kitchen: 1,
        garage: false,
        lawn: true,
        renovationNeeded: false,
        renovationCost: "$0",
        valueIncrease: "$0",
        ROI: "0%",
        images: ["/house2-1.jpg", "/house2-2.jpg"],
      },
    ]);
    setSearched(true);
  };

  const handleSignIn = () => {
    navigate("/signin"); // Navigate to the Sign In page when clicked
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-xl bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800">Find Your Dream Home</h1>
          <div className="mt-6 flex items-center border border-gray-300 bg-white rounded-lg shadow-sm p-2">
            <TextField
              type="text"
              placeholder="Enter your home address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button className="ml-2" size="small" onClick={handleSearch} disabled={!location.trim()}>
              <FaSearch />
            </Button>
          </div>
        </div>

        {searched && (
          <div className="mt-[37.8px] w-full max-w-xl bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Search Results</h2>
            <div className="mt-4">
              {houses.map((house, index) => (
                <div key={index} className="border-b p-4 text-center">
                  <h3 className="text-xl font-semibold">{house.name}</h3>
                  <p>{house.built} | {house.rooms} Rooms | {house.bathrooms} Bathrooms</p>
                  <p>Renovation Needed: {house.renovationNeeded ? "Yes" : "No"}</p>
                  <Button variant="outlined" className="mt-2">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
