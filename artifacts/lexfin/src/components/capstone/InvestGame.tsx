import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, Wallet, Shield, 
  Clock, Target, ArrowRight,
  CheckCircle2
} from "lucide-react";

export interface InvestScenario {
  goals: {
    id: string;
    name: string;
    risk: "low" | "medium" | "high";
    horizon: "short" | "medium" | "long";
  }[];
  assets: {
    id: string;
    name: string;
    type: string;
  }[];
}

export function InvestGame({ 
  scenario, 
  onComplete 
}: { 
  scenario: InvestScenario; 
  onComplete: (score: number) => void 
}) {
  const [matches, setMatches] = useState<Record<string, string>>({}); // goalId -> assetId
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleMatch = (assetId: string) => {
    if (!selectedGoal) return;
    setMatches(prev => ({ ...prev, [selectedGoal]: assetId }));
    setSelectedGoal(null);
  };

  const calculateScore = () => {
    let correct = 0;
    // Map of logic: Retirement(Long/High) -> Equity, Emergency(Short/Low) -> Debt
    scenario.goals.forEach(g => {
      const asset = scenario.assets.find(a => a.id === matches[g.id]);
      if (asset) {
        if (g.horizon === 'long' && asset.type === 'equity') correct++;
        else if (g.horizon === 'short' && asset.type === 'debt') correct++;
        else if (g.horizon === 'medium' && asset.type === 'mixed') correct++;
        else if (g.risk === 'low' && asset.type === 'debt') correct++;
      }
    });

    return Math.round((correct / scenario.goals.length) * 400 + 100);
  };

  const allMatched = Object.keys(matches).length === scenario.goals.length;

  return (
    <div className="w-full">
      {/* Background Info */}
      <div className="bg-[#ECFDF5] border-2 border-[#A7F3D0] p-6 rounded-3xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target size={120} />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-[#059669]" size={20} />
          <h3 className="font-bold text-[#059669] uppercase tracking-wider text-xs">Matching Strategy</h3>
        </div>
        <p className="text-[#065F46] font-medium leading-relaxed">
          Match each life goal on the left to the most stable and goal-appropriate asset class on the right.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {/* Goals Column - Interactive Blocks */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#9A97A8] uppercase tracking-[0.2em] pl-4 mb-6">Master Goals</h4>
          {scenario.goals.map((g) => {
            const isMatched = matches[g.id];
            const isSelected = selectedGoal === g.id;
            const matchedAsset = scenario.assets.find(a => a.id === isMatched);
            
            return (
              <motion.button
                key={g.id}
                whileHover={!isMatched ? { x: 5 } : {}}
                onClick={() => setSelectedGoal(g.id)}
                className={`w-full p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden flex flex-col gap-2 ${
                   isSelected 
                   ? 'border-[#5A4FD6] bg-[#EAE8FB] shadow-xl ring-4 ring-[#EAE8FB]' 
                   : isMatched 
                   ? 'border-[#10B981] bg-[#ECFDF5] border-b-8 border-[#059669]' 
                   : 'border-[#E0DCCE] bg-white hover:border-[#5A4FD6] border-b-8 border-[#E0DCCE]'
                }`}
              >
                <div className="flex justify-between items-start">
                   <p className="font-black text-[#1C1A28] text-lg">{g.name}</p>
                   {isMatched && <CheckCircle2 className="text-[#10B981]" size={20} />}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#9A97A8] bg-gray-100 px-2 py-1 rounded-md">
                     <Clock size={10} /> {g.horizon}
                  </span>
                </div>

                {isMatched && (
                   <div className="mt-3 pt-3 border-t border-[#A7F3D0] flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span className="text-xs font-bold text-[#065F46]">Linked: {matchedAsset?.name}</span>
                   </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Assets Column - Target Buckets */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#9A97A8] uppercase tracking-[0.2em] pl-4 mb-6">Asset Buckets</h4>
          {scenario.assets.map((a) => {
            const isMatchingTarget = !!selectedGoal;
            const matchCount = Object.values(matches).filter(id => id === a.id).length;
            
            return (
              <motion.button
                key={a.id}
                whileHover={isMatchingTarget ? { scale: 1.02 } : {}}
                whileTap={isMatchingTarget ? { scale: 0.98 } : {}}
                onClick={() => handleMatch(a.id)}
                disabled={!isMatchingTarget}
                className={`w-full p-8 rounded-3xl border-2 transition-all text-center flex flex-col items-center justify-center gap-3 relative ${
                  isMatchingTarget 
                  ? 'border-[#5A4FD6] bg-[#F5F3FF] cursor-pointer border-b-8 border-b-[#5A4FD6] shadow-lg animate-pulse' 
                  : (matchCount > 0)
                  ? 'border-[#5A4FD6] bg-[#EAE8FB] border-b-8 border-[#3D34A5]'
                  : 'border-[#E0DCCE] bg-white grayscale-[0.5] opacity-80'
                }`}
              >
                <div className={`p-4 rounded-full ${matchCount > 0 ? 'bg-[#5A4FD6] text-white' : 'bg-gray-100 text-[#9A97A8]'}`}>
                  {a.type === 'equity' ? <TrendingUp size={32} /> : a.type === 'debt' ? <Shield size={32} /> : <Wallet size={32} />}
                </div>
                <div>
                   <p className="font-black text-[#1C1A28] text-xl">{a.name}</p>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A97A8] mt-1">{a.type} CLASS</p>
                </div>
                
                {matchCount > 0 && (
                   <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1C1A28] text-white flex items-center justify-center font-bold text-sm shadow-xl">
                      {matchCount}
                   </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-16 flex justify-center flex-col items-center gap-4">
        {allMatched ? (
          <button 
           onClick={() => onComplete(calculateScore())}
           className="px-12 py-4 rounded-2xl font-bold text-lg bg-[#5A4FD6] text-white hover:bg-[#3D34A5] transition-all shadow-xl flex items-center gap-2"
          >
           Finalize Strategy <ArrowRight size={20} />
          </button>
        ) : (
          <p className="text-sm text-[#9A97A8] font-medium animate-pulse">Select a goal then an asset to match them.</p>
        )}
        <button onClick={() => setMatches({})} className="text-xs text-[#9A97A8] hover:text-[#5A4FD6] underline">Clear All Matches</button>
      </div>
    </div>
  );
}
