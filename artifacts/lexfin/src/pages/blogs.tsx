import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";

const CATEGORIES = [
  {
    key: "academicians",
    label: "From Academicians",
    desc: "Insights and perspectives from faculty, professors, and legal experts affiliated with LexFin and SGT University.",
    icon: "⚖️",
  },
  {
    key: "students",
    label: "From Students",
    desc: "Reflections, case analyses, and learnings shared by our student community.",
    icon: "🎓",
  },
  {
    key: "case-studies",
    label: "Case Studies",
    desc: "Deep-dive analyses of landmark financial and legal cases from across India.",
    icon: "📋",
    soon: true,
  },
  {
    key: "regulatory-updates",
    label: "Regulatory Updates",
    desc: "Plain-language summaries of recent RBI, SEBI, IRDAI, and CBDT circulars.",
    icon: "📡",
    soon: true,
  },
];

export default function BlogsPage() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "72px 48px 100px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 20 }}>
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Knowledge Hub
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 14, lineHeight: 1.1 }}>
            Blogs &amp; <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Insights</em>
          </h1>
          <p style={{ fontSize: 15, color: "#5A576B", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
            Expert articles from academicians, legal practitioners, and student contributors.
          </p>
        </div>

        {/* Category grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.key}
              onClick={() => !cat.soon && setLocation(`/blogs/${cat.key}`)}
              style={{
                background: "#FAFAF7",
                border: "1.5px solid #E0DCCE",
                borderRadius: 16,
                padding: "28px 26px 24px",
                cursor: cat.soon ? "default" : "pointer",
                transition: "all .22s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={e => {
                if (!cat.soon) {
                  e.currentTarget.style.borderColor = "#5A4FD6";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(90,79,214,.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = "#E0DCCE";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {cat.soon && (
                <div style={{ position: "absolute", top: 14, right: 14, fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "#9A97A8", background: "#F0EDE6", borderRadius: 100, padding: "3px 10px", border: "1px solid #E0DCCE" }}>
                  Coming soon
                </div>
              )}

              <div style={{ width: 48, height: 48, background: "#EAE8FB", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18 }}>
                {cat.icon}
              </div>

              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: cat.soon ? "#C8C5D8" : "#1C1A28", marginBottom: 8, lineHeight: 1.25 }}>{cat.label}</h3>
              <p style={{ fontSize: 13.5, color: cat.soon ? "#C8C5D8" : "#5A576B", lineHeight: 1.65, margin: 0 }}>{cat.desc}</p>

              {!cat.soon && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 20, fontSize: 13, color: "#5A4FD6", fontWeight: 600 }}>
                  Explore
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
