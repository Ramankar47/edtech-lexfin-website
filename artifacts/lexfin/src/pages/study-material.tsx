import { GlobalHeader } from "@/components/GlobalHeader";

export default function StudyMaterialPage() {
  const materials = [
    { icon: "📄", title: "Module PDFs", desc: "Downloadable reading materials for all 6 modules." },
    { icon: "📊", title: "Case Study Worksheets", desc: "Practical worksheets aligned with each module." },
    { icon: "⚖️", title: "Landmark Judgments", desc: "Key case laws on banking fraud, insurance disputes, and tax evasion." },
    { icon: "📋", title: "Compliance Checklists", desc: "Personal legal compliance checklists for ITR, GST, loans, and more." },
    { icon: "🎥", title: "Video Lectures", desc: "Recorded masterclasses from legal and finance experts." },
    { icon: "📖", title: "Glossary", desc: "A comprehensive glossary of financial and legal terms." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 20 }}>
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Resources
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 16 }}>
            Study <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Material</em>
          </h1>
          <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 500, margin: "0 auto" }}>
            All the resources you need to master Indian Financial & Legal Literacy — coming soon.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {materials.map(m => (
            <div key={m.title} style={{ background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{m.icon}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: "#1C1A28", marginBottom: 8 }}>{m.title}</h3>
              <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6 }}>{m.desc}</p>
              <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A97A8", fontWeight: 500 }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
