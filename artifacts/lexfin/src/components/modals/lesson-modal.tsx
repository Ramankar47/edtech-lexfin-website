import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { GameButton } from "@/components/ui/game-button";
import { useGetLesson, useCompleteLesson } from "@workspace/api-client-react";
import { Loader2, X, Check, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { useQueryClient } from "@tanstack/react-query";

export function LessonModal({ lessonId, onClose }: { lessonId: number, onClose: () => void }) {
  const { data: lesson, isLoading } = useGetLesson(lessonId);
  const completeMutation = useCompleteLesson();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState<any>(null);

  if (isLoading || !lesson) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-2xl min-h-[400px] flex items-center justify-center">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        </DialogContent>
      </Dialog>
    );
  }

  const currentQuestion = lesson.questions[currentIndex];
  const progress = ((currentIndex) / lesson.totalQuestions) * 100;
  
  const handleCheck = () => {
    setIsChecking(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < lesson.totalQuestions - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsChecking(false);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    completeMutation.mutate(
      { data: { lessonId, score, totalQuestions: lesson.totalQuestions } },
      {
        onSuccess: (data) => {
          setResultsData(data);
          setShowResults(true);
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#8b40f4', '#4ade80', '#eab308']
          });
          queryClient.invalidateQueries({ queryKey: ["/api/user/stats"] });
          queryClient.invalidateQueries({ queryKey: [`/api/modules`] });
          queryClient.invalidateQueries({ queryKey: [`/api/activity`] });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to save progress", variant: "destructive" });
        }
      }
    );
  };

  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden h-[90vh] sm:h-[80vh] flex flex-col border-0 rounded-none sm:rounded-3xl">
        
        {/* Header */}
        {!showResults && (
          <div className="px-6 py-4 flex items-center gap-4 bg-white border-b-2 border-border sticky top-0 z-10">
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
              <X className="w-6 h-6" />
            </button>
            <Progress value={progress} className="h-4 flex-1" />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-background flex flex-col">
          
          {!showResults ? (
            <div className="p-6 sm:p-10 max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
                {currentQuestion.questionText}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options?.map((opt) => (
                  <button
                    key={opt}
                    disabled={isChecking}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all ${
                      selectedOption === opt && !isChecking
                        ? "border-primary bg-primary/10 text-primary scale-[1.02]"
                        : isChecking && opt === currentQuestion.correctAnswer
                        ? "border-success bg-success/10 text-success-dark"
                        : isChecking && selectedOption === opt && !isCorrect
                        ? "border-destructive bg-destructive/10 text-destructive-dark opacity-50"
                        : "border-border hover:border-border/80 bg-white text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-primary/10 to-background">
              <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-xl border-4 border-white mb-6 animate-bounce-subtle">
                <Star className="w-16 h-16 text-white fill-white" />
              </div>
              <h2 className="text-4xl font-display font-black text-primary mb-2">Lesson Complete!</h2>
              <p className="text-xl text-muted-foreground mb-8">You scored {score} out of {lesson.totalQuestions}</p>
              
              <div className="flex gap-4 mb-12">
                <div className="bg-white p-4 rounded-2xl border-2 border-border min-w-[120px]">
                  <p className="text-xs font-bold text-muted-foreground uppercase">XP Earned</p>
                  <p className="text-3xl font-black text-accent-dark">+{resultsData?.xpEarned || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-border min-w-[120px]">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Accuracy</p>
                  <p className="text-3xl font-black text-primary">{Math.round((score/lesson.totalQuestions)*100)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        {!showResults ? (
          <div className={`p-4 sm:p-6 border-t-2 border-border transition-colors ${
            isChecking 
              ? isCorrect ? "bg-success/20 border-success/30" : "bg-destructive/20 border-destructive/30"
              : "bg-white"
          }`}>
            <div className="max-w-xl mx-auto flex items-center justify-between">
              <div className="hidden sm:block">
                {isChecking && (
                  <div className={`flex items-center gap-2 font-bold text-lg ${isCorrect ? 'text-success-dark' : 'text-destructive-dark'}`}>
                    {isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    {isCorrect ? "Excellent!" : "Not quite"}
                  </div>
                )}
              </div>
              
              {!isChecking ? (
                <GameButton 
                  className="w-full sm:w-auto" 
                  size="lg" 
                  disabled={!selectedOption} 
                  onClick={handleCheck}
                >
                  Check Answer
                </GameButton>
              ) : (
                <GameButton 
                  variant={isCorrect ? "success" : "destructive"}
                  className="w-full sm:w-auto" 
                  size="lg" 
                  onClick={handleNext}
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </GameButton>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white border-t-2 border-border">
            <div className="max-w-xl mx-auto">
              <GameButton className="w-full" size="lg" onClick={onClose}>
                Continue to Path
              </GameButton>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
