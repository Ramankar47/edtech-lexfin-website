import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetMe, useGetUserStats } from "@workspace/api-client-react";
import { Map, Puzzle as PuzzleIcon, BarChart3, Flame, Star, Scale, Loader2, LogOut } from "lucide-react";
import { MyPath } from "@/components/dashboard/my-path";
import { Puzzles } from "@/components/dashboard/puzzles";
import { MyStats } from "@/components/dashboard/my-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isLoadingUser, error: authError } = useGetMe();
  const { data: stats } = useGetUserStats();
  const [activeTab, setActiveTab] = useState<"path" | "puzzles" | "stats">("path");

  useEffect(() => {
    if (authError) {
      setLocation("/");
    }
  }, [authError, setLocation]);

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-border px-4 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Scale className="text-white h-5 w-5" />
          </div>
          <span className="font-display font-black text-xl text-primary hidden sm:inline-block">LexFin</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1 font-bold text-accent-dark">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span>{stats?.totalXp || 0} XP</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-orange-500">
            <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
            <span>{stats?.streak || 0}</span>
          </div>
          
          <button 
            onClick={() => window.location.href = '/api/auth/logout'}
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border hover:bg-secondary transition-colors group"
            title="Log Out"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <img src={`${import.meta.env.BASE_URL}images/avatar-placeholder.png`} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            )}
            <LogOut className="h-4 w-4 absolute opacity-0 group-hover:opacity-100 text-destructive bg-white/80 p-1 rounded-full inset-0 m-auto" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="w-64 hidden md:flex flex-col gap-6 p-6 border-r-2 border-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-2">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Learning</p>
            <SidebarItem 
              icon={<Map />} 
              label="My Path" 
              active={activeTab === "path"} 
              onClick={() => setActiveTab("path")} 
            />
            <SidebarItem 
              icon={<PuzzleIcon />} 
              label="Puzzles" 
              active={activeTab === "puzzles"} 
              onClick={() => setActiveTab("puzzles")} 
              badge="New"
            />
          </div>
          
          <div className="space-y-2">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Progress</p>
            <SidebarItem 
              icon={<BarChart3 />} 
              label="My Stats" 
              active={activeTab === "stats"} 
              onClick={() => setActiveTab("stats")} 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto pb-24 md:pb-8">
          {activeTab === "path" && <MyPath user={user} stats={stats} />}
          {activeTab === "puzzles" && <Puzzles />}
          {activeTab === "stats" && <MyStats stats={stats} />}
        </main>

        {/* Right Sidebar - Recent Activity */}
        <aside className="w-80 hidden lg:block border-l-2 border-border p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white/50">
          <RecentActivity />
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-border flex justify-around p-2 z-40 pb-safe">
        <MobileNavItem icon={<Map />} label="Path" active={activeTab === "path"} onClick={() => setActiveTab("path")} />
        <MobileNavItem icon={<PuzzleIcon />} label="Puzzles" active={activeTab === "puzzles"} onClick={() => setActiveTab("puzzles")} />
        <MobileNavItem icon={<BarChart3 />} label="Stats" active={activeTab === "stats"} onClick={() => setActiveTab("stats")} />
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all ${
        active 
          ? "bg-secondary text-primary border-2 border-primary/20 shadow-sm" 
          : "text-muted-foreground hover:bg-secondary/50 border-2 border-transparent hover:border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={active ? "text-primary" : ""}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-accent text-white text-[10px] uppercase px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

function MobileNavItem({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 p-2 rounded-xl transition-colors ${
        active ? "text-primary bg-secondary" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold mt-1">{label}</span>
    </button>
  );
}
