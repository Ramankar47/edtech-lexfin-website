import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import {
  ArrowLeft, BookOpen, Headphones, Video,
  Check, X, Star, Zap, Trophy, Play, Pause, Volume2
} from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import { GlobalHeader } from "@/components/GlobalHeader";
import confetti from "canvas-confetti";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Step = "content" | "quiz1" | "quiz2" | "puzzle" | "complete";

interface ContentItem { order: number; type: string; text: string; }
interface QuizItem {
  order: number; question: string;
  option_a: string; option_b: string; option_c: string; option_d: string;
  correct: string; explanation: string;
}
interface PuzzleItem {
  order: number; type: string; question: string;
  option_a: string; option_b: string; option_c: string; option_d: string;
  correct: string; explanation: string; xp: number;
}
interface ModuleInfo {
  title: string; subtitle: string; section: string; unit: string;
  xp_quiz1: number; xp_quiz2: number; xp_puzzle: number;
}
interface ContentData {
  moduleId: number; info: ModuleInfo;
  content: ContentItem[]; quiz1: QuizItem[]; quiz2: QuizItem[];
  puzzle: PuzzleItem[]; hasAudio: boolean; hasVideo: boolean;
  audioUrl: string | null; videoUrl: string | null;
}

function useContentData(moduleId: string) {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/content/${moduleId}`, { credentials: "include" })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setData)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, [moduleId]);

  return { data, loading, error };
}

export default function UnitLearnPage() {
  const params = useParams<{ moduleId: string }>();
  const [, setLocation] = useLocation();
  const moduleId = params.moduleId || "1";

  const { data, loading, error } = useContentData(moduleId);
  const [step, setStep] = useState<Step>("content");
  const [xpEarned, setXpEarned] = useState(0);
  const [quiz1Score, setQuiz1Score] = useState(0);
  const [quiz2Score, setQuiz2Score] = useState(0);
  const [puzzleCorrect, setPuzzleCorrect] = useState(false);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen onBack={() => setLocation("/learning-path")} />;

  const totalXP = quiz1Score + quiz2Score + (puzzleCorrect ? data.puzzle[0]?.xp || 100 : 0);

  const handleQuiz1Complete = (score: number) => {
    setQuiz1Score(score);
    setXpEarned(prev => prev + score);
    setStep("quiz2");
  };

  const handleQuiz2Complete = (score: number) => {
    setQuiz2Score(score);
    setXpEarned(prev => prev + score);
    setStep("puzzle");
  };

  const handlePuzzleComplete = (correct: boolean, xp: number) => {
    setPuzzleCorrect(correct);
    if (correct) setXpEarned(prev => prev + xp);
    setStep("complete");
    if (correct) {
      setTimeout(() => {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global nav header with LexFin logo and nav tabs */}
      <GlobalHeader />
      {/* Progress sub-header */}
      <UnitHeader
        info={data.info}
        step={step}
        xpEarned={xpEarned}
        onBack={() => setLocation("/learning-path")}
      />

      {/* Step Content — wider on desktop */}
      <main className="flex-1 flex flex-col items-center px-4 py-6 max-w-3xl mx-auto w-full">
        {step === "content" && (
          <ContentStep
            data={data}
            onNext={() => setStep("quiz1")}
          />
        )}
        {step === "quiz1" && (
          <QuizStep
            questions={data.quiz1}
            quizNumber={1}
            xpReward={data.info.xp_quiz1 || 50}
            onComplete={handleQuiz1Complete}
          />
        )}
        {step === "quiz2" && (
          <QuizStep
            questions={data.quiz2}
            quizNumber={2}
            xpReward={data.info.xp_quiz2 || 50}
            onComplete={handleQuiz2Complete}
          />
        )}
        {step === "puzzle" && (
          <PuzzleStep
            puzzle={data.puzzle[0]}
            onComplete={handlePuzzleComplete}
          />
        )}
        {step === "complete" && (
          <CompleteStep
            info={data.info}
            totalXP={xpEarned}
            moduleId={parseInt(moduleId)}
            onReturn={() => setLocation("/learning-path")}
          />
        )}
      </main>
    </div>
  );
}

function UnitHeader({ info, step, xpEarned, onBack }: {
  info: ModuleInfo; step: Step; xpEarned: number; onBack: () => void;
}) {
  const steps: Step[] = ["content", "quiz1", "quiz2", "puzzle", "complete"];
  const stepIdx = steps.indexOf(step);
  const progress = Math.round((stepIdx / (steps.length - 1)) * 100);

  const labels: Record<Step, string> = {
    content: "Lesson Content", quiz1: "Quiz 1", quiz2: "Quiz 2",
    puzzle: "Scenario Puzzle", complete: "Complete!"
  };

  return (
    <header className="sticky top-16 z-40 bg-white border-b-2 border-border shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-secondary rounded-xl transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-bold text-foreground">{info.unit}: {info.title}</span>
            <div className="flex items-center gap-1.5 bg-accent/15 px-2.5 py-1 rounded-full">
              <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black text-amber-600">{xpEarned} XP</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-xs text-muted-foreground">{labels[step]}</span>
            <span className="text-xs text-muted-foreground">{stepIdx}/{steps.length - 1}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function ContentStep({ data, onNext }: { data: ContentData; onNext: () => void }) {
  const [readingDone, setReadingDone] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 60) setReadingDone(true);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="w-full space-y-6">
      {/* Unit info card */}
      <div className="bg-primary text-white rounded-3xl p-6 border-b-4 border-primary-dark shadow-lg">
        <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-wider mb-1">
          {data.info.section} · {data.info.unit}
        </p>
        <h1 className="text-2xl font-display font-black mb-1">{data.info.title}</h1>
        <p className="text-primary-foreground/80 text-sm">{data.info.subtitle}</p>
        <div className="flex gap-3 mt-4">
          <XPChip label="Quiz 1" xp={data.info.xp_quiz1 || 50} />
          <XPChip label="Quiz 2" xp={data.info.xp_quiz2 || 50} />
          <XPChip label="Puzzle" xp={data.info.xp_puzzle || 100} />
        </div>
      </div>

      {/* Audio Player */}
      {data.hasAudio && data.audioUrl && (
        <AudioPlayer src={`${apiBase}${data.audioUrl}`} />
      )}

      {/* Video Player */}
      {data.hasVideo && data.videoUrl && (
        <VideoPlayer src={`${apiBase}${data.videoUrl}`} />
      )}

      {/* Written Content */}
      <div className="bg-white rounded-3xl border-2 border-border overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-secondary/30">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm text-primary">Lesson Content</span>
          <span className="ml-auto text-xs text-muted-foreground">Scroll to read all</span>
        </div>
        <div
          ref={contentRef}
          className="p-5 space-y-4 overflow-y-auto"
          style={{ maxHeight: "420px" }}
          onScroll={() => setReadingDone(true)}
        >
          {data.content.map((item, i) => (
            <ContentBlock key={i} item={item} />
          ))}
          <div className="h-2" />
        </div>
      </div>

      {/* Next Button */}
      <div className="pb-6">
        <GameButton
          className="w-full"
          size="lg"
          onClick={() => { setReadingDone(true); onNext(); }}
        >
          {readingDone ? "Start Quiz 1 →" : "I've read it — Start Quiz 1 →"}
        </GameButton>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Quiz 1: 5 questions · +{data.info.xp_quiz1 || 50} XP
        </p>
      </div>
    </div>
  );
}

function XPChip({ label, xp }: { label: string; xp: number }) {
  return (
    <div className="flex items-center gap-1 bg-white/20 rounded-xl px-2.5 py-1">
      <Star className="h-3 w-3 text-amber-300 fill-amber-300" />
      <span className="text-xs font-bold">{label}: +{xp} XP</span>
    </div>
  );
}

function ContentBlock({ item }: { item: ContentItem }) {
  if (item.type === "heading") {
    return <h2 className="text-lg font-display font-black text-foreground pt-2">{item.text}</h2>;
  }
  if (item.type === "paragraph") {
    return <p className="text-sm text-foreground/80 leading-relaxed">{item.text}</p>;
  }
  if (item.type === "tip") {
    return (
      <div className="flex gap-3 bg-accent/10 border-l-4 border-accent rounded-r-2xl p-4">
        <span className="text-xl flex-shrink-0">💡</span>
        <p className="text-sm font-medium text-foreground/90">{item.text}</p>
      </div>
    );
  }
  if (item.type === "list") {
    const items = item.text.split("|");
    return (
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-primary" strokeWidth={3} />
            </div>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

function AudioPlayer({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-3xl border-2 border-border p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Headphones className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-bold text-sm text-foreground">Audio Lesson</p>
          <p className="text-xs text-muted-foreground">Listen to the lesson narration</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }}
        onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
        onEnded={() => setPlaying(false)}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-11 h-11 bg-primary rounded-full flex items-center justify-center shadow-md shadow-primary/30 hover:brightness-110 transition-all flex-shrink-0"
        >
          {playing ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white ml-0.5 fill-white" />}
        </button>
        <div className="flex-1">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden cursor-pointer" onClick={(e) => {
            if (!audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const p = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = p * audioRef.current.duration;
          }}>
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">{audioRef.current ? fmt(audioRef.current.currentTime) : "0:00"}</span>
            <span className="text-xs text-muted-foreground">{duration ? fmt(duration) : "--:--"}</span>
          </div>
        </div>
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="bg-white rounded-3xl border-2 border-border overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-secondary/30">
        <Video className="h-4 w-4 text-primary" />
        <span className="font-bold text-sm text-primary">Video Lesson</span>
      </div>
      <video
        src={src}
        controls
        className="w-full max-h-72 bg-black"
        style={{ display: "block" }}
      />
    </div>
  );
}

function QuizStep({
  questions, quizNumber, xpReward, onComplete,
}: {
  questions: QuizItem[]; quizNumber: number; xpReward: number;
  onComplete: (score: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const opts = q ? [
    { key: "A", label: q.option_a },
    { key: "B", label: q.option_b },
    { key: "C", label: q.option_c },
    { key: "D", label: q.option_d },
  ] : [];

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
    if (key === q.correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const earnedXp = Math.round((correctCount / Math.max(questions.length, 1)) * xpReward);

  if (!q) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-muted-foreground">No questions available. Edit the Excel file to add questions.</p>
        <GameButton className="mt-4" onClick={() => onComplete(0)}>Continue →</GameButton>
      </div>
    );
  }

  if (done) {
    return (
      <div className="w-full flex flex-col items-center py-12 space-y-6">
        <div className="w-24 h-24 rounded-full bg-success/15 flex items-center justify-center">
          <Trophy className="h-12 w-12 text-success" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-black">Quiz {quizNumber} Complete!</h2>
          <p className="text-muted-foreground">{correctCount} / {questions.length} correct</p>
        </div>
        <div className="bg-accent/15 rounded-2xl px-8 py-5 text-center">
          <div className="flex items-center gap-2 justify-center">
            <Zap className="h-6 w-6 text-amber-500 fill-amber-500" />
            <span className="text-3xl font-black text-amber-600">+{earnedXp} XP</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{Math.round((correctCount / questions.length) * 100)}% accuracy</p>
        </div>
        <GameButton size="lg" className="w-full" onClick={() => onComplete(earnedXp)}>
          {quizNumber === 1 ? "Start Quiz 2 →" : "Go to Puzzle →"}
        </GameButton>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Quiz header */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-sm text-primary">Quiz {quizNumber}</span>
            <span className="text-sm text-muted-foreground">{idx + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((idx) / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-1 bg-accent/15 px-3 py-1.5 rounded-xl">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-black text-amber-600">+{xpReward} XP</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl border-2 border-border p-6 shadow-sm">
        <p className="text-base font-bold text-foreground leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {opts.map(opt => {
          const isSelected = selected === opt.key;
          const isCorrect = opt.key === q.correct;
          const showCorrect = revealed && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;

          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              disabled={revealed}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm ${
                showCorrect ? "bg-success/15 border-success text-success-dark" :
                showWrong ? "bg-destructive/15 border-destructive text-destructive" :
                isSelected ? "bg-primary/10 border-primary text-primary" :
                "bg-white border-border hover:border-primary/50 hover:bg-secondary/50 text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  showCorrect ? "bg-success text-white" :
                  showWrong ? "bg-destructive text-white" :
                  "bg-secondary text-foreground"
                }`}>
                  {showCorrect ? <Check className="h-4 w-4" strokeWidth={3} /> :
                   showWrong ? <X className="h-4 w-4" strokeWidth={3} /> : opt.key}
                </div>
                <span>{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation + Next */}
      {revealed && (
        <div className="space-y-3">
          <div className={`rounded-2xl p-4 text-sm ${selected === q.correct ? "bg-success/10 border-2 border-success/30" : "bg-destructive/10 border-2 border-destructive/30"}`}>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">{selected === q.correct ? "✅" : "💡"}</span>
              <div>
                <p className="font-bold mb-1 text-foreground">{selected === q.correct ? "Correct!" : `Correct answer: ${q.correct}`}</p>
                <p className="text-foreground/70 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </div>
          <GameButton className="w-full" size="lg" onClick={handleNext}>
            {idx + 1 >= questions.length ? "See Results →" : "Next Question →"}
          </GameButton>
        </div>
      )}
    </div>
  );
}

