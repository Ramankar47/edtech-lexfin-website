export type GameType = 'capstone_budget' | 'capstone_will' | 'capstone_debt' | 'capstone_invest';

const FEEDBACK_MAP: Record<GameType, { low: string; med: string; high: string; meta: string }> = {
  capstone_budget: {
    low: "Your budgeting strategy needs more focus on essential safety nets. Remember, a single emergency can derail a perfect savings plan.",
    med: "Solid household management! You've successfully balanced necessities with debt, though a stronger focus on insurance could provide more peace of mind.",
    high: "Outstanding fiscal resilience! Your ability to prioritize both current obligations and future security is a hallmark of high financial literacy.",
    meta: "Household Cash Flow Specialist"
  },
  capstone_will: {
    low: "Estate planning is complex. Focus on ensuring legal minimums for primary heirs to avoid future litigation risks.",
    med: "A fair and thoughtful distribution. You've balanced personal wishes with legal responsibilities effectively.",
    high: "Expert-level estate foresight. Your allocation minimizes family conflict while maximizing the legacy for each beneficiary.",
    meta: "Generational Wealth Architect"
  },
  capstone_debt: {
    low: "Debt management requires a strict mathematical priority. Target high-interest rates aggressively to save on total interest.",
    med: "Good progress in ordering liabilities. Aim for the 0% interest goal by sticking strictly to the Avalanche methodology.",
    high: "Masterful debt strategy. By targeting high-APR traps first, you've optimized your path to financial freedom.",
    meta: "Debt Optimization Strategist"
  },
  capstone_invest: {
    low: "Investment matching is about time-horizons. Avoid keeping long-term funds in low-yield assets like savings accounts.",
    med: "Clean alignment of goals and assets. You've correctly identified the risk profiles for major life milestones.",
    high: "Strategic investment foresight! Matching equity to long-term retirement and debt to emergency funds is the key to wealth preservation.",
    meta: "Strategic Asset Allocator"
  }
};

export function getEncouragement(type: GameType, score: number) {
  const game = FEEDBACK_MAP[type];
  if (!game) return "Great job on completing the Capstone!";

  let level: 'low' | 'med' | 'high' = 'low';
  if (score > 400) level = 'high';
  else if (score > 300) level = 'med';

  return {
    feedback: game[level],
    title: game.meta
  };
}
