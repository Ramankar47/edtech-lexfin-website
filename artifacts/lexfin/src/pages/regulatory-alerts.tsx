import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Alert {
  id: number;
  title: string;
  summary: string;
  link: string;
  date: string;
  tag: string;
}

interface Category {
  icon: string;
  org: string;
  name: string;
  desc: string;
  alerts: Alert[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const categories: Category[] = [
  {
    icon: "🏦",
    org: "RBI",
    name: "Reserve Bank of India",
    desc: "Monetary policy, digital lending guidelines, and banking circulars.",
    alerts: [
      {
        id: 1,
        title: "Nomination Facility Directions, 2025",
        summary:
          "RBI issued directions to simplify transfer of bank deposits, lockers, and safe custody articles after a customer's death. Banks must offer nomination facilities at account opening and maintain proper records.",
        link: "https://rbi.org.in/ns/",
        date: "Nov 2025",
        tag: "Deposits",
      },
      {
        id: 2,
        title: "Banking Companies (Nomination) Rules, 2025",
        summary:
          "Complementing RBI directions, these rules provide a legal framework for making, modifying, or cancelling nominations. Introduces multiple nominees and uniform claim settlement procedures across all banks.",
        link: "https://thc.nic.in/Central%20Governmental%20Rules/Banking%20Companies%20%28Nomination%29%20Rules%2C%202025.pdf",
        date: "Nov 2025",
        tag: "Compliance",
      },
      {
        id: 3,
        title: "Co-Lending Arrangements Directions, 2025",
        summary:
          "Expands the co-lending model between banks and NBFCs, requiring proportionate risk-sharing, transparency in loan sourcing, and borrower-level asset classification to improve credit delivery.",
        link: "https://www.rbi.org.in/Scripts/NotificationUser.aspx",
        date: "2025",
        tag: "Lending",
      },
      {
        id: 4,
        title: "Related Party Lending Norms (Amendment), 2026",
        summary:
          "Revised norms expand the definition of related parties to include directors and KMPs. Banks must follow stricter approvals, maintain exposure limits, and update internal policies to reduce conflicts of interest.",
        link: "https://www.rbi.org.in/commonman/English/scripts/notification.aspx",
        date: "2026",
        tag: "Governance",
      },
      {
        id: 5,
        title: "Capital Market Exposure & Acquisition Financing Guidelines (Draft), 2025",
        summary:
          "Proposed guidelines cap banks' capital market exposure relative to Tier-1 capital and restrict acquisition financing proportions, reducing systemic risk and ensuring adequate borrower participation.",
        link: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx",
        date: "Oct 2025",
        tag: "Draft",
      },
      {
        id: 6,
        title: "RBI Enforcement Actions and Penalties (Ongoing)",
        summary:
          "RBI continues strict supervision, imposing penalties for non-compliance in KYC, AML, and lending practices. Actions are published via press releases to promote accountability and transparency.",
        link: "https://www.rbi.org.in/commonman/English/scripts/pressreleases.aspx",
        date: "Ongoing",
        tag: "Enforcement",
      },
    ],
  },
  {
    icon: "📈",
    org: "SEBI",
    name: "Securities & Exchange Board of India",
    desc: "Market regulations, insider trading rules, investor protection updates.",
    alerts: [
      {
        id: 1,
        title: "SEBI (Stock Brokers) Regulations, 2026",
        summary:
          "Updated registration requirements, compliance obligations, and operational standards for stock brokers and clearing members to enhance transparency, accountability, and investor protection.",
        link: "https://www.sebi.gov.in/legal/regulations/jan-2026/securities-and-exchange-board-of-india-stock-brokers-regulations-2026_98974.html",
        date: "Jan 2026",
        tag: "Brokers",
      },
      {
        id: 2,
        title: "SEBI (Non-Convertible Securities) Amendment Regulations, 2026",
        summary:
          "Streamlines disclosure requirements for corporate bonds and debt instruments, strengthens investor safeguards, and deepens India's bond market with improved transparency.",
        link: "https://www.sebi.gov.in/legal/regulations/jan-2026/securities-and-exchange-board-of-india-issue-and-listing-of-non-convertible-securities-amendment-regulations-2026_99233.html",
        date: "Jan 2026",
        tag: "Debt Market",
      },
      {
        id: 3,
        title: "SEBI LODR Master Circular, 2026",
        summary:
          "Comprehensive circular consolidating LODR Regulations 2015, bringing together guidelines on disclosures, corporate governance, and reporting obligations for uniform compliance standards.",
        link: "https://www.sebi.gov.in/legal/master-circulars/jan-2026/master-circular-for-compliance-with-the-provisions-of-the-securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-by-listed-entities_99432.html",
        date: "Jan 2026",
        tag: "Governance",
      },
      {
        id: 4,
        title: "Merchant Bankers (Amendment) Regulations & Circular, 2026",
        summary:
          "Revised capital adequacy norms, phased timelines, and stricter eligibility criteria for merchant bankers to strengthen their role in India's IPO market and improve risk management.",
        link: "https://www.sebi.gov.in/legal/circulars/jan-2026/specification-of-the-consequential-requirements-with-respect-to-amendment-of-securities-and-exchange-board-of-india-merchant-bankers-regulations-1992_98831.html",
        date: "Jan 2026",
        tag: "IPO",
      },
      {
        id: 5,
        title: "SEBI Circular: Compliance Reporting for SIFs, 2026",
        summary:
          "Standardized compliance reporting formats for Specialized Investment Funds (SIFs), extending regulatory requirements similar to mutual funds for greater transparency and investor reliability.",
        link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&smid=0&ssid=7",
        date: "2026",
        tag: "SIF",
      },
      {
        id: 6,
        title: "Alternative Investment Funds – Compliance & Certification, Dec 2025",
        summary:
          "SEBI mandates NISM certifications for AIF compliance officers to ensure adequate expertise in securities regulation, enhancing professionalism and compliance culture within the AIF ecosystem.",
        link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&smid=0&ssid=7",
        date: "Dec 2025",
        tag: "AIF",
      },
      {
        id: 7,
        title: "LODR (Amendment) Regulations, 2025 – Corporate Governance Expansion",
        summary:
          "Extends corporate governance requirements to entities with listed non-convertible debt above a specified threshold, aligning debt-listed entities with equity-listed governance norms.",
        link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingLegal=yes",
        date: "Late 2025",
        tag: "Governance",
      },
      {
        id: 8,
        title: "SEBI Enforcement Actions & Investor Protection Measures (Ongoing)",
        summary:
          "Active enforcement through orders and investor advisories covering market manipulation, insider trading, and disclosure non-compliance. Regular investor alerts on scams and fraudulent schemes.",
        link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=2&smid=2&ssid=9",
        date: "Ongoing",
        tag: "Enforcement",
      },
    ],
  },
  {
    icon: "🛡️",
    org: "IRDAI",
    name: "Insurance Regulatory Authority",
    desc: "Insurance product norms, grievance redressal, claim settlement updates.",
    alerts: [],
  },
  {
    icon: "⚖️",
    org: "MCA",
    name: "Ministry of Corporate Affairs",
    desc: "Company law amendments, compliance filings, and corporate governance.",
    alerts: [],
  },
  {
    icon: "💰",
    org: "CBDT",
    name: "Central Board of Direct Taxes",
    desc: "Income tax circulars, AIS/TIS updates, new ITR forms and deadlines.",
    alerts: [],
  },
  {
    icon: "🌐",
    org: "GSTN",
    name: "GST Network",
    desc: "GST rate changes, return filing updates, and ITC reconciliation guidance.",
    alerts: [],
  },
];

// ─── Tag colours ─────────────────────────────────────────────────────────────
const tagColor: Record<string, { bg: string; text: string }> = {
  Deposits: { bg: "#E8F4FD", text: "#1A73C8" },
  Compliance: { bg: "#FFF3E0", text: "#E65100" },
  Lending: { bg: "#E8F5E9", text: "#2E7D32" },
  Governance: { bg: "#F3E5F5", text: "#7B1FA2" },
  Draft: { bg: "#FFF8E1", text: "#F57F17" },
  Enforcement: { bg: "#FFEBEE", text: "#C62828" },
  Brokers: { bg: "#E3F2FD", text: "#1565C0" },
  "Debt Market": { bg: "#E0F7FA", text: "#00695C" },
  IPO: { bg: "#FCE4EC", text: "#AD1457" },
  SIF: { bg: "#F1F8E9", text: "#558B2F" },
  AIF: { bg: "#EDE7F6", text: "#4527A0" },
};

function getTagStyle(tag: string) {
  return tagColor[tag] ?? { bg: "#EAE8FB", text: "#5A4FD6" };
}

// ─── AlertCard ───────────────────────────────────────────────────────────────
function AlertCard({ alert }: { alert: Alert }) {
  const ts = getTagStyle(alert.tag);
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8E4DA",
        borderRadius: 10,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "box-shadow 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(90,79,214,0.10)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Row 1: tag + date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: 100,
            background: ts.bg,
            color: ts.text,
          }}
        >
          {alert.tag}
        </span>
        <span style={{ fontSize: 11, color: "#9A97A8", fontWeight: 500 }}>{alert.date}</span>
      </div>

