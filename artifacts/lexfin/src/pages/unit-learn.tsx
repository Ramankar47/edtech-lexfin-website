import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Check, X, Star, Zap, Trophy, BookOpen, Headphones, Video, ChevronRight, ArrowLeft } from "lucide-react";
import { GlobalHeader } from "@/components/GlobalHeader";
import confetti from "canvas-confetti";

// ─────────────────────────────────────────────
//  MODULE 1 — THE FOUNDATION (hardcoded)
// ─────────────────────────────────────────────
const MODULE_1 = {
  title: "The Foundation",
  subtitle: "Household Economics & Legal Awareness",
  section: "Module 1",
  units: [
    {
      id: "u1",
      title: "Advanced Economic Understanding",
      content: [
        { type: "heading", text: "Types of Income" },
        { type: "para", text: "Income can be classified into three broad categories: Earned income is money received in exchange for work — salaries, wages, freelance fees. Portfolio income comes from investments — dividends, interest, capital gains. Passive income is generated with minimal active effort — rental income, royalties, or profits from a limited partnership." },
        { type: "tip", text: "Under the Income Tax Act, 1961, all three types of income are taxable, but the rates and deductions vary significantly depending on the head of income." },
        { type: "heading", text: "Real vs Nominal Income" },
        { type: "para", text: "Nominal income is the raw number on your pay slip. Real income adjusts that figure for inflation — it reflects your actual purchasing power. For example, if your salary grew by 5% but inflation was 7%, your real income fell by 2%. This distinction matters legally in wage structures and government securities." },
        { type: "heading", text: "Inflation Indexing in Taxation" },
        { type: "para", text: "The government issues a Cost Inflation Index (CII) every year. When you sell a long-term capital asset (like property or gold), you apply the CII to its purchase price to calculate the indexed cost — reducing your taxable capital gain. This indexation benefit is a significant legal protection for investors." },
        { type: "list", text: "CII is notified by CBDT every year|Long-term capital assets qualify after 24 months (immovable property) or 12–36 months (other assets)|Section 48 of the IT Act governs this calculation" },
      ],
    },
    {
      id: "u2",
      title: "Legal Deepening",
      content: [
        { type: "heading", text: "Heads of Income under the IT Act, 1961" },
        { type: "para", text: "The Income Tax Act organises income into five heads for computation purposes: (1) Salaries, (2) Income from House Property, (3) Profits & Gains from Business or Profession, (4) Capital Gains, and (5) Income from Other Sources. Each head has its own deductions, exemptions, and tax rates." },
        { type: "tip", text: "Misclassifying income between heads is one of the most common errors that leads to tax notices and penalties. Always match the nature of income to the correct head." },
        { type: "heading", text: "Residential Status and Global Income" },
        { type: "para", text: "Under Indian tax law, your residential status determines how much of your income is taxable. A Resident and Ordinarily Resident (ROR) pays tax on global income — money earned in India AND abroad. A Non-Resident (NR) pays tax only on income earned or received in India. The status is determined by how many days you spent in India in a given financial year." },
        { type: "heading", text: "Legal Compliance for First-Time Taxpayers" },
        { type: "para", text: "When you earn your first salary, the law requires several immediate steps: Link your PAN (Permanent Account Number) with Aadhaar. Review your Annual Information Statement (AIS) and Tax Information Summary (TIS) on the Income Tax portal. File your ITR (Income Tax Return) if your total income exceeds the basic exemption limit — ₹3 lakh under the new tax regime." },
        { type: "list", text: "PAN–Aadhaar linking is mandatory since July 2023|AIS shows all financial transactions reported by third parties|Non-filing or late filing attracts penalties under Section 234F" },
      ],
    },
    {
      id: "u3",
      title: "Financial Inclusion & Law",
      content: [
        { type: "heading", text: "Banking Access under PMJDY" },
        { type: "para", text: "The Pradhan Mantri Jan Dhan Yojana (PMJDY), launched in 2014, is India's flagship financial inclusion initiative. It enables every Indian to open a zero-balance bank account with a RuPay debit card, ₹2 lakh accidental insurance, ₹30,000 life insurance, and access to DBT (Direct Benefit Transfer) subsidies." },
        { type: "tip", text: "As of 2024, over 53 crore Jan Dhan accounts have been opened. This scheme is the legal backbone of India's push to bring the unbanked population into the formal financial system." },
        { type: "heading", text: "KYC/AML Norms under the RBI" },
        { type: "para", text: "Know Your Customer (KYC) is a legal process mandated by the RBI under the Prevention of Money Laundering Act (PMLA), 2002. Banks must verify every customer's identity (Aadhaar/PAN/Passport) and address before opening an account. Anti-Money Laundering (AML) norms require banks to report suspicious transactions to the Financial Intelligence Unit (FIU-IND)." },
        { type: "heading", text: "Legal Safeguards for Small Depositors" },
        { type: "para", text: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) — a fully owned subsidiary of the RBI — insures bank deposits. Every depositor's savings are protected up to ₹5 lakh (principal + interest) per bank. Even if a bank fails, you are guaranteed this amount under the DICGC Act, 1961." },
        { type: "list", text: "₹5 lakh DICGC insurance per depositor per bank|Covers all deposit types: savings, FD, RD, current|Zero-balance accounts under PMJDY also get this protection" },
      ],
    },
  ],
  quizzes: [
    {
      title: "Unit 1 — Quiz",
      xp: 200,
      questions: [
        { q: "If your salary grew by 4% but inflation was 6%, which of the following is TRUE?", opts: ["Your nominal income fell", "Your real income increased", "Your real income fell by 2%", "Your tax liability will decrease"], ans: 2, exp: "Real income = nominal income growth minus inflation. 4% − 6% = −2%, so your real purchasing power actually declined." },
        { q: "A Resident and Ordinarily Resident (ROR) in India is taxed on:", opts: ["Only income earned in India", "Only income received in India", "Global income — both India and abroad", "Only salary income"], ans: 2, exp: "An ROR is taxed on global income under Indian law — this includes all income earned or received anywhere in the world." },
        { q: "Under DICGC, how much deposit is insured per depositor per bank?", opts: ["₹1 lakh", "₹2 lakh", "₹5 lakh", "₹10 lakh"], ans: 2, exp: "The DICGC insures deposits up to ₹5 lakh (principal + interest) per depositor per bank as of 2021." },
        { q: "Priya is an NRI working in Dubai. She receives rent from a flat in Mumbai and earns a salary in Dubai. Which income is taxable in India?", opts: ["Both salary and rent", "Only the Dubai salary", "Only the Mumbai rent", "Neither, as she is an NRI"], ans: 2, exp: "An NRI is taxed in India only on income earned or received in India. Mumbai rent qualifies; Dubai salary does not." },
      ],
    }
  ],
  puzzle: {
    title: "Scenario Puzzle",
    xp: 100,
    scenario: "Ananya recently started her first job at a Mumbai firm, earning ₹6.5 lakh/year. She has a savings account in a small cooperative bank and holds ₹4.8 lakh in FDs there. Her father, who lives in London, transfers ₹2 lakh/month to her Indian account as rent from a property he owns in Pune. Ananya hasn't filed her ITR yet, and her PAN is still not linked to Aadhaar.",
    question: "Which of the following BEST describes Ananya's immediate legal obligations and financial risk?",
    opts: [
      "She only needs to file ITR; her deposits are fully insured and PAN linking is optional.",
      "She must link PAN–Aadhaar immediately (her PAN is inoperative otherwise), file ITR reporting both her salary AND the rent income (since it's received in India), and note that her FD of ₹4.8 lakh is insured by DICGC but only up to ₹5 lakh.",
      "She should only report her salary; foreign transfers are exempt from Indian taxation.",
      "She has no tax obligations since she is below the age of 30.",
    ],
    ans: 1,
    exp: "Ananya has three key obligations: (1) PAN–Aadhaar linking is mandatory — an unlinked PAN is inoperative and bars her from filing returns. (2) The rent received in India from her father's Pune property is taxable in India regardless of who pays it, and must be declared under 'Income from House Property'. (3) Her ₹4.8 lakh FD is within the ₹5 lakh DICGC limit, so she is protected.",
  },
};

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
type AppStep =
  | { kind: "unit"; index: number }
  | { kind: "quiz"; index: number }
  | { kind: "puzzle" }
  | { kind: "complete" };

