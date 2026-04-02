import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS = [
  { q: "What is the primary purpose of an Emergency Fund?", opts: ["To buy a new car", "To cover 3–6 months of essential expenses", "To invest in the stock market", "To pay for a vacation"], ans: 1, exp: "An emergency fund is a safety net for unexpected events like job loss or medical emergencies." },
  { q: "In India, which body regulates the securities market?", opts: ["RBI", "SEBI", "IRDAI", "PFRDA"], ans: 1, exp: "SEBI (Securities and Exchange Board of India) regulates the securities and capital markets." },
  { q: "What does 'Inflation' mean in simple terms?", opts: ["Increase in value of money", "General price decrease", "Decline in purchasing power over time", "Stock market price surge"], ans: 2, exp: "Inflation reduces purchasing power — the same money buys fewer goods/services over time." },
  { q: "Which investment qualifies for tax deduction under Section 80C?", opts: ["Fixed Deposit (1 year)", "Public Provident Fund (PPF)", "Savings Account Interest", "Gold ETF"], ans: 1, exp: "PPF qualifies under Section 80C for up to ₹1.5 lakh deduction per year." },
  { q: "What is the 'Rule of 72' used for?", opts: ["Calculating retirement age", "Estimating time to double money", "Ideal credit score", "Annual insurance premiums"], ans: 1, exp: "Divide 72 by the interest rate to get years needed for an investment to double." },
  { q: "Which regulatory body oversees insurance companies in India?", opts: ["SEBI", "RBI", "IRDAI", "AMFI"], ans: 2, exp: "IRDAI (Insurance Regulatory and Development Authority of India) regulates insurance." },
  { q: "What is a SIP in mutual funds?", opts: ["Single Investment Plan", "Systematic Investment Plan", "Securities Insurance Policy", "Simplified Interest Payment"], ans: 1, exp: "SIP — Systematic Investment Plan — allows investing fixed amounts periodically in mutual funds." },
  { q: "What does CIBIL score measure?", opts: ["Company revenue", "Individual creditworthiness", "Inflation index", "Bank reserve ratio"], ans: 1, exp: "CIBIL score (300–900) reflects your credit history and affects loan eligibility and terms." },
];

const PUZZLE_SETS = [
  [
    { term: "SEBI", def: "Regulates India's stock & securities markets" },
    { term: "PPF", def: "Tax-saving long-term govt. savings scheme (80C)" },
    { term: "EMI", def: "Fixed monthly instalment paid for a loan" },
    { term: "SIP", def: "Systematic periodic investment in mutual funds" },
    { term: "GST", def: "Unified indirect tax on goods and services" },
    { term: "CIBIL", def: "India's credit information bureau & score provider" },
  ],
  [
    { term: "RBI", def: "India's central bank controlling monetary policy" },
    { term: "IRDAI", def: "Insurance regulatory authority of India" },
    { term: "NPA", def: "Non-Performing Asset — a loan classified as default" },
    { term: "KYC", def: "Know Your Customer — mandatory identity verification" },
    { term: "RTGS", def: "High-value real-time interbank fund settlement" },
    { term: "NEFT", def: "National Electronic Funds Transfer system" },
  ],
  [
    { term: "NAV", def: "Net Asset Value — price per mutual fund unit" },
    { term: "P/E", def: "Price-to-Earnings ratio used to value stocks" },
    { term: "IPO", def: "Initial Public Offering — first stock sale to public" },
    { term: "ETF", def: "Exchange Traded Fund — trades like a stock on markets" },
    { term: "DEMAT", def: "Account holding shares in electronic/digital form" },
    { term: "SENSEX", def: "Index of top 30 BSE-listed companies by market cap" },
  ],
  [
    { term: "NPS", def: "National Pension System for retirement savings" },
    { term: "ELSS", def: "Equity Linked Savings Scheme — tax-saving mutual fund" },
    { term: "REPO", def: "Rate at which RBI lends money to commercial banks" },
    { term: "ITR", def: "Income Tax Return filed annually with the govt." },
    { term: "HRA", def: "House Rent Allowance — salary component for rent" },
    { term: "TDS", def: "Tax Deducted at Source before payment is made" },
  ],
];

