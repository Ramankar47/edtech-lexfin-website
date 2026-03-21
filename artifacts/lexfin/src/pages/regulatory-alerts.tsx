import { GlobalHeader } from "@/components/GlobalHeader";

export default function RegulatoryAlertsPage() {
  const categories = [
    { icon: "🏦", org: "RBI", name: "Reserve Bank of India", desc: "Monetary policy, digital lending guidelines, and banking circulars." },
    { icon: "📈", org: "SEBI", name: "Securities & Exchange Board of India", desc: "Market regulations, insider trading rules, investor protection updates." },
    { icon: "🛡️", org: "IRDAI", name: "Insurance Regulatory Authority", desc: "Insurance product norms, grievance redressal, claim settlement updates." },
    { icon: "⚖️", org: "MCA", name: "Ministry of Corporate Affairs", desc: "Company law amendments, compliance filings, and corporate governance." },
    { icon: "💰", org: "CBDT", name: "Central Board of Direct Taxes", desc: "Income tax circulars, AIS/TIS updates, new ITR forms and deadlines." },
    { icon: "🌐", org: "GSTN", name: "GST Network", desc: "GST rate changes, return filing updates, and ITC reconciliation guidance." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 20 }}>
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Stay Updated
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 16 }}>
            Regulatory <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Alerts</em>
          </h1>
          <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
            Stay on top of the latest regulatory changes from India's financial and legal bodies. Alerts coming soon.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {categories.map(c => (
            <div key={c.org} style={{ background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 18 }}>
              <div style={{ width: 48, height: 48, background: "#EAE8FB", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: "#1C1A28" }}>{c.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#5A4FD6", background: "#EAE8FB", borderRadius: 100, padding: "2px 10px", letterSpacing: ".04em" }}>{c.org}</span>
                </div>
                <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
              <div style={{ fontSize: 11, color: "#9A97A8", fontWeight: 500, whiteSpace: "nowrap", marginTop: 4 }}>No alerts yet</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
