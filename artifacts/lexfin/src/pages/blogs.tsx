import { GlobalHeader } from "@/components/GlobalHeader";

export default function BlogsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 20 }}>
          <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
          Knowledge Hub
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 16 }}>
          Blogs & <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Insights</em>
        </h1>
        <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 500, margin: "0 auto 48px" }}>
          Expert articles from academicians, legal practitioners, and student contributors — coming soon.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {["From Academicians", "From Students", "Case Studies", "Regulatory Updates"].map(cat => (
            <div key={cat} style={{ background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 16, padding: "32px 24px", textAlign: "left" }}>
              <div style={{ width: 48, height: 48, background: "#EAE8FB", borderRadius: 12, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: "#1C1A28", marginBottom: 8 }}>{cat}</h3>
              <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6 }}>Content coming soon. Stay tuned for expert insights.</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