      {/* Title */}
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1A28", lineHeight: 1.4, margin: 0 }}>
        {alert.title}
      </p>

      {/* Summary */}
      <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.65, margin: 0 }}>{alert.summary}</p>

      {/* Link */}
      <a
        href={alert.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 12,
          color: "#5A4FD6",
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginTop: 2,
          width: "fit-content",
        }}
      >
        View Official Document ↗
      </a>
    </div>
  );
}

// ─── CategoryRow ─────────────────────────────────────────────────────────────
function CategoryRow({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  const hasAlerts = cat.alerts.length > 0;

  return (
    <div
      style={{
        background: "#FAFAF7",
        border: "1px solid #E0DCCE",
        borderRadius: 14,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header row – always visible */}
      <button
        onClick={() => hasAlerts && setOpen(o => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: hasAlerts ? "pointer" : "default",
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-start",
          gap: 18,
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            background: "#EAE8FB",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {cat.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: "#1C1A28" }}>
              {cat.name}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#5A4FD6",
                background: "#EAE8FB",
                borderRadius: 100,
                padding: "2px 10px",
                letterSpacing: ".04em",
              }}
            >
              {cat.org}
            </span>
            {hasAlerts && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#5A4FD6",
                  borderRadius: 100,
                  padding: "2px 9px",
                  letterSpacing: ".04em",
                }}
              >
                {cat.alerts.length} alert{cat.alerts.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
        </div>
        <div style={{ fontSize: 11, color: "#9A97A8", fontWeight: 500, whiteSpace: "nowrap", marginTop: 4, flexShrink: 0 }}>
          {hasAlerts ? (
            <span style={{ fontSize: 18, color: "#5A4FD6", lineHeight: 1 }}>{open ? "▲" : "▼"}</span>
          ) : (
            "No alerts yet"
          )}
        </div>
      </button>

      {/* Expanded alerts */}
      {hasAlerts && open && (
        <div
          style={{
            padding: "0 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: "1px solid #E0DCCE",
            paddingTop: 16,
          }}
        >
          {cat.alerts.map(a => (
            <AlertCard key={a.id} alert={a} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RegulatoryAlertsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Minimal inline header so preview works standalone ── */}
      <header
        style={{
          background: "#F0EDE6",
          borderBottom: "1px solid #E0DCCE",
          padding: "0 48px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: "#1C1A28" }}>
          LexFin
        </span>
        <nav style={{ display: "flex", gap: 28, fontSize: 14, color: "#5A576B" }}>
          <span>Home</span>
          <span>E-Learning</span>
          <span>Blogs</span>
          <span>Study Material</span>
          <span style={{ color: "#5A4FD6", fontWeight: 600 }}>Regulatory Alerts</span>
        </nav>
        <button
          style={{
            background: "#1C1A28",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Stay Updated
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: "#1C1A28",
              marginBottom: 16,
            }}
          >
            Regulatory <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Alerts</em>
          </h1>
          <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
            Stay on top of the latest regulatory changes from India's financial and legal bodies.
          </p>
        </div>

        {/* Category rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {categories.map(c => (
            <CategoryRow key={c.org} cat={c} />
          ))}
        </div>
      </main>
    </div>
  );
}
