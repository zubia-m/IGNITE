const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON request bodies

const PORT = process.env.PORT || 5000;

// Google Places API Route
app.get("/api/place", async (req, res) => {
  const { input } = req.query;
  if (!input) return res.status(400).json({ error: "Input is required" });

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input)}&inputtype=textquery&fields=formatted_address,name,geometry&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.candidates?.[0] || { error: "No results found" });
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// -----------------------------------------------------------------------
// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch");
// require("dotenv").config();

// const app = express();
// app.use(cors());

// app.get("/api/search", async (req, res) => {
//     const { query } = req.query;
//     const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=formatted_address,name,geometry&key=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching data" });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
