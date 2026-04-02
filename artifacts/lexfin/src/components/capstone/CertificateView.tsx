import React from "react";
import { motion } from "framer-motion";
import { Trophy, Download, Award, ShieldCheck, Printer } from "lucide-react";

export function CertificateView({ 
  userName, 
  title, 
  score, 
  date,
  onClose
}: { 
  userName: string; 
  title: string; 
  score: number;
  date: string;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white max-w-4xl w-full shadow-2xl rounded-sm border-[16px] border-[#D4AF37] p-12 relative overflow-hidden print:shadow-none print:border-[8px]"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Award size={300} className="text-[#B45309]" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-5">
           <ShieldCheck size={300} className="text-[#B45309]" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-[#FEF9EC] rounded-full border-4 border-[#F3D88A] flex items-center justify-center">
               <Trophy size={48} className="text-[#B45309]" />
            </div>
          </div>
          <h1 className="font-serif text-5xl font-bold text-[#1C1A28] mb-2 uppercase tracking-tighter">Certificate of Excellence</h1>
          <p className="font-serif italic text-[#9A97A8] text-xl">Presented by LexFin Financial Academy</p>
        </div>

        {/* Content */}
        <div className="text-center mb-16 relative">
          <p className="text-lg text-[#3A3748] mb-8 font-serif italic">This certifies that</p>
          <h2 className="text-6xl font-serif font-bold text-[#1C1A28] mb-8 border-b-2 border-[#E0DCCE] inline-block px-12 pb-2">
            {userName || "Valued Student"}
          </h2>
          <p className="text-lg text-[#3A3748] mb-8 font-serif leading-relaxed px-20">
            Has successfully completed the interactive <span className="font-bold text-[#B45309]">{title}</span> capstone simulation with a mastery score of <span className="font-bold font-mono">{score}/500</span>, demonstrating critical thinking and strategic financial foresight.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t-2 border-[#E0DCCE] pt-8">
          <div className="text-center w-48">
            <p className="font-serif font-bold text-[#1C1A28] mb-1">{date}</p>
            <div className="h-[1px] bg-gray-400 w-full mb-1" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#9A97A8]">Issue Date</p>
          </div>
          <div className="text-center">
            <img src="/lexfin-logo.png" alt="LexFin" className="h-12 mb-2 opacity-50 mx-auto" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#9A97A8]">Official LexFin Accreditation</p>
          </div>
          <div className="text-center w-48">
            <p className="font-serif font-bold text-[#1C1A28] mb-1 italic">LexFin Registrar</p>
            <div className="h-[1px] bg-gray-400 w-full mb-1" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#9A97A8]">Digital Signature Verified</p>
          </div>
        </div>

        {/* Controls - Hidden during print */}
        <div className="absolute top-4 right-4 flex gap-2 print:hidden">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            className="p-3 bg-[#1C1A28] text-white rounded-full hover:bg-black transition-all shadow-lg flex items-center gap-2 px-6 font-bold"
          >
            <Printer size={18} /> Print Certificate
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-3 bg-gray-100 text-[#9A97A8] rounded-full hover:bg-gray-200 transition-all font-bold px-6 border-2 border-gray-100"
          >
            Collect Rewards & Finish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
