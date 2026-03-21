import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 48px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 64, width: "100%", flexWrap: "wrap" }}>

          {/* LEFT: Text */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 16 }}>
              <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
              E-Learning
            </div>

            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(34px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 16 }}>
              Learn Financial Laws{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>the Fun Way</em>
            </h1>

            <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 480, marginBottom: 32 }}>
              Master Indian Financial & Legal frameworks — from household economics to capital markets — through structured, bite-sized learning. Certified by SGT University × LexFin.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setLocation("/module/1/learn")}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", background: "#5A4FD6", color: "#fff",
                  border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  transition: "background .2s, transform .15s",
                  boxShadow: "0 4px 16px rgba(90,79,214,.35)",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "#3D34A5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#5A4FD6"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Start Learning Now
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <button
                onClick={() => setLocation("/courses")}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", background: "transparent", color: "#5A4FD6",
                  border: "1.5px solid #5A4FD6", borderRadius: 10, fontSize: 15, fontWeight: 500,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  transition: "all .2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "#EAE8FB"; }}
                onMouseOut={e => { e.currentTarget.style.background = "transparent"; }}
              >
                View Courses
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
              {[
                { val: "6", label: "Modules" },
                { val: "30 hrs", label: "Content" },
                { val: "SGT University", label: "Certificate" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C1A28" }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "#9A97A8", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image */}
          <div style={{ flex: "0 0 auto", position: "relative", maxWidth: 460 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(90,79,214,.15) 0%, rgba(201,147,58,.12) 100%)", borderRadius: "3rem", transform: "rotate(3deg) scale(1.05)" }} />
            <img
              src={`${import.meta.env.BASE_URL}images/hero-illustration.png`}
              alt="LexFin — Financial Literacy"
              style={{ position: "relative", zIndex: 1, width: "100%", height: "auto", borderRadius: "2rem", border: "4px solid #fff", boxShadow: "0 24px 64px rgba(28,26,40,.15)", display: "block" }}
            />
          </div>
        </div>

        {/* Bottom row: affiliations */}
        <div style={{ marginTop: 60, width: "100%", display: "flex", alignItems: "center", gap: 10, background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 12, padding: "14px 24px" }}>
          <div style={{ width: 32, height: 32, background: "#5A4FD6", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="9" r="7"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <p style={{ fontSize: 13, color: "#5A576B" }}>
            All courses affiliated with <strong style={{ color: "#1C1A28" }}>SGT University, Faculty of Law</strong> — Joint certification with LexFin
          </p>
        </div>
      </main>
    </div>
  );
}
