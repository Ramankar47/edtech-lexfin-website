import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Car, 
  Home, 
  ShoppingBasket, 
  Banknote, 
  AlertCircle,
  TrendingUp,
  HeartPulse,
  TrendingDown,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Scenario {
  id: string;
  title: string;
  description: string;
  initialBudget: number;
  targets: {
    insurance: number;
    necessities: number;
    debt: number;
    investments: number;
  };
  risks: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    title: "The Mid-Month Crunch",
    description: "You have ₹10,000. Your car insurance is due, you need groceries, and your personal loan repayment date is tomorrow. High interest loans are available but dangerous.",
    initialBudget: 10000,
    targets: { insurance: 3000, necessities: 4000, debt: 3000, investments: 0 },
    risks: ["Car breakdown if insurance lapses", "Late fees on loan"]
  },
  {
    id: "s2",
    title: "The New Job Dilemma",
    description: "First salary! ₹10,000 (part-time). You want to buy a second-hand car, but your family doesn't have health insurance. Your old student loan is also accruing interest.",
    initialBudget: 10000,
    targets: { insurance: 5000, necessities: 2000, debt: 2000, investments: 1000 },
    risks: ["Medical emergency cost", "Ballooning debt scholarship"]
  },
  {
    id: "s3",
    title: "The Rainy Day",
    description: "Your fridge broke (₹4,000), but your family insurance premium is also ₹4,000. You have ₹10,000. Do you save for a rainy day or pay off that high-interest credit card debt?",
    initialBudget: 10000,
    targets: { insurance: 4000, necessities: 4000, debt: 1000, investments: 1000 },
    risks: ["Health risk without insurance", "Debt spiral"]
  }
];

