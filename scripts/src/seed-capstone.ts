import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { puzzlesTable } from "../../lib/db/src/schema/puzzles";

const { Pool } = pg;
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/finance_quest";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool);

const CAPSTONE_PUZZLES = [
  // --- BUDGET SIMULATOR SCENARIOS ---
  {
    title: "The Mid-Month Crunch (Easy)",
    description: "Manage a basic ₹10,000 budget with pending rent and groceries.",
    difficulty: "easy",
    puzzleType: "capstone_budget",
    xpReward: 500,
    content: JSON.stringify({
      initialBudget: 10000,
      targets: { insurance: 1000, necessities: 6000, debt: 2000, investments: 1000 },
      risks: ["Small late fee if debt missed"]
    }),
    correctAnswer: "accuracy_based",
    explanation: "Prioritize necessities first, then debt to avoid interest.",
    orderIndex: 100
  },
  {
    title: "Healthcare Emergency (Hard)",
    description: "A sudden medical bill of ₹8,000 against a ₹12,000 budget.",
    difficulty: "hard",
    puzzleType: "capstone_budget",
    xpReward: 500,
    content: JSON.stringify({
      initialBudget: 12000,
      targets: { insurance: 5000, necessities: 4000, debt: 2000, investments: 1000 },
      risks: ["Medical debt spiral", "Health risk"]
    }),
    correctAnswer: "accuracy_based",
    explanation: "Insurance covers the bulk of emergencies; neglected premiums lead to ruin.",
    orderIndex: 101
  },

  // --- WILL PLANNER SCENARIOS ---
  {
    title: "Legacy for Two (Medium)",
    description: "Distribute ₹100,000 between your spouse and child under standard legal guidelines.",
    difficulty: "medium",
    puzzleType: "capstone_will",
    xpReward: 500,
    content: JSON.stringify({
      totalSum: 100000,
      heirs: [
        { id: "h1", name: "Spouse", relationship: "Wife", minPercent: 33 },
        { id: "h2", name: "Child A", relationship: "Daughter", minPercent: 20 }
      ],
      instructions: "Ensure both have a sustainable future share."
    }),
    correctAnswer: "order_based",
    explanation: "Legal heirs have primary rights; a clear Will prevents litigation.",
    orderIndex: 200
  },

  // --- DEBT ESCAPE SCENARIOS ---
  {
    title: "The Interest Avalanche (Hard)",
    description: "You have 4 debts. Order them to minimize interest paid over time.",
    difficulty: "hard",
    puzzleType: "capstone_debt",
    xpReward: 500,
    content: JSON.stringify({
      debts: [
        { id: "d1", name: "Credit Card", rate: 42, balance: 15000 },
        { id: "d2", name: "Personal Loan", rate: 14, balance: 50000 },
        { id: "d3", name: "Education Loan", rate: 8, balance: 120000 },
        { id: "d4", name: "Payday Loan", rate: 60, balance: 5000 }
      ]
    }),
    correctAnswer: "d4,d1,d2,d3",
    explanation: "The Avalanche method targets the highest interest rate first regardless of balance.",
    orderIndex: 300
  },

  // --- RISK MATCHER SCENARIOS ---
  {
    title: "The Life Goal Ladder (Medium)",
    description: "Match your goals (Retirement, Vacation, Emergency) to their ideal asset classes.",
    difficulty: "medium",
    puzzleType: "capstone_invest",
    xpReward: 500,
    content: JSON.stringify({
      goals: [
        { id: "g1", name: "Retirement (25 yrs)", risk: "high", horizon: "long" },
        { id: "g2", name: "Emergency Fund", risk: "low", horizon: "short" },
        { id: "g3", name: "House Downpayment (5 yrs)", risk: "medium", horizon: "medium" }
      ],
      assets: [
        { id: "a1", name: "Nifty 50 Index Fund", type: "equity" },
        { id: "a2", name: "Liquid Fund / Savings", type: "debt" },
        { id: "a3", name: "Balanced Advantage Fund", type: "mixed" }
      ]
    }),
    correctAnswer: "g1:a1,g2:a2,g3:a3",
    explanation: "Long-term goals can withstand equity volatility; short-term funds must remain liquid.",
    orderIndex: 400
  }
];

async function seed() {
  console.log("Seeding Capstone Puzzles...");
  for (const p of CAPSTONE_PUZZLES) {
    await db.insert(puzzlesTable).values(p);
  }
  console.log("Successfully seeded 5 core scenarios.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
