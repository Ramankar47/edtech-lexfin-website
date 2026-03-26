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

const CATEGORIES: Category[] = [
  {
    icon: "🏦",
    org: "RBI",
    name: "Reserve Bank of India",
    desc: "Monetary policy, digital lending guidelines, and banking circulars.",
    color: "#2563EB",
    count: 3,
  },
  {
    icon: "📈",
    org: "SEBI",
    name: "Securities & Exchange Board of India",
    desc: "Market regulations, insider trading rules, investor protection updates.",
    color: "#16A34A",
    count: 2,
  },
  {
    icon: "🛡️",
    org: "IRDAI",
    name: "Insurance Regulatory Authority",
    desc: "Insurance product norms, grievance redressal, claim settlement updates.",
    color: "#9333EA",
    count: 1,
  },
  {
    icon: "⚖️",
    org: "MCA",
    name: "Ministry of Corporate Affairs",
    desc: "Company law amendments, compliance filings, and corporate governance.",
    color: "#B45309",
    count: 1,
  },
  {
    icon: "💰",
    org: "CBDT",
    name: "Central Board of Direct Taxes",
    desc: "Income tax circulars, AIS/TIS updates, new ITR forms and deadlines.",
    color: "#DC2626",
    count: 2,
  },
  {
    icon: "🌐",
    org: "GSTN",
    name: "GST Network",
    desc: "GST rate changes, return filing updates, and ITC reconciliation guidance.",
    color: "#0891B2",
    count: 1,
  },
];

const ALERTS: Alert[] = [
  {
    id: "rbi-1",
    org: "RBI",
    orgColor: "#2563EB",
    date: "Mar 2025",
    title: "Digital Lending Guidelines — Updated KYC Norms",
    summary:
      "RBI has revised KYC requirements for digital lenders, mandating video-based verification and stricter data localisation norms for all NBFCs operating lending apps.",
    tag: "Banking",
  },
  {
    id: "rbi-2",
    org: "RBI",
    orgColor: "#2563EB",
    date: "Feb 2025",
    title: "Monetary Policy Committee: Repo Rate Held at 6.5%",
    summary:
      "The MPC voted to hold the repo rate steady, citing persistent core inflation. The standing deposit facility rate remains at 6.25%.",
    tag: "Monetary Policy",
  },
  {
    id: "rbi-3",
    org: "RBI",
    orgColor: "#2563EB",
    date: "Jan 2025",
    title: "Circular on Co-lending Arrangements Between Banks and NBFCs",
    summary:
      "New guidelines clarify responsibility sharing, credit appraisal standards, and NPA classification rules in co-lending partnerships.",
    tag: "NBFC",
  },
  {
    id: "sebi-1",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "Mar 2025",
    title: "Insider Trading Amendment — WhatsApp Groups Under Scanner",
    summary:
      "SEBI strengthens the definition of 'connected persons' to include members of informal communication channels suspected of trading on UPSI.",
    tag: "Securities",
  },
  {
    id: "sebi-2",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "Feb 2025",
    title: "New ESG Disclosure Framework for Listed Companies",
    summary:
      "All top-1000 listed companies must now publish Business Responsibility and Sustainability Reports (BRSR) with verified ESG metrics starting FY 2024–25.",
    tag: "Compliance",
  },
  {
    id: "irdai-1",
    org: "IRDAI",
    orgColor: "#9333EA",
    date: "Jan 2025",
    title: "Bima Sugam: Unified Insurance Platform Launch",
    summary:
      "IRDAI's e-marketplace Bima Sugam goes live, integrating policy issuance, claim settlement, and grievance redressal under one digital umbrella.",
    tag: "Insurance",
  },
  {
    id: "mca-1",
    org: "MCA",
    orgColor: "#B45309",
    date: "Feb 2025",
    title: "Companies (Amendment) Rules 2025 — Director KYC Deadline",
    summary:
      "MCA mandates annual DIR-3 KYC for all active directors by September 30. Failure attracts ₹5,000 penalty and deactivation of DIN.",
    tag: "Corporate Law",
  },
  {
    id: "cbdt-1",
    org: "CBDT",
    orgColor: "#DC2626",
    date: "Mar 2025",
    title: "New ITR Forms Notified for AY 2025–26",
    summary:
      "CBDT releases the updated ITR-1 through ITR-7 forms for Assessment Year 2025–26, with new schedules for crypto income and foreign assets.",
    tag: "Income Tax",
  },
  {
    id: "cbdt-2",
    org: "CBDT",
    orgColor: "#DC2626",
    date: "Jan 2025",
    title: "AIS/TIS Enhancements: New Transaction Categories Added",
    summary:
      "Annual Information Statement now includes dividends, securities transactions, and overseas remittances. Taxpayers must reconcile before filing returns.",
    tag: "Income Tax",
  },
  {
    id: "gstn-1",
    org: "GSTN",
    orgColor: "#0891B2",
    date: "Feb 2025",
    title: "GST Council: Rate Rationalisation for Healthcare & Insurance",
    summary:
      "The GST Council recommends reducing GST on term insurance premiums to 12% and health insurance for seniors to 5%, pending ministerial approval.",
    tag: "GST",
  },
];

export default function RegulatoryAlertsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", ...CATEGORIES.map((c) => c.org)];

  const filteredAlerts =
    activeFilter === "All"
      ? ALERTS
      : ALERTS.filter((a) => a.org === activeFilter);

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
            Filter:
          </span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "5px 14px",
                borderRadius: 100,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all .15s",
                fontFamily: "'DM Sans', sans-serif",
                background: activeFilter === f ? "#5A4FD6" : "transparent",
                borderColor: activeFilter === f ? "#5A4FD6" : "#D4D0C8",
                color: activeFilter === f ? "#fff" : "#5A576B",
              }}
            >
              {f}
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
