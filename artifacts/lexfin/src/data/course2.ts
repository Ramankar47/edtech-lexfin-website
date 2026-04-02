import { Course } from "./types";

export const course2: Course = {
  id: "2",
  title: "Household Economics",
  subtitle: "Understanding Earnings, Needs, Savings, and Financial Equilibrium",
  description: "A foundational course examining how individuals and households earn, spend, and build economic resilience.",
  duration: "14 Modules",
  learningHours: "15 hrs",
  certificateStr: "Beginner Certificate",
  modules: [
    {
      id: 1, emoji: "💵", unit: "Module 1", name: "Earnings", sub: "Introduction, Sources, and Flow of Income", hrs: "~1 hr", sections: 4,
      topics: [
        { head: "Core Concepts", items: ["Introduction to Earnings", "Sources of Earnings (Salary, Business, Rent, Interest)", "Types of Earnings (Active vs Passive, Fixed vs Variable)"] },
        { head: "Macro Perspective", items: ["Flow of Earnings in a Household (Circular Flow)", "Importance of Earnings for standard of living"] },
        { head: "Legal & Economic Factors", items: ["Legal and Economic Perspective (Factor Reward)", "Factors Affecting Earnings (Education, Experience, Demand)"] },
      ],
      unlockMsg: "",
      unitsData: [
        {
          id: "m1u1",
          title: "Introduction & Sources",
          content: [
            { type: "heading", text: "Introduction to Earnings" },
            { type: "para", text: "Earnings form the backbone of household economics and represent the total income received by an individual or family over a specific period of time. It is the primary source that enables individuals to meet daily needs, fulfill wants, save for the future, and invest for long-term security. Earnings can be defined as the monetary reward received in exchange for labor, services, or investment of capital." },
            { type: "para", text: "From a broader perspective, earnings also determine a person's standard of living, social status, and financial independence. Higher earnings generally allow better access to education, healthcare, and lifestyle opportunities." },
            { type: "heading", text: "Sources of Earnings" },
            { type: "para", text: "Earnings can be derived from multiple sources depending on the individual's occupation, skills, and financial assets." },
            { type: "list", text: "Salary/Wages: Income from employment|Business Profits: Earnings from business activities|Rent: Income from property|Interest: Earnings from savings/investments|Dividends: Profit from shares" },
            { type: "tip", text: "Each source has different levels of stability and risk. For example, salary is usually fixed and stable, whereas business income may fluctuate." }
          ]
        },
        {
          id: "m1u2",
          title: "Types & Flow of Earnings",
          content: [
            { type: "heading", text: "Types of Earnings" },
            { type: "para", text: "Earnings can be classified based on their nature and regularity:" },
            { type: "list", text: "Active Income: Earned through active work (e.g. Salary)|Passive Income: Earned without active work (e.g. Rent)|Fixed Income: Regular and stable (e.g. Monthly salary)|Variable Income: Changes over time (e.g. Business profit)" },
            { type: "heading", text: "Flow of Earnings in a Household" },
            { type: "para", text: "Earnings flow into a household and are then distributed into expenses, savings, and investments. This circular flow dictates how households provide factors of production to businesses, and receive wages, rent, and profit in return, which they then spend on goods and services." }
          ]
        },
        {
          id: "m1u3",
          title: "Importance & Legal Perspective",
          content: [
            { type: "heading", text: "Importance of Earnings" },
            { type: "para", text: "Earnings play a crucial role in both individual and national economic development. At the household level, earnings determine purchasing power, savings capacity, and the ability to invest. At a larger scale, earnings contribute to economic growth." },
            { type: "heading", text: "Legal and Economic Perspective" },
            { type: "para", text: "From a legal standpoint, earnings are subject to taxation under income laws. Proper declaration of earnings is important to avoid legal penalties. Economically, earnings are considered a 'factor reward', meaning they are compensation for contributing labor, capital, or entrepreneurship to production." },
            { type: "heading", text: "Factors Affecting Earnings" },
            { type: "list", text: "Education and skills|Experience|Type of job|Market demand" }
          ]
        }
      ],
      quizzesData: [
        {
          title: "Earnings Quiz",
          xp: 200,
          questions: [
            { q: "Which of the following describes 'Passive Income'?", opts: ["Money earned through daily labor", "Income earned without active continuous work, like rent", "Only business profits", "Money borrowed from a bank"], ans: 1, exp: "Passive income is earned with minimal ongoing effort, such as rental yield or dividends." },
            { q: "What is deemed a 'factor reward' in economics?", opts: ["Penalty for late taxes", "Compensation for contributing labor, capital, or entrepreneurship", "Free government subsidies", "Only active salary"], ans: 1, exp: "Earnings represent the reward for supplying factors of production to the economy." }
          ]
        }
      ],
      puzzleData: {
        title: "Income Categorization",
        xp: 100,
        scenario: "Rohan works as an IT manager earning a fixed monthly salary. He also owns a second apartment which he rents out, and he occasionally does freelance consulting on weekends.",
        question: "How would you classify his income sources?",
        opts: [
          "They are all Variable Active Income",
          "Salary and Freelance are Active Income; Rent is Passive Income",
          "All are Passive Income because IT is desk work",
          "Rent is Active Income, while Salary is Passive"
        ],
        ans: 1,
        exp: "Salary (job) and Freelance (consulting) require active ongoing labor. Rent is passive as it doesn't require daily active work."
      }
    },
    {
      id: 2, emoji: "📊", unit: "Module 2", name: "Nature of Earnings", sub: "Understanding wage dynamics", hrs: "~1 hr", sections: 2,
      topics: [
        { head: "Wage Dynamics", items: ["Factors influencing wages", "Minimum wage laws"] }
      ], 
      unlockMsg: "Complete Module 1 to unlock this module.", 
      unitsData: [
        {
          id: "m2u1",
          title: "Understanding Wage Dynamics",
          content: [
            { type: "heading", text: "What drives wages?" },
            { type: "para", text: "Wages are determined by the intersection of supply and demand for labor, along with legislative factors such as minimum wage laws." }
          ]
        },
        {
          id: "m2u2",
          title: "Minimum Wages",
          content: [
            { type: "heading", text: "Legal Floors" },
            { type: "para", text: "Governments establish minimum wages to prevent exploitation. While this protects workers on the lower end, critics argue it can occasionally limit total employment by artificially setting prices." }
          ]
        }
      ], 
      quizzesData: [
        {
          title: "Wages Quiz",
          xp: 200,
          questions: [
            { q: "What primarily determines wages in a free market?", opts: ["Government decrees", "Supply and demand for labor", "Stock market performance", "Interest rates"], ans: 1, exp: "The intersection of labor supply and demand essentially dictates market wages." }
          ]
        }
      ], 
      puzzleData: { title: "Wage Negotiation Scenario", xp: 100, scenario: "You are applying for a job where the market rate is ₹50,000/month, but the employer offers ₹40,000.", question: "What is your best response?", opts: ["Accept without questions", "Discuss the market rate and highlight your skills", "Reject the offer immediately", "Ask for ₹1,00,000"], ans: 1, exp: "Negotiation should be rooted in understanding market supply, demand, and your added value." }
    },
    {
      id: 3, emoji: "🛒", unit: "Module 3", name: "Needs and Wants", sub: "Basic financial priorities", hrs: "~1 hr", sections: 2,
      topics: [
        { head: "Prioritization", items: ["Categorizing needs vs wants", "Impact on budget"] }
      ], 
      unlockMsg: "Complete Module 2 to unlock this module.", 
      unitsData: [
        {
          id: "m3u1",
          title: "Categorizing Expenses",
          content: [
            { type: "heading", text: "Needs vs Wants" },
            { type: "para", text: "A need is essential for survival (e.g., food, shelter), whereas a want is something you desire but can live without. Misclassifying these is a primary cause of budget failure." }
          ]
        },
        {
          id: "m3u2",
          title: "Budget Impact",
          content: [
            { type: "heading", text: "The Psychology of Wanting" },
            { type: "para", text: "Marketing easily convinces consumers that wants are needs. Setting a strict percentage of income for 'wants' ensures they do not cannibalize your savings or needs." }
          ]
        }
      ], 
      quizzesData: [
         {
          title: "Priorities Quiz",
          xp: 200,
          questions: [
            { q: "Which of the following is considered a 'Need'?", opts: ["A designer handbag", "A vacation abroad", "Basic groceries and healthcare", "A brand new smartphone"], ans: 2, exp: "Groceries and healthcare are essential for survival and well-being." }
          ]
        }
      ], 
      puzzleData: { title: "The impulse buy", xp: 100, scenario: "You have ₹2,000 left for the week. You need groceries for ₹1,500, but a jacket you wanted is on sale for ₹1,800.", question: "What should you do?", opts: ["Buy the jacket, skip meals", "Buy groceries, skip the jacket", "Borrow money for both", "Buy the jacket and eat out"], ans: 1, exp: "Prioritizing needs (food) over wants (jacket) ensures financial stability." }
    },
    {
      id: 4, emoji: "💸", unit: "Module 4", name: "List Your Expenses", sub: "Tracking outflows", hrs: "~1 hr", sections: 2,
      topics: [
        { head: "Expense Tracking", items: ["Methods of tracking", "Fixed vs variable expenses"] }
      ], 
      unlockMsg: "Complete Module 3 to unlock this module.", 
      unitsData: [
        {
          id: "m4u1",
          title: "Tracking Methods",
          content: [
            { type: "heading", text: "The Importance of Listing Expenses" },
            { type: "para", text: "Listing every expense makes financial leaks visible. Fixed expenses (rent, insurance) are static, while variable expenses (dining out, entertainment) fluctuate and offer the most room for savings." }
          ]
        },
        {
          id: "m4u2",
          title: "Apps vs Spreadsheets",
          content: [
            { type: "heading", text: "Choosing a Method" },
            { type: "para", text: "Whether you use a specialized financial tracking app linked to your bank or a manual spreadsheet, the key is consistency. Both will drastically improve your awareness of outflows." }
          ]
        }
      ], 
      quizzesData: [
        {
          title: "Expense Tracking Quiz",
          xp: 200,
          questions: [
            { q: "Which represents a fixed expense?", opts: ["Movie tickets", "Monthly rent", "Groceries", "Dining out"], ans: 1, exp: "Rent is a consistent, contracted monthly outflow." }
          ]
        }
      ], 
      puzzleData: { title: "Finding the leak", xp: 100, scenario: "Your income is ₹40,000 but your bank balance is zero at the end of the month despite your fixed bills only being ₹20,000.", question: "What is your best immediate action?", opts: ["Request a loan", "Track every variable expense for the next 30 days", "Ignore it until next year", "Quit your job"], ans: 1, exp: "Tracking uncovers where the remaining funds are leaking." }
    },
    {
      id: 5, emoji: "🏦", unit: "Module 5", name: "Find Simple Ways to Save", sub: "Developing thrift", hrs: "~1 hr", sections: 2,
      topics: [
        { head: "Savings Strategies", items: ["The 50/30/20 rule", "Automating savings"] }
      ], 
      unlockMsg: "Complete Module 4 to unlock this module.", 
      unitsData: [
        {
          id: "m5u1",
          title: "Automating Savings",
          content: [
            { type: "heading", text: "Pay Yourself First" },
            { type: "para", text: "The most effective savings strategy is to automate a transfer to your savings account the moment you get paid, before you have the chance to spend." }
          ]
        },
        {
          id: "m5u2",
          title: "High-Yield Options",
          content: [
            { type: "heading", text: "Beating Inflation" },
            { type: "para", text: "Merely hoarding cash under the mattress loses value to inflation. To truly save, cash should be routed into high-yield savings accounts, fixed deposits, or safe mutual funds." }
          ]
        }
      ], 
      quizzesData: [
        {
          title: "Savings Quiz",
          xp: 200,
          questions: [
            { q: "What does 'Pay Yourself First' mean?", opts: ["Spend all your money on yourself", "Save a portion of your income immediately before spending", "Buy luxury items first", "Pay off all debts before saving"], ans: 1, exp: "It means prioritizing savings as a primary outflow." }
          ]
        }
      ], 
      puzzleData: { title: "The 50/30/20 Rule", xp: 100, scenario: "You want to organize your ₹50,000 monthly take-home using the 50/30/20 rule.", question: "How much should be dedicated to Savings/Investing?", opts: ["₹25,000", "₹15,000", "₹10,000", "₹5,000"], ans: 2, exp: "20% of 50,000 is 10,000." }
    },
  ]
};
