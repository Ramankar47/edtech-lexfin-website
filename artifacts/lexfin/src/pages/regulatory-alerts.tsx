import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

type Alert = {
  id: string;
  org: string;
  orgColor: string;
  date: string;
  title: string;
  summary: string;
  tag: string;
  link?: string;
};

type Category = {
  icon: string;
  org: string;
  name: string;
  desc: string;
  color: string;
  count: number;
};

const CATEGORIES_BASE: Category[] = [
  {
    icon: "🏦",
    org: "RBI",
    name: "Reserve Bank of India",
    desc: "Monetary policy, digital lending guidelines, and banking circulars.",
    color: "#2563EB",
    count: 0,
  },
  {
    icon: "📈",
    org: "SEBI",
    name: "Securities & Exchange Board of India",
    desc: "Market regulations, insider trading rules, investor protection updates.",
    color: "#16A34A",
    count: 0,
  },
  {
    icon: "🛡️",
    org: "IRDAI",
    name: "Insurance Regulatory Authority",
    desc: "Insurance product norms, grievance redressal, claim settlement updates.",
    color: "#9333EA",
    count: 0,
  },
  {
    icon: "⚖️",
    org: "MCA",
    name: "Ministry of Corporate Affairs",
    desc: "Company law amendments, compliance filings, and corporate governance.",
    color: "#B45309",
    count: 0,
  },
  {
    icon: "💰",
    org: "CBDT",
    name: "Central Board of Direct Taxes",
    desc: "Income tax circulars, AIS/TIS updates, new ITR forms and deadlines.",
    color: "#DC2626",
    count: 0,
  },
  {
    icon: "🌐",
    org: "GSTN",
    name: "GST Network",
    desc: "GST rate changes, return filing updates, and ITC reconciliation guidance.",
    color: "#0891B2",
    count: 0,
  },
];

const ALERTS: Alert[] = [
  {
    id: "rbi-2026-1",
    org: "RBI",
    orgColor: "#2563EB",
    date: "January 2026",
    title: "RBI Amendments on NBFC Capital Adequacy & Risk Framework",
    summary:
      "In January 2026, RBI issued amendments to NBFC prudential norms and capital adequacy frameworks, refining risk weights and improving consistency in lending to infrastructure projects. These changes aim to strengthen financial stability and risk management. The Reserve Bank of India (RBI) has significantly strengthened the regulatory framework for Non-Banking Financial Companies (NBFCs) through its Scale-Based Regulation (SBR) approach, which classifies NBFCs into different layers based on size and systemic importance. Under this framework, higher-layer NBFCs are subject to stricter capital adequacy.",
    tag: "Banking",
  },
  {
    id: "sebi-2026-1",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "February 2026",
    title: "SEBI (LODR) Amendment Regulations, 2026",
    summary:
      "In February 2026, SEBI introduced amendments to the Listing Obligations and Disclosure Requirements (LODR) Regulations, emphasizing enhanced transparency and corporate governance for listed entities. These amendments require companies to provide more detailed disclosures regarding related-party transactions and ESG (Environmental, Social, and Governance) metrics. The new rules also aim to streamline the process for rights issues and public offerings, reducing the compliance burden for smaller listed companies while maintaining high standards of investor protection.",
    tag: "Securities",
  },
  {
    id: "ibbi-2026-1",
    org: "IBBI",
    orgColor: "#9333EA",
    date: "March 2026",
    title: "IBBI Updated Guidelines for Resolution Professionals",
    summary:
      "In March 2026, the Insolvency and Bankruptcy Board of India (IBBI) issued updated guidelines for Resolution Professionals (RPs) to improve the efficiency and transparency of the Corporate Insolvency Resolution Process (CIRP). The new guidelines provide clearer instructions on the valuation of assets, the conduct of committee of creditors (CoC) meetings, and the timely submission of resolution plans. Additionally, IBBI has introduced a standardized reporting format for RPs to ensure consistency across different insolvency cases.",
    tag: "Insolvency",
  },
  {
    id: "cbdt-2026-1",
    org: "CBDT",
    orgColor: "#DC2626",
    date: "January 2026",
    title: "CBDT Notification on New ITR Forms (AY 2026-27)",
    summary:
      "The Central Board of Direct Taxes (CBDT) has notified the new Income Tax Return (ITR) forms for the Assessment Year 2026-27. These forms include additional sections for disclosing income from virtual digital assets (VDAs) and foreign assets. The CBDT has also simplified the process for claiming tax deductions under various sections of the Income Tax Act, aiming to make tax filing more user-friendly and reduce the scope for errors. The new forms are expected to facilitate faster processing of returns and quicker issuance of tax refunds.",
    tag: "Taxation",
  },
];

const CATEGORIES = CATEGORIES_BASE.map(cat => ({
  ...cat,
  count: ALERTS.filter(a => a.org === cat.org).length
}));

