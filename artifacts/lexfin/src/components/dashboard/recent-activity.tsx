import { useGetActivity } from "@workspace/api-client-react";
import { formatDistanceToNow } from "date-fns";
import { Zap, Trophy, BookOpen, Star, AlertCircle } from "lucide-react";

export function RecentActivity() {
  const { data: activities, isLoading } = useGetActivity();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground mb-4">Recent Activity</h3>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-10 h-10 bg-muted rounded-full shrink-0" />
            <div className="space-y-2 flex-1 pt-1">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-foreground mb-6">Recent Activity</h3>
      
      {(!activities || activities.length === 0) ? (
        <div className="text-center p-6 bg-secondary/50 rounded-2xl border-2 border-dashed border-border flex flex-col items-center">
          <AlertCircle className="text-muted-foreground h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground font-medium">No activity yet. Start learning to fill this up!</p>
        </div>
      ) : (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:to-transparent">
          {activities.map((item, index) => {
            let Icon = Star;
            let colorClass = "bg-primary text-white";
            
            if (item.type === "badge_earned") { Icon = Trophy; colorClass = "bg-accent text-accent-dark"; }
            else if (item.type === "puzzle_solved") { Icon = Zap; colorClass = "bg-success text-white"; }
            else if (item.type === "lesson_complete") { Icon = BookOpen; colorClass = "bg-primary text-white"; }
            
            return (
              <div key={item.id} className="relative flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 border-white z-10 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-bold text-foreground">{item.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground font-medium">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </span>
                    {item.xpEarned > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-xs font-bold text-accent-dark">+{item.xpEarned} XP</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
