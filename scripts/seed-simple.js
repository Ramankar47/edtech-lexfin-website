const pg = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/finance_quest";
const pool = new pg.Pool({ connectionString: DATABASE_URL });

const puzzles = [
  {
    title: "The Mid-Month Crunch (Easy)",
    description: "Manage a basic ₹10,000 budget with pending rent and groceries.",
    difficulty: "easy",
    puzzle_type: "capstone_budget",
    xp_reward: 500,
    content: JSON.stringify({
      initialBudget: 10000,
      targets: { insurance: 1000, necessities: 6000, debt: 2000, investments: 1000 },
      risks: ["Small late fee if debt missed"]
    }),
    correct_answer: "accuracy_based",
    explanation: "Prioritize necessities first, then debt to avoid interest.",
    order_index: 100
  },
  {
    title: "Legacy for Two (Medium)",
    description: "Distribute ₹100,000 between your spouse and child under standard legal guidelines.",
    difficulty: "medium",
    puzzle_type: "capstone_will",
    xp_reward: 500,
    content: JSON.stringify({
      totalSum: 100000,
      heirs: [
        { id: "h1", name: "Spouse", relationship: "Wife", minPercent: 33 },
        { id: "h2", name: "Child A", relationship: "Daughter", minPercent: 20 }
      ],
      instructions: "Ensure both have a sustainable future share."
    }),
    correct_answer: "order_based",
    explanation: "Legal heirs have primary rights.",
    order_index: 200
  },
  {
    title: "Interest Avalanche (Hard)",
    description: "Order 4 debts to minimize interest paid over time.",
    difficulty: "hard",
    puzzle_type: "capstone_debt",
    xp_reward: 500,
    content: JSON.stringify({
      debts: [
        { id: "d1", name: "Credit Card", rate: 42, balance: 15000 },
        { id: "d2", name: "Personal Loan", rate: 14, balance: 50000 },
        { id: "d3", name: "Education Loan", rate: 8, balance: 120000 },
        { id: "d4", name: "Payday Loan", rate: 60, balance: 5000 }
      ]
    }),
    correct_answer: "d4,d1,d2,d3",
    explanation: "Highest rate first.",
    order_index: 300
  },
  {
    title: "The Life Goal Matcher (Medium)",
    description: "Match goals (Retirement, Emergency) to asset classes.",
    difficulty: "medium",
    puzzle_type: "capstone_invest",
    xp_reward: 500,
    content: JSON.stringify({
      goals: [
        { id: "g1", name: "Retirement (25 yrs)", risk: "high", horizon: "long" },
        { id: "g2", name: "Emergency Fund", risk: "low", horizon: "short" }
      ],
      assets: [
        { id: "a1", name: "Equity Index Fund", type: "equity" },
        { id: "a2", name: "Savings Bank Account", type: "debt" }
      ]
    }),
    correct_answer: "g1:a1,g2:a2",
    explanation: "Long-term -> Equity.",
    order_index: 400
  }
];

async function run() {
  console.log("Connecting to DB...");
  const client = await pool.connect();
  try {
    for (const p of puzzles) {
      console.log(`Seeding: ${p.title}`);
      await client.query(
        `INSERT INTO puzzles (title, description, difficulty, puzzle_type, xp_reward, content, correct_answer, explanation, order_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [p.title, p.description, p.difficulty, p.puzzle_type, p.xp_reward, p.content, p.correct_answer, p.explanation, p.order_index]
      );
    }
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

run();
