import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const RoiInsights = ({ houses }) => {
  if (!houses || houses.length === 0) return null;

  // Sort by price and select top 3 affordable options
  const top3 = [...houses]
    .filter(h => h.history && typeof h.history === "object")
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  // Create a dynamic market trend line using avg price per year
  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
  const validHouses = houses.filter(h => h.history && typeof h.history === "object");

  const trendData = years.map((year) => {
    const total = validHouses.reduce((acc, h) => acc + (h.history[year] || 0), 0);
    const avg = validHouses.length ? total / validHouses.length : 0;
    return { year, value: Math.round(avg) };
  });

  return (
    <div style={{ marginTop: "40px", color: "#362706", textAlign: "left" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>🏆 Top 3 Investment Picks</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={top3.map((h) => ({
            name: h.address.split(",")[0],
            price: h.price
          }))}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#A68A64" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "30px", fontSize: "1.2rem" }}>📈 Avg Market Price Trend (2020–2025)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={trendData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#362706"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoiInsights;