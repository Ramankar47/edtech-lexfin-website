import { useState } from "react";
import { useGetPuzzles } from "@workspace/api-client-react";
import { Loader2, Brain, CheckCircle2 } from "lucide-react";
import { GameButton } from "@/components/ui/game-button";
import { PuzzleModal } from "@/components/modals/puzzle-modal";

export function Puzzles() {
  const { data: puzzles, isLoading } = useGetPuzzles();
  const [activePuzzleId, setActivePuzzleId] = useState<number | null>(null);

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Legal Puzzles</h1>
        <p className="text-muted-foreground">Test your knowledge with scenario-based challenges and earn bonus XP.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles?.map((puzzle) => (
          <div 
            key={puzzle.id} 
            className={`relative bg-white rounded-3xl p-6 border-2 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl ${
              puzzle.isCompleted ? "border-success/30 bg-success/5" : "border-border hover:border-primary/50"
            }`}
          >
            {puzzle.isNew && !puzzle.isCompleted && (
              <span className="absolute -top-3 -right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md transform rotate-12">
                New!
              </span>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                puzzle.difficulty === "easy" ? "bg-success/20 text-success" :
                puzzle.difficulty === "medium" ? "bg-accent/20 text-accent-dark" :
                "bg-destructive/20 text-destructive"
              }`}>
                <Brain className="h-6 w-6" />
              </div>
              
              {puzzle.isCompleted ? (
                <div className="flex items-center gap-1 text-success text-sm font-bold bg-success/10 px-2 py-1 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" /> Solved
                </div>
              ) : (
                <div className="text-sm font-bold text-accent-dark bg-accent/10 px-2 py-1 rounded-lg">
                  +{puzzle.xpReward} XP
                </div>
              )}
            </div>

            <h3 className="text-xl font-display font-bold mb-2 line-clamp-1">{puzzle.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 min-h-[40px]">
              {puzzle.description}
            </p>

            <GameButton 
              variant={puzzle.isCompleted ? "secondary" : "primary"}
              className="w-full"
              onClick={() => setActivePuzzleId(puzzle.id)}
            >
              {puzzle.isCompleted ? "Review" : "Play Now"}
            </GameButton>
          </div>
        ))}
      </div>

      {activePuzzleId && (
        <PuzzleModal puzzleId={activePuzzleId} onClose={() => setActivePuzzleId(null)} />
      )}
    </div>
  );
}