const PAYDAY_ROUNDS = [
  {
    month: "January", income: 45000,
    expenses: { Rent: 12000, Utilities: 2500, Groceries: 6000, Transport: 3000 },
    event: "🚗 Your car breaks down! Repair cost: ₹8,000.",
    choices: [
      { label: "Pay from savings", impact: -8000, score: 10, tip: "Correct! Using savings avoids interest costs." },
      { label: "Take a personal loan (18% p.a.)", impact: 500, score: -10, tip: "Debt for a small repair is expensive. Avoid if possible." },
      { label: "Use public transport instead (₹1,500/mo)", impact: -1500, score: 8, tip: "Smart! Saves ₹6,500 and builds a healthy habit." },
    ],
  },
  {
    month: "February", income: 45000,
    expenses: { Rent: 12000, Utilities: 2500, Groceries: 6000, Transport: 3000 },
    event: "💊 Surprise medical bill: ₹12,000!",
    choices: [
      { label: "Claim health insurance", impact: 0, score: 20, tip: "Always use insurance first — that's what premiums are for!" },
      { label: "Pay from emergency fund", impact: -12000, score: 15, tip: "Emergency funds exist exactly for this. Great decision!" },
      { label: "Put it on a credit card", impact: 0, score: -15, tip: "Credit card interest at 36% p.a. makes this very costly!" },
    ],
  },
  {
    month: "March", income: 50000,
    expenses: { Rent: 12000, Utilities: 2500, Groceries: 6000, Transport: 3000 },
    event: "🎉 Festival bonus: ₹5,000! A big sale is also on.",
    choices: [
      { label: "Invest in a mutual fund SIP", impact: -5000, score: 20, tip: "Brilliant! Investing a windfall compounds into long-term wealth." },
      { label: "Add to emergency fund", impact: -5000, score: 15, tip: "Smart! Building a 6-month reserve is top priority." },
      { label: "Buy a new phone on EMI", impact: 0, score: -5, tip: "EMI on a depreciating asset is rarely a smart financial move." },
    ],
  },
];

const LOAN_OFFERS = [
  { name: "SBI Bank", rate: 10.5, months: 24, icon: "🏦", tag: "Govt. Bank" },
  { name: "HDFC Bank", rate: 14, months: 12, icon: "🏢", tag: "Private Bank" },
  { name: "FinQuick NBFC", rate: 28, months: 6, icon: "⚡", tag: "Instant App" },
  { name: "Credit Card Advance", rate: 42, months: 3, icon: "💳", tag: "Worst Option" },
];

const INVEST_OPTIONS = [
  { id: "fd", name: "Fixed Deposit", icon: "🏦", min: 6.5, max: 7.5, risk: "Safe", color: "#10B981" },
  { id: "stock", name: "Direct Stocks", icon: "📈", min: -20, max: 40, risk: "High", color: "#EF4444" },
  { id: "mf", name: "Index Fund", icon: "🧩", min: 2, max: 20, risk: "Medium", color: "#3B82F6" },
  { id: "gold", name: "Digital Gold", icon: "🥇", min: -5, max: 18, risk: "Med", color: "#F59E0B" },
];

const BUDGET_SCENARIOS = [
  {
    title: "🎒 First Job, First Salary", income: 40000,
    story: "You just started your first job at ₹40,000/month. Goal: save ₹5,000/month for a Goa trip & build an emergency fund.",
    fixed: { Rent: 12000, Food: 7000, Transport: 3000 },
    cats: ["Trip Savings", "Emergency Fund", "Entertainment", "Investments"],
    goals: [{ label: "Trip Savings ≥ ₹5,000", key: "Trip Savings", min: 5000, max: 99999 }, { label: "Emergency Fund ≥ ₹2,000", key: "Emergency Fund", min: 2000, max: 99999 }],
  },
  {
    title: "💍 Wedding in 6 Months", income: 65000,
    story: "Wedding costs ₹2,00,000 in 6 months. You need ₹33,000/month. Fixed expenses are high this month.",
    fixed: { Rent: 15000, Food: 8000, Utilities: 4000, Insurance: 2000 },
    cats: ["Wedding Fund", "Shopping", "Emergency Fund", "Investments"],
    goals: [{ label: "Wedding Fund ≥ ₹30,000", key: "Wedding Fund", min: 30000, max: 99999 }, { label: "Shopping ≤ ₹5,000", key: "Shopping", min: 0, max: 5000 }],
  },
  {
    title: "🏠 House Down Payment", income: 80000,
    story: "Dream home at ₹50L. Bank needs 20% down = ₹10L in 2 years. Monthly target: ₹41,667.",
    fixed: { Rent: 15000, Food: 9000, Utilities: 4000, Transport: 3000 },
    cats: ["Down Payment", "Emergency Fund", "Entertainment", "Investments"],
    goals: [{ label: "Down Payment ≥ ₹40,000", key: "Down Payment", min: 40000, max: 99999 }, { label: "Entertainment ≤ ₹3,000", key: "Entertainment", min: 0, max: 3000 }],
  },
];

