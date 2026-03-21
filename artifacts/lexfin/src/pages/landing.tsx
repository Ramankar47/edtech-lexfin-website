import { useLocation } from "wouter";
import { GameButton } from "@/components/ui/game-button";
import { BookOpen, Scale, Shield, TrendingUp } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform -rotate-6">
            <Scale className="text-white h-6 w-6" />
          </div>
          <span className="font-display font-black text-2xl text-primary tracking-tight">LexFin</span>
        </div>
        <GameButton variant="secondary" onClick={() => window.location.href = '/api/auth/login'}>
          Log In
        </GameButton>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 lg:py-20 max-w-6xl mx-auto w-full text-center lg:text-left lg:flex-row lg:gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-bold text-sm uppercase tracking-wider mb-4 animate-bounce-subtle">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            New: Securities Law Module
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-black text-foreground leading-[1.1]">
            Learn Financial Laws the <span className="text-primary relative whitespace-nowrap">
              Fun Way
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Master the Consumer Protection Act, Income Tax, and Contracts through bite-sized games. Level up your legal literacy and earn real rewards.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <GameButton size="lg" onClick={() => window.location.href = '/api/auth/login'}>
              Start Learning Now
            </GameButton>
            <GameButton size="lg" variant="secondary" onClick={() => setLocation("/modules")}>
              View Modules
            </GameButton>
          </div>
        </div>

        <div className="flex-1 mt-16 lg:mt-0 relative w-full max-w-lg">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] transform rotate-3 scale-105" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-illustration.png`} 
            alt="Gamified Finance Illustration" 
            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-[2rem] border-4 border-white transform transition-transform hover:scale-105 duration-500"
          />
          
          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border-2 border-border animate-bounce-subtle" style={{ animationDelay: '0ms' }}>
            <Shield className="h-8 w-8 text-success" />
          </div>
          <div className="absolute top-1/2 -right-8 bg-white p-4 rounded-2xl shadow-xl border-2 border-border animate-bounce-subtle" style={{ animationDelay: '500ms' }}>
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <div className="absolute -bottom-6 left-1/4 bg-white p-4 rounded-2xl shadow-xl border-2 border-border animate-bounce-subtle" style={{ animationDelay: '1000ms' }}>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
      </main>
    </div>
  );
}