export default function RegulatoryAlertsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeMonth, setActiveMonth] = useState<string>("All");

  const orgFilters = ["All", ...CATEGORIES.map((c) => c.org)];
  const monthFilters = ["All", "January", "February", "March"];

  const filteredAlerts = ALERTS.filter((alert) => {
    const matchesOrg = activeFilter === "All" || alert.org === activeFilter;
    const matchesMonth = 
      activeMonth === "All" || 
      alert.date.toLowerCase().includes(activeMonth.toLowerCase()) ||
      (activeMonth.length >= 3 && alert.date.toLowerCase().startsWith(activeMonth.toLowerCase().substring(0, 3)));
    return matchesOrg && matchesMonth;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <GlobalHeader />

      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "72px 48px 100px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "#5A4FD6",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#5A4FD6",
                borderRadius: 2,
              }}
            />
            Stay Updated
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 4.5vw, 50px)",
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: "#1C1A28",
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            Regulatory{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>
              Alerts
            </em>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#5A576B",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Track the latest circulars, notifications, and policy updates from
            India's financial and legal regulators — all in one place.
          </p>
        </div>

        {/* Regulator cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 52,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.org}
              onClick={() =>
                setActiveFilter(activeFilter === cat.org ? "All" : cat.org)
              }
              style={{
                background: activeFilter === cat.org ? "#1C1A28" : "#FAFAF7",
                border: `1.5px solid ${activeFilter === cat.org ? "#1C1A28" : "#E0DCCE"}`,
                borderRadius: 14,
                padding: "18px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                cursor: "pointer",
                textAlign: "left",
                transition: "all .18s",
              }}
              onMouseOver={(e) => {
                if (activeFilter !== cat.org) {
                  e.currentTarget.style.borderColor = "#5A4FD6";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(90,79,214,.1)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseOut={(e) => {
                if (activeFilter !== cat.org) {
                  e.currentTarget.style.borderColor = "#E0DCCE";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background:
                    activeFilter === cat.org
                      ? "rgba(255,255,255,.1)"
                      : "#EAE8FB",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {cat.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: activeFilter === cat.org ? "#fff" : "#1C1A28",
                    }}
                  >
                    {cat.org}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color:
                        activeFilter === cat.org ? "#EAE8FB" : cat.color,
                      background:
                        activeFilter === cat.org
                          ? "rgba(255,255,255,.12)"
                          : "#EAE8FB",
                      borderRadius: 100,
                      padding: "1px 8px",
                      letterSpacing: ".04em",
                    }}
                  >
                    {cat.count} alert{cat.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11.5,
                    color: activeFilter === cat.org ? "#B8B4D4" : "#5A576B",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cat.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: 13, color: "#9A97A8", fontWeight: 500, marginRight: 4 }}
          >
            Regulator:
          </span>
          {orgFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "6px 16px",
                borderRadius: 100,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all .15s",
                fontFamily: "'DM Sans', sans-serif",
                background: activeFilter === f ? "#5A4FD6" : "transparent",
                borderColor: activeFilter === f ? "#5A4FD6" : "#E0DCCE",
                color: activeFilter === f ? "#fff" : "#5A576B",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Month Filter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: 13, color: "#9A97A8", fontWeight: 500, marginRight: 4 }}
          >
            Month:
          </span>
          {monthFilters.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "6px 16px",
                borderRadius: 100,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all .15s",
                fontFamily: "'DM Sans', sans-serif",
                background: activeMonth === m ? "#1C1A28" : "transparent",
                borderColor: activeMonth === m ? "#1C1A28" : "#E0DCCE",
                color: activeMonth === m ? "#fff" : "#5A576B",
              }}
            >
              {m === "All" ? "All Months" : m}
            </button>
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: "#9A97A8",
              whiteSpace: "nowrap",
            }}
          >
            {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Alert list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: "#FAFAF7",
                border: "1.5px solid #E0DCCE",
                borderRadius: 14,
                padding: "20px 24px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                transition: "box-shadow .18s, transform .18s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(28,26,40,.07)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Org badge */}
              <div
                style={{
                  minWidth: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "#EAE8FB",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: ".05em",
                    color: alert.orgColor,
                  }}
                >
                  {alert.org}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1C1A28",
                      lineHeight: 1.3,
                    }}
                  >
                    {alert.title}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#5A576B",
                    lineHeight: 1.65,
                    margin: "0 0 10px",
                  }}
                >
                  {alert.summary}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: alert.orgColor,
                      background: "#EAE8FB",
                      borderRadius: 100,
                      padding: "2px 10px",
                      letterSpacing: ".03em",
                    }}
                  >
                    {alert.tag}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#9A97A8",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {alert.date}
                  </span>
                </div>
              </div>

              {/* New badge */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "#5A4FD6",
                  background: "#EAE8FB",
                  borderRadius: 100,
                  padding: "3px 10px",
                  whiteSpace: "nowrap",
                  height: "fit-content",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              >
                New
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 48,
            padding: "20px 24px",
            background: "#FAFAF7",
            border: "1px solid #E0DCCE",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 22 }}>📡</div>
          <div>
            <p
              style={{
                fontSize: 13.5,
                color: "#5A576B",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              <strong style={{ color: "#1C1A28" }}>Alerts are curated monthly</strong>{" "}
              from official government and regulatory portals. For the most
              authoritative version, always refer to the official circular on the
              respective regulator's website.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
