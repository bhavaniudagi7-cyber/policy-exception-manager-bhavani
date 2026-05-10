import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ExceptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exception, setException] = useState(null);

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
          {exception.riskLevel}
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