"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [competitor, setCompetitor] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function track() {
    if (!query || !competitor) { alert("Fill both fields"); return; }
    setLoading(true);
    setOut("");
    try {
      const res = await fetch("http://localhost:8000/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, competitor }),
      });
      const data = await res.json();
      setOut(data.insights || JSON.stringify(data, null, 2));
    } catch (e) {
      alert("Start backend first! " + e);
    }
    setLoading(false);
  }

    return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20, fontFamily: "system-ui", minHeight: "100vh", background: "#fafafa", color: "#000" }}>
      <h1 style={{ textAlign: "center", color: "#000" }}>🔍 Research Agent</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Track any topic + competitor</p>
      
      <div style={{ background: "#fff", padding: 24, borderRadius: 16, boxShadow: "0 4px 20px #0001" }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Topic: e.g. Generative AI"
          style={{ width: "100%", padding: 14, margin: "8px 0", borderRadius: 10, border: "1px solid #ddd", fontSize: 16, background: "#fff", color: "#000" }} />
        <input value={competitor} onChange={e => setCompetitor(e.target.value)} placeholder="Competitor: e.g. OpenAI"
          style={{ width: "100%", padding: 14, margin: "8px 0", borderRadius: 10, border: "1px solid #ddd", fontSize: 16, background: "#fff", color: "#000" }} />
        <button onClick={track} style={{ width: "100%", padding: 14, marginTop: 10, borderRadius: 10, background: "#000", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 16 }}>
          Track Research
        </button>
      </div>

      {loading && <div style={{ textAlign: "center", marginTop: 20, color: "#000" }}>⏳ Researching... 10 sec</div>}
      {out && <div style={{ whiteSpace: "pre-wrap", background: "#fff", color: "#000", padding: 20, borderRadius: 16, marginTop: 20, lineHeight: 1.7, boxShadow: "0 4px 20px #0001", border: "1px solid #eee" }}>{out}</div>}
    </div>
  );
}