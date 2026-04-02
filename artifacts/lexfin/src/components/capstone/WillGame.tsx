import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Scale, Heart, Gavel, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export interface WillScenario {
  totalSum: number;
  heirs: {
    id: string;
    name: string;
    relationship: string;
    minPercent: number;
  }[];
  instructions: string;
}

export function WillGame({ 
  scenario, 
  onComplete 
}: { 
  scenario: WillScenario; 
  onComplete: (score: number) => void 
}) {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    scenario.heirs.reduce((acc, h) => ({ ...acc, [h.id]: 0 }), {})
  );

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remainingPercent = 100 - totalAllocated;

  const handleSliderChange = (id: string, val: number[]) => {
    const newVal = val[0];
    const diff = newVal - allocations[id];
    if (diff <= remainingPercent) {
      setAllocations(prev => ({ ...prev, [id]: newVal }));
    }
  };

  const calculateScore = () => {
    let score = 500;
    scenario.heirs.forEach(h => {
      if (allocations[h.id] < h.minPercent) {
        score -= (h.minPercent - allocations[h.id]) * 5;
      }
    });

    if (totalAllocated < 95) score -= (100 - totalAllocated) * 2;
    return Math.max(100, Math.round(score));
  };

  return (
    <div className="w-full">
      {/* Scenario Box */}
        <motion.div 
          animate={{ x: totalAllocated > 100 ? [0, -5, 5, -5, 5, 0] : 0 }}
          className="bg-[#FEF9EC] border-2 border-[#F3D88A] p-6 rounded-3xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gavel size={100} />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Scale className={`transition-colors ${totalAllocated > 100 ? 'text-red-500' : 'text-[#B45309]'}`} size={20} />
            <h3 className={`font-bold uppercase tracking-wider text-xs ${totalAllocated > 100 ? 'text-red-500' : 'text-[#B45309]'}`}>
              {totalAllocated > 100 ? 'Warning: Over-Allocation' : 'Legal Directive'}
            </h3>
          </div>
          <p className="text-[#92400E] font-medium leading-relaxed italic">
            "{scenario.instructions}"
          </p>
          <p className="mt-4 text-sm font-bold text-[#B45309]">Total Assets: ₹{scenario.totalSum.toLocaleString()}</p>
        </motion.div>

      {/* Distribution Bar */}
      <div className="h-12 bg-gray-100 rounded-2xl mb-12 flex overflow-hidden border-2 border-[#E0DCCE] shadow-inner">
        {scenario.heirs.map((h, i) => (
          <motion.div
            key={h.id}
            initial={false}
            animate={{ 
              width: `${allocations[h.id]}%`,
              opacity: allocations[h.id] > 0 ? 1 : 0
            }}
            className={`h-full flex items-center justify-center text-[10px] font-bold text-white whitespace-nowrap overflow-hidden transition-all`}
            style={{ 
              backgroundColor: ["#5A4FD6", "#10B981", "#F59E0B", "#EF4444"][i % 4],
              flexShrink: 0
            }}
          >
            {allocations[h.id] > 5 && `${h.name} (${allocations[h.id]}%)`}
          </motion.div>
        ))}
        {remainingPercent > 0 && (
          <motion.div 
            animate={{ width: `${remainingPercent}%` }}
            className="h-full bg-white flex items-center justify-center text-[9px] text-gray-300 font-bold uppercase"
          >
            {remainingPercent}% Unallocated
          </motion.div>
        )}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {scenario.heirs.map((h, i) => (
          <div key={h.id} className="bg-white p-6 rounded-2xl border-2 border-[#E0DCCE] hover:border-[#5A4FD6] transition-colors">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAFAF7] flex items-center justify-center text-[#5A4FD6]">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#1C1A28]">{h.name}</p>
                  <p className="text-[10px] text-[#9A97A8] uppercase font-bold tracking-tight">{h.relationship}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-lg">{allocations[h.id]}%</p>
                <p className="text-[10px] text-[#9A97A8]">Min req: {h.minPercent}%</p>
              </div>
            </div>
            <Slider 
              value={[allocations[h.id]]}
              onValueChange={(val) => handleSliderChange(h.id, val)}
              max={100}
              step={1}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => onComplete(calculateScore())}
          disabled={totalAllocated < 90}
          className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center gap-2 ${totalAllocated < 90 ? 'bg-[#9A97A8] cursor-not-allowed text-white/50' : 'bg-[#5A4FD6] text-white hover:bg-[#3D34A5]'}`}
        >
          Finalize Will <ArrowRight size={20} />
        </button>
      </div>
      {totalAllocated < 90 && (
         <p className="text-center text-xs text-[#9A97A8] mt-3">Distribute at least 90% of assets to proceed.</p>
      )}
    </div>
  );
}