export function BudgetSimulator({ onComplete }: { onComplete: (xp: number) => void }) {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [allocations, setAllocations] = useState({
    insurance: 0,
    necessities: 0,
    debt: 0,
    investments: 0
  });
  const [phase, setPhase] = useState<"intro" | "play" | "result">("intro");

  useEffect(() => {
    // Randomize scenario
    const rand = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    setScenario(rand);
  }, []);

  if (!scenario) return null;

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remaining = scenario.initialBudget - totalAllocated;

  const handleSliderChange = (key: keyof typeof allocations, val: number[]) => {
    const newValue = val[0];
    const diff = newValue - allocations[key];
    
    // Check if we have enough remaining budget
    if (diff <= remaining) {
      setAllocations(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const calculateScore = () => {
    let score = 0;
    // Simple logic: closer to targets = better score
    const insuranceDiff = Math.abs(allocations.insurance - scenario.targets.insurance);
    const necessityDiff = Math.abs(allocations.necessities - scenario.targets.necessities);
    const debtDiff = Math.abs(allocations.debt - scenario.targets.debt);
    
    const totalDiff = insuranceDiff + necessityDiff + debtDiff;
    const maxPossibleDiff = scenario.initialBudget * 1.5;
    
    score = Math.max(0, Math.round(500 * (1 - totalDiff / maxPossibleDiff)));
    return score;
  };

  const results = () => {
    const score = calculateScore();
    const passed = score >= 350;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border-2 border-[#E0DCCE] text-center max-w-2xl mx-auto shadow-xl"
      >
        <div className="text-6xl mb-4">{passed ? "🏆" : "🤔"}</div>
        <h2 className="text-3xl font-bold text-[#1C1A28] mb-2 font-serif">Simulation Complete!</h2>
        <p className="text-[#9A97A8] mb-6">
          Your financial strategy resulted in a resilience score of <b>{score}/500</b>.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-[#F0EDE6] p-4 rounded-xl">
            <p className="text-xs font-bold text-[#9A97A8] uppercase mb-1">Insurance Gap</p>
            <p className={allocations.insurance < scenario.targets.insurance ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
              {allocations.insurance < scenario.targets.insurance ? "Under-insured" : "Covered"}
            </p>
          </div>
          <div className="bg-[#F0EDE6] p-4 rounded-xl">
            <p className="text-xs font-bold text-[#9A97A8] uppercase mb-1">Necessities</p>
            <p className={allocations.necessities < scenario.targets.necessities ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
              {allocations.necessities < scenario.targets.necessities ? "Critical Shortage" : "Fulfilled"}
            </p>
          </div>
        </div>

        <button 
          onClick={() => onComplete(score)}
          className="w-full bg-[#5A4FD6] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#3D34A5] transition-all flex items-center justify-center gap-2"
        >
          {passed ? "Claim Certificate & XP" : "Try a Different Strategy"} <ArrowRight size={20} />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white p-8 rounded-3xl border-2 border-[#E0DCCE] shadow-xl max-w-xl text-center"
          >
            <div className="w-20 h-20 bg-[#EAE8FB] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap size={40} className="text-[#5A4FD6]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1C1A28] mb-4 font-serif">{scenario.title}</h1>
            <p className="text-[#3A3748] leading-relaxed mb-8 text-lg">
              {scenario.description}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setPhase("play")}
                className="bg-[#5A4FD6] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#4E44C1] transition-all shadow-lg"
              >
                Start Simulation
              </button>
              <p className="text-sm text-[#9A97A8]">Budget: ₹{scenario.initialBudget.toLocaleString()}</p>
            </div>
          </motion.div>
        )}

        {phase === "play" && (
          <motion.div 
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl"
          >
            {/* Header / Budget Bar */}
            <div className="bg-[#1C1A28] text-white p-6 rounded-3xl mb-8 flex items-center justify-between shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Banknote size={120} />
               </div>
               <div>
                 <p className="text-[#9A97A8] text-xs font-bold uppercase tracking-widest mb-1">Total Available Budget</p>
                 <h2 className="text-4xl font-bold font-mono">₹{remaining.toLocaleString()}</h2>
               </div>
               <div className="text-right">
                 <p className="text-[#9A97A8] text-xs font-bold uppercase tracking-widest mb-1">Scenario Goal</p>
                 <p className="text-sm font-medium">Protect Family & Resolve Debt</p>
               </div>
            </div>

            {/* Allocation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { key: "insurance", label: "Family Insurance", icon: Shield, color: "blue", desc: "Covers medical & car risks" },
                { key: "necessities", label: "Monthly Necessities", icon: ShoppingBasket, color: "green", desc: "Groceries, rent, basic bills" },
                { key: "debt", label: "Debt Repayment", icon: AlertCircle, color: "red", desc: "Clear loans & credit card bills" },
                { key: "investments", label: "Investments", icon: TrendingUp, color: "purple", desc: "Grow wealth for future" }
              ].map(({ key, label, icon: Icon, color, desc }) => (
                <div key={key} className="bg-white p-6 rounded-2xl border-2 border-[#E0DCCE] hover:border-[#5A4FD6] transition-colors group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#1C1A28]">{label}</span>
                        <span className="font-mono font-bold text-sm">₹{allocations[key as keyof typeof allocations].toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-[#9A97A8]">{desc}</p>
                    </div>
                  </div>
                  <Slider 
                    value={[allocations[key as keyof typeof allocations]]}
                    onValueChange={(val) => handleSliderChange(key as keyof typeof allocations, val)}
                    max={scenario.initialBudget}
                    step={100}
                    className="py-4"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setPhase("result")}
                disabled={remaining > 1000}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center gap-2 ${remaining > 1000 ? 'bg-[#9A97A8] cursor-not-allowed text-white/50' : 'bg-[#5A4FD6] text-white hover:bg-[#3D34A5]'}`}
              >
                Finalize Strategy <ArrowRight size={20} />
              </button>
            </div>
            {remaining > 1000 && (
              <p className="text-center text-sm text-[#9A97A8] mt-3 italic">Allocate at least ₹{ (scenario.initialBudget - 1000).toLocaleString() } to see results</p>
            )}
          </motion.div>
        )}

        {phase === "result" && results()}
      </AnimatePresence>
    </div>
  );
}
