import { useState } from "react";
import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";

const MODULES = [
  {
    id: "m1", num: "01", title: "The Foundation", sub: "Household Economics & Legal Awareness",
    sections: [
      { head: "Advanced Economic Understanding", topics: ["Types of income: earned, portfolio, and passive income", "Real vs nominal income — legal implications in taxation and wage structures", "Inflation indexing in taxation and government securities"] },
      { head: "Legal Deepening", topics: ["Heads of income under the Income Tax Act, 1961", "Residential status and its impact on global income taxation", "Legal compliance for first-time taxpayers (PAN linking, AIS/TIS review)"] },
      { head: "Financial Inclusion & Law", topics: ["Banking access under PMJDY (Jan Dhan Yojana)", "KYC/AML norms under Reserve Bank of India", "Legal safeguards for small depositors and zero-balance accounts"] },
      { head: "Practical Component", topics: ["Case study: Misclassification of income leading to tax penalties", "Activity: Identify taxable vs exempt income scenarios"] },
    ]
  },
  {
    id: "m2", num: "02", title: "Managing Your Finances", sub: "Personal Finance & Compliance Skills",
    sections: [
      { head: "Advanced Budgeting & Cash Flow", topics: ["Cash flow statements for individuals", "Behavioral finance biases affecting spending", "Digital financial tools and UPI ecosystem compliance"] },
      { head: "Debt & Legal Obligations", topics: ["Loan documentation: sanction letters, amortization schedules", "Legal consequences of default (SARFAESI Act overview)", "Credit score (CIBIL) and legal implications of poor credit history"] },
      { head: "Regulatory Compliance", topics: ["RBI guidelines on digital lending and recovery agents", "Fair Practices Code and grievance redressal"] },
      { head: "Practical Component", topics: ["Draft a personal monthly budget with legal compliance checks", "Analyze a sample loan agreement"] },
    ]
  },
  {
    id: "m3", num: "03", title: "Financial Planning", sub: "Goal Setting & Tax Efficiency",
    sections: [
      { head: "Advanced Planning Tools", topics: ["Life-cycle financial planning: education, marriage, retirement", "Inflation-adjusted goal setting and asset allocation strategies"] },
      { head: "Tax Planning (In-depth)", topics: ["Deductions: 80C, 80D, 80CCD (NPS), HRA, LTA", "Capital gains planning and tax harvesting", "Advance tax and TDS compliance"] },
      { head: "Wealth Transfer & Estate Planning", topics: ["Drafting of Wills and Codicils", "Nomination vs legal heir — a critical distinction", "Trusts and their legal structure"] },
      { head: "Practical Component", topics: ["Create a goal-based financial plan", "Draft a basic will format"] },
    ]
  },
  {
    id: "m4", num: "04", title: "Risk & Reward", sub: "Insurance, Liability & Legal Safeguards",
    sections: [
      { head: "Advanced Insurance Literacy", topics: ["ULIPs vs Term Insurance — legal and financial comparison", "Health insurance clauses: co-pay, waiting period, exclusions", "Motor insurance and third-party liability laws"] },
      { head: "Regulatory & Legal Framework", topics: ["Role and powers of IRDAI; Insurance Act, 1938 overview", "IRDAI grievance redressal system"] },
      { head: "Practical Component", topics: ["Compare two insurance policies legally and financially", "Simulate an insurance claim filing"] },
    ]
  },
  {
    id: "m5", num: "05", title: "The Financial Landscape", sub: "Markets, Regulation & Legal Rights",
    sections: [
      { head: "Advanced Market Understanding", topics: ["Primary vs secondary markets; IPO process and legal disclosures", "Mutual fund regulations and NAV calculation"] },
      { head: "Regulatory Deep Dive", topics: ["Functions and powers of RBI, SEBI, and IRDAI", "SEBI regulations on insider trading and market manipulation"] },
      { head: "Cyber Law & Digital Finance", topics: ["Legal framework under Information Technology Act, 2000", "RBI guidelines on digital payments, UPI, wallets"] },
      { head: "Fraud & Financial Crimes", topics: ["Ponzi schemes, pyramid schemes, chit fund scams", "Legal remedies: FIR, cyber cell, consumer courts, SEBI SCORES"] },
      { head: "Practical Component", topics: ["Analyze a real-world scam case", "File a mock investor complaint via SEBI SCORES"] },
    ]
  },
  {
    id: "m6", num: "06", title: "Capstone Project", sub: "The LexFin Strategy — Legal-Financial Integration",
    sections: [
      { head: "Comprehensive Application", topics: ["Develop a holistic Legal-Financial Blueprint: income & tax strategy, budgeting, investment allocation, insurance, estate planning"] },
      { head: "Compliance Audit", topics: ["Personal checklist: ITR filing, GST basics, loan compliance, insurance, nomination & will"] },
      { head: "Evaluation & Certification", topics: ["Viva + project presentation; real-life scenario-based assessment", "Case law integration: landmark judgments on banking fraud, insurance disputes, tax evasion"] },
    ]
  },
];

