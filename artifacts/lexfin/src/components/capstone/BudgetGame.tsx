import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Shield, Car, Home, 
  ShoppingBasket, Banknote, AlertCircle,
  TrendingUp, ArrowRight, PieChart as PieIcon
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface BudgetScenario {
  initialBudget: number;
  targets: {
    insurance: number;
    necessities: number;
    debt: number;
    investments: number;
  };
  risks: string[];
}

export function BudgetGame({ 
  scenario, 
  onComplete 
}: { 
  scenario: BudgetScenario; 
  onComplete: (score: number) => void 
}) {
  const [allocations, setAllocations] = useState({
    insurance: 0,
    necessities: 0,
    debt: 0,
    investments: 0
  });

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remaining = scenario.initialBudget - totalAllocated;

  const handleSliderChange = (key: keyof typeof allocations, val: number[]) => {
    const newValue = val[0];
    const diff = newValue - allocations[key];
    if (diff <= remaining) {
      setAllocations(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const calculateScore = () => {
    const insuranceDiff = Math.abs(allocations.insurance - scenario.targets.insurance);
    const necessityDiff = Math.abs(allocations.necessities - scenario.targets.necessities);
    const debtDiff = Math.abs(allocations.debt - scenario.targets.debt);
    const totalDiff = insuranceDiff + necessityDiff + debtDiff;
    const maxPossibleDiff = scenario.initialBudget * 1.5;
    return Math.max(0, Math.round(500 * (1 - totalDiff / maxPossibleDiff)));
  };

  const chartData = {
    labels: ['Insurance', 'Necessities', 'Debt', 'Investments', 'Remaining'],
    datasets: [
      {
        data: [
          allocations.insurance,
          allocations.necessities,
          allocations.debt,
          allocations.investments,
          remaining
        ],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#EF4444',
          '#8B5CF6',
          '#E5E7EB'
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `₹${context.raw.toLocaleString()}`
        }
      }
    },
    maintainAspectRatio: false,
    cutout: '65%'
  };

  return (
    <div className="w-full">
      {/* Top Stats Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#1C1A28] text-white p-8 rounded-3xl flex items-center justify-between shadow-2xl relative overflow-hidden"
        >
           <motion.div 
             animate={{ opacity: remaining < 5000 ? [0.4, 0.8, 0.4] : 0.1 }}
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="absolute top-0 right-0 p-4"
           >
              <Banknote size={160} />
           </motion.div>
           <div className="relative z-10">
             <p className="text-[#9A97A8] text-xs font-bold uppercase tracking-widest mb-2">Available Budget</p>
             <motion.h2 
               key={remaining}
               initial={{ scale: 1.1, color: "#fff" }}
               animate={{ scale: 1, color: remaining < 2000 ? "#F87171" : "#fff" }}
               className="text-5xl font-bold font-mono"
             >
               ₹{remaining.toLocaleString()}
             </motion.h2>
             <div className="mt-6 flex items-center gap-3">
               <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${(totalAllocated / scenario.initialBudget) * 100}%` }}
                   className={`h-full ${remaining < 1000 ? 'bg-green-500' : 'bg-[#5A4FD6]'}`}
                 />
               </div>
               <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Utilization: {Math.round((totalAllocated / scenario.initialBudget) * 100)}%</span>
             </div>
           </div>
           <div className="text-right flex flex-col justify-between h-full relative z-10">
             <div>
               <p className="text-[#9A97A8] text-xs font-bold uppercase tracking-widest mb-1">Scenario Goal</p>
               <p className="text-lg font-bold text-[#5A4FD6]">Financial Equilibrium</p>
             </div>
             <div className="mt-auto">
                <p className="text-[10px] text-[#9A97A8] leading-tight">Allocate funds until your remaining balance is near zero.</p>
             </div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-3xl border-2 border-[#E0DCCE] flex flex-col items-center justify-center relative shadow-sm"
        >
          <div className="w-full h-40 relative">
            <Pie data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold text-[#1C1A28]">{Math.round((totalAllocated / scenario.initialBudget) * 100)}%</span>
               <span className="text-[9px] font-bold text-[#9A97A8] uppercase">Allocated</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 w-full">
             {[
               { label: 'Ins', color: 'bg-blue-500' },
               { label: 'Nec', color: 'bg-green-500' },
               { label: 'Debt', color: 'bg-red-500' },
               { label: 'Inv', color: 'bg-purple-500' }
             ].map(item => (
               <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-[10px] font-bold text-[#9A97A8] uppercase">{item.label}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Allocation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          { key: "insurance", label: "Family Insurance", icon: Shield, color: "blue", desc: "Covers medical & car risks" },
          { key: "necessities", label: "Monthly Necessities", icon: ShoppingBasket, color: "green", desc: "Groceries, rent, basic bills" },
          { key: "debt", label: "Debt Repayment", icon: AlertCircle, color: "red", desc: "Clear loans & credit card bills" },
          { key: "investments", label: "Investments", icon: TrendingUp, color: "purple", desc: "Grow wealth for future" }
        ].map(({ key, label, icon: Icon, color, desc }) => (
          <motion.div 
            key={key} 
            whileHover={{ y: -4 }}
            className={`bg-white p-6 rounded-2xl border-2 transition-all ${allocations[key as keyof typeof allocations] > 0 ? 'border-[#5A4FD6] shadow-md' : 'border-[#E0DCCE] shadow-sm'}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#1C1A28]">{label}</span>
                  <motion.span 
                    key={allocations[key as keyof typeof allocations]}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="font-mono font-bold text-sm"
                  >
                    ₹{allocations[key as keyof typeof allocations].toLocaleString()}
                  </motion.span>
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
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <AnimatePresence>
          {remaining > 1000 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200"
            >
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Allocate more funds to proceed</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          whileHover={remaining <= 1000 ? { scale: 1.05 } : {}}
          whileTap={remaining <= 1000 ? { scale: 0.95 } : {}}
          onClick={() => onComplete(calculateScore())}
          disabled={remaining > 1000}
          className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center gap-2 ${remaining > 1000 ? 'bg-[#E0DCCE] cursor-not-allowed text-[#9A97A8]' : 'bg-[#1C1A28] text-white hover:bg-black'}`}
        >
          Finalize Budget Strategy <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
