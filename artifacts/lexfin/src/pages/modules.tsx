import { useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { getApiUrl } from "@/lib/utils";
import { Scale, Lock, ArrowLeft, Star, BookOpen } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";

const ALL_MODULES = [
  { id: 1, title: "Consumer Protection Law", subtitle: "Your rights as a buyer", icon: "🛡️", color: "#7c3aed", dark: "#5b21b6", section: "SECTION 1", unit: "UNIT 1", status: "active" as const },
  { id: 2, title: "Income Tax Basics", subtitle: "TDS, deductions & filing", icon: "💰", color: "#059669", dark: "#047857", section: "SECTION 1", unit: "UNIT 2", status: "locked" as const },
  { id: 3, title: "Securities & Capital Markets", subtitle: "SEBI, stocks & investments", icon: "📈", color: "#d97706", dark: "#b45309", section: "SECTION 2", unit: "UNIT 3", status: "locked" as const },
  { id: 4, title: "Contract Law Fundamentals", subtitle: "Indian Contract Act 1872", icon: "📝", color: "#0284c7", dark: "#0369a1", section: "SECTION 2", unit: "UNIT 4", status: "locked" as const },
  { id: 5, title: "Banking & RBI Regulations", subtitle: "RBI guidelines & safety", icon: "🏦", color: "#db2777", dark: "#be185d", section: "SECTION 3", unit: "UNIT 5", status: "locked" as const },
  { id: 6, title: "Property & Real Estate Law", subtitle: "RERA & property rights", icon: "🏠", color: "#7c3aed", dark: "#5b21b6", section: "SECTION 3", unit: "UNIT 6", status: "locked" as const },
  { id: 7, title: "GST & Indirect Taxes", subtitle: "Goods & Services Tax guide", icon: "🧾", color: "#059669", dark: "#047857", section: "SECTION 4", unit: "UNIT 7", status: "locked" as const },
  { id: 8, title: "Startup & Company Law", subtitle: "MCA, incorporation & compliance", icon: "🚀", color: "#d97706", dark: "#b45309", section: "SECTION 4", unit: "UNIT 8", status: "locked" as const },
  { id: 9, title: "Insurance Laws", subtitle: "IRDAI & policy rights", icon: "🔒", color: "#0284c7", dark: "#0369a1", section: "SECTION 5", unit: "UNIT 9", status: "locked" as const },
  { id: 10, title: "Digital Finance & Cyber Laws", subtitle: "UPI, IT Act & data safety", icon: "💻", color: "#db2777", dark: "#be185d", section: "SECTION 5", unit: "UNIT 10", status: "locked" as const },
];

const ZIG_OFFSETS = [0.12, -0.18, 0.22, -0.12, 0.08, -0.22, 0.18, -0.08, 0.12, -0.18];

export default function ModulesPage() {
  const [, setLocation] = useLocation();
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
  }, []);

  const handleLogin = () => {
    window.location.href = getApiUrl("/api/auth/login");
  };

  const handleModuleClick = (mod: typeof ALL_MODULES[0]) => {
    setLocation(`/module/${mod.id}/learn`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b-2 border-border px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Scale className="text-white h-5 w-5" />
            </div>
            <span className="font-display font-black text-lg text-primary">LexFin</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block font-medium">10 modules · Free</span>
          <GameButton size="sm" onClick={handleLogin}>Start Learning</GameButton>
        </div>
      </header>

      {/* Page Title */}
      <div className="text-center pt-10 pb-6 px-4">
        <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground mb-2">Your Learning Path</h1>
        <p className="text-muted-foreground font-medium max-w-md mx-auto">
          Complete each module to unlock the next. Master Indian Financial Laws step by step!
        </p>
      </div>

      {/* Main Path — centered column */}
      <div className="flex-1 flex flex-col items-center pb-24 px-4">
        <div className="w-full max-w-sm relative">
          {/* Background decorative blobs */}
          <div className="fixed top-40 left-4 w-36 h-36 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10" />
          <div className="fixed top-[500px] right-4 w-44 h-44 rounded-full bg-accent/8 blur-3xl pointer-events-none -z-10" />

          {/* Render modules as a flowing list */}
          {ALL_MODULES.map((mod, index) => {
            const prevSection = index > 0 ? ALL_MODULES[index - 1].section : null;
            const showBanner = prevSection !== mod.section;
            const isActive = mod.status === "active";
            const isLocked = mod.status === "locked";
            const zigX = ZIG_OFFSETS[index] ?? 0;

            return (
              <div key={mod.id}>
                {/* Section Banner */}
                {showBanner && (
                  <div className={`${index > 0 ? "mt-10" : "mt-4"} mb-6 px-1`}>
                    <SectionBanner section={mod.section} color={mod.color} dark={mod.dark} isActive={isActive} />
                  </div>
                )}

                {/* Node row: centered with zigzag offset */}
                <div
                  ref={isActive ? activeRef : undefined}
                  className={`relative flex justify-center ${index > 0 ? "mt-12" : "mt-8"}`}
                  style={{ paddingLeft: zigX > 0 ? `${zigX * 100}px` : 0, paddingRight: zigX < 0 ? `${-zigX * 100}px` : 0 }}
                >
                  {/* Connector line to previous node */}
                  {index > 0 && (
                    <ConnectorLine fromZig={ZIG_OFFSETS[index - 1] ?? 0} toZig={zigX} isCompleted={false} />
                  )}

                  <ModuleNode
                    mod={mod}
                    isActive={isActive}
                    isLocked={isLocked}
                    onStart={() => handleModuleClick(mod)}
                  />
                </div>
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div className="mt-16 bg-white border-2 border-border rounded-3xl p-6 text-center shadow-xl">
            <div className="text-3xl mb-2">🎓</div>
            <p className="font-bold text-foreground mb-1">More modules coming soon!</p>
            <p className="text-sm text-muted-foreground mb-4">Advanced topics in Financial Law</p>
            <GameButton onClick={handleLogin} className="w-full">Start with Unit 1 →</GameButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectorLine({ fromZig, toZig, isCompleted }: { fromZig: number; toZig: number; isCompleted: boolean }) {
  const dx = (toZig - fromZig) * 100;
  const color = isCompleted ? "#7c3aed" : "#e2e8f0";
  
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-0 w-1 h-12 overflow-visible">
      <svg width="120" height="56" viewBox="-60 0 120 56" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
        <path
          d={`M 0 0 C 0 28, ${dx} 28, ${dx} 56`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={isCompleted ? "none" : "1 22"}
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

function SectionBanner({ section, color, dark, isActive }: {
  section: string; color: string; dark: string; isActive: boolean;
}) {
  return (
    <div
      className="rounded-2xl px-5 py-3 flex items-center gap-3 shadow-md border-b-4"
      style={{
        background: isActive ? color : "#e2e8f0",
        borderBottomColor: isActive ? dark : "#94a3b8",
      }}
    >
      <BookOpen className="h-5 w-5 flex-shrink-0" style={{ color: isActive ? "white" : "#64748b" }} />
      <div>
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: isActive ? "rgba(255,255,255,0.75)" : "#94a3b8" }}>
          {section}
        </p>
        <p className="text-sm font-bold" style={{ color: isActive ? "white" : "#64748b" }}>
          Financial Laws of India
        </p>
      </div>
    </div>
  );
}

function ModuleNode({ mod, isActive, isLocked, onStart }: {
  mod: typeof ALL_MODULES[0];
  isActive: boolean;
  isLocked: boolean;
  onStart: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center z-10">
      {/* START badge — above the node, clearly separated */}
      {isActive && (
        <div className="mb-3" style={{ animation: "float 2s ease-in-out infinite" }}>
          <div
            className="px-5 py-2 rounded-2xl font-black text-sm text-white shadow-xl whitespace-nowrap relative"
            style={{ background: mod.color }}
          >
            START!
            <div
              className="absolute left-1/2 -bottom-2 w-4 h-4 rotate-45"
              style={{ background: mod.color, transform: "translateX(-50%) rotate(45deg)", bottom: "-7px" }}
            />
          </div>
        </div>
      )}

      {/* Spacer between START badge and node when badge is not shown */}
      {!isActive && <div className="h-0" />}

      {/* Circle Button */}
      <button
        onClick={isActive ? onStart : undefined}
        disabled={isLocked}
        className="relative group transition-all duration-200"
        style={{ cursor: isLocked ? "default" : "pointer" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl relative overflow-hidden"
          style={{
            background: isLocked ? "#e2e8f0" : mod.color,
            boxShadow: isLocked
              ? "0 6px 0 #cbd5e1"
              : `0 6px 0 ${mod.dark}${isActive ? ", 0 0 32px " + mod.color + "55" : ""}`,
            transform: isActive ? "scale(1.1)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          {isLocked ? (
            <Lock className="w-8 h-8 text-slate-400" />
          ) : (
            <span style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>{mod.icon}</span>
          )}
          {isActive && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: mod.color }} />
          )}
        </div>

        {/* Hover card */}
        {!isLocked && (
          <div
            className="absolute top-24 left-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-40 pointer-events-none"
            style={{ width: "190px", transform: "translateX(-50%)" }}
          >
            <div className="bg-white border-2 border-border rounded-2xl p-3 shadow-2xl text-left">
              <p className="font-bold text-sm text-foreground leading-tight">{mod.unit}: {mod.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{mod.subtitle}</p>
              <div className="mt-2 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-600">+50 XP on completion</span>
              </div>
            </div>
          </div>
        )}
      </button>

      {/* Label below circle */}
      <div className="mt-3 text-center" style={{ maxWidth: "110px" }}>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{mod.unit}</p>
        <p className="text-sm font-bold leading-tight mt-0.5" style={{ color: isLocked ? "#94a3b8" : "#1e1b4b" }}>
          {mod.title.split(" ").slice(0, 3).join(" ")}
        </p>
      </div>
    </div>
  );
}
