import { useGetBadges } from "@workspace/api-client-react";
import { Trophy, Star, Target, Zap, Clock, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function MyStats({ stats }: { stats: any }) {
  const { data: badges } = useGetBadges();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your legal learning journey.</p>
      </div>

      {/* Top Level Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full border-4 border-white/30 flex flex-col items-center justify-center shrink-0 shadow-inner">
            <span className="text-sm font-bold text-white/80 uppercase tracking-widest mb-[-4px]">Level</span>
            <span className="text-6xl font-display font-black">{stats?.level || 1}</span>
          </div>
          
          <div className="flex-1 w-full space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold">Legal Eagle in Training</h2>
                <p className="text-white/80">{stats?.totalXp || 0} Total XP</p>
              </div>
              <span className="font-bold text-white/90">{stats?.xpToNextLevel} XP to next</span>
            </div>
            
            <Progress value={stats?.xpProgress || 0} className="h-4 bg-black/20" indicatorClassName="bg-accent" />
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Flame className="text-orange-500" />} label="Day Streak" value={stats?.streak || 0} />
        <StatCard icon={<Target className="text-success" />} label="Lessons Done" value={stats?.lessonsCompleted || 0} />
        <StatCard icon={<PuzzleIcon className="text-primary" />} label="Puzzles Solved" value={stats?.puzzlesSolved || 0} />
        <StatCard icon={<ShieldCheck className="text-blue-500" />} label="Accuracy" value="94%" />
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-4">Achievements</h2>
        <div className="bg-white rounded-3xl p-6 border-2 border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {badges?.map((badge) => (
            <div key={badge.id} className={`flex flex-col items-center text-center gap-3 p-4 rounded-2xl transition-all ${badge.earned ? 'bg-secondary/50' : 'opacity-50 grayscale'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-sm ${badge.earned ? 'bg-white border-4 border-accent' : 'bg-muted border-4 border-border'}`}>
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm">{badge.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{badge.description}</p>
              </div>
            </div>
          ))}
          {(!badges || badges.length === 0) && (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center gap-3 opacity-30 p-4">
                <div className="w-20 h-20 bg-muted rounded-full border-4 border-border" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string | number }) {
  return (
    <div className="bg-white p-5 rounded-3xl border-2 border-border flex flex-col items-center text-center gap-2 hover:border-primary/30 transition-colors">
      <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <span className="text-2xl font-display font-black text-foreground">{value}</span>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

// Temporary imports for icons used above
import { Flame, Puzzle as PuzzleIcon } from "lucide-react";
