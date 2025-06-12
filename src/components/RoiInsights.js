import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart
} from "recharts";
import "./RoiInsights.css"; // Importing the new CSS file

const RoiInsights = ({ houses }) => {
  // ✅ Sample trend data
const trendData = [
  { year: "2020", value: 100000 },
  { year: "2021", value: 110000 },
  { year: "2022", value: 125000 },
  { year: "2023", value: 140000 },
  { year: "2024", value: 155000 },
  { year: "2025", value: 170000 },
];

  if (!houses || houses.length === 0) return null;

  // Filter houses with a numeric 'roi' field, sort descending by roi, get top 3
  const top3 = [...houses]
    .filter(h => typeof h.roi === "number")
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 3);

  if (top3.length === 0) return <p>No houses with ROI data available.</p>;

  return (
    <div className="roi-container">
      <h2 className="roi-heading">🏆 Top 3 Investment Picks</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={top3.map(h => ({
            name: h.address.split(",")[0], // first part of address for label
            roi: h.roi,
          }))}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={value => `${value}% ROI`} />
          <Bar dataKey="roi" fill="#A68A64" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="roi-subheading">📈 Avg Market Price Trend (2020–2025)</h3>
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