const MAX_XP = 4 * 50 + 100; // 300
const PASS_THRESHOLD = 0.8;   // 80%

// ─────────────────────────────────────────────
//  Root
// ─────────────────────────────────────────────
export default function UnitLearnPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<AppStep>({ kind: "unit", index: 0 });
  const [xpEarned, setXpEarned] = useState(0);

  const totalSteps = MODULE_1.units.length + MODULE_1.quizzes.length + 2; // units + quizzes + puzzle + complete
  const stepIndex = (): number => {
    if (step.kind === "unit") return step.index;
    if (step.kind === "quiz") return MODULE_1.units.length + step.index;
    if (step.kind === "puzzle") return MODULE_1.units.length + MODULE_1.quizzes.length;
    return totalSteps - 1;
  };
  const progress = Math.round((stepIndex() / (totalSteps - 1)) * 100);

  const addXp = (xp: number) => setXpEarned(v => v + xp);

  const goNext = () => {
    if (step.kind === "unit") {
      if (step.index + 1 < MODULE_1.units.length) setStep({ kind: "unit", index: step.index + 1 });
      else setStep({ kind: "quiz", index: 0 });
    } else if (step.kind === "quiz") {
      if (step.index + 1 < MODULE_1.quizzes.length) setStep({ kind: "quiz", index: step.index + 1 });
      else setStep({ kind: "puzzle" });
    } else if (step.kind === "puzzle") {
      setStep({ kind: "complete" });
      setTimeout(() => confetti({ particleCount: 160, spread: 100, origin: { y: 0.45 } }), 350);
    }
  };

  const passed = xpEarned >= MAX_XP * PASS_THRESHOLD; // ≥ 240 of 300

  const stepLabel = (): string => {
    if (step.kind === "unit") return `Unit ${step.index + 1}: ${MODULE_1.units[step.index].title}`;
    if (step.kind === "quiz") return MODULE_1.quizzes[step.index].title;
    if (step.kind === "puzzle") return "Practical Puzzle";
    return "Complete!";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Global nav */}
      <GlobalHeader />

      {/* Progress sub-header */}
      <div style={{ position: "sticky", top: 64, zIndex: 40, background: "#fff", borderBottom: "2px solid #E0DCCE", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setLocation("/learning-path")} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex", alignItems: "center", color: "#9A97A8" }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1A28", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{stepLabel()}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#FEF9EC", border: "1px solid #F3D88A", borderRadius: 100, padding: "3px 10px" }}>
                <Zap size={13} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: 12, fontWeight: 800, color: "#B45309" }}>{xpEarned} XP</span>
              </div>
            </div>
            <div style={{ height: 6, background: "#ECEAF4", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#5A4FD6", borderRadius: 3, transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              <span style={{ fontSize: 10, color: "#9A97A8" }}>Step {stepIndex() + 1} of {totalSteps}</span>
              <span style={{ fontSize: 10, color: "#9A97A8" }}>{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", width: "100%", padding: "32px 24px 80px" }}>
        {step.kind === "unit" && (
          <UnitView
            unit={MODULE_1.units[step.index]}
            unitNumber={step.index + 1}
            totalUnits={MODULE_1.units.length}
            moduleTitle={MODULE_1.title}
            onNext={goNext}
          />
        )}
        {step.kind === "quiz" && (
          <QuizView
            quiz={MODULE_1.quizzes[step.index]}
            quizNumber={step.index + 1}
            onAddXp={addXp}
            onComplete={() => goNext()}
          />
        )}
        {step.kind === "puzzle" && (
          <PuzzleView
            puzzle={MODULE_1.puzzle}
            onAddXp={addXp}
            onComplete={() => goNext()}
          />
        )}
        {step.kind === "complete" && (
          <CompleteView
            xpEarned={xpEarned}
            maxXp={MAX_XP}
            passed={passed}
            onRetry={() => { setStep({ kind: "quiz", index: 0 }); setXpEarned(0); }}
            onNext={() => {
              if (passed) localStorage.setItem("mod1_passed", "true");
              setLocation("/learning-path");
            }}
          />
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Unit View (text + audio + video)
// ─────────────────────────────────────────────
function UnitView({ unit, unitNumber, totalUnits, moduleTitle, onNext }: {
  unit: typeof MODULE_1.units[0];
  unitNumber: number;
  totalUnits: number;
  moduleTitle: string;
  onNext: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) setScrolled(true);
  };

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* Left: content */}
      <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Unit header card */}
        <div style={{ background: "#5A4FD6", borderRadius: 16, padding: "28px 28px 24px", color: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.6)", marginBottom: 8 }}>
            {moduleTitle} · Unit {unitNumber} of {totalUnits}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>{unit.title}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["Quiz", "Max 200 XP"], ["Puzzle", "+100 XP"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.15)", borderRadius: 100, padding: "4px 12px" }}>
                <Star size={11} color="#FCD34D" fill="#FCD34D" />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{l}: {v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Written content */}
        <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFAF7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <BookOpen size={15} color="#5A4FD6" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#5A4FD6" }}>Lesson Content</span>
            </div>
            <span style={{ fontSize: 11, color: "#9A97A8" }}>Scroll to read all</span>
          </div>
          <div ref={contentRef} onScroll={checkScroll} style={{ padding: "20px", maxHeight: 460, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {unit.content.map((block, i) => <ContentBlock key={i} block={block} />)}
            <div style={{ height: 8 }} />
          </div>
        </div>

        {/* Next CTA */}
        <button
          onClick={() => { setScrolled(true); onNext(); }}
          style={{ width: "100%", padding: "16px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .2s" }}
          onMouseOver={e => (e.currentTarget.style.background = "#3D34A5")}
          onMouseOut={e => (e.currentTarget.style.background = "#5A4FD6")}
        >
          {unitNumber < totalUnits ? `Continue to Unit ${unitNumber + 1} →` : "I've read all units — Start Quiz →"}
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: "#9A97A8", marginTop: -8 }}>
          {unitNumber < totalUnits ? `${totalUnits - unitNumber} unit${totalUnits - unitNumber > 1 ? "s" : ""} remaining` : "Then: 1 quiz · 1 puzzle · Up to 300 XP"}
        </p>
      </div>

      {/* Right: media panels */}
      <div style={{ flex: "0 1 280px", display: "flex", flexDirection: "column", gap: 16 }}>
        <AudioPanel src={`/api/content/Course1/Module1/Unit${unitNumber}/Audios/media`} />
        <VideoPanel src={`/api/content/Course1/Module1/Unit${unitNumber}/Videos/media`} />
        <div style={{ background: "#FAFAF7", border: "1.5px solid #E0DCCE", borderRadius: 14, padding: "18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#9A97A8", marginBottom: 10 }}>Your Progress</div>
          {Array.from({ length: totalUnits }).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < totalUnits - 1 ? "1px solid #F0EDE6" : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < unitNumber - 1 ? "#5A4FD6" : i === unitNumber - 1 ? "#EAE8FB" : "#F0EDE6", border: `2px solid ${i < unitNumber - 1 ? "#3D34A5" : i === unitNumber - 1 ? "#5A4FD6" : "#E0DCCE"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i < unitNumber - 1 ? <Check size={12} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 9, fontWeight: 700, color: i === unitNumber - 1 ? "#5A4FD6" : "#C8C5D8" }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 12, color: i === unitNumber - 1 ? "#1C1A28" : "#9A97A8", fontWeight: i === unitNumber - 1 ? 600 : 400 }}>Unit {i + 1}: {MODULE_1.units[i].title.split(" ").slice(0, 2).join(" ")}…</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentBlock({ block }: { block: { type: string; text: string } }) {
  if (block.type === "heading") return <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#1C1A28", margin: 0 }}>{block.text}</h2>;
  if (block.type === "para") return <p style={{ fontSize: 14, color: "#3A3748", lineHeight: 1.75, margin: 0 }}>{block.text}</p>;
  if (block.type === "tip") return (
    <div style={{ display: "flex", gap: 12, background: "#FEF9EC", border: "1px solid #F3D88A", borderRadius: 10, padding: "14px 16px" }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <p style={{ fontSize: 13.5, color: "#92400E", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>{block.text}</p>
    </div>
  );
  if (block.type === "list") return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {block.text.split("|").map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#3A3748", lineHeight: 1.6 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#EAE8FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <Check size={11} color="#5A4FD6" strokeWidth={3} />
          </div>
          {item}
        </li>
      ))}
    </ul>
  );
  return null;
}

function AudioPanel({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Stop playing if the source changes (e.g., unit changes)
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [src]);

  const toggle = () => {
    if (!audioRef.current) { setPlaying(p => !p); return; }
    if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => { });
    setPlaying(p => !p);
  };

  return (
    <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 14, padding: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 36, height: 36, background: "#EAE8FB", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Headphones size={16} color="#5A4FD6" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1C1A28", margin: 0 }}>Audio Lesson</p>
          <p style={{ fontSize: 11, color: "#9A97A8", margin: 0 }}>Listen to the narration</p>
        </div>
      </div>
      <audio src={src} ref={audioRef} onTimeUpdate={() => { if (audioRef.current) setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100); }} onEnded={() => setPlaying(false)} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={toggle} style={{ width: 38, height: 38, borderRadius: "50%", background: "#5A4FD6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {playing ? <span style={{ width: 8, height: 10, background: "#fff", borderRadius: 1, boxShadow: "5px 0 0 #fff" }} /> : <span style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #fff", marginLeft: 2 }} />}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: "#ECEAF4", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#5A4FD6", borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPanel({ src }: { src: string }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", gap: 7, background: "#FAFAF7" }}>
        <Video size={14} color="#5A4FD6" />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#5A4FD6" }}>Video Lesson</span>
      </div>
      <div style={{ background: "#1C1A28", aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, overflow: "hidden" }}>
        <video key={src} src={src} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Quiz View
// ─────────────────────────────────────────────
function QuizView({ quiz, quizNumber, onAddXp, onComplete }: {
  quiz: typeof MODULE_1.quizzes[0];
  quizNumber: number;
  onAddXp: (xp: number) => void;
  onComplete: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const q = quiz.questions[idx];

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.ans) {
      onAddXp(quiz.xp / quiz.questions.length);
    }
  };

  const handleNext = () => {
    if (idx + 1 >= quiz.questions.length) {
      onComplete();
      return;
    }
    setIdx(v => v + 1);
    setSelected(null);
    setRevealed(false);
  };

  const opts = ["A", "B", "C", "D"];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Quiz card */}
      <div style={{ background: "#5A4FD6", borderRadius: 16, padding: "22px 28px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>Module 1 • {MODULE_1.title}</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>{quiz.title}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 100, padding: "5px 14px", fontSize: 13, color: "#fff", fontWeight: 500 }}>
            {idx + 1} / {quiz.questions.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,.15)", borderRadius: 100, padding: "5px 14px" }}>
            <Star size={12} color="#FCD34D" fill="#FCD34D" />
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>+{quiz.xp / quiz.questions.length} XP</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 4, background: "#ECEAF4", borderRadius: 2, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(idx / quiz.questions.length) * 100}%`, background: "#5A4FD6", borderRadius: 2, transition: "width .3s" }} />
      </div>

      {/* Question */}
      <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: "#1C1A28", lineHeight: 1.6, margin: 0 }}>{q.q}</p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {q.opts.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.ans;
          const showCorrect = revealed && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              style={{
                textAlign: "left", padding: "14px 18px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: revealed ? "default" : "pointer",
                border: `2px solid ${showCorrect ? "#059669" : showWrong ? "#DC2626" : isSelected ? "#5A4FD6" : "#E0DCCE"}`,
                background: showCorrect ? "#ECFDF5" : showWrong ? "#FEF2F2" : isSelected ? "#EAE8FB" : "#fff",
                color: showCorrect ? "#047857" : showWrong ? "#B91C1C" : "#1C1A28",
                display: "flex", alignItems: "center", gap: 14, transition: "all .18s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: showCorrect ? "#059669" : showWrong ? "#DC2626" : "#ECEAF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {showCorrect ? <Check size={14} color="#fff" strokeWidth={3} /> : showWrong ? <X size={14} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 11, fontWeight: 700, color: "#9A97A8" }}>{opts[i]}</span>}
              </div>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation + next */}
      {revealed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: selected === q.ans ? "#ECFDF5" : "#FEF2F2", border: `1.5px solid ${selected === q.ans ? "#A7F3D0" : "#FECACA"}`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{selected === q.ans ? "✅" : "💡"}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "#1C1A28" }}>{selected === q.ans ? "Correct!" : `Correct answer: ${opts[q.ans]}`}</p>
              <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6, margin: 0 }}>{q.exp}</p>
            </div>
          </div>
          <button
            onClick={handleNext}
            style={{ width: "100%", padding: "15px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {idx + 1 >= quiz.questions.length ? "Puzzle →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Puzzle View
// ─────────────────────────────────────────────
function PuzzleView({ puzzle, onAddXp, onComplete }: {
  puzzle: typeof MODULE_1.puzzle;
  onAddXp: (xp: number) => void;
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = selected === puzzle.ans;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #3D34A5 0%, #7C3AED 100%)", borderRadius: 16, padding: "26px 28px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>🧩</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.55)", textTransform: "uppercase", letterSpacing: ".1em" }}>Real-World Scenario</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{puzzle.title}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.15)", borderRadius: 100, padding: "6px 14px", flexShrink: 0 }}>
            <Star size={13} color="#FCD34D" fill="#FCD34D" />
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>+{puzzle.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#9A97A8", marginBottom: 8 }}>Scenario</div>
        <p style={{ fontSize: 14, color: "#3A3748", lineHeight: 1.75, margin: 0 }}>{puzzle.scenario}</p>
      </div>

      {/* Question */}
      <div style={{ background: "#FAFAF7", border: "1.5px solid #E0DCCE", borderRadius: 14, padding: "20px 24px", marginBottom: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1A28", lineHeight: 1.6, margin: 0 }}>{puzzle.question}</p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {puzzle.opts.map((opt, i) => {
          const isSelected = selected === i;
          const isRight = i === puzzle.ans;
          const showCorrect = revealed && isRight;
          const showWrong = revealed && isSelected && !isRight;

          return (
            <button
              key={i}
              onClick={() => {
                if (!revealed) {
                  setSelected(i);
                  setRevealed(true);
                  if (i === puzzle.ans) onAddXp(puzzle.xp);
                }
              }}
              disabled={revealed}
              style={{
                textAlign: "left", padding: "15px 20px", borderRadius: 12, fontSize: 13.5, cursor: revealed ? "default" : "pointer",
                border: `2px solid ${showCorrect ? "#059669" : showWrong ? "#DC2626" : isSelected ? "#5A4FD6" : "#E0DCCE"}`,
                background: showCorrect ? "#ECFDF5" : showWrong ? "#FEF2F2" : isSelected ? "#EAE8FB" : "#fff",
                color: "#1C1A28", display: "flex", alignItems: "flex-start", gap: 12, transition: "all .18s",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400, lineHeight: 1.55,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: showCorrect ? "#059669" : showWrong ? "#DC2626" : "#ECEAF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {showCorrect ? <Check size={12} color="#fff" strokeWidth={3} /> : showWrong ? <X size={12} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 10, fontWeight: 700, color: "#9A97A8" }}>{["A", "B", "C", "D"][i]}</span>}
              </div>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: isCorrect ? "#ECFDF5" : "#FEF2F2", border: `1.5px solid ${isCorrect ? "#A7F3D0" : "#FECACA"}`, borderRadius: 12, padding: "18px 20px", display: "flex", gap: 12 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{isCorrect ? "✅" : "💡"}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 13.5, color: "#1C1A28", marginBottom: 6 }}>{isCorrect ? "Excellent analysis!" : "Not quite — here's the expert answer:"}</p>
              <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.65, margin: 0 }}>{puzzle.exp}</p>
            </div>
          </div>
          <button
            onClick={() => onComplete()}
            style={{ width: "100%", padding: "15px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            See Final Results →
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Complete View
// ─────────────────────────────────────────────
function CompleteView({ xpEarned, maxXp, passed, onRetry, onNext }: {
  xpEarned: number;
  maxXp: number;
  passed: boolean;
  onRetry: () => void;
  onNext: () => void;
}) {
  const pct = Math.round((xpEarned / maxXp) * 100);

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <div style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 20, padding: "48px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>{passed ? "🏆" : "💪"}</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1C1A28", marginBottom: 8 }}>
          {passed ? "Module Complete!" : "Almost There!"}
        </h2>
        <p style={{ fontSize: 15, color: "#9A97A8", marginBottom: 28, lineHeight: 1.6 }}>
          {passed
            ? "Outstanding work! You've mastered The Foundation. Module 2 is now unlocked."
            : `You scored ${pct}%. You need at least 80% to unlock the next module. Review the units and try again!`}
        </p>

        {/* Score card */}
        <div style={{ background: passed ? "#ECFDF5" : "#FEF9EC", border: `1.5px solid ${passed ? "#A7F3D0" : "#F3D88A"}`, borderRadius: 16, padding: "24px", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <Zap size={24} color={passed ? "#059669" : "#F59E0B"} fill={passed ? "#059669" : "#F59E0B"} />
            <span style={{ fontSize: 36, fontWeight: 800, color: passed ? "#047857" : "#B45309" }}>{xpEarned}</span>
            <span style={{ fontSize: 18, color: "#9A97A8", fontWeight: 600 }}>/ {maxXp} XP</span>
          </div>
          {/* XP bar */}
          <div style={{ height: 10, background: "#E0DCCE", borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: passed ? "#059669" : "#F59E0B", borderRadius: 5, transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "#9A97A8" }}>Your score: {pct}%</span>
            <span style={{ color: "#9A97A8" }}>Pass: 80%</span>
          </div>
          {/* Score breakdown */}
          <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Quiz", `Max 200 XP`], ["Puzzle", "Max 100 XP"]].map(([l, v]) => (
              <div key={l} style={{ fontSize: 11, color: "#9A97A8", background: "rgba(0,0,0,.04)", borderRadius: 100, padding: "4px 12px" }}>{l}: {v}</div>
            ))}
          </div>
        </div>

        {passed ? (
          <button
            onClick={onNext}
            style={{ width: "100%", padding: "16px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Continue to Module 2 →
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={onRetry}
              style={{ width: "100%", padding: "16px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              Retry Quizzes & Puzzle →
            </button>
            <button
              onClick={onNext}
              style={{ width: "100%", padding: "14px 24px", background: "transparent", color: "#9A97A8", border: "1.5px solid #E0DCCE", borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              Back to Learning Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
