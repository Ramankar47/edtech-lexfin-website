import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "btn-game inline-flex items-center justify-center rounded-xl",
          {
            "btn-game-primary": variant === "primary",
            "btn-game-secondary": variant === "secondary",
            "btn-game-success": variant === "success",
            "btn-game-destructive": variant === "destructive",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
            "opacity-50 cursor-not-allowed transform-none shadow-none": disabled || isLoading,
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </button>
    );
  }
);
GameButton.displayName = "GameButton";
