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
  source: string;
  link: string;
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
    org: "IBBI",
    name: "Insolvency & Bankruptcy Board",
    desc: "Insolvency process, resolution professional norms, and valuation standards.",
    color: "#7C3AED",
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
    summary: "RBI issued amendments to NBFC prudential norms and capital adequacy frameworks, refining risk weights and improving consistency in lending to infrastructure projects. These changes aim to strengthen financial stability and risk management. Under the Scale-Based Regulation (SBR) approach, higher-layer NBFCs are subject to stricter capital adequacy norms, including enhanced Capital to Risk Weighted Assets Ratio (CRAR) requirements and a greater emphasis on high-quality Tier-I capital to ensure larger and riskier NBFCs maintain adequate capital buffers.",
    tag: "Banking",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-2",
    org: "RBI",
    orgColor: "#2563EB",
    date: "January 2026",
    title: "RBI Financial Statement Disclosure Norms Update",
    summary: "RBI introduced amendments to financial statement presentation and disclosures for banks and NBFCs. The update mandates enhanced transparency, especially regarding related-party transactions and credit risk exposure. The new forms standardize the format and content across all NBFC layers, mandating detailed disclosures in areas such as asset classification, provisioning, and income recognition. These changes, effective from April 2026, reflect RBI's shift toward a risk-based and disclosure-driven regulatory regime for better accountability.",
    tag: "Compliance",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-3",
    org: "RBI",
    orgColor: "#2563EB",
    date: "January 2026",
    title: "RBI Credit Risk Management Framework",
    summary: "RBI issued revised Credit Risk Management directions requiring financial institutions to maintain board-approved policies and tighten norms related to related-party lending. The framework introduces materiality thresholds for exposures, improved borrower-level risk assessment, and stricter governance over credit sanctioning processes. Additionally, the 2026 framework emphasizes robust risk monitoring and accountability by mandating stronger internal credit appraisal systems and continuous asset quality tracking.",
    tag: "Risk Management",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "sebi-2026-1",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 2, 2026",
    title: "SEBI Circular on Merchant Bankers",
    summary: "SEBI operationalised new rules for merchant bankers, including enhanced net worth requirements and stricter governance norms. The circular introduces a phased enhancement of capital adequacy and the concept of 'liquid net worth' requirements. Further, it mandates independent compliance officers and prohibits outsourcing of core merchant banking activities. Overall, the circular reflects SEBI's intent to ensure that only well-capitalised, transparent, and professionally managed entities operate in the merchant banking space.",
    tag: "Securities",
    source: "SEBI Circular - Merchant Bankers Amendment (Jan 2, 2026)",
    link: "https://www.sebi.gov.in/legal/circulars/jan-2026/operational-guidelines-for-merchant-bankers_1.html",
  },
  {
    id: "sebi-2026-2",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 30, 2026",
    title: "SEBI Investor Service Reform",
    summary: "SEBI simplified investor service processes by eliminating the Letter of Confirmation (LOC) requirement and enabling direct credit of securities into demat accounts—boosting ease of doing investment. RTAs and listed companies are now required to process requests and complete dematerialisation within 30 days. This reform significantly reduces delays and risks associated with physical documentation, reflecting SEBI's broader objective of creating a transparent, technology-driven, and investor-friendly ecosystem.",
    tag: "Investments",
    source: "SEBI Circular - Ease of Doing Investment (Jan 30, 2026)",
    link: "https://www.sebi.gov.in/legal/circulars/jan-2026/ease-of-doing-investment_1.html",
  },
  {
    id: "sebi-2026-3",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 2026",
    title: "SEBI Strengthening Investor Transparency Measures",
    summary: "SEBI introduced disclosure-related measures requiring regulated entities to clearly identify their registration status, helping investors distinguish between verified and unverified advice. Recent reforms emphasize timely, accurate, and comprehensive reporting of financial results and related-party transactions under LODR Regulations. Additionally, SEBI has leveraged technology-driven platforms like SCORES and enhanced disclosures on stock exchange portals to ensure that investors can easily access reliable data.",
    tag: "Transparency",
    source: "SEBI Disclosure Norms for Registered Entities",
    link: "https://www.sebi.gov.in/legal/regulations/jan-2026/investor-transparency-measures_1.html",
  },
  {
    id: "rbi-2026-4",
    org: "RBI",
    orgColor: "#2563EB",
    date: "February 2026",
    title: "RBI Foreign Exchange Management (Guarantees) Regulations, 2026",
    summary: "RBI introduced new regulations replacing earlier rules governing cross-border guarantees. The framework expands the automatic route, allowing guarantees without prior RBI approval subject to eligibility conditions. Key provisions include the general prohibition that no Indian resident can be a party to a cross-border guarantee unless expressly permitted under FEMA. The regulations create a streamlined and risk-sensitive framework aimed at strengthening oversight of foreign exchange exposures.",
    tag: "Foreign Exchange",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-5",
    org: "RBI",
    orgColor: "#2563EB",
    date: "February 2026",
    title: "RBI Banking Compliance – Dormant Accounts & KYC Enforcement",
    summary: "RBI emphasized stricter monitoring of inactive and zero-balance accounts. Banks are now required to conduct periodic reviews and implement stricter monitoring for suspicious activity. KYC compliance has been tightened by mandating periodic updates based on customer risk categorisation. Overall, these measures aim to strike a balance between customer convenience, regulatory compliance, and risk mitigation, thereby strengthening trust and transparency in the banking ecosystem.",
    tag: "Compliance",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "sebi-2026-4",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 30, 2026",
    title: "SEBI Master Circular – LODR Compliance",
    summary: "SEBI released an updated Master Circular on Listing Obligations and Disclosure Requirements (LODR) consolidating prior circulars. It standardizes requirements relating to periodic financial disclosures, corporate governance norms, and disclosure of material events. The circular strengthens timeliness and quality of disclosures by prescribing strict timelines and digital filing mechanisms. Overall, it reflects SEBI's focus on building a transparent and investor-centric market ecosystem while simplifying compliance for listed companies.",
    tag: "Securities",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/master-circulars/jan-2026/master-circular-for-listed-entities_1.html",
  },
  {
    id: "rbi-2026-6",
    org: "RBI",
    orgColor: "#2563EB",
    date: "January 2026",
    title: "RBI Credit & Risk Framework Strengthening",
    summary: "RBI continued strengthening credit and risk frameworks by tightening leverage norms and standardising lending practices. Focus is on improving credit discipline and risk identification by tightening norms around loan appraisal and connected exposures. Institutions are now required to adopt robust internal credit risk assessment systems and stress testing mechanisms to detect emerging risks. Overall, these measures aim to minimize systemic vulnerabilities and enhance the resilience of the Indian financial system.",
    tag: "Risk Management",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-7",
    org: "RBI",
    orgColor: "#2563EB",
    date: "March 10, 2026",
    title: "RBI Amendment on Tier 1 Capital & Owned Fund Computation",
    summary: "RBI issued final directions clarifying the computation of Tier 1 capital and owned funds for NBFCs. The amendment places greater emphasis on core equity components within Tier 1 capital, such as paid-up equity capital and free reserves. By reducing reliance on hybrid or lower-quality capital instruments, RBI aims to strengthen the financial resilience and risk-bearing capacity of the NBFC sector. The revised framework also clarifies deduction criteria, aligning the definition more closely with bank prudential standards.",
    tag: "Banking",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-8",
    org: "RBI",
    orgColor: "#2563EB",
    date: "March 10, 2026",
    title: "RBI Prudential Norms on Dividend Declaration",
    summary: "RBI updated prudential norms for dividend declaration and profit remittance across commercial banks and small finance banks. The revised framework ensures uniformity and better financial discipline in capital reporting and dividend distribution. It mandates that banks maintain a specific minimum set of capital adequacy levels before declaring any dividends. These changes reflect RBI's continued focus on prudential regulation and long-term financial stability within the non-banking financial sector.",
    tag: "Compliance",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "sebi-2026-5",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 9, 2026",
    title: "SEBI Framework for Technical Glitches in Trading Systems",
    summary: "SEBI updated its framework to handle technical glitches in stock brokers' electronic trading systems. The regulation ensures better system resilience and differentiated compliance for small and large brokers—only those with more than 10,000 registered clients are strictly covered. It introduces a single common reporting platform and mandates submission of preliminary reports within tight timelines. The framework aims to ensure continuity of trading services and improved investor protection.",
    tag: "Technology",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/circulars/jan-2026/framework-for-handling-technical-glitches_1.html",
  },
  {
    id: "sebi-2026-6",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 7, 2026",
    title: "SEBI Incentives for Investor Inclusion",
    summary: "SEBI extended timelines for incentive structures aimed at onboarding new investors from smaller cities (B-30) and women investors. The framework is designed to encourage mutual fund distributors by offering capped commissions based on initial investments or first-year SIP contributions. This circular reflects SEBI's broader objective of deepening financial inclusion, increasing mutual fund penetration, and encouraging participation from underserved segments across India.",
    tag: "Investments",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/circulars/jan-2026/incentives-for-mutual-fund-distributors_1.html",
  },
  {
    id: "sebi-2026-7",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 21, 2026",
    title: "SEBI Amendment – Non-Convertible Securities",
    summary: "SEBI amended regulations relating to the issue and listing of non-convertible securities, introducing a formal definition of 'Retail Individual Investor' (individuals applying for debt securities up to ₹2 lakh). This categorisation helps streamline investor classification and ensures that regulatory benefits and incentives are directed toward genuine retail participants. Overall, the reform aims to boost retail participation, enhance transparency, and make debt securities more attractive to a wider investor base.",
    tag: "Securities",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/regulations/jan-2026/sebi-issue-and-listing-of-non-convertible-securities-amendment-regulations-2026_1.html",
  },
  {
    id: "sebi-2026-9",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "January 8, 2026",
    title: "SEBI Stock Brokers Regulations, 2026",
    summary: "SEBI notified updated Stock Brokers Regulations, 2026, focusing on operational transparency and improved governance standards for brokers. It introduces a streamlined registration process and establishes a consolidated framework covering eligibility and obligations. Notably, the new framework allows interoperability between stock brokers and clearing members, promoting ease of doing business. Further, the 2026 regulations significantly strengthen investor protection mechanisms and segregation of client funds.",
    tag: "Securities",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/regulations/jan-2026/sebi-stock-brokers-regulations-2026_1.html",
  },
  {
    id: "rbi-2026-9",
    org: "RBI",
    orgColor: "#2563EB",
    date: "March 2026",
    title: "RBI Amendment for Asset Reconstruction Companies (ARCs)",
    summary: "RBI updated directions for ARCs regarding the computation of 'owned funds', allowing the inclusion of free reserves and profits. The amendment introduces key reforms to strengthen the functioning, transparency, and effectiveness of ARCs in resolving stressed assets. A major focus is on enhancing the capital and governance framework, including stricter norms for Net Owned Funds (NOF) and improved 'fit and proper' criteria for sponsors. Overall, these reforms aim to make ARCs more robust and effective in resolving bad loans.",
    tag: "Banking",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "rbi-2026-10",
    org: "RBI",
    orgColor: "#2563EB",
    date: "March 16, 2026",
    title: "RBI Disclosure Requirement – DICGC Premium",
    summary: "RBI mandated banks to explicitly disclose the amount of DICGC (Deposit Insurance) premium paid in their financial statements. This step enhances transparency regarding depositor insurance coverage and ensures better public awareness. The directive requires banks to incorporate these disclosures in a standardized and consistent format, facilitating comparison across institutions. By making DICGC information visible, RBI aims to reinforce depositor protection mechanisms and promote informed decision-making.",
    tag: "Banking",
    source: "Notifications - Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/BS_ViewNotification.aspx",
  },
  {
    id: "sebi-2026-10",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "March 4, 2026",
    title: "SEBI Circular on AIF Reporting Framework",
    summary: "SEBI revised the reporting framework for Alternative Investment Funds (AIFs) to enhance regulatory oversight and data accuracy. The new rules introduce structured reporting formats and a mandatory Annual Activity Report. AIFs are now required to submit detailed periodic reports on fund performance, investor concentration, and risk exposures through a centralized platform. Overall, the circular reflects SEBI's move toward a data-driven and risk-based regulatory approach, fostering a more transparent alternative investment ecosystem.",
    tag: "Investments",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/circulars/mar-2026/reporting-framework-for-aifs_1.html",
  },
  {
    id: "sebi-2026-11",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "March 13, 2026",
    title: "SEBI Circular on Mutual Fund Borrowing",
    summary: "SEBI issued a circular clarifying norms for borrowing by mutual fund schemes to enhance liquidity management and investor protection. Mutual funds are now permitted to borrow only for meeting temporary liquidity requirements (e.g., redemption pressures) rather than as a regular strategy. The borrowing is typically capped as a percentage of the scheme's net assets and for short durations. AMCs are required to clearly disclose borrowing instances to boards and in periodic reports to ensure robust internal controls.",
    tag: "Investments",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/circulars/mar-2026/framework-for-mutual-fund-borrowing_1.html",
  },
  {
    id: "sebi-2026-12",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "March 20, 2026",
    title: "SEBI Master Circular for Mutual Funds",
    summary: "SEBI released a Master Circular consolidating all mutual fund regulations into a single, comprehensive framework to simplify compliance. It covers a wide range of areas including scheme management, investment norms, risk management, and valuation practices. The Master Circular strengthens governance by prescribing detailed norms on portfolio disclosures and expense ratios. Overall, it reflects SEBI's focus on building a transparent, well-regulated, and investor-friendly mutual fund ecosystem.",
    tag: "Investments",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/master-circulars/mar-2026/master-circular-for-mutual-funds_1.html",
  },
  {
    id: "sebi-2026-13",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "March 2026 Update",
    title: "SEBI Strengthening Internal Transparency",
    summary: "SEBI approved stricter disclosure norms for its senior officials and regulated entities to enhance institutional transparency. The measures focus on improving internal governance and accountability through public declarations of assets and liabilities. Entities are required to implement periodic internal audits, risk assessments, and compliance certifications. Additionally, the update promotes the adoption of technology-driven compliance tools and digital reporting platforms to enhance efficiency and traceability.",
    tag: "Compliance",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/regulations/mar-2026/investor-transparency-measures-update_1.html",
  },
  {
    id: "sebi-2026-14",
    org: "SEBI",
    orgColor: "#16A34A",
    date: "March 11, 2026",
    title: "SEBI Circular on Intermediary Compliance",
    summary: "SEBI issued circulars strengthening regulatory oversight on intermediaries like stock brokers and merchant bankers to improve market integrity. The compliance framework mandates standardization of KYC, Anti-Money Laundering (AML), and risk management norms. SEBI has emphasized the use of technology-driven systems for real-time monitoring and early detection of irregularities. Non-compliance may attract stricter penalties, including suspension of registration, to ensure higher standards of governance.",
    tag: "Securities",
    source: "SEBI | Circulars",
    link: "https://www.sebi.gov.in/legal/circulars/mar-2026/intermediary-compliance-circular_1.html",
  },
  {
    id: "ibbi-2026-1",
    org: "IBBI",
    orgColor: "#9333EA",
    date: "March 2026",
    title: "IBBI Notification on Valuer Standards (Amendment) 2026",
    summary: "The Insolvency and Bankruptcy Board of India (IBBI) has updated the standards for Registered Valuers. The amendment mandates more granular reporting on asset quality and valuation methodologies for stressed assets. This shift ensures that resolution plans are based on standardized, high-quality data, reducing discrepancies in asset pricing during the Corporate Insolvency Resolution Process (CIRP). The new standards also emphasize professional independence for valuers.",
    tag: "Insolvency",
    source: "Insolvency and Bankruptcy Board - IBBI News",
    link: "https://ibbi.gov.in/en/publication/notifications",
  },
  {
    id: "cbdt-2026-1",
    org: "CBDT",
    orgColor: "#DC2626",
    date: "February 2026",
    title: "CBDT Mandatory AIS/TIS Reporting for Digital Assets",
    summary: "The Central Board of Direct Taxes (CBDT) has mandated that all virtual digital asset (VDA) transactions above ₹10,000 must be reported in the Annual Information Statement (AIS) and Tax Information Summary (TIS). This update aims to curb tax evasion in the crypto-currency space and provide taxpayers with a comprehensive view of their reportable financial activities. The CBDT has also clarified the taxation treatment for NFT transfers and staking income under the new Finance Act 2025.",
    tag: "Taxation",
    source: "Income Tax Department - Circulars",
    link: "https://incometaxindia.gov.in/Pages/communications/circulars.aspx",
  },
  {
    id: "mca-2026-1",
    org: "MCA",
    orgColor: "#B45309",
    date: "January 2026",
    title: "MCA CSR-2 Reporting Portal Extension",
    summary: "The Ministry of Corporate Affairs (MCA) has extended the filing deadline for the CSR-2 reporting portal to accommodate companies experiencing technical difficulties with the new web-based format. The MCA has also introduced simplified reporting for small and medium enterprises (SMEs) with CSR spends below ₹50 lakh. Companies are now required to provide more detailed disclosures regarding the impact assessment of their long-term CSR projects, ensuring greater accountability in social spending.",
    tag: "Corporate",
    source: "MCA - What's New",
    link: "https://www.mca.gov.in/content/mca/global/en/home.html",
  },
  {
    id: "gstn-2026-1",
    org: "GSTN",
    orgColor: "#0891B2",
    date: "January 2026",
    title: "GSTN Update on E-Invoicing Threshold for Small Businesses",
    summary: "GSTN has announced that the threshold for mandatory e-invoicing will be further lowered to include businesses with an aggregate turnover of over ₹1 crore. This move is designed to standardize the digital invoicing ecosystem across India and improve the accuracy of Input Tax Credit (ITC) reconciliation. GSTN has also introduced a mobile-based e-invoicing app for small vendors, providing a free and user-friendly interface for generating IRN (Invoice Reference Numbers) on the go.",
    tag: "Taxation",
    source: "GST Council - Recent Updates",
    link: "https://www.gst.gov.in/newsandupdates",
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
                    margin: "0 0 12px",
                  }}
                >
                  {alert.summary}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1C1A28" }}>Source:</span>
                  <a 
                    href={alert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "#5A4FD6", textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}
                  >
                    {alert.source}
                  </a>
                </div>

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

              {/* External Link Icon */}
              <a 
                href={alert.link}
                target="_blank"
                rel="noopener noreferrer"
                title="View Official Source"
                style={{ 
                  alignSelf: "center", 
                  color: "#9A97A8", 
                  padding: "10px", 
                  borderRadius: "12px", 
                  background: "#F0EDE6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  border: "1px solid #E0DCCE"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#5A4FD6";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#5A4FD6";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#9A97A8";
                  e.currentTarget.style.background = "#F0EDE6";
                  e.currentTarget.style.borderColor = "#E0DCCE";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
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