const GAMES_LIST = [
  { id: "payday", title: "Payday Simulator", icon: "📅", desc: "Manage 3 months of income, expenses & real-life emergencies.", badge: "Payday-style", color: "#5A4FD6" },
  { id: "loan", title: "Loan Advisor", icon: "🏦", desc: "Rank 4 loan offers by true cost. Spot the trap!", badge: "Shady Sam-style", color: "#10B981" },
  { id: "invest", title: "Investment Race", icon: "📈", desc: "Invest ₹50,000 across 3 years. Beat inflation!", badge: "StockMarket-style", color: "#3B82F6" },
  { id: "budget", title: "Budget Challenge", icon: "💸", desc: "Allocate salary for 3 real-life scenarios. Hit all goals!", badge: "Paycheck-style", color: "#F59E0B" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const btn = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
  fontWeight: 600, fontSize: 13, transition: "all .2s", ...extra,
});

// ─── QUIZ GAME ────────────────────────────────────────────────────────────────
export function QuizGame() {
  const [idx, setIdx] = useState(0);
  const [order] = useState(() => [...QUIZ_QUESTIONS].sort(() => Math.random() - .5).slice(0, 5));
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = order[idx];

  const choose = (i: number) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.ans) setScore(s => s + 1);
  };
  const next = () => { if (idx + 1 >= order.length) setDone(true); else { setIdx(i => i + 1); setSel(null); } };
  const restart = () => { setIdx(0); setSel(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / order.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: 52 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: "#1C1A28", margin: "12px 0 4px" }}>Score: {score}/{order.length}</h3>
        <div style={{ fontSize: 13, color: "#5A576B", marginBottom: 20 }}>{pct >= 80 ? "Excellent financial knowledge!" : pct >= 60 ? "Good effort! Keep practising." : "Keep learning — the course gets you there!"}</div>
        <div style={{ height: 8, background: "#EAE8FB", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#5A4FD6,#8B80F9)", transition: "width 1s" }} />
        </div>
        <button onClick={restart} style={btn({ background: "#5A4FD6", color: "#fff", padding: "10px 28px" })}>Try Again ↺</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#5A4FD6", textTransform: "uppercase" }}>Q {idx + 1} / {order.length}</span>
        <span style={{ fontSize: 12, color: "#9A97A8" }}>Score: {score}</span>
      </div>
      <div style={{ height: 4, background: "#EAE8FB", borderRadius: 99, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ width: `${(idx / order.length) * 100}%`, height: "100%", background: "#5A4FD6", transition: "width .4s" }} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1A28", marginBottom: 16, lineHeight: 1.5 }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.opts.map((opt, i) => {
          let bg = "#F9F9F9", border = "1px solid #E5E2F8", col = "#1C1A28";
          if (sel !== null) {
            if (i === q.ans) { bg = "#E8F5E9"; border = "1.5px solid #4CAF50"; col = "#1B5E20"; }
            else if (i === sel) { bg = "#FFEBEE"; border = "1.5px solid #E53935"; col = "#B71C1C"; }
          }
          return <button key={i} onClick={() => choose(i)} style={btn({ textAlign: "left", padding: "12px 14px", background: bg, border, color: col, cursor: sel !== null ? "default" : "pointer" })}>{opt}</button>;
        })}
      </div>
      {sel !== null && <div style={{ marginTop: 12, padding: "10px 14px", background: "#EAE8FB", borderRadius: 10, fontSize: 12, color: "#3D34A5" }}>💡 {q.exp}</div>}
      {sel !== null && <button onClick={next} style={btn({ marginTop: 12, width: "100%", background: "#5A4FD6", color: "#fff", padding: "12px" })}>{idx + 1 >= order.length ? "See Results →" : "Next →"}</button>}
    </div>
  );
}

