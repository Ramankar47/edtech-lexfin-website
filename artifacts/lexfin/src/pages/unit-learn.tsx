import { useState, useRef, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { getApiUrl } from "@/lib/utils";
import { Check, X, Star, Zap, Trophy, BookOpen, Headphones, Video, ChevronRight, ArrowLeft } from "lucide-react";
import { GlobalHeader } from "@/components/GlobalHeader";
import confetti from "canvas-confetti";
import { CapstoneGames } from "@/components/CapstoneGames";
import { motion, AnimatePresence } from "framer-motion";

import { Course, ModuleData, Unit, Quiz, Puzzle } from "@/data/types";
import { getCourseById } from "@/data";

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
  const [match, params] = useRoute("/courses/:courseId/module/:moduleId/learn");

  const courseId = params?.courseId || "1";
  const moduleIdStr = params?.moduleId || "1";

  const course = getCourseById(courseId);
  const moduleData = course?.modules.find(m => m.id === Number(moduleIdStr));

  const [step, setStep] = useState<AppStep>({ kind: "unit", index: 0 });
  const [xpEarned, setXpEarned] = useState(0);

  if (!course || !moduleData) {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <h2>Module not found</h2>
        <button onClick={() => setLocation(`/courses/${courseId}/path`)}>Back to Learning Path</button>
      </div>
    );
  }

  const units = moduleData.unitsData || [];
  const quizzes = moduleData.quizzesData || [];
  const puzzle = moduleData.puzzleData;

  const totalSteps = units.length + quizzes.length + (puzzle ? 2 : 1); // units + quizzes + puzzle + complete
  const stepIndex = (): number => {
    if (step.kind === "unit") return step.index;
    if (step.kind === "quiz") return units.length + step.index;
    if (step.kind === "puzzle") return units.length + quizzes.length;
    return totalSteps - 1;
  };
  const progress = Math.round((stepIndex() / (Math.max(1, totalSteps - 1))) * 100);

  const addXp = (xp: number) => setXpEarned(v => v + xp);

  const goNext = () => {
    if (step.kind === "unit") {
      if (step.index + 1 < units.length) setStep({ kind: "unit", index: step.index + 1 });
      else setStep({ kind: "quiz", index: 0 });
    } else if (step.kind === "quiz") {
      if (step.index + 1 < quizzes.length) setStep({ kind: "quiz", index: step.index + 1 });
      else if (puzzle) setStep({ kind: "puzzle" });
      else {
        setStep({ kind: "complete" });
        setTimeout(() => confetti({ particleCount: 160, spread: 100, origin: { y: 0.45 } }), 350);
      }
    } else if (step.kind === "puzzle") {
      setStep({ kind: "complete" });
      setTimeout(() => confetti({ particleCount: 160, spread: 100, origin: { y: 0.45 } }), 350);
    }
  };

  const currentMaxXp = moduleData.isGame ? 500 : (quizzes.reduce((acc, q) => acc + (q.xp || 0), 0) + (puzzle?.xp || 0));
  const passed = xpEarned >= currentMaxXp * PASS_THRESHOLD;

  const stepLabel = (): string => {
    if (step.kind === "unit") return `Unit ${step.index + 1}: ${units[step.index]?.title || ""}`;
    if (step.kind === "quiz") return quizzes[step.index]?.title || "Quiz";
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
          <button onClick={() => setLocation(`/courses/${courseId}/path`)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex", alignItems: "center", color: "#9A97A8" }}>
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
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ height: "100%", background: "#5A4FD6", borderRadius: 3 }} 
              />
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
        {step.kind === "complete" ? (
          <CompleteView 
            course={course}
            moduleData={moduleData} 
            xpEarned={xpEarned} 
            maxXp={currentMaxXp}
            passed={passed}
            onRetry={() => {
               if (moduleData.isGame) {
                 window.location.reload();
               } else {
                 setStep({ kind: "unit", index: 0 });
                 setXpEarned(0);
               }
            }}
            onNext={() => setLocation(`/courses/${courseId}/path`)}
          />
        ) : moduleData.isGame ? (
          <CapstoneGames 
            onComplete={(xp) => {
              setXpEarned(xp);
              setStep({ kind: "complete" });
              // Simple confetti trigger
              import('canvas-confetti').then(confetti => {
                confetti.default({ particleCount: 160, spread: 100, origin: { y: 0.45 } });
              });
            }} 
          />
        ) : (
          <>
            {step.kind === "unit" && units.length > 0 && (
              <UnitView
                courseId={courseId}
                moduleId={moduleIdStr}
                unit={units[step.index]}
                unitNumber={step.index + 1}
                totalUnits={units.length}
                moduleTitle={moduleData.name}
                unitsData={units}
                onNext={goNext}
              />
            )}
            {step.kind === "quiz" && quizzes.length > 0 && (
              <QuizView
                moduleName={moduleData.name}
                quiz={quizzes[step.index]}
                quizNumber={step.index + 1}
                onAddXp={addXp}
                onComplete={() => goNext()}
              />
            )}
            {step.kind === "puzzle" && puzzle && (
              <PuzzleView
                puzzle={puzzle}
                onAddXp={addXp}
                onComplete={() => goNext()}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Unit View (text + audio + video)
// ─────────────────────────────────────────────
function UnitView({ courseId, moduleId, unit, unitNumber, totalUnits, moduleTitle, unitsData, onNext }: {
  courseId: string;
  moduleId: string;
  unit: Unit;
  unitNumber: number;
  totalUnits: number;
  moduleTitle: string;
  unitsData: Unit[];
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
        <AudioPanel src={getApiUrl(`/api/content/Course${courseId}/Module${moduleId}/Unit${unitNumber}/Audios/media`)} />
        <VideoPanel src={getApiUrl(`/api/content/Course${courseId}/Module${moduleId}/Unit${unitNumber}/Videos/media`)} />
        <div style={{ background: "#FAFAF7", border: "1.5px solid #E0DCCE", borderRadius: 14, padding: "18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#9A97A8", marginBottom: 10 }}>Your Progress</div>
          {Array.from({ length: totalUnits }).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < totalUnits - 1 ? "1px solid #F0EDE6" : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < unitNumber - 1 ? "#5A4FD6" : i === unitNumber - 1 ? "#EAE8FB" : "#F0EDE6", border: `2px solid ${i < unitNumber - 1 ? "#3D34A5" : i === unitNumber - 1 ? "#5A4FD6" : "#E0DCCE"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i < unitNumber - 1 ? <Check size={12} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 9, fontWeight: 700, color: i === unitNumber - 1 ? "#5A4FD6" : "#C8C5D8" }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 12, color: i === unitNumber - 1 ? "#1C1A28" : "#9A97A8", fontWeight: i === unitNumber - 1 ? 600 : 400 }}>Unit {i + 1}: {unitsData[i]?.title.split(" ").slice(0, 2).join(" ")}…</span>
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
function QuizView({ moduleName, quiz, quizNumber, onAddXp, onComplete }: {
  moduleName: string;
  quiz: Quiz;
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
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>{moduleName}</div>
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
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              whileHover={!revealed ? { scale: 1.015, x: 2 } : {}}
              whileTap={!revealed ? { scale: 0.985 } : {}}
              initial={false}
              animate={{ 
                borderColor: showCorrect ? "#059669" : showWrong ? "#DC2626" : isSelected ? "#5A4FD6" : "#E0DCCE",
                backgroundColor: showCorrect ? "#ECFDF5" : showWrong ? "#FEF2F2" : isSelected ? "#EAE8FB" : "#fff",
                y: revealed ? 0 : 0
              }}
              style={{
                textAlign: "left", padding: "14px 18px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: revealed ? "default" : "pointer",
                color: showCorrect ? "#047857" : showWrong ? "#B91C1C" : "#1C1A28",
                display: "flex", alignItems: "center", gap: 14, 
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: isSelected ? "0 4px 12px rgba(90, 79, 214, 0.12)" : "none"
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: showCorrect ? "#059669" : showWrong ? "#DC2626" : "#ECEAF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {showCorrect ? <Check size={14} color="#fff" strokeWidth={3} /> : showWrong ? <X size={14} color="#fff" strokeWidth={3} /> : <span style={{ fontSize: 11, fontWeight: 700, color: "#9A97A8" }}>{opts[i]}</span>}
              </div>
              {opt}
            </motion.button>
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
  puzzle: Puzzle;
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
function CompleteView({ course, moduleData, xpEarned, maxXp, passed, onRetry, onNext }: {
  course: Course;
  moduleData: ModuleData;
  xpEarned: number;
  maxXp: number;
  passed: boolean;
  onRetry: () => void;
  onNext: () => void;
}) {
  const [, setLocation] = useLocation();
  const pct = Math.round((xpEarned / maxXp) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 24, padding: "48px 32px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
        style={{ fontSize: 72, marginBottom: 16, display: "inline-block" }}
      >
        {passed ? "🏆" : "💪"}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, color: "#1C1A28", marginBottom: 12 }}
      >
        {passed ? "Module Complete!" : "Almost There!"}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 16, color: "#9A97A8", lineHeight: 1.6, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}
      >
        {passed 
          ? `Incredible job! You've mastered ${moduleData.name} with ${pct}% academy accuracy. You're now ready for the next challenge.`
          : `You scored ${pct}%. High academic standards require at least 80% to unlock the next module. Let's try once more!`}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ background: "#FEF9EC", border: "1px solid #F3D88A", borderRadius: 20, padding: "32px 24px", marginBottom: 32, position: "relative", overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <Zap size={28} color="#F59E0B" fill="#F59E0B" />
          <span style={{ fontSize: 42, fontWeight: 800, color: "#B45309", fontFamily: "'DM Sans', sans-serif" }}>
            <Counter value={xpEarned} /> <span style={{ fontSize: 20, opacity: 0.6 }}>/ {maxXp} XP</span>
          </span>
        </div>

        <div style={{ height: 12, background: "rgba(180, 83, 9, 0.1)", borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
            style={{ height: "100%", background: "#F59E0B", borderRadius: 6 }}
          />
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#B45309", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>Your score: {pct}%</span>
          <span>Target: 80%</span>
        </div>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (passed) localStorage.setItem(`Course${course.id}_mod${moduleData.id}_passed`, "true");
            passed ? onNext() : onRetry();
          }}
          style={{ width: "100%", padding: "18px 24px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 14px rgba(90, 79, 214, 0.3)" }}
        >
          {passed ? "Continue to Next Module →" : "Retry Module →"}
        </motion.button>
        <button
          onClick={() => setLocation("/courses")}
          style={{ width: "100%", padding: "16px 24px", background: "transparent", color: "#9A97A8", border: "1.5px solid #E0DCCE", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Back to All Courses
        </button>
      </div>
    </motion.div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // [x] Expand `FALLBACK_CAPSTONES` with 40 unique scenarios (10 per type)
    // [x] Implement stage-based level progression in `CapstoneGames.tsx`
    // [x] Add "Back to Courses" navigation to module completion and certificate
    // [ ] Redesign E-learning tab in `courses.tsx` with two Course Cards
    if (value === 0) return;
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      
      const currentCount = Math.floor(easedProgress * value);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{count}</>;
}
