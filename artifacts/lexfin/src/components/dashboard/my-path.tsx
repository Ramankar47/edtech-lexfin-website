import { useState } from "react";
import { useGetModules, useGetModule } from "@workspace/api-client-react";
import { Loader2, Check, Lock, Play } from "lucide-react";
import { LessonModal } from "@/components/modals/lesson-modal";

export function MyPath({ user, stats }: { user: any, stats: any }) {
  const { data: modules, isLoading } = useGetModules();

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-8 space-y-2">
        <h1 className="text-3xl font-display font-bold">Good morning, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground font-medium">
          You're on a {stats?.streak || 0} day streak. Keep it up!
        </p>
      </div>

      <div className="w-full space-y-12">
        {modules?.map((module, index) => (
          <ModuleSection key={module.id} module={module} index={index} />
        ))}
      </div>
    </div>
  );
}

function ModuleSection({ module, index }: { module: any, index: number }) {
  const { data: moduleData, isLoading } = useGetModule(module.id);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  if (isLoading) return <div className="h-40 bg-secondary/50 rounded-3xl animate-pulse" />;
  
  const isCompleted = module.status === "completed";
  const isLocked = module.status === "locked";

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Module Banner */}
      <div className={`w-full p-6 rounded-3xl mb-8 relative overflow-hidden border-b-4 ${
        isCompleted ? "bg-success text-success-foreground border-success-dark" :
        isLocked ? "bg-muted text-muted-foreground border-border" :
        "bg-primary text-primary-foreground border-primary-dark"
      }`}>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold mb-1">Unit {index + 1}: {module.title}</h2>
            <p className="opacity-90 text-sm font-medium">{module.description}</p>
          </div>
          <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
            {module.icon}
          </div>
        </div>
      </div>

      {/* Path Nodes */}
      <div className="relative w-full py-4 flex flex-col items-center gap-8">
        {moduleData?.lessons?.map((lesson: any, i: number) => {
          // Zig zag calculation
          const offset = i % 2 === 0 ? 0 : (i % 4 === 1 ? 40 : -40);
          
          return (
            <div 
              key={lesson.id} 
              className="relative flex justify-center w-full"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {/* Connector Line (except for first) */}
              {i > 0 && (
                <svg className="absolute -top-12 z-0 w-24 h-16 pointer-events-none" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  <path 
                    d={offset === 0 ? "M48,0 Q48,30 48,64" : offset > 0 ? "M8,0 Q48,30 88,64" : "M88,0 Q48,30 8,64"} 
                    stroke={lesson.status === "completed" ? "hsl(var(--success))" : "hsl(var(--border))"} 
                    strokeWidth="8" 
                    fill="none" 
                    strokeLinecap="round"
                  />
                </svg>
              )}

              <LessonNode 
                lesson={lesson} 
                onClick={() => {
                  if (lesson.status !== "locked") {
                    setActiveLessonId(lesson.id);
                  }
                }} 
              />
            </div>
          );
        })}
      </div>

      {activeLessonId && (
        <LessonModal 
          lessonId={activeLessonId} 
          onClose={() => setActiveLessonId(null)} 
        />
      )}
    </div>
  );
}

function LessonNode({ lesson, onClick }: { lesson: any, onClick: () => void }) {
  const isCompleted = lesson.status === "completed";
  const isActive = lesson.status === "active";
  const isLocked = lesson.status === "locked";

  return (
    <div className="relative z-10 flex flex-col items-center group">
      {isActive && (
        <div className="absolute -top-14 animate-bounce-subtle bg-white text-primary px-3 py-1.5 rounded-xl font-bold text-sm shadow-xl border-2 border-border whitespace-nowrap z-20">
          START!
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-border transform rotate-45" />
        </div>
      )}

      <button
        onClick={onClick}
        disabled={isLocked}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 border-b-4 ${
          isCompleted ? "bg-success text-white border-success-dark hover:brightness-110 active:translate-y-1 active:border-b-0" :
          isActive ? "bg-primary text-white border-primary-dark hover:brightness-110 hover:scale-105 active:translate-y-1 active:border-b-0 shadow-lg shadow-primary/30" :
          "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-80"
        }`}
      >
        {isCompleted && <Check className="w-8 h-8" strokeWidth={3} />}
        {isActive && <Play className="w-7 h-7 ml-1 fill-white" strokeWidth={2} />}
        {isLocked && <Lock className="w-6 h-6" strokeWidth={2} />}
      </button>

      {/* Crown indicator for completed */}
      {isCompleted && (
        <div className="absolute -right-2 -top-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
          <Star className="w-3 h-3 text-white fill-white" />
        </div>
      )}
    </div>
  );
}
