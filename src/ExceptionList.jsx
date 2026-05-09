import { useEffect, useState } from "react";
import axios from "axios";
import ExceptionForm from "./ExceptionForm";

function ExceptionList() {
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  function loadData() {
    setLoading(true);

    axios
      .get("http://localhost:8081/exceptions")
      .then((res) => setExceptions(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleSearch() {
    setLoading(true);

    axios
      .get(`http://localhost:8081/exceptions/search?q=${query}`)
      .then((res) => setExceptions(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8081/exceptions/${id}`)
      .then(() => loadData())
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-5">
      <ExceptionForm
        selected={selected}
        onSaved={() => {
          setSelected(null);
          loadData();
        }}
      />

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Search policy name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2" onClick={handleSearch}>
          Search
        </button>

        <button className="bg-gray-600 text-white px-4 py-2" onClick={loadData}>
          Reset
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Policy Exceptions</h1>

      {loading && <p>Loading...</p>}

      {!loading && exceptions.length === 0 && <p>No Data Found</p>}

      {!loading && exceptions.length > 0 && (
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Policy Name</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {exceptions.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.policyName}</td>
                <td className="border p-2">{item.reason}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 mr-2" onClick={() => setSelected(item)}>
                    Edit
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExceptionList;