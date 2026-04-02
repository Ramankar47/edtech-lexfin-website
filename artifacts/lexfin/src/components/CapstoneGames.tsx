import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Trophy, ArrowRight, Loader2, 
  Target, Award, RefreshCcw, CheckCircle2,
  ChevronRight, Flag
} from "lucide-react";
import { getApiUrl } from "@/lib/utils";

// Game Components
import { BudgetGame, BudgetScenario } from "./capstone/BudgetGame";
import { WillGame, WillScenario } from "./capstone/WillGame";
import { DebtGame, DebtScenario } from "./capstone/DebtGame";
import { InvestGame, InvestScenario } from "./capstone/InvestGame";
import { CertificateView } from "./capstone/CertificateView";
import { getEncouragement, GameType } from "./capstone/FeedbackEngine";

interface Puzzle {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  puzzleType: string;
  content: string | any;
  xpReward: number;
}

const FALLBACK_CAPSTONES: Puzzle[] = [
  // --- BUDGET (1-10) ---
  {
    id: -1, title: "Household Budget Crisis",
    description: "Your monthly income arrived, but rent and car insurance are due simultaneously. Can you prioritize correctly?",
    difficulty: "easy", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 12000, targets: { insurance: 3000, necessities: 5000, debt: 2000, investments: 1000 }, risks: ["Car repossession", "Eviction notice"] }
  },
  {
    id: -11, title: "Emergency Medical Fund",
    description: "A surprise hospital bill arrived. Re-allocate your monthly savings to cover the cost without falling behind on rent.",
    difficulty: "easy", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 15000, targets: { insurance: 6000, necessities: 7000, debt: 1000, investments: 1000 }, risks: ["Late fees", "Utility cutoff"] }
  },
  {
    id: -12, title: "New Car Planning",
    description: "Save for a down payment while managing current transportation costs.",
    difficulty: "medium", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 20000, targets: { insurance: 4000, necessities: 8000, debt: 3000, investments: 5000 }, risks: ["Brake failure", "Fuel hike"] }
  },
  {
    id: -13, title: "Annual Vacation Savings",
    description: "Balance your dream trip costs with monthly bills.",
    difficulty: "medium", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 18000, targets: { insurance: 2000, necessities: 9000, debt: 4000, investments: 3000 }, risks: ["Flight price surge"] }
  },
  {
    id: -14, title: "Home Renovation",
    description: "Fix a leaky roof and paint the house without dipping into debt.",
    difficulty: "hard", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 25000, targets: { insurance: 3000, necessities: 10000, debt: 5000, investments: 7000 }, risks: ["Structural damage"] }
  },
  {
    id: -15, title: "Children's Education",
    description: "Prioritize school fees and supplies in a tight month.",
    difficulty: "easy", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 10000, targets: { insurance: 1000, necessities: 6000, debt: 1000, investments: 2000 }, risks: ["Admission deadline"] }
  },
  {
    id: -16, title: "Wedding Planning",
    description: "Allocate funds for booking and jewelry while staying liquid.",
    difficulty: "hard", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 35000, targets: { insurance: 5000, necessities: 12000, debt: 8000, investments: 10000 }, risks: ["Caterer deposit", "Gold price hike"] }
  },
  {
    id: -17, title: "Business Startup Seed",
    description: "Cut personal luxury to fund your first office space.",
    difficulty: "medium", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 14000, targets: { insurance: 2000, necessities: 5000, debt: 2000, investments: 5000 }, risks: ["Market dip"] }
  },
  {
    id: -18, title: "Festive Season Prep",
    description: "Manage gifts and celebrations while keeping basics covered.",
    difficulty: "easy", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 9000, targets: { insurance: 1000, necessities: 4000, debt: 2000, investments: 2000 }, risks: ["Impulsive spending"] }
  },
  {
    id: -19, title: "Retirement Nest Egg",
    description: "Maximize your long-term security in a high-expense month.",
    difficulty: "hard", puzzleType: "capstone_budget", xpReward: 500,
    content: { initialBudget: 30000, targets: { insurance: 8000, necessities: 10000, debt: 4000, investments: 8000 }, risks: ["Inflation spike"] }
  },

  // --- WILL (1-10) ---
  {
    id: -2, title: "The Inheritance Protocol",
    description: "Allocate ₹100,000 according to your family's documented legal share requirements.",
    difficulty: "medium", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 100000, heirs: [ { id: "h1", name: "Surviving Spouse", relationship: "Wife", minPercent: 40 }, { id: "h2", name: "Dependent Child", relationship: "Son", minPercent: 30 } ], instructions: "Legal heirs have a primary right to support share." }
  },
  {
    id: -21, title: "Charitable Bequest",
    description: "Donate a specific portion to health research before family shares.",
    difficulty: "easy", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 50000, heirs: [ { id: "h1", name: "Research NGO", relationship: "Charity", minPercent: 20 }, { id: "h2", name: "Brother", relationship: "Legal Heir", minPercent: 50 } ], instructions: "Charity must receive the first 20% by deed." }
  },
  {
    id: -22, title: "Secondary Property Transfer",
    description: "Divide the value of a vacation home between two siblings.",
    difficulty: "medium", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 80000, heirs: [ { id: "h1", name: "Elder Daughter", relationship: "Sister", minPercent: 45 }, { id: "h2", name: "Younger Son", relationship: "Brother", minPercent: 45 } ], instructions: "Ensure equal distribution for property maintenance." }
  },
  {
    id: -23, title: "Trust Fund Setup",
    description: "Set aside education funds for grandchildren in a managed trust.",
    difficulty: "hard", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 200000, heirs: [ { id: "h1", name: "Grandchild A", relationship: "Minor", minPercent: 25 }, { id: "h2", name: "Grandchild B", relationship: "Minor", minPercent: 25 }, { id: "h3", name: "Trustee", relationship: "Guardian", minPercent: 10 } ], instructions: "Minors' education must be prioritized." }
  },
  {
    id: -24, title: "Digital Asset Legacy",
    description: "Transfer cryptocurrency and digital royalty values to technical heirs.",
    difficulty: "medium", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 30000, heirs: [ { id: "h1", name: "Tech Partner", relationship: "Co-Owner", minPercent: 50 } ], instructions: "Assign 50% to technical steward of the assets." }
  },
  {
    id: -25, title: "Equalizing Heirs",
    description: "Account for a previous loan given to one child in final distribution.",
    difficulty: "hard", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 150000, heirs: [ { id: "h1", name: "Child A (Debt-Free)", relationship: "Daughter", minPercent: 60 }, { id: "h2", name: "Child B (Debt-Owed)", relationship: "Son", minPercent: 30 } ], instructions: "Child B already received ₹20,000 early." }
  },
  {
    id: -26, title: "Family Business Succession",
    description: "Ensure the active partner gets enough share to maintain control.",
    difficulty: "hard", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 500000, heirs: [ { id: "h1", name: "Active Director", relationship: "Partner", minPercent: 51 }, { id: "h2", name: "Silent Partner", relationship: "Sibling", minPercent: 20 } ], instructions: "Director must retain majority (51%) for operations." }
  },
  {
    id: -27, title: "Spouse & Only Child",
    description: "Standard Hindu Succession Act distribution simulation.",
    difficulty: "easy", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 120000, heirs: [ { id: "h1", name: "Widow", relationship: "Spouse", minPercent: 50 }, { id: "h2", name: "Daughter", relationship: "Child", minPercent: 50 } ], instructions: "Equal shares for Class I heirs." }
  },
  {
    id: -28, title: "Multiple Dependents",
    description: "Divide support among aging parents and children.",
    difficulty: "medium", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 60000, heirs: [ { id: "h1", name: "Father", relationship: "Parent", minPercent: 25 }, { id: "h2", name: "Mother", relationship: "Parent", minPercent: 25 }, { id: "h3", name: "Son", relationship: "Minor", minPercent: 40 } ], instructions: "Parents' medical care must be 50% total." }
  },
  {
    id: -29, title: "Debt-Settled Estate",
    description: "Clear a personal liability through the estate first.",
    difficulty: "medium", puzzleType: "capstone_will", xpReward: 500,
    content: { totalSum: 40000, heirs: [ { id: "h1", name: "Creditor", relationship: "Debt Settlement", minPercent: 30 }, { id: "h2", name: "Heir", relationship: "Relative", minPercent: 60 } ], instructions: "Creditors have first right to settlement." }
  },

  // --- DEBT (1-10) ---
  {
    id: -3, title: "Debt Avalanche Rescue",
    description: "Arrange these 4 debts into the correct payoff order based on their interest rates to save your future.",
    difficulty: "hard", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Credit Card (HDFC)", rate: 42.5, balance: 45000 }, { id: "d2", name: "Personal Loan", rate: 14.5, balance: 120000 }, { id: "d3", name: "Payday Loan", rate: 65, balance: 15000 }, { id: "d4", name: "Student Loan", rate: 8.5, balance: 500000 } ] }
  },
  {
    id: -31, title: "Smallest First Strategy",
    description: "Apply the Snowball method: target smallest balances to gain psychological momentum.",
    difficulty: "easy", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Store Card", rate: 25, balance: 5000 }, { id: "d2", name: "Car Loan", rate: 12, balance: 120000 }, { id: "d3", name: "Friend's Loan", rate: 0, balance: 2000 } ] }
  },
  {
    id: -32, title: "Interest vs Utility",
    description: "Handle medical debt versus credit line to stay healthy and creditworthy.",
    difficulty: "medium", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Hospital Bill", rate: 0, balance: 15000 }, { id: "d2", name: "ICICI Credit", rate: 38, balance: 80000 } ] }
  },
  {
    id: -33, title: "Consolidation Priority",
    description: "Identify which high-cost debts to consolidate into a single lower-rate loan.",
    difficulty: "medium", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "App Loan", rate: 48, balance: 10000 }, { id: "d2", name: "Home Loan", rate: 9, balance: 4500000 }, { id: "d3", name: "Credit Line", rate: 32, balance: 50000 } ] }
  },
  {
    id: -34, title: "Emergency Loan Repay",
    description: "A 100% APR loan is draining you. Kill it first or fix your car?",
    difficulty: "hard", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Instant Cash", rate: 102, balance: 20000 }, { id: "d2", name: "Auto Repair", rate: 15, balance: 45000 } ] }
  },
  {
    id: -35, title: "Mixed Financial Trap",
    description: "A combination of taxes and cards. Government debt often takes precedence.",
    difficulty: "hard", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Tax Arrears", rate: 12, balance: 35000 }, { id: "d2", name: "SBI Card", rate: 45, balance: 60000 } ] }
  },
  {
    id: -36, title: "The Overdue Rent",
    description: "Balance immediate shelter versus long-term interest.",
    difficulty: "medium", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Property Rent", rate: 0, balance: 20000 }, { id: "d2", name: "Jewelry Loan", rate: 24, balance: 40000 } ] }
  },
  {
    id: -37, title: "Student Loan Mix",
    description: "Handle education vs personal indulgence debt.",
    difficulty: "easy", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "EMI (iPhone)", rate: 18, balance: 50000 }, { id: "d2", name: "Edu Loan", rate: 8.5, balance: 800000 } ] }
  },
  {
    id: -38, title: "Credit Score Fix",
    description: "Pay off over-limit cards first to save your CIBIL score.",
    difficulty: "medium", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Over-limit Card", rate: 42, balance: 25000 }, { id: "d2", name: "Steady Loan", rate: 14, balance: 100000 } ] }
  },
  {
    id: -39, title: "Lender Negotiation",
    description: "Prioritize secured over unsecured if you're at risk of losing an asset.",
    difficulty: "hard", puzzleType: "capstone_debt", xpReward: 500,
    content: { debts: [ { id: "d1", name: "Gold Loan", rate: 18, balance: 50000 }, { id: "d2", name: "Postpaid Bill", rate: 0, balance: 5000 } ] }
  },

  // --- INVEST (1-10) ---
  {
    id: -4, title: "The Asset Architect",
    description: "Match these life goals to the correct asset classes for maximum strategic success.",
    difficulty: "medium", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Retirement (30 yrs)", risk: "high", horizon: "long" }, { id: "g2", name: "Emergency Fund", risk: "low", horizon: "short" }, { id: "g3", name: "House Downpayment (5 yrs)", risk: "medium", horizon: "medium" } ], assets: [ { id: "a1", name: "Equity Multi-Cap", type: "equity" }, { id: "a2", name: "Debt / Fixed Deposit", type: "debt" }, { id: "a3", name: "Balanced Hybrid Fund", type: "mixed" } ] }
  },
  {
    id: -41, title: "Short-Term Goal Matching",
    description: "Find a place for your wedding fund (2 years away).",
    difficulty: "easy", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Wedding (2 yrs)", risk: "low", horizon: "short" } ], assets: [ { id: "a1", name: "Debt Liquid Fund", type: "debt" }, { id: "a2", name: "Crypto", type: "equity" } ] }
  },
  {
    id: -42, title: "Inflation Hedge Setup",
    description: "Protect your wealth from losing purchasing power over 10 years.",
    difficulty: "medium", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Inflation Prot (10y)", risk: "medium", horizon: "long" } ], assets: [ { id: "a1", name: "Gold ETF", type: "mixed" }, { id: "a2", name: "Cash", type: "debt" } ] }
  },
  {
    id: -43, title: "Dividend vs Growth",
    description: "Match a retired person's need for income vs a student's need for growth.",
    difficulty: "hard", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Monthly Income", risk: "low", horizon: "short" }, { id: "g2", name: "Capital Apprec.", risk: "high", horizon: "long" } ], assets: [ { id: "a1", name: "Dividend Equity", type: "mixed" }, { id: "a2", name: "Growth Stock", type: "equity" } ] }
  },
  {
    id: -44, title: "Risk Aversion Focus",
    description: "Allocate for a client who cannot afford a single rupee of loss.",
    difficulty: "easy", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Safety First", risk: "low", horizon: "short" } ], assets: [ { id: "a1", name: "Govt Bonds", type: "debt" } ] }
  },
  {
    id: -45, title: "Tax-Saving Focus",
    description: "Find an ELSS fund to save on income tax while investing in equity.",
    difficulty: "medium", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Section 80C Tax", risk: "medium", horizon: "medium" } ], assets: [ { id: "a1", name: "ELSS Tax Saver", type: "equity" } ] }
  },
  {
    id: -46, title: "Balanced Hybrid Selection",
    description: "A 'set it and forget it' option for a 7-year goal.",
    difficulty: "medium", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "New Business (7y)", risk: "medium", horizon: "medium" } ], assets: [ { id: "a1", name: "Balanced Hybrid", type: "mixed" } ] }
  },
  {
    id: -47, title: "Global Exposure",
    description: "Diversify your Indian portfolio with international tech stocks.",
    difficulty: "hard", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "US Tech Growth", risk: "high", horizon: "long" } ], assets: [ { id: "a1", name: "US Index Fund", type: "equity" } ] }
  },
  {
    id: -48, title: "Fixed Deposit Trap",
    description: "Recognize when an FD is not enough for long-term goals.",
    difficulty: "medium", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Retirement (20y)", risk: "high", horizon: "long" } ], assets: [ { id: "a1", name: "Diversified Equity", type: "equity" }, { id: "a2", name: "Fixed Deposit", type: "debt" } ] }
  },
  {
    id: -49, title: "Emergency vs Legacy",
    description: "Separate ready-cash from slowly-built inheritance.",
    difficulty: "hard", puzzleType: "capstone_invest", xpReward: 500,
    content: { goals: [ { id: "g1", name: "Ready Cash", risk: "low", horizon: "short" }, { id: "g2", name: "Legacy Wealth", risk: "high", horizon: "long" } ], assets: [ { id: "a1", name: "Liquid Fund", type: "debt" }, { id: "a2", name: "Bluechip Equity", type: "equity" } ] }
  }
];

