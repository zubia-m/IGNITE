const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        query
      )}&inputtype=textquery&fields=formatted_address,name,geometry&key=YOUR_GOOGLE_API_KEY`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});