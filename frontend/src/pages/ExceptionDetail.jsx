import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ExceptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exception, setException] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiError, setAiError] = useState("");

  const fetchDetail = async () => {
    try {
      const response = await api.get(`/exceptions/${id}`);
      setException(response.data);
    } catch (error) {
      console.log("Detail API error", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/exceptions/${id}`);
      alert("Deleted successfully");
      navigate("/exceptions");
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleAiRecommendation = async () => {
    setAiLoading(true);
    setAiError("");
    setAiResponse(null);

    try {
      // Demo AI response card for Day 8 UI
      setTimeout(() => {
        setAiResponse({
          title: "AI Recommendation",
          summary: "This policy exception should be reviewed carefully before approval.",
          recommendation:
            "Check business justification, risk level, approval owner, and expiry date before final decision.",
          priority: exception.status === "OPEN" ? "HIGH" : "MEDIUM",
        });
        setAiLoading(false);
      }, 1000);
    } catch (error) {
      setAiError("Failed to generate AI recommendation");
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (!exception) {
    return <p style={{ padding: "30px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Policy Exception Detail</h2>

      <p><b>ID:</b> {exception.id}</p>
      <p><b>Title:</b> {exception.title}</p>
      <p><b>Description:</b> {exception.description}</p>
      <p><b>Status:</b> {exception.status}</p>

      <p>
        <b>Risk Score:</b>{" "}
        <span style={badgeStyle(exception.riskLevel)}>
          {exception.riskLevel || "LOW"}
        </span>
      </p>

      <button onClick={() => navigate(`/edit/${id}`)}>
        Edit
      </button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>AI Panel</h3>

      <button onClick={handleAiRecommendation} disabled={aiLoading}>
        Generate AI Recommendation
      </button>

      {aiLoading && (
        <p style={{ marginTop: "15px", color: "blue" }}>
          Loading AI response...
        </p>
      )}

      {aiError && (
        <p style={{ marginTop: "15px", color: "red" }}>
          {aiError}
        </p>
      )}

      {aiResponse && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
          }}
        >
          <h4>{aiResponse.title}</h4>
          <p><b>Summary:</b> {aiResponse.summary}</p>
          <p><b>Recommendation:</b> {aiResponse.recommendation}</p>
          <p>
            <b>Priority:</b>{" "}
            <span style={badgeStyle(aiResponse.priority)}>
              {aiResponse.priority}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

const badgeStyle = (risk) => ({
  padding: "6px 12px",
  borderRadius: "20px",
  color: "white",
  backgroundColor:
    risk === "HIGH" ? "red" :
    risk === "MEDIUM" ? "orange" :
    "green",
});

export default ExceptionDetail;