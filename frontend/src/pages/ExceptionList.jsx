import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ExceptionList() {
  const [exceptions, setExceptions] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { logout } = useAuth();

  const fetchExceptions = async () => {
    try {
      const response = await api.get("/exceptions/filter", {
        params: {
          q: search,
          status: status,
          startDate: startDate,
          endDate: endDate,
          page: page,
          size: size,
        },
      });

      setExceptions(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
      setError("");
    } catch (err) {
      setError("Failed to load policy exceptions");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExceptions();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, startDate, endDate, page]);

  return (
    <div style={{ padding: "30px" }}>
      <button onClick={logout}>Logout</button>

      <h2>Policy Exceptions</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by reason"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setPage(0);
          }}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setPage(0);
          }}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button
          onClick={() => {
            setSearch("");
            setStatus("");
            setStartDate("");
            setEndDate("");
            setPage(0);
          }}
        >
          Clear
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reason</th>
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
                <td>{item.reason}</td>
                <td>{item.status}</td>
                <td>{item.riskLevel || "LOW"}</td>

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

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
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