import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSubmitPuzzle } from "@workspace/api-client-react";
import { GameButton } from "@/components/ui/game-button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

export function PuzzleModal({ puzzleId, onClose }: { puzzleId: number, onClose: () => void }) {
  const { toast } = useToast();
  const submitMutation = useSubmitPuzzle();
  
  // Hardcoding UI for the puzzle since content structure varies
  // In a real app, this would fetch puzzle details and render based on puzzleType
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const options = ["Option A", "Option B", "Option C"]; // Mock data

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    submitMutation.mutate(
      { puzzleId, data: { answer: selectedOption } },
      {
        onSuccess: (data) => {
          setResult(data);
          if (data.correct) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            toast({
              title: "Correct! 🎉",
              description: `You earned ${data.xpEarned} XP!`,
            });
          }
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to submit answer", variant: "destructive" });
        }
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0">
        <div className="bg-primary p-6 text-white text-center">
          <h2 className="text-2xl font-display font-bold">Scenario Challenge</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {!result ? (
            <>
              <div className="bg-secondary p-4 rounded-xl text-lg font-medium text-foreground">
                "A retailer refuses to replace a defective laptop sold yesterday. Under the Consumer Protection Act, what is the buyer's immediate right?"
              </div>

              <div className="space-y-3">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                      selectedOption === opt 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <GameButton 
                className="w-full" 
                size="lg" 
                disabled={!selectedOption || submitMutation.isPending}
                onClick={handleSubmit}
                isLoading={submitMutation.isPending}
              >
                Submit Answer
              </GameButton>
            </>
          ) : (
            <div className="text-center py-4 space-y-6">
              <div className="flex justify-center">
                {result.correct ? (
                  <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center animate-bounce-subtle">
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-destructive" />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className={`text-2xl font-display font-bold ${result.correct ? 'text-success-dark' : 'text-destructive-dark'}`}>
                  {result.correct ? "Brilliant!" : "Not quite right"}
                </h3>
                <p className="text-muted-foreground mt-2">{result.explanation}</p>
              </div>

              {result.correct && (
                <div className="bg-accent/10 border-2 border-accent/20 p-4 rounded-xl flex items-center justify-center gap-3">
                  <Trophy className="text-accent h-6 w-6" />
                  <span className="font-bold text-lg text-accent-dark">+{result.xpEarned} XP Earned</span>
                </div>
              )}

              <GameButton className="w-full" size="lg" onClick={onClose}>
                Continue
              </GameButton>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