function PuzzleStep({ puzzle, onComplete }: {
  puzzle: PuzzleItem | undefined;
  onComplete: (correct: boolean, xp: number) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!puzzle) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-muted-foreground">No puzzle available. Edit the Excel file to add one.</p>
        <GameButton className="mt-4" onClick={() => onComplete(false, 0)}>Continue →</GameButton>
      </div>
    );
  }

  const opts = [
    { key: "A", label: puzzle.option_a },
    { key: "B", label: puzzle.option_b },
    { key: "C", label: puzzle.option_c },
    { key: "D", label: puzzle.option_d },
  ];

  const handleSelect = (key: string) => {
    if (revealed) return;
    setSelected(key);
    setRevealed(true);
  };

  const isCorrect = selected === puzzle.correct;

  return (
    <div className="w-full space-y-5">
      {/* Puzzle header */}
      <div className="bg-gradient-to-br from-primary to-purple-700 text-white rounded-3xl p-6 border-b-4 border-purple-900 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🧩</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">Real-World Scenario</p>
            <p className="font-black text-lg">Scenario Puzzle</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white/20 rounded-xl px-3 py-1.5">
            <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
            <span className="text-xs font-black">+{puzzle.xp || 100} XP</span>
          </div>
        </div>
      </div>

      {/* Scenario question */}
      <div className="bg-white rounded-3xl border-2 border-border p-6 shadow-sm">
        <p className="text-base font-bold text-foreground leading-relaxed">{puzzle.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {opts.map(opt => {
          const isSelected = selected === opt.key;
          const isRight = opt.key === puzzle.correct;
          const showCorrect = revealed && isRight;
          const showWrong = revealed && isSelected && !isRight;

          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              disabled={revealed}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm ${
                showCorrect ? "bg-success/15 border-success text-success-dark" :
                showWrong ? "bg-destructive/15 border-destructive text-destructive" :
                "bg-white border-border hover:border-primary/50 hover:bg-secondary/50 text-foreground"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                  showCorrect ? "bg-success text-white" :
                  showWrong ? "bg-destructive text-white" :
                  "bg-secondary text-foreground"
                }`}>
                  {showCorrect ? <Check className="h-4 w-4" strokeWidth={3} /> :
                   showWrong ? <X className="h-4 w-4" strokeWidth={3} /> : opt.key}
                </div>
                <span className="leading-relaxed">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="space-y-3">
          <div className={`rounded-2xl p-5 border-2 ${isCorrect ? "bg-success/10 border-success/30" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{isCorrect ? "🎉" : "💡"}</span>
              <div>
                <p className="font-black text-base text-foreground mb-2">
                  {isCorrect ? "Brilliant! You got it!" : `The answer is ${puzzle.correct}`}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">{puzzle.explanation}</p>
              </div>
            </div>
          </div>
          <GameButton className="w-full" size="lg" onClick={() => onComplete(isCorrect, puzzle.xp || 100)}>
            Complete Unit →
          </GameButton>
        </div>
      )}
    </div>
  );
}

function CompleteStep({
  info, totalXP, moduleId, onReturn,
}: {
  info: ModuleInfo; totalXP: number; moduleId: number; onReturn: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center py-8 space-y-6 text-center">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-success/15 flex items-center justify-center border-4 border-success/30">
          <Trophy className="h-14 w-14 text-success" />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          <Star className="h-5 w-5 text-white fill-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-display font-black text-foreground">Unit Complete! 🎉</h2>
        <p className="text-muted-foreground">{info.unit}: {info.title}</p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-border p-6 w-full shadow-sm space-y-4">
        <h3 className="font-bold text-foreground">Your Results</h3>
        <div className="flex items-center justify-center gap-2 py-2">
          <Zap className="h-8 w-8 text-amber-500 fill-amber-500" />
          <span className="text-4xl font-black text-amber-600">+{totalXP}</span>
          <span className="text-xl font-bold text-amber-600">XP</span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <StatChip label="Quiz 1" icon="📝" note="Done" />
          <StatChip label="Quiz 2" icon="📝" note="Done" />
          <StatChip label="Puzzle" icon="🧩" note="Done" />
        </div>
      </div>

      <div className="bg-secondary/50 rounded-2xl p-4 w-full border border-border">
        <p className="text-sm font-bold text-foreground">🔓 Next module unlocked!</p>
        <p className="text-xs text-muted-foreground mt-0.5">Return to the path to continue your journey</p>
      </div>

      <GameButton size="lg" className="w-full" onClick={onReturn}>
        Return to Learning Path →
      </GameButton>
    </div>
  );
}

function StatChip({ label, icon, note }: { label: string; icon: string; note: string }) {
  return (
    <div className="text-center p-2 bg-success/10 rounded-xl">
      <span className="text-lg block">{icon}</span>
      <p className="text-xs font-bold text-foreground">{label}</p>
      <p className="text-xs text-success font-bold">{note}</p>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
        <p className="font-bold text-muted-foreground">Loading lesson content...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="text-5xl">📚</div>
        <h2 className="text-xl font-display font-black">Content loading...</h2>
        <p className="text-muted-foreground text-sm">Module content is being prepared. Add your content to the Excel file in the content/modules directory.</p>
        <GameButton onClick={onBack}>← Back to Modules</GameButton>
      </div>
    </div>
  );
}
