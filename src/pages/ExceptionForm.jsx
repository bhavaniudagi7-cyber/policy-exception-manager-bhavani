import { useEffect, useState } from "react";
import axios from "axios";

function ExceptionForm({ selected, onSaved }) {
  const [policyName, setPolicyName] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selected) {
      setPolicyName(selected.policyName || "");
      setReason(selected.reason || "");
      setStatus(selected.status || "");
    }
  }, [selected]);

  function handleSubmit(e) {
    e.preventDefault();
    alert("Create button clicked");

    if (!policyName || !reason || !status) {
      alert("All fields are required");
      return;
    }

    const data = {
      policyName: policyName,
      reason: reason,
      status: status
    };

    axios
      .post("http://localhost:8081/exceptions", data)
      .then(() => {
        alert("Created Successfully");
        setPolicyName("");
        setReason("");
        setStatus("");
        onSaved();
      })
      .catch((error) => {
        console.log(error);
        alert("Create failed. Check backend.");
      });
  }

  return (
    <div className="mb-5 border p-4 rounded">
      <h2 className="text-xl font-bold mb-3">DAY 4 CREATE FORM</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Policy Name"
          className="border p-2 w-full mb-3"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reason"
          className="border p-2 w-full mb-3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <input
          type="text"
          placeholder="Status"
          className="border p-2 w-full mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default ExceptionForm;