const SEQUENCE_TYPES = ["capstone_budget", "capstone_will", "capstone_debt", "capstone_invest"];

export function CapstoneGames({ 
  onComplete 
}: { 
  onComplete: (totalXp: number) => void 
}) {
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState(1);
  const [userName, setUserName] = useState("");
  
  const [puzzlesByLevel, setPuzzlesByLevel] = useState<Record<string, Puzzle[]>>({});
  const [currentSequence, setCurrentSequence] = useState<Puzzle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const [phase, setPhase] = useState<"intro" | "play" | "result" | "cert">("intro");
  const [currentScore, setCurrentScore] = useState(0);
  const [feedback, setFeedback] = useState({ feedback: "", title: "" });

  useEffect(() => {
    async function init() {
      try {
        // 1. Stats
        const statsRes = await fetch(getApiUrl("/api/user/stats"), {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const stats = await statsRes.json();
        setUserLevel(stats.level || 1);
        setUserName(stats.userName || "Student");

        // 2. Fetch all
        const puzzleRes = await fetch(getApiUrl("/api/puzzles"), {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        
        let capstones: Puzzle[] = [];
        if (puzzleRes.ok) {
          const allPuzzles = await puzzleRes.json();
          if (Array.isArray(allPuzzles)) {
            capstones = allPuzzles.filter(p => String(p.puzzleType).startsWith("capstone_"));
          }
        }

        // Fallback or Pool?
        const pool = capstones.length > 0 ? capstones : FALLBACK_CAPSTONES;

        // 3. Select sequence based on difficulty
        const sequence: Puzzle[] = [];
        SEQUENCE_TYPES.forEach(type => {
            let filtered = pool.filter(p => p.puzzleType === type && p.difficulty === (userLevel > 6 ? "hard" : userLevel > 3 ? "medium" : "easy"));
            if (filtered.length === 0) filtered = pool.filter(p => p.puzzleType === type);
            
            if (filtered.length > 0) {
               sequence.push(filtered[Math.floor(Math.random() * filtered.length)]);
            } else if (type === "capstone_budget") {
               sequence.push(FALLBACK_CAPSTONES[0]);
            } else if (type === "capstone_will") {
               sequence.push(FALLBACK_CAPSTONES[1]);
            } else if (type === "capstone_debt") {
               sequence.push(FALLBACK_CAPSTONES[2]);
            } else if (type === "capstone_invest") {
               sequence.push(FALLBACK_CAPSTONES[3]);
            }
        });

        // Ensure we always have at least 1 game in sequence
        setCurrentSequence(sequence.length > 0 ? sequence : [FALLBACK_CAPSTONES[0]]);
      } catch (err) {
        console.error("Failed to load capstone sequence:", err);
        setCurrentSequence([FALLBACK_CAPSTONES[0]]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [userLevel]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-[#9A97A8]">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="font-bold">Building your graduation journey...</p>
    </div>
  );

  const activePuzzle = currentSequence[currentIndex];
  if (!activePuzzle) return <div className="text-center p-12">Sequence failed. Please contact support.</div>;

  const handleGameComplete = (finalScore: number) => {
    setCurrentScore(finalScore);
    const result = getEncouragement(activePuzzle.puzzleType as GameType, finalScore);
    if (typeof result === "object") {
      setFeedback({ feedback: result.feedback, title: result.title });
    } else {
      setFeedback({ feedback: result, title: "Capstone Master" });
    }
    setPhase("result");
  };

  const handleNextStage = () => {
    const newScores = [...scores];
    newScores[currentIndex] = currentScore;
    setScores(newScores);

    if (currentIndex + 1 < currentSequence.length) {
       setCurrentIndex(currentIndex + 1);
       setAttemptCount(0); // Reset attempts for next stage
       setPhase("play");
    } else {
       setPhase("cert");
    }
  };

  const renderGame = () => {
    if (!activePuzzle?.content) return <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-[#E0DCCE]">Stage content is missing or corrupt. Please skip to continue.</div>;
    
    try {
      const content = typeof activePuzzle.content === 'string' ? JSON.parse(activePuzzle.content) : activePuzzle.content;
      const props = { key: `${currentIndex}-${attemptCount}`, onComplete: handleGameComplete, scenario: content };
      
      switch (activePuzzle.puzzleType) {
        case "capstone_budget": return <BudgetGame {...props} />;
        case "capstone_will": return <WillGame {...props} />;
        case "capstone_debt": return <DebtGame {...props} />;
        case "capstone_invest": return <InvestGame {...props} />;
        default: return <div className="p-8 text-center text-[#9A97A8]">Unsupported stage type: {activePuzzle.puzzleType}</div>;
      }
    } catch (err) {
      console.error("Game parse error:", err);
      return <div className="p-8 text-center text-red-500">Error loading simulation content.</div>;
    }
  };

  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
  const isMastered = currentScore >= 350;

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-start py-8">
      {/* Sequence Stepper */}
      <div className="w-full max-w-4xl mb-12 flex items-center justify-between px-4">
         {currentSequence.map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-2">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${i < currentIndex ? 'bg-[#10B981] text-white' : i === currentIndex ? 'bg-[#5A4FD6] text-white scale-125 shadow-lg ring-4 ring-[#EAE8FB]' : 'bg-white border-2 border-[#E0DCCE] text-[#9A97A8]'}`}>
                    {i < currentIndex ? <CheckCircle2 size={16} /> : i + 1}
                 </div>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${i === currentIndex ? 'text-[#5A4FD6]' : 'text-[#9A97A8]'}`}>Stage {i+1}</span>
              </div>
              {i < currentSequence.length - 1 && (
                <div className={`flex-1 h-[2px] mx-4 rounded-full ${i < currentIndex ? 'bg-[#10B981]' : 'bg-[#E0DCCE]'}`} />
              )}
            </React.Fragment>
         ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white p-12 rounded-3xl border-2 border-[#E0DCCE] shadow-xl max-w-2xl text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#EAE8FB] rounded-2xl flex items-center justify-center shadow-lg group">
                <Target size={40} className="text-[#5A4FD6] group-hover:rotate-45 transition-transform" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#1C1A28] mb-4 font-serif">4-Stage Graduation Challenge</h1>
            <p className="text-[#3A3748] leading-relaxed mb-8 text-lg font-medium">
               Complete all <span className="font-bold text-[#5A4FD6]">four interactive scenarios</span> with at least <span className="font-bold text-[#1C1A28]">70% resilience</span> in each to unlock your graduation certificate.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setPhase("play")}
                className="bg-[#5A4FD6] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#3D34A5] transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Begin Journey <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {phase === "play" && (
          <motion.div 
            key={`${currentIndex}-play`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl"
          >
            <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-[#E0DCCE]">
               <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-[#EAE8FB] text-[#5A4FD6] rounded-md text-[10px] font-bold uppercase tracking-wider">Lvl {currentIndex + 1}</div>
                  <h3 className="font-bold text-[#1C1A28]">{activePuzzle.title}</h3>
               </div>
               <div className="text-[10px] text-[#9A97A8] font-bold uppercase tracking-widest flex items-center gap-2">
                  Stage {currentIndex + 1} / 4 <Flag size={12} />
               </div>
            </div>
            {renderGame()}
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl border-2 border-[#E0DCCE] text-center max-w-2xl mx-auto shadow-xl"
          >
            <div className="text-7xl mb-6">{isMastered ? "🏅" : "⚠️"}</div>
            <h2 className="text-3xl font-bold text-[#1C1A28] mb-2 font-serif">
               {isMastered ? "Stage Mastered!" : "Mastery Required"}
            </h2>
            <p className="text-[#9A97A8] mb-8 text-lg">
              Your resilience score: <span className={`font-bold font-mono ${isMastered ? 'text-[#10B981]' : 'text-red-500'}`}>{currentScore}/500</span>.
            </p>

            <div className="bg-[#F0EDE6] p-8 rounded-2xl text-left border-l-8 border-[#5A4FD6] mb-12">
               <h4 className="flex items-center gap-2 font-bold text-[#1C1A28] mb-3 uppercase tracking-widest text-xs">
                  <Award size={16} className="text-[#5A4FD6]" /> Strategy Feedback
               </h4>
               <p className="text-[#3D34A5] font-serif italic text-lg leading-relaxed">
                  "{feedback.feedback}"
               </p>
            </div>

            <div className="flex flex-col gap-4">
              {isMastered ? (
                <button 
                  onClick={handleNextStage}
                  className="w-full bg-[#5A4FD6] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#3D34A5] transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                   {currentIndex === 3 ? "Generate Final Certificate" : `Advance to Stage ${currentIndex + 2}`} <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setAttemptCount(prev => prev + 1);
                    setPhase("play");
                  }}
                  className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                   Retry Stage {currentIndex + 1} <RefreshCcw size={20} />
                </button>
              )}
              {isMastered && (
                <p className="text-xs font-bold text-[#10B981] flex items-center justify-center gap-1">
                   Mastery achieved ({">"}70%). Progress unlocked.
                </p>
              )}
            </div>
          </motion.div>
        )}

        {phase === "cert" && (
          <CertificateView 
            userName={userName}
            title="Financial Literacy Graduate"
            score={averageScore}
            date={new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            onClose={() => onComplete(averageScore)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
