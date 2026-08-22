"use client";
import { useState } from "react";

export default function Home() {
  const [goal, setGoal] = useState("");
  const [logs, setLogs] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const solve = async () => {
    if(!goal) return;
    setLoading(true); setLogs([]); setAnswer(""); setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/solve", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      setLogs(data.logs || []); 
      setAnswer(data.answer);
    } catch (e: any) {
      setError("BACKEND NOT CONNECTED. Make sure backend is running on port 8000. " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", padding: 24, fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800 }}>🤖 Laptop Finder Agent</h1>
        <p style={{ color: "#888", marginBottom: 20 }}>Powered by Agentic Search | <a href="http://127.0.0.1:8000" target="_blank" style={{color: "#60a5fa"}}>Backend: {error ? "Offline 🔴" : "Live 🟢"}</a></p>
        
        <div style={{ background: "#1a1a1a", padding: 20, borderRadius: 16, border: "1px solid #333" }}>
          <textarea 
            value={goal} 
            onChange={e => setGoal(e.target.value)} 
            rows={3} 
            style={{ width: "100%", background: "#000", color: "#fff", border: "1px solid #444", padding: 14, borderRadius: 12, fontSize: 16, outline: "none" }} 
            placeholder="e.g., Best laptop under 60000 for programming students, compare battery" 
          />
          <button onClick={solve} disabled={loading} style={{ marginTop: 12, width: "100%", padding: "14px 20px", background: loading? "#333" : "#fff", color: loading? "#888" : "#000", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", border: "none" }}>
            {loading? "⏳ Agent Thinking..." : "🚀 Run Agent"}
          </button>
        </div>

        {error && <div style={{ background: "#2a1111", border: "1px solid #ff4444", color: "#ffaaaa", padding: 15, marginTop: 20, borderRadius: 12 }}>{error}</div>}
        
        {logs.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ color: "#aaa", fontSize: 14, letterSpacing: 2 }}>AGENT THOUGHT PROCESS</h3>
            {logs.map((l,i) => <div key={i} style={{ background: "#111", borderLeft: "3px solid #60a5fa", padding: 12, marginTop: 8, borderRadius: 8, fontSize: 13, color: "#ccc", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{l}</div>)}
          </div>
        )}

        {answer && (
          <div style={{ marginTop: 24, background: "#fff", color: "#000", padding: 20, borderRadius: 16 }}>
            <h3 style={{ marginTop: 0 }}>✨ Final Recommendation</h3>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 15 }}>{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
}