import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const RoiInsights = ({ houses }) => {
  if (!houses.length) return null;

  // Sort by price or ROI placeholder logic
  const top3 = [...houses].sort((a, b) => a.price - b.price).slice(0, 3);

  // Placeholder growth data
  const growthData = [
    { year: '2020', value: 100 },
    { year: '2021', value: 110 },
    { year: '2022', value: 130 },
    { year: '2023', value: 160 },
    { year: '2024', value: 185 }
  ];

  return (
    <div style={{ marginTop: "40px", textAlign: "left" }}>
      <h2>🏆 Top 3 Investment Picks</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={top3.map(h => ({ name: h.address.split(",")[0], price: h.price }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "30px" }}>📈 Market Growth History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={growthData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ marginTop: "30px", background: "#3b3b3b", padding: "20px", borderRadius: "12px" }}>
        <h3>🤖 AI Insight Summary</h3>
        <p>
          Based on current market trends and affordability, we recommend investing in{" "}
          <strong>{top3[0].address.split(",")[0]}</strong> due to its price-performance ratio
          and rental potential. Townhouses are showing steady appreciation in the area.
        </p>
      </div>
    </div>
  );
};

export default RoiInsights;