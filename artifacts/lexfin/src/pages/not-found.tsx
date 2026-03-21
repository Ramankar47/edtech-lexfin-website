import { Link } from "wouter";
import { GameButton } from "@/components/ui/game-button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-black text-foreground">Lost in the Archives?</h1>
        <p className="text-lg text-muted-foreground">
          The page you're looking for has been overruled and struck from the record.
        </p>
        <div className="pt-4">
          <Link href="/">
            <GameButton size="lg" className="w-full sm:w-auto">Return to Safety</GameButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
