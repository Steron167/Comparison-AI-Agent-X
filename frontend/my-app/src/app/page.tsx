"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [competitor, setCompetitor] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleTrack = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://hackathon-agent-final.onrender.com/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, competitor }),
      });
      const json = await res.json();
      setData(json);
    } catch (e) {
      alert("Backend waking up, try again in 30 sec (Render free tier)");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <h1>🔍 Research & Competitor Tracking Agent</h1>
      <p style={{ color: "#aaa" }}>Autonomous AI for real-time insights</p>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <input
          placeholder="What to track? e.g., Generative AI in Drug Discovery"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 2, padding: 12, borderRadius: 8, border: "none" }}
        />
        <input
          placeholder="Competitor e.g., DeepMind"
          value={competitor}
          onChange={(e) => setCompetitor(e.target.value)}
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "none" }}
        />
        <button onClick={handleTrack} style={{ padding: "12px 24px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          {loading ? "Tracking..." : "Track Now"}
        </button>
      </div>

      {data && (
        <div style={{ marginTop: 30 }}>
          <div style={{ background: "#1a1a1a", padding: 20, borderRadius: 12, whiteSpace: "pre-wrap" }}>
            <h2>💡 Actionable Insights</h2>
            <p>{data.insights}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15, marginTop: 20 }}>
            <div style={{ background: "#1a1a1a", padding: 15, borderRadius: 12 }}>
              <h3>📚 Research</h3>
              <p style={{ fontSize: 12, color: "#aaa" }}>{JSON.stringify(data.research?.data?.results?.slice(0,2) || data.research, null, 2).slice(0, 800)}</p>
            </div>
            <div style={{ background: "#1a1a1a", padding: 15, borderRadius: 12 }}>
              <h3>📜 Patents</h3>
              <p style={{ fontSize: 12, color: "#aaa" }}>{JSON.stringify(data.patents?.data?.results?.slice(0,2) || data.patents, null, 2).slice(0, 800)}</p>
            </div>
            <div style={{ background: "#1a1a1a", padding: 15, borderRadius: 12 }}>
              <h3>🏢 Competitor</h3>
              <p style={{ fontSize: 12, color: "#aaa" }}>{JSON.stringify(data.competitor_data?.data?.results?.slice(0,2) || data.competitor_data || data.industry, null, 2).slice(0, 800)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}