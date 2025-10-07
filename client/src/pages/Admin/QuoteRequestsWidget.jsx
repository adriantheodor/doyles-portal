// client/src/components/admin/QuoteRequestsWidget.jsx
import { useEffect, useState } from "react";

export default function QuoteRequestsWidget() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("/api/quotes", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    if (res.ok) {
      const data = await res.json();
      setRequests(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status })
    });
    if (res.ok) fetchRequests();
  };

  useEffect(() => { fetchRequests(); }, []);

  if (loading) return <p>Loading quote requests…</p>;

  return (
    <section style={{border:'1px solid #ddd', borderRadius:8, padding:'1rem'}}>
      <h2>New Quote Requests</h2>
      {requests.length === 0 && <p>No requests yet.</p>}
      <ul style={{listStyle:'none', padding:0, margin:0}}>
        {requests.map(r => (
          <li key={r._id} style={{marginBottom:'1rem', padding:'0.5rem', borderBottom:'1px solid #eee'}}>
            <strong>{r.companyName}</strong> — {r.contactName} ({r.email})
            <p style={{margin:'0.2rem 0'}}>Services: {r.services.join(", ")}</p>
            <p>Status: <em>{r.status}</em></p>
            <div style={{display:'flex', gap:'0.5rem'}}>
              {["contacted","scheduled","closed"].map(st => (
                <button key={st} onClick={() => updateStatus(r._id, st)}>
                  Mark {st}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
