import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ExceptionList() {
  const [exceptions, setExceptions] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const { logout } = useAuth();

  const fetchExceptions = async () => {
    try {
      const response = await api.get(
        `/exceptions/all?page=${page}&size=${size}`
      );

      setExceptions(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
      setError("");
    } catch (err) {
      setError("Failed to load policy exceptions");
    }
  };

  useEffect(() => {
    fetchExceptions();
  }, [page]);

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={logout}>Logout</button>

      <h2>Policy Exceptions</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Risk Level</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {exceptions.length === 0 ? (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          ) : (
            exceptions.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.status}</td>
                <td>{item.riskLevel}</td>

                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/exceptions/${item.id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span style={{ margin: "0 15px" }}>
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default ExceptionList;