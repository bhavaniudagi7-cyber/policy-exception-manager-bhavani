import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await api.get("/exceptions/stats");
      setStats(response.data);
    } catch (error) {
      console.log("Stats API error", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = [
    { name: "Open", value: stats.open },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h3>Total</h3>
          <h2>{stats.total}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Open</h3>
          <h2>{stats.open}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Approved</h3>
          <h2>{stats.approved}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Rejected</h3>
          <h2>{stats.rejected}</h2>
        </div>
      </div>

      <h3>Status Chart</h3>

      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  width: "160px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default Dashboard;