// ─── PUZZLE GAME ─────────────────────────────────────────────────────────────
export function PuzzleGame() {
  const TITLES = ["Regulatory Terms", "Banking & Finance", "Stock Market", "Tax & Savings"];
  const [setIdx, setSetIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [defs, setDefs] = useState<{ term: string; def: string }[]>([]);
  const cur = PUZZLE_SETS[setIdx];

  useEffect(() => { setDefs([...cur].sort(() => Math.random() - .5)); setSel(null); setMatched({}); setWrong(null); }, [setIdx]);
  useEffect(() => { setDefs([...cur].sort(() => Math.random() - .5)); }, []);

  const allDone = Object.keys(matched).length === cur.length;

  const clickTerm = (t: string) => { if (matched[t]) return; setSel(t); setWrong(null); };
  const clickDef = (d: string) => {
    if (!sel) return;
    const correct = cur.find(p => p.term === sel)!.def;
    if (d === correct) { setMatched(m => ({ ...m, [sel]: d })); setSel(null); }
    else { setWrong(d); setTimeout(() => { setWrong(null); setSel(null); }, 800); }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#5A4FD6", textTransform: "uppercase" }}>Round {setIdx + 1}/{PUZZLE_SETS.length}: {TITLES[setIdx]}</span>
        <span style={{ fontSize: 12, color: "#9A97A8" }}>{Object.keys(matched).length}/{cur.length} matched</span>
      </div>
      <div style={{ height: 4, background: "#EAE8FB", borderRadius: 99, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ width: `${(Object.keys(matched).length / cur.length) * 100}%`, height: "100%", background: "#5A4FD6", transition: "width .4s" }} />
      </div>
      {allDone && (
        <div style={{ textAlign: "center", padding: 16, background: "#E8F5E9", borderRadius: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🎉</div>
          <p style={{ fontWeight: 700, color: "#1B5E20", margin: "0 0 10px" }}>{setIdx + 1 < PUZZLE_SETS.length ? `Round ${setIdx + 1} complete!` : "All rounds done! Amazing!"}</p>
          <button onClick={() => setSetIdx(i => (i + 1) % PUZZLE_SETS.length)} style={btn({ background: "#5A4FD6", color: "#fff", padding: "9px 22px" })}>
            {setIdx + 1 < PUZZLE_SETS.length ? "Next Round →" : "Play Again ↺"}
          </button>
        </div>
      )}
      <p style={{ fontSize: 12, color: "#5A576B", marginBottom: 10 }}>Tap a <b>Term</b>, then its <b>Definition</b>.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9A97A8", letterSpacing: ".06em", textTransform: "uppercase" }}>Terms</div>
          {cur.map(p => { const done = !!matched[p.term], active = sel === p.term; return (
            <button key={p.term} onClick={() => clickTerm(p.term)} style={btn({ padding: "9px 12px", border: active ? "2px solid #5A4FD6" : done ? "1.5px solid #4CAF50" : "1px solid #E5E2F8", background: done ? "#E8F5E9" : active ? "#EAE8FB" : "#F9F9F9", color: done ? "#2E7D32" : active ? "#3D34A5" : "#1C1A28", cursor: done ? "default" : "pointer", fontSize: 14, textAlign: "left" })}>
              {done ? "✓ " : ""}{p.term}
            </button>
          ); })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9A97A8", letterSpacing: ".06em", textTransform: "uppercase" }}>Definitions</div>
          {defs.map(p => { const isM = Object.values(matched).includes(p.def), isW = wrong === p.def; return (
            <button key={p.def} onClick={() => clickDef(p.def)} style={btn({ padding: "9px 10px", border: isW ? "2px solid #E53935" : isM ? "1.5px solid #4CAF50" : sel ? "1.5px solid #C5C0F5" : "1px solid #E5E2F8", background: isW ? "#FFEBEE" : isM ? "#E8F5E9" : sel ? "#F5F4FF" : "#F9F9F9", color: isW ? "#B71C1C" : isM ? "#2E7D32" : "#1C1A28", cursor: isM ? "default" : "pointer", fontSize: 11, textAlign: "left", lineHeight: 1.4 })}>
              {p.def}
            </button>
          ); })}
        </div>
      </div>
    </div>
  );
}

// ─── PAYDAY GAME ─────────────────────────────────────────────────────────────
function PaydayGame({ onBack }: { onBack: () => void }) {
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState<{ event: string; tip: string; s: number }[]>([]);
  const r = PAYDAY_ROUNDS[round];
  const fixedTotal = Object.values(r.expenses).reduce((a, b) => a + b, 0);
  const disposable = r.income - fixedTotal;

  const pick = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const c = r.choices[i];
    setScore(s => s + c.score);
    setLog(l => [...l, { event: r.event, tip: c.tip, s: c.score }]);
  };
  const next = () => { if (round + 1 >= PAYDAY_ROUNDS.length) setDone(true); else { setRound(r => r + 1); setChoice(null); } };
  const restart = () => { setRound(0); setChoice(null); setScore(0); setDone(false); setLog([]); };

  if (done) {
    const grade = score >= 40 ? "A" : score >= 25 ? "B" : score >= 10 ? "C" : "D";
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 44 }}>{grade === "A" ? "🏆" : grade === "B" ? "👍" : "📚"}</div>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: "#1C1A28", margin: "8px 0 4px" }}>Financial Grade: {grade}</h3>
          <p style={{ color: "#5A576B", fontSize: 13, margin: 0 }}>Score: {score} pts</p>
        </div>
        {log.map((l, i) => (
          <div key={i} style={{ background: l.s > 0 ? "#F0FDF4" : "#FFF1F2", border: `1px solid ${l.s > 0 ? "#86EFAC" : "#FECACA"}`, borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
            <p style={{ fontSize: 11, color: "#5A4FD6", fontWeight: 700, margin: "0 0 3px" }}>{l.event}</p>
            <p style={{ fontSize: 12, color: "#10B981", margin: 0 }}>💡 {l.tip}</p>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={restart} style={btn({ flex: 1, background: "#5A4FD6", color: "#fff", padding: "10px 0" })}>Play Again ↺</button>
          <button onClick={onBack} style={btn({ flex: 1, background: "#F0EDE6", color: "#5A576B", padding: "10px 0" })}>← Games</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} style={btn({ background: "none", color: "#5A4FD6", padding: "0 0 10px", fontSize: 13 })}>← All Games</button>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <b style={{ fontSize: 14, color: "#1C1A28" }}>📅 {r.month}</b>
        <span style={{ fontSize: 12, color: "#9A97A8" }}>Month {round + 1}/{PAYDAY_ROUNDS.length}</span>
      </div>
      <div style={{ background: "#EAE8FB", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#5A576B" }}>Income: <b style={{ color: "#3D34A5" }}>₹{r.income.toLocaleString()}</b></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "6px 0" }}>
          {Object.entries(r.expenses).map(([k, v]) => <span key={k} style={{ fontSize: 11, background: "rgba(255,255,255,.7)", borderRadius: 6, padding: "2px 7px", color: "#5A576B" }}>{k}: ₹{v.toLocaleString()}</span>)}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1A28" }}>Disposable: ₹{disposable.toLocaleString()}</div>
      </div>
      <div style={{ background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#92400E" }}>{r.event}</p>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#1C1A28", marginBottom: 8 }}>What will you do?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {r.choices.map((c, i) => {
          const picked = choice === i;
          return (
            <button key={i} onClick={() => pick(i)} style={btn({ textAlign: "left", padding: "12px 14px", background: choice !== null ? (picked ? (c.score > 0 ? "#E8F5E9" : "#FFEBEE") : "#F9F9F9") : "#F9F9F9", border: choice !== null ? (picked ? `1.5px solid ${c.score > 0 ? "#4CAF50" : "#E53935"}` : "1px solid #E5E2F8") : "1px solid #E5E2F8", color: choice !== null && picked ? (c.score > 0 ? "#1B5E20" : "#B71C1C") : "#1C1A28", cursor: choice !== null ? "default" : "pointer", fontSize: 13 })}>
              {c.label}
              {picked && <div style={{ fontSize: 11, color: "#10B981", marginTop: 4 }}>💡 {c.tip}</div>}
            </button>
          );
        })}
      </div>
      {choice !== null && <button onClick={next} style={btn({ marginTop: 12, width: "100%", background: "#5A4FD6", color: "#fff", padding: "11px 0", fontSize: 14 })}>{round + 1 >= PAYDAY_ROUNDS.length ? "See Results →" : `Next Month →`}</button>}
    </div>
  );
}

// ─── LOAN ADVISOR ─────────────────────────────────────────────────────────────
function LoanAdvisorGame({ onBack }: { onBack: () => void }) {
  const AMOUNT = 100000;
  const [ranking, setRanking] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const emi = (rate: number, months: number) => {
    if (rate === 0) return AMOUNT / months;
    const r = rate / 100 / 12;
    return AMOUNT * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  };
  const total = (rate: number, months: number) => emi(rate, months) * months;
  const sortedByTotal = [...LOAN_OFFERS].map((o, i) => ({ ...o, i, t: total(o.rate, o.months) })).sort((a, b) => a.t - b.t);
  const bestIdx = sortedByTotal[0].i;

  const toggle = (i: number) => {
    if (submitted) return;
    setRanking(r => r.includes(i) ? r.filter(x => x !== i) : r.length < LOAN_OFFERS.length ? [...r, i] : r);
  };
  const restart = () => { setRanking([]); setSubmitted(false); };
  const correct = submitted && ranking[0] === bestIdx;

  return (
    <div>
      <button onClick={onBack} style={btn({ background: "none", color: "#5A4FD6", padding: "0 0 10px", fontSize: 13 })}>← All Games</button>
      <h4 style={{ fontFamily: "'Fraunces',serif", color: "#1C1A28", fontSize: 17, marginBottom: 4 }}>🏦 Loan Advisor</h4>
      <p style={{ fontSize: 13, color: "#5A576B", marginBottom: 14 }}>Borrow <b>₹1,00,000</b>. Rank from <b>Best (1st)</b> to <b>Worst (4th)</b>. Click in order.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {LOAN_OFFERS.map((offer, i) => {
          const rank = ranking.indexOf(i) + 1;
          const realRank = sortedByTotal.findIndex(s => s.i === i) + 1;
          return (
            <button key={i} onClick={() => toggle(i)} style={btn({ position: "relative", textAlign: "left", padding: "12px 14px", background: submitted ? (realRank <= 2 ? "#E8F5E9" : "#FFF1F2") : rank > 0 ? "#EAE8FB" : "#F9F9F9", border: submitted ? (realRank <= 2 ? "1.5px solid #4CAF50" : "1.5px solid #EF4444") : rank > 0 ? "2px solid #5A4FD6" : "1px solid #E5E2F8", cursor: submitted ? "default" : "pointer", fontSize: 13 })}>
              {rank > 0 && !submitted && <span style={{ position: "absolute", top: 8, right: 10, background: "#5A4FD6", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{rank}</span>}
              {submitted && <span style={{ position: "absolute", top: 8, right: 10, fontSize: 11, fontWeight: 700, color: realRank <= 2 ? "#2E7D32" : "#B71C1C" }}>#{realRank} Best</span>}
              <div style={{ fontWeight: 700, color: "#1C1A28", marginBottom: 3 }}>{offer.icon} {offer.name} <span style={{ fontSize: 11, color: "#9A97A8", fontWeight: 400 }}>({offer.tag})</span></div>
              <div style={{ fontSize: 12, color: "#5A576B" }}>{offer.rate}% p.a. · {offer.months} months · EMI: ₹{Math.round(emi(offer.rate, offer.months)).toLocaleString()}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1C1A28" }}>Total: ₹{Math.round(total(offer.rate, offer.months)).toLocaleString()}</div>
            </button>
          );
        })}
      </div>
      {submitted && <div style={{ padding: "12px 14px", background: correct ? "#E8F5E9" : "#FFEBEE", borderRadius: 12, marginBottom: 10, fontSize: 13, color: correct ? "#1B5E20" : "#B71C1C" }}>{correct ? "✅ Correct! Always compare APR and total repayment — not just the EMI or tenure." : "❌ Wrong! The loan with the LOWEST total repayment is the best — not the lowest EMI."}</div>}
      {!submitted && ranking.length === LOAN_OFFERS.length && <button onClick={() => setSubmitted(true)} style={btn({ width: "100%", background: "#5A4FD6", color: "#fff", padding: "11px 0", marginBottom: 8 })}>Submit Ranking →</button>}
      {submitted && <button onClick={restart} style={btn({ width: "100%", background: "#F0EDE6", color: "#5A576B", padding: "10px 0" })}>Try Again ↺</button>}
      {!submitted && <p style={{ fontSize: 11, color: "#9A97A8", textAlign: "center" }}>Click all 4 offers to rank ({ranking.length}/4 selected)</p>}
    </div>
  );
}

// ─── INVESTMENT RACE ─────────────────────────────────────────────────────────
function InvestmentRace({ onBack }: { onBack: () => void }) {
  const START = 50000; const ROUNDS = 3;
  const [round, setRound] = useState(0);
  const [portfolio, setPortfolio] = useState(START);
  const [picked, setPicked] = useState<string | null>(null);
  const [ret, setRet] = useState(0);
  const [history, setHistory] = useState<{ name: string; ret: number; val: number }[]>([]);
  const [done, setDone] = useState(false);

  const pick = (opt: typeof INVEST_OPTIONS[0]) => {
    if (picked) return;
    const r = parseFloat((opt.min + Math.random() * (opt.max - opt.min)).toFixed(1));
    const newVal = Math.round(portfolio * (1 + r / 100));
    setPicked(opt.id); setRet(r);
    setHistory(h => [...h, { name: opt.name, ret: r, val: newVal }]);
    setTimeout(() => { if (round + 1 >= ROUNDS) { setPortfolio(newVal); setDone(true); } else { setPortfolio(newVal); setRound(r => r + 1); setPicked(null); setRet(0); } }, 1800);
  };
  const restart = () => { setRound(0); setPortfolio(START); setPicked(null); setRet(0); setHistory([]); setDone(false); };

  if (done) {
    const gain = portfolio - START;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 44 }}>{gain >= 0 ? "📈" : "📉"}</div>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: "#1C1A28", margin: "8px 0 4px" }}>Final: ₹{portfolio.toLocaleString()}</h3>
          <p style={{ color: gain >= 0 ? "#10B981" : "#EF4444", fontWeight: 700, fontSize: 14 }}>{gain >= 0 ? "+" : ""}₹{Math.abs(gain).toLocaleString()} ({((gain / START) * 100).toFixed(1)}%)</p>
        </div>
        {history.map((h, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "#F9F9F9", borderRadius: 10, padding: "9px 12px", marginBottom: 6 }}>
          <span style={{ fontSize: 13 }}>Year {i + 1}: {h.name}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: h.ret >= 0 ? "#10B981" : "#EF4444" }}>{h.ret >= 0 ? "+" : ""}{h.ret}% → ₹{h.val.toLocaleString()}</span>
        </div>)}
        <div style={{ background: "#EAE8FB", borderRadius: 12, padding: "10px 14px", margin: "12px 0", fontSize: 12, color: "#3D34A5" }}>💡 Diversify! Never put all money in one asset class. Mix FD + MF + Stocks for balanced growth.</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={restart} style={btn({ flex: 1, background: "#5A4FD6", color: "#fff", padding: "10px 0" })}>Play Again ↺</button>
          <button onClick={onBack} style={btn({ flex: 1, background: "#F0EDE6", color: "#5A576B", padding: "10px 0" })}>← Games</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} style={btn({ background: "none", color: "#5A4FD6", padding: "0 0 10px", fontSize: 13 })}>← All Games</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <b style={{ fontFamily: "'Fraunces',serif", fontSize: 17, color: "#1C1A28" }}>📈 Investment Race</b>
        <span style={{ fontSize: 12, color: "#9A97A8" }}>Year {round + 1}/{ROUNDS}</span>
      </div>
      <div style={{ background: "#EAE8FB", borderRadius: 12, padding: "12px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
        <div><div style={{ fontSize: 11, color: "#5A576B" }}>Portfolio</div><div style={{ fontSize: 20, fontWeight: 700, color: "#3D34A5" }}>₹{portfolio.toLocaleString()}</div></div>
        {history.length > 0 && <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#5A576B" }}>Total gain</div><div style={{ fontSize: 14, fontWeight: 700, color: portfolio >= START ? "#10B981" : "#EF4444" }}>{portfolio >= START ? "+" : ""}₹{(portfolio - START).toLocaleString()}</div></div>}
      </div>
      <p style={{ fontSize: 13, color: "#5A576B", marginBottom: 10 }}>Where will you invest this year?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {INVEST_OPTIONS.map(opt => {
          const isP = picked === opt.id;
          return (
            <button key={opt.id} onClick={() => pick(opt)} style={btn({ textAlign: "left", padding: "12px 14px", background: isP ? `${opt.color}18` : "#F9F9F9", border: isP ? `2px solid ${opt.color}` : "1px solid #E5E2F8", cursor: picked ? "default" : "pointer", fontSize: 13 })}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "#1C1A28" }}>{opt.icon} {opt.name}</span>
                <span style={{ fontSize: 11, background: `${opt.color}22`, color: opt.color, borderRadius: 6, padding: "2px 7px", fontWeight: 600 }}>{opt.risk}</span>
              </div>
              <div style={{ fontSize: 12, color: "#5A576B", marginTop: 3 }}>Return range: {opt.min}% to {opt.max}%/year</div>
              {isP && <div style={{ marginTop: 6, fontWeight: 700, fontSize: 14, color: ret >= 0 ? "#10B981" : "#EF4444", animation: "fadeIn .5s" }}>{ret >= 0 ? "▲ +" : "▼ "}{ret}% this year!</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── BUDGET CHALLENGE ─────────────────────────────────────────────────────────
function BudgetChallenge({ onBack }: { onBack: () => void }) {
  const [scenIdx, setScenIdx] = useState(0);
  const scen = BUDGET_SCENARIOS[scenIdx];
  const fixedTotal = Object.values(scen.fixed).reduce((a, b) => a + b, 0);
  const disposable = scen.income - fixedTotal;
  const [alloc, setAlloc] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const even = Math.floor(disposable / scen.cats.length / 500) * 500;
    setAlloc(Object.fromEntries(scen.cats.map(c => [c, even])));
    setSubmitted(false);
  }, [scenIdx]);

  const totalAlloc = Object.values(alloc).reduce((a, b) => a + b, 0);
  const remaining = disposable - totalAlloc;
  const goalsPass = scen.goals.every(g => {
    const v = alloc[g.key] ?? 0;
    return v >= g.min && v <= g.max;
  });

  const nextScenario = () => { setScenIdx(i => (i + 1) % BUDGET_SCENARIOS.length); };

  return (
    <div>
      <button onClick={onBack} style={btn({ background: "none", color: "#5A4FD6", padding: "0 0 10px", fontSize: 13 })}>← All Games</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <b style={{ fontFamily: "'Fraunces',serif", fontSize: 16, color: "#1C1A28" }}>{scen.title}</b>
        <span style={{ fontSize: 11, color: "#9A97A8" }}>Scenario {scenIdx + 1}/{BUDGET_SCENARIOS.length}</span>
      </div>
      <p style={{ fontSize: 12, color: "#5A576B", marginBottom: 10, lineHeight: 1.5 }}>{scen.story}</p>
      <div style={{ background: "#EAE8FB", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#5A576B" }}>Fixed costs: {Object.entries(scen.fixed).map(([k, v]) => `${k} ₹${v.toLocaleString()}`).join(" · ")}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#3D34A5", marginTop: 4 }}>Disposable: ₹{disposable.toLocaleString()} | Used: ₹{totalAlloc.toLocaleString()} | Left: <span style={{ color: remaining < 0 ? "#EF4444" : "#10B981" }}>₹{remaining.toLocaleString()}</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
        {scen.cats.map(cat => (
          <div key={cat}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#1C1A28", fontWeight: 500 }}>{cat}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#5A4FD6" }}>₹{(alloc[cat] ?? 0).toLocaleString()}</span>
            </div>
            <input type="range" min={0} max={disposable} step={500} value={alloc[cat] ?? 0}
              onChange={e => setAlloc(a => ({ ...a, [cat]: Number(e.target.value) }))}
              style={{ width: "100%", accentColor: "#5A4FD6", cursor: "pointer" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {scen.goals.map(g => {
          const v = alloc[g.key] ?? 0;
          const pass = v >= g.min && v <= g.max;
          return (
            <div key={g.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: submitted ? (pass ? "#2E7D32" : "#B71C1C") : "#5A576B" }}>
              <span style={{ fontSize: 16 }}>{submitted ? (pass ? "✅" : "❌") : "🎯"}</span>{g.label}
            </div>
          );
        })}
      </div>
      {!submitted && <button onClick={() => setSubmitted(true)} style={btn({ width: "100%", background: "#5A4FD6", color: "#fff", padding: "11px 0", marginBottom: 8 })}>Check My Budget →</button>}
      {submitted && (
        <div>
          <div style={{ padding: "12px 14px", background: goalsPass ? "#E8F5E9" : "#FFEBEE", borderRadius: 12, marginBottom: 10, fontSize: 13, color: goalsPass ? "#1B5E20" : "#B71C1C" }}>
            {goalsPass ? "🎉 All goals met! You're a budget champion!" : "💡 Adjust your sliders to meet all goals before submitting."}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSubmitted(false)} style={btn({ flex: 1, background: "#F0EDE6", color: "#5A576B", padding: "10px 0" })}>Adjust</button>
            <button onClick={nextScenario} style={btn({ flex: 1, background: "#5A4FD6", color: "#fff", padding: "10px 0" })}>Next Scenario →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GAME HUB ─────────────────────────────────────────────────────────────────
export function GameHub() {
  type GameId = "payday" | "loan" | "invest" | "budget" | null;
  const [active, setActive] = useState<GameId>(null);

  if (active === "payday") return <PaydayGame onBack={() => setActive(null)} />;
  if (active === "loan") return <LoanAdvisorGame onBack={() => setActive(null)} />;
  if (active === "invest") return <InvestmentRace onBack={() => setActive(null)} />;
  if (active === "budget") return <BudgetChallenge onBack={() => setActive(null)} />;

  return (
    <div>
      <p style={{ fontSize: 13, color: "#5A576B", marginBottom: 16, lineHeight: 1.5 }}>Inspired by <b>Monopoly</b>, <b>Payday</b>, <b>Shady Sam</b> & <b>PersonalFinanceLab</b> — play real-world financial scenarios!</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {GAMES_LIST.map(g => (
          <button key={g.id} onClick={() => setActive(g.id as GameId)} style={btn({ textAlign: "left", padding: "14px 16px", background: "#F9F9F9", border: "1px solid #E5E2F8", borderLeft: `4px solid ${g.color}`, borderRadius: 12, cursor: "pointer", fontSize: 13 })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontWeight: 700, color: "#1C1A28", fontSize: 15 }}>{g.icon} {g.title}</span>
              <span style={{ fontSize: 10, background: `${g.color}20`, color: g.color, borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>{g.badge}</span>
            </div>
            <span style={{ color: "#5A576B", fontSize: 12 }}>{g.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN MODAL ───────────────────────────────────────────────────────────────
export function InteractiveLearningModal() {
  const [tab, setTab] = useState<"quiz" | "puzzle" | "games">("quiz");
  const tabs = [
    { id: "quiz" as const, label: "Quiz", icon: "🧠" },
    { id: "puzzle" as const, label: "Puzzles", icon: "🔤" },
    { id: "games" as const, label: "Games", icon: "🎮" },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={btn({ flex: 1, padding: "10px 6px", border: tab === t.id ? "2px solid #5A4FD6" : "1.5px solid #E0DCCE", background: tab === t.id ? "#EAE8FB" : "#F9F9F9", color: tab === t.id ? "#3D34A5" : "#5A576B", fontWeight: tab === t.id ? 700 : 500 })}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {tab === "quiz" && <QuizGame />}
      {tab === "puzzle" && <PuzzleGame />}
      {tab === "games" && <GameHub />}
    </div>
  );
}
