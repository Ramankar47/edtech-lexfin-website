import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CreditCard, Landmark, Banknote, CheckCircle2, ArrowRight } from "lucide-react";

export interface DebtScenario {
  debts: {
    id: string;
    name: string;
    rate: number;
    balance: number;
  }[];
}

export function DebtGame({ 
  scenario, 
  onComplete 
}: { 
  scenario: DebtScenario; 
  onComplete: (score: number) => void 
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // The "Avalanche" order: Highest rate to lowest
  const correctOrder = [...scenario.debts].sort((a, b) => b.rate - a.rate).map(d => d.id);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < scenario.debts.length) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const calculateScore = () => {
    let score = 500;
    selectedIds.forEach((id, idx) => {
      if (id !== correctOrder[idx]) {
        score -= 100;
      }
    });

    // Bonus for speed/completeness
    return Math.max(100, score);
  };

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="bg-[#EAE8FB] border-2 border-[#5A4FD6] p-6 rounded-3xl mb-8 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="text-[#5A4FD6]" size={20} />
          <h3 className="font-bold text-[#5A4FD6] uppercase tracking-wider text-xs">Strategy: Interest Avalanche</h3>
        </div>
        <p className="text-[#3D34A5] font-medium leading-relaxed">
          Select these debts in the order you should pay them off to minimize total interest paid.
        </p>
      </div>

      {/* Selected Slots - Visual Blocks */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {scenario.debts.map((_, i) => (
          <div key={i} className="w-28 h-32 rounded-3xl border-4 border-dashed border-[#E0DCCE] flex flex-col items-center justify-center relative bg-[#FAFAF7] transition-all">
             {selectedIds[i] ? (
               <motion.div 
                 layoutId={selectedIds[i]}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="absolute inset-0 bg-[#5A4FD6] text-white rounded-2xl flex flex-col items-center justify-center shadow-2xl p-2 border-b-8 border-[#3D34A5]"
               >
                 <span className="text-3xl font-black mb-1">#{i + 1}</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 truncate w-full text-center">
                    {scenario.debts.find(d => d.id === selectedIds[i])?.name}
                 </span>
               </motion.div>
             ) : (
               <div className="flex flex-col items-center gap-1 opacity-20">
                  <span className="text-3xl font-black text-[#9A97A8]">{i + 1}</span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Empty Slot</span>
               </div>
             )}
          </div>
        ))}
      </div>

      {/* Debt Blocks to Arrange */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {scenario.debts.map((d) => {
          const isSelected = selectedIds.includes(d.id);
          const selectionIndex = selectedIds.indexOf(d.id);
          
          return (
            <motion.button
              key={d.id}
              whileHover={!isSelected ? { y: -5, scale: 1.02 } : {}}
              whileTap={!isSelected ? { scale: 0.98 } : {}}
              onClick={() => toggleSelect(d.id)}
              disabled={isSelected}
              className={`p-6 rounded-3xl border-2 transition-all text-center flex flex-col items-center justify-center gap-3 h-48 relative overflow-hidden ${
                isSelected 
                ? 'bg-[#F3F4F6] border-gray-200 cursor-default p-4' 
                : 'bg-white border-[#E0DCCE] hover:border-[#5A4FD6] shadow-md hover:shadow-xl cursor-pointer border-b-8 border-b-[#E0DCCE]'
              }`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] z-10 font-black text-[#5A4FD6] text-4xl">
                   {selectionIndex + 1}
                </div>
              )}
              
              <div className={`p-4 rounded-full ${isSelected ? 'bg-gray-100 text-gray-400' : 'bg-[#EAE8FB] text-[#5A4FD6]'}`}>
                {d.name.toLowerCase().includes('card') ? <CreditCard size={28} /> : <Landmark size={28} />}
              </div>
              
              <div>
                <h4 className={`font-bold leading-tight ${isSelected ? 'text-gray-400' : 'text-[#1C1A28]'}`}>{d.name}</h4>
                <div className="mt-2 flex flex-col items-center">
                  <span className={`text-xs font-black uppercase tracking-widest ${isSelected ? 'text-gray-300' : 'text-red-500'}`}>
                    {d.rate}% APR
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center flex-col items-center gap-4">
        {selectedIds.length === scenario.debts.length ? (
           <button 
             onClick={() => onComplete(calculateScore())}
             className="px-12 py-4 rounded-2xl font-bold text-lg bg-[#5A4FD6] text-white hover:bg-[#3D34A5] transition-all shadow-xl flex items-center gap-2"
           >
             Finalize Sequence <ArrowRight size={20} />
           </button>
        ) : (
           <p className="text-sm text-[#9A97A8] font-medium">Select all debts in order of priority.</p>
        )}
        <button onClick={() => setSelectedIds([])} className="text-xs text-[#9A97A8] hover:text-[#5A4FD6] underline">Reset Selections</button>
      </div>
    </div>
  );
}