const AUDIENCE = [
  { icon: "⚖️", title: "Law Students", desc: "Understand the financial regulations you'll eventually litigate — before you enter the courtroom." },
  { icon: "💼", title: "Young Professionals", desc: "Manage your first salary, understand taxes, and sidestep common debt traps from day one." },
  { icon: "🚀", title: "Entrepreneurs", desc: "Grasp the transition from compliance to competitiveness — legal fluency is your biggest edge." },
  { icon: "🔬", title: "Researchers", desc: "Explore the rich intersection of Law (Lex) and Finance (Fin) through case studies and live data." },
];

const STATS = [
  { icon: "📅", label: "Duration", val: "6 Weeks", sub: "Self-paced" },
  { icon: "⏱️", label: "Learning Hours", val: "30 hrs", sub: "+ 5 Live Masterclasses" },
  { icon: "📚", label: "Content", val: "6 Modules", sub: "+ Case Study Worksheets" },
  { icon: "🔑", label: "Access", val: "Lifetime", sub: "Dashboard & Updates" },
  { icon: "🏆", label: "Certificate", val: "Joint", sub: "SGT × LexFin" },
  { icon: "🌐", label: "Language", val: "Bilingual", sub: "English & Hindi" },
];

type ModalState = { open: boolean };

export default function CoursesPage() {
  const [, setLocation] = useLocation();
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [form, setForm] = useState({ name: "", email: "", phone: "", state: "", city: "", program: "", specialization: "" });

  const toggle = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const s: React.CSSProperties = {};
  void s;

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif", color: "#1C1A28" }}>
      <GlobalHeader />

      {/* PAGE HEAD */}
      <section style={{ padding: "60px 48px 48px", borderBottom: "1px solid #E0DCCE" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 16 }}>
          <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
          E-Learning
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 12 }}>
          Our <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>E-Learning</em>
        </h1>
        <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 500 }}>Master Indian Financial & Legal frameworks through structured, bite-sized learning.</p>
      </section>

      {/* AFFILIATION STRIP */}
      <div style={{ padding: "16px 48px", background: "#FAFAF7", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: "#5A4FD6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5v14"/></svg>
        </div>
        <p style={{ fontSize: 13, color: "#5A576B" }}>All courses affiliated with <strong style={{ color: "#1C1A28" }}>SGT University, Faculty of Law</strong> — Joint certification with LexFin</p>
      </div>

      {/* COURSE CARD */}
      <div style={{ padding: "48px" }}>
        <div style={{ background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 20, overflow: "hidden" }}>

          {/* TOP BAND */}
          <div style={{ background: "#1C1A28", padding: "40px 48px 36px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, background: "#5A4FD6", opacity: .1, borderRadius: "50%" }} />
            <div style={{ position: "absolute", right: 160, bottom: -80, width: 200, height: 200, background: "#C9933A", opacity: .07, borderRadius: "50%" }} />
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#C9933A", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, marginBottom: 18 }}>★ Featured Course</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, lineHeight: 1.12, color: "#fff", letterSpacing: "-.02em", marginBottom: 10 }}>Integrated Financial &<br />Legal Literacy</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.6, maxWidth: 480 }}>From household economics to capital markets — a complete legal-financial curriculum built for modern India.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0, position: "relative", zIndex: 1, alignItems: "flex-end" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.8)", fontSize: 12, fontWeight: 500, padding: "7px 14px", borderRadius: 100 }}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                Joint Certificate
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(201,147,58,.15)", border: "1px solid rgba(201,147,58,.3)", color: "#C9933A", fontSize: 12, fontWeight: 500, padding: "7px 14px", borderRadius: 100 }}>🏛️ SGT University × LexFin</div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div style={{ display: "flex", borderBottom: "1px solid #E0DCCE", flexWrap: "wrap" }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ flex: "1 1 140px", padding: "22px 20px", borderRight: i < STATS.length - 1 ? "1px solid #E0DCCE" : "none", display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{stat.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#9A97A8" }}>{stat.label}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#1C1A28", lineHeight: 1.1 }}>{stat.val}</div>
                <div style={{ fontSize: 11, color: "#9A97A8" }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* BODY */}
          <div style={{ padding: "48px", display: "flex", gap: 52, flexWrap: "wrap" }}>

            {/* MAIN */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* WHO SHOULD */}
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#5A4FD6", marginBottom: 10 }}>Audience</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 600, color: "#1C1A28", letterSpacing: "-.01em", marginBottom: 20, lineHeight: 1.25 }}>Who should take this course?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
                {AUDIENCE.map(a => (
                  <div key={a.title} style={{ background: "#F0EDE6", border: "1px solid #E0DCCE", borderRadius: 8, padding: "18px 20px" }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{a.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1A28", marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.55 }}>{a.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "#E0DCCE", margin: "40px 0" }} />

              {/* MODULES */}
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#5A4FD6", marginBottom: 10 }}>Curriculum</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 600, color: "#1C1A28", letterSpacing: "-.01em", lineHeight: 1.25 }}>What's in it for you?</div>
                <div style={{ fontSize: 13, color: "#5A576B", marginTop: 4 }}>6 actionable modules — basic awareness to professional mastery</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
                {MODULES.map(mod => {
                  const isOpen = openModules.has(mod.id);
                  return (
                    <div key={mod.id} style={{ border: "1px solid #E0DCCE", borderRadius: 8, overflow: "hidden", background: "#F0EDE6" }}>
                      <div
                        onClick={() => toggle(mod.id)}
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", cursor: "pointer", userSelect: "none" }}
                      >
                        <div style={{ width: 30, height: 30, borderRadius: 7, background: "#EAE8FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#5A4FD6", flexShrink: 0 }}>{mod.num}</div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: 13.5, fontWeight: 600, color: "#1C1A28", display: "block", marginBottom: 1 }}>{mod.title}</strong>
                          <span style={{ fontSize: 12, color: "#9A97A8" }}>{mod.sub}</span>
                        </div>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9A97A8" strokeWidth="2" style={{ transition: "transform .25s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                      {isOpen && (
                        <div style={{ padding: "0 18px 18px 62px" }}>
                          {mod.sections.map(sec => (
                            <div key={sec.head}>
                              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9A97A8", textTransform: "uppercase", letterSpacing: ".07em", margin: "10px 0 3px" }}>{sec.head}</div>
                              {sec.topics.map(t => (
                                <div key={t} style={{ fontSize: 12.5, color: "#5A576B", lineHeight: 1.7, padding: "2px 0", display: "flex", alignItems: "flex-start", gap: 6 }}>
                                  <span style={{ color: "#5A4FD6", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>·</span>
                                  {t}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ height: 1, background: "#E0DCCE", margin: "40px 0" }} />

              {/* JOURNEY */}
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#5A4FD6", marginBottom: 10 }}>Your Journey</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 23, fontWeight: 600, color: "#1C1A28", letterSpacing: "-.01em", marginBottom: 14 }}>Ready to begin?</div>
              <p style={{ fontSize: 14, color: "#5A576B", lineHeight: 1.6, marginBottom: 24 }}>Complete each module to unlock the next. Master Indian Financial Laws step by step — at your own pace, with lifetime access.</p>
              <button
                onClick={() => setLocation("/learning-path")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "16px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background .2s" }}
                onMouseOver={e => (e.currentTarget.style.background = "#3D34A5")}
                onMouseOut={e => (e.currentTarget.style.background = "#5A4FD6")}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                View Learning Path & Start Course
              </button>
            </div>

            {/* SIDEBAR */}
            <div style={{ width: 270, flexShrink: 0 }}>
              {/* Course Details */}
              <div style={{ background: "#F0EDE6", border: "1px solid #E0DCCE", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ padding: "12px 16px", background: "#EAE8FB", display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#3D34A5" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#3D34A5" }}>Course Details</span>
                </div>
                <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {[["Duration", "6 Weeks"], ["Learning Hours", "30 hrs"], ["Live Sessions", "5 Masterclasses"], ["Modules", "6 Interactive"], ["Access", "Lifetime"], ["Language", "EN + HI"], ["Certificate", "SGT × LexFin"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
                      <span style={{ color: "#9A97A8" }}>{k}</span>
                      <span style={{ color: "#1C1A28", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliated By */}
              <div style={{ background: "#F0EDE6", border: "1px solid #E0DCCE", borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ padding: "12px 16px", background: "#EAE8FB", display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#3D34A5" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#3D34A5" }}>Affiliated By</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, color: "#1C1A28", fontWeight: 500, lineHeight: 1.5 }}>SGT University<br /><span style={{ fontWeight: 400, color: "#5A576B" }}>Faculty of Law</span></div>
                  <div style={{ fontSize: 11.5, color: "#9A97A8", marginTop: 3 }}>Joint Certificate issued on completion</div>
                </div>
              </div>

              {/* Brochure */}
              <button
                onClick={() => setModal({ open: true })}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", padding: "11px 18px", background: "transparent", color: "#5A4FD6", border: "1.5px solid #5A4FD6", borderRadius: 8, fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 10v6M9 13l3 3 3-3"/><path d="M20 17v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"/></svg>
                Download Brochure
              </button>

              <button
                onClick={() => setLocation("/module/1/learn")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "14px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onMouseOver={e => (e.currentTarget.style.background = "#3D34A5")}
                onMouseOut={e => (e.currentTarget.style.background = "#5A4FD6")}
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Start Learning
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* BROCHURE MODAL */}
      {modal.open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setModal({ open: false }); }}
          style={{ position: "fixed", inset: 0, background: "rgba(28,26,40,.55)", backdropFilter: "blur(4px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div style={{ background: "#FAFAF7", borderRadius: 20, width: "100%", maxWidth: 500, overflow: "hidden" }}>
            <div style={{ background: "#1C1A28", padding: "26px 30px", position: "relative" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 3 }}>Get Full Course Syllabus</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>We'll send the complete brochure to your email.</p>
              <button onClick={() => setModal({ open: false })} style={{ position: "absolute", top: 18, right: 18, width: 30, height: 30, background: "rgba(255,255,255,.1)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ padding: "26px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Name", "text", "Your full name"], ["Email", "email", "you@email.com"]].map(([l, t, p]) => (
                  <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</label>
                    <input type={t} placeholder={p} value={form[l.toLowerCase() as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [l.toLowerCase()]: e.target.value }))} style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>Contact Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>State</label>
                  <select style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }}>
                    <option value="">Select state</option>
                    {["Delhi", "Haryana", "Maharashtra", "Uttar Pradesh", "Karnataka", "Tamil Nadu", "West Bengal", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>City</label>
                  <input type="text" placeholder="Your city" style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>Current Program</label>
                  <select style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }}>
                    <option value="">e.g. BA LLB</option>
                    {["BA LLB", "BBA", "B.Com", "MBA", "Professional", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#5A576B", textTransform: "uppercase", letterSpacing: ".05em" }}>Specialization</label>
                <select style={{ padding: "9px 12px", border: "1.5px solid #E0DCCE", borderRadius: 8, fontSize: 13.5, color: "#1C1A28", background: "#F0EDE6", outline: "none", fontFamily: "'DM Sans', sans-serif" }}>
                  <option value="">e.g. Corporate Law</option>
                  {["Corporate Law", "Finance", "Research", "Taxation", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button
                onClick={() => { alert("Thank you! The brochure has been sent to your email."); setModal({ open: false }); }}
                style={{ background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 8, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}
              >
                Send Me the Brochure →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
