import { Course } from "./types";

export const course1: Course = {
  id: "1",
  title: "Integrated Financial & Legal Literacy",
  subtitle: "From household economics to capital markets — a complete legal-financial curriculum built for modern India.",
  description: "Master Indian Financial Laws step by step — at your own pace, with lifetime access.",
  duration: "6 Weeks",
  learningHours: "30 hrs",
  certificateStr: "SGT × LexFin",
  modules: [
    {
      id: 1, emoji: "🏠", unit: "Module 1", name: "The Foundation", sub: "Household Economics & Legal Awareness", hrs: "~5 hrs", sections: 4,
      topics: [
        { head: "Advanced Economic Understanding", items: ["Types of income: earned, portfolio, and passive income", "Real vs nominal income — legal implications in taxation", "Inflation indexing in taxation and government securities"] },
        { head: "Legal Deepening", items: ["Heads of income under the Income Tax Act, 1961", "Residential status and global income taxation", "Legal compliance for first-time taxpayers (PAN, AIS/TIS)"] },
        { head: "Financial Inclusion & Law", items: ["Banking access under PMJDY; KYC/AML norms under RBI", "Legal safeguards for small depositors and zero-balance accounts"] },
        { head: "Practical Component", items: ["Case study: Misclassification of income leading to tax penalties", "Activity: Identify taxable vs exempt income scenarios"] },
      ],
      unlockMsg: "",
      unitsData: [
        {
          id: "u1",
          title: "Advanced Economic Understanding",
          content: [
            { type: "heading", text: "Types of Income" },
            { type: "para", text: "Income can be classified into three broad categories: Earned income is money received in exchange for work — salaries, wages, freelance fees. Portfolio income comes from investments — dividends, interest, capital gains. Passive income is generated with minimal active effort — rental income, royalties, or profits from a limited partnership." },
            { type: "tip", text: "Under the Income Tax Act, 1961, all three types of income are taxable, but the rates and deductions vary significantly depending on the head of income." },
            { type: "heading", text: "Real vs Nominal Income" },
            { type: "para", text: "Nominal income is the raw number on your pay slip. Real income adjusts that figure for inflation — it reflects your actual purchasing power. For example, if your salary grew by 5% but inflation was 7%, your real income fell by 2%. This distinction matters legally in wage structures and government securities." },
            { type: "heading", text: "Inflation Indexing in Taxation" },
            { type: "para", text: "The government issues a Cost Inflation Index (CII) every year. When you sell a long-term capital asset (like property or gold), you apply the CII to its purchase price to calculate the indexed cost — reducing your taxable capital gain. This indexation benefit is a significant legal protection for investors." },
            { type: "list", text: "CII is notified by CBDT every year|Long-term capital assets qualify after 24 months (immovable property) or 12–36 months (other assets)|Section 48 of the IT Act governs this calculation" },
          ],
        },
        {
          id: "u2",
          title: "Legal Deepening",
          content: [
            { type: "heading", text: "Heads of Income under the IT Act, 1961" },
            { type: "para", text: "The Income Tax Act organises income into five heads for computation purposes: (1) Salaries, (2) Income from House Property, (3) Profits & Gains from Business or Profession, (4) Capital Gains, and (5) Income from Other Sources. Each head has its own deductions, exemptions, and tax rates." },
            { type: "tip", text: "Misclassifying income between heads is one of the most common errors that leads to tax notices and penalties. Always match the nature of income to the correct head." },
            { type: "heading", text: "Residential Status and Global Income" },
            { type: "para", text: "Under Indian tax law, your residential status determines how much of your income is taxable. A Resident and Ordinarily Resident (ROR) pays tax on global income — money earned in India AND abroad. A Non-Resident (NR) pays tax only on income earned or received in India. The status is determined by how many days you spent in India in a given financial year." },
            { type: "heading", text: "Legal Compliance for First-Time Taxpayers" },
            { type: "para", text: "When you earn your first salary, the law requires several immediate steps: Link your PAN (Permanent Account Number) with Aadhaar. Review your Annual Information Statement (AIS) and Tax Information Summary (TIS) on the Income Tax portal. File your ITR (Income Tax Return) if your total income exceeds the basic exemption limit — ₹3 lakh under the new tax regime." },
            { type: "list", text: "PAN–Aadhaar linking is mandatory since July 2023|AIS shows all financial transactions reported by third parties|Non-filing or late filing attracts penalties under Section 234F" },
          ],
        },
        {
          id: "u3",
          title: "Financial Inclusion & Law",
          content: [
            { type: "heading", text: "Banking Access under PMJDY" },
            { type: "para", text: "The Pradhan Mantri Jan Dhan Yojana (PMJDY), launched in 2014, is India's flagship financial inclusion initiative. It enables every Indian to open a zero-balance bank account with a RuPay debit card, ₹2 lakh accidental insurance, ₹30,000 life insurance, and access to DBT (Direct Benefit Transfer) subsidies." },
            { type: "tip", text: "As of 2024, over 53 crore Jan Dhan accounts have been opened. This scheme is the legal backbone of India's push to bring the unbanked population into the formal financial system." },
            { type: "heading", text: "KYC/AML Norms under the RBI" },
            { type: "para", text: "Know Your Customer (KYC) is a legal process mandated by the RBI under the Prevention of Money Laundering Act (PMLA), 2002. Banks must verify every customer's identity (Aadhaar/PAN/Passport) and address before opening an account. Anti-Money Laundering (AML) norms require banks to report suspicious transactions to the Financial Intelligence Unit (FIU-IND)." },
            { type: "heading", text: "Legal Safeguards for Small Depositors" },
            { type: "para", text: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) — a fully owned subsidiary of the RBI — insures bank deposits. Every depositor's savings are protected up to ₹5 lakh (principal + interest) per bank. Even if a bank fails, you are guaranteed this amount under the DICGC Act, 1961." },
            { type: "list", text: "₹5 lakh DICGC insurance per depositor per bank|Covers all deposit types: savings, FD, RD, current|Zero-balance accounts under PMJDY also get this protection" },
          ],
        },
      ],
      quizzesData: [
        {
          title: "Unit 1 — Quiz",
          xp: 200,
          questions: [
            { q: "If your salary grew by 4% but inflation was 6%, which of the following is TRUE?", opts: ["Your nominal income fell", "Your real income increased", "Your real income fell by 2%", "Your tax liability will decrease"], ans: 2, exp: "Real income = nominal income growth minus inflation. 4% − 6% = −2%, so your real purchasing power actually declined." },
            { q: "A Resident and Ordinarily Resident (ROR) in India is taxed on:", opts: ["Only income earned in India", "Only income received in India", "Global income — both India and abroad", "Only salary income"], ans: 2, exp: "An ROR is taxed on global income under Indian law — this includes all income earned or received anywhere in the world." },
            { q: "Under DICGC, how much deposit is insured per depositor per bank?", opts: ["₹1 lakh", "₹2 lakh", "₹5 lakh", "₹10 lakh"], ans: 2, exp: "The DICGC insures deposits up to ₹5 lakh (principal + interest) per depositor per bank as of 2021." },
            { q: "Priya is an NRI working in Dubai. She receives rent from a flat in Mumbai and earns a salary in Dubai. Which income is taxable in India?", opts: ["Both salary and rent", "Only the Dubai salary", "Only the Mumbai rent", "Neither, as she is an NRI"], ans: 2, exp: "An NRI is taxed in India only on income earned or received in India. Mumbai rent qualifies; Dubai salary does not." },
          ]
        }
      ],
      puzzleData: {
        title: "Scenario Puzzle",
        xp: 100,
        scenario: "Ananya recently started her first job at a Mumbai firm, earning ₹6.5 lakh/year. She has a savings account in a small cooperative bank and holds ₹4.8 lakh in FDs there. Her father, who lives in London, transfers ₹2 lakh/month to her Indian account as rent from a property he owns in Pune. Ananya hasn't filed her ITR yet, and her PAN is still not linked to Aadhaar.",
        question: "Which of the following BEST describes Ananya's immediate legal obligations and financial risk?",
        opts: [
          "She only needs to file ITR; her deposits are fully insured and PAN linking is optional.",
          "She must link PAN–Aadhaar immediately, file ITR reporting both her salary AND the rent income, and note that her FD is insured.",
          "She should only report her salary; foreign transfers are exempt from Indian taxation.",
          "She has no tax obligations since she is below the age of 30.",
        ],
        ans: 1,
        exp: "Ananya has three key obligations: (1) PAN–Aadhaar linking is mandatory. (2) The rent received in India is taxable regardless of who pays it. (3) Her FD is within DICGC limit.",
      }
    },
    {
      id: 2, emoji: "💰", unit: "Module 2", name: "Managing Your Finances", sub: "Personal Finance & Compliance Skills", hrs: "~5 hrs", sections: 5,
      topics: [
        { head: "Advanced Budgeting & Cash Flow", items: ["Cash flow statements for individuals", "Behavioral finance biases affecting spending", "Digital financial tools and UPI ecosystem compliance"] },
        { head: "Debt & Legal Obligations", items: ["Loan documentation: sanction letters, amortization schedules", "Legal consequences of default (SARFAESI Act overview)", "Credit score (CIBIL) and legal implications of poor credit history"] },
        { head: "Regulatory Compliance", items: ["RBI guidelines on digital lending and recovery agents", "Fair Practices Code and grievance redressal"] },
        { head: "Dispute Resolution", items: ["Filing complaints against banks/NBFCs through Ombudsman Scheme", "Legal recourse in harassment by recovery agents"] },
      ],
      unlockMsg: "Complete Module 1 to unlock this module.",
      unitsData: [
        {
          id: "m2u1",
          title: "Debt & Legal Obligations",
          content: [
            { type: "heading", text: "The Lifecyle of Debt" },
            { type: "para", text: "Debt carries strict legal and financial obligations. When you sign a loan document, you enter a legally binding contract governed by the Indian Contract Act. This means you are legally bound to honor the terms of the repayment schedule. Missing an EMI is not just a financial misstep; it is a breach of contract." },
            { type: "heading", text: "Consequences of Default" },
            { type: "para", text: "If you fail to repay, the lender has multiple options. Under the SARFAESI Act (Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act), banks can auction your secured asset (like a home or commercial property) to recover the debt, even without court intervention in certain cases. They only have to give a 60-day notice." },
            { type: "tip", text: "Always read the sanction letter thoroughly. Hidden clauses regarding floating interest rates or prepayment penalties can drastically alter your total liability." },
            { type: "list", text: "Credit profiles track your repayment history across all institutions|CIBIL is India's most prominent credit bureau|Defaulting impacts borrowing capacity drastically for 7 years" }
          ]
        },
        {
          id: "m2u2",
          title: "Advanced Budgeting & UPI",
          content: [
            { type: "heading", text: "Cash Flow Statements" },
            { type: "para", text: "Just like companies, individuals should create a robust cash flow statement capturing all income against all fixed and variable expenses. This shifts you from living paycheck-to-paycheck to actively directing your wealth." },
            { type: "tip", text: "Analyze your spending to reduce discretionary costs by 15%, routing the difference to tax-advantaged accounts." },
            { type: "heading", text: "Digital Financial Tools and UPI" },
            { type: "para", text: "India's UPI ecosystem has revolutionized daily spending. However, the convenience comes with new risks. It's critical to track micro-transactions, as they quickly add up. From a compliance perspective, UPI transactions also leave a digital trail that tax authorities monitor through the AIS (Annual Information Statement)." }
          ]
        },
        {
          id: "m2u3",
          title: "Regulatory Compliance & Disputes",
          content: [
            { type: "heading", text: "Fair Practices Code" },
            { type: "para", text: "The RBI mandates a Fair Practices Code indicating that regulated lenders must be transparent with interest rates and cannot use coercive recovery techniques. Harassment by recovery agents is strictly illegal." },
            { type: "para", text: "If a bank violates this, you can escalate the matter using the Integrated Ombudsman Scheme by the RBI, which provides a free, fast-track digital resolution process." }
          ]
        }
      ],
      quizzesData: [
        {
          title: "Unit 2 — Quiz",
          xp: 200,
          questions: [
            { q: "Under the SARFAESI Act, banks primarily have the power to:", opts: ["Waive off loans completely", "Take possession of secured assets without court intervention", "Arrest the borrower without warrant", "Force the borrower to work for the bank"], ans: 1, exp: "SARFAESI empowers banks to take possession of secured assets upon default." },
            { q: "A low CIBIL score indicates:", opts: ["A healthy credit profile", "High risk of default", "High income", "Zero tax liability"], ans: 1, exp: "Low CIBIL scores indicate a poor repayment history and higher risk." },
            { q: "What is the primary function of the RBI Integrated Ombudsman Scheme?", opts: ["Provide cheap home loans", "Handle grievances against regulated financial entities", "Arrest defaulting borrowers", "Calculate individual income tax"], ans: 1, exp: "The Ombudsman Scheme resolves customer grievances against banks and NBFCs, free of cost." },
            { q: "What does the Annual Information Statement (AIS) track?", opts: ["Only physical cash deposits", "Digital transactions and taxable financial activities", "Your daily calorie intake", "Only real estate purchases"], ans: 1, exp: "The AIS captures a comprehensive view of your digital and financial transactions monitored by tax authorities." }
          ]
        }
      ],
      puzzleData: {
        title: "Loan Default Scenario",
        xp: 100,
        scenario: "Rahul took a home loan and lost his job, missing 6 months of EMIs. The bank sent a notice to auction his flat.",
        question: "Can the bank auction a residential flat legally without a court order?",
        opts: [
          "No, all auctions require a High Court order.",
          "Yes, under the SARFAESI Act, they can auction secured assets after due notice.",
          "Yes, but only if Rahul voluntarily hands over the keys.",
          "No, they can only lower his credit score."
        ],
        ans: 1,
        exp: "The SARFAESI Act empowers lenders to enforce security interests without court intervention, provided statutory notices are served."
      }
    },
    {
      id: 3, emoji: "🎯", unit: "Module 3", name: "Financial Planning", sub: "Goal Setting & Tax Efficiency", hrs: "~5 hrs", sections: 4,
      topics: [
        { head: "Advanced Planning Tools", items: ["Life-cycle financial planning: education, marriage, retirement", "Inflation-adjusted goal setting and asset allocation strategies"] },
        { head: "Tax Planning (In-depth)", items: ["Deductions: 80C, 80D, 80CCD (NPS), HRA, LTA", "Capital gains planning and tax harvesting", "Advance tax and TDS compliance"] },
        { head: "Wealth Transfer & Estate Planning", items: ["Drafting of Wills and Codicils", "Nomination vs legal heir — a critical distinction", "Trusts and their legal structure"] },
      ],
      unlockMsg: "Complete Module 2 to unlock this module.",
      unitsData: [
        {
          id: "m3u1",
          title: "Tax Planning & Deductions",
          content: [
            { type: "heading", text: "Section 80C and Beyond" },
            { type: "para", text: "Section 80C is the most popular tax-saving tool, allowing a deduction of up to ₹1.5 lakh. However, a 'LexFin' level strategy looks beyond 80C. Section 80D for health insurance premiums offers additional deductions of up to ₹25,000 for self/family and another ₹50,000 for senior citizen parents." },
            { type: "tip", text: "Don't forget Section 80CCD(1B) — an additional ₹50,000 deduction is available for investments in the National Pension System (NPS), over and above the 80C limit." },
            { type: "heading", text: "Advance Tax Compliance" },
            { type: "para", text: "If your estimated tax liability after TDS is ₹10,000 or more, the law requires you to pay 'Advance Tax' in four installments (June, Sept, Dec, March). Delaying these leads to mandatory interest penalties under Sections 234B and 234C." }
          ]
        },
        {
          id: "m3u2",
          title: "Wealth Transfer & Estate Law",
          content: [
            { type: "heading", text: "Wills and Codicils" },
            { type: "para", text: "A Will is a legal declaration of a person's intention regarding their property, which they desire to take effect after their death. A Codicil is a document that amends, rather than replaces, a previously executed Will. In India, Wills do not strictly require stamp paper or registration, though registration is highly recommended to prevent future legal disputes." },
            { type: "heading", text: "Nomination vs legal heir" },
            { type: "para", text: "A common legal myth is that a nominee becomes the owner of the asset. Legally, a nominee is merely a 'trustee' who holds the asset until the legal heirs (as per a Will or succession laws) are determined. Without a Will, even if you have a nominee, your assets might be split according to personal laws (Hindu Succession Act, etc.), which may not be your preference." }
          ]
        },
        {
          id: "m3u3",
          title: "Asset Allocation Strategies",
          content: [
            { type: "heading", text: "Inflation-Adjusted Goals" },
            { type: "para", text: "Planning for a goal 20 years away requires accounting for inflation. A ₹1 crore goal today might require ₹3.2 crore in 20 years at 6% inflation. Your asset allocation between equity (growth) and debt (stability) must shift as you approach the goal (Glide Path strategy)." }
          ]
        }
      ],
      quizzesData: [
        {
          title: "Tax Efficiency Quiz",
          xp: 200,
          questions: [
            { q: "What is the maximum limit for Section 80C deduction?", opts: ["₹50,000", "₹1,00,000", "₹1,50,000", "₹2,00,000"], ans: 2, exp: "The maximum limit is ₹1,50,000." },
            { q: "Advance tax is required if your total estimated tax liability exceeds:", opts: ["₹5,000", "₹10,000", "₹20,000", "₹50,000"], ans: 1, exp: "Advance Tax applicability threshold is ₹10,000." },
            { q: "Legally, what is the role of a 'Nominee' in a bank account?", opts: ["They become the absolute owner of the money", "They are a trustee who holds money for legal heirs", "They are responsible for paying the deceased's debts", "They must split the money with the bank"], ans: 1, exp: "A nominee is a caretaker/trustee; ownership is determined by the Will or succession laws." },
            { q: "Which section allows an additional ₹50,000 deduction for NPS?", opts: ["80C", "80D", "80CCD(1B)", "80TTA"], ans: 2, exp: "Section 80CCD(1B) provides an exclusive deduction of ₹50,000 for NPS investments." }
          ]
        }
      ],
      puzzleData: {
        title: "Tax Scenario",
        xp: 100,
        scenario: "Neha's gross income is ₹9 lakh. She invested ₹1.5L in ELSS and paid ₹50k for medical insurance.",
        question: "What is her taxable income after 80C and 80D deductions?",
        opts: ["₹7,00,000", "₹7,50,000", "₹8,00,000", "₹9,00,000"],
        ans: 0,
        exp: "Gross ₹9L - ₹1.5L (80C) - ₹50k (80D) = ₹7L."
      }
    },
    {
      id: 4, emoji: "🛡️", unit: "Module 4", name: "Risk & Reward", sub: "Insurance, Liability & Legal Safeguards", hrs: "~5 hrs", sections: 3,
      topics: [
        { head: "Advanced Insurance Literacy", items: ["ULIPs vs Term Insurance — legal and financial comparison", "Health insurance clauses: co-pay, waiting period, exclusions", "Motor insurance and third-party liability laws"] },
        { head: "Regulatory & Legal Framework", items: ["Role and powers of IRDAI; Insurance Act, 1938 overview", "IRDAI grievance redressal system"] },
      ],
      unlockMsg: "Complete Module 3 to unlock this module.",
      unitsData: [
        {
          id: "m4u1",
          title: "Insurance Literacy & Claims",
          content: [
            { type: "heading", text: "Health Insurance Mandates" },
            { type: "para", text: "Health insurance covers sudden hospitalisation. Important clauses include 'Co-pay' (where you pay a percentage of the bill) and 'Waiting Periods' for pre-existing diseases (usually 2-4 years). Understanding these is legally vital before signing the policy document." },
            { type: "heading", text: "The Role of IRDAI" },
            { type: "para", text: "The Insurance Regulatory and Development Authority of India (IRDAI) ensures fair treatment of policyholders. They mandate that insurers cannot reject claims on technical grounds if the policy has been active for more than 8 continuous years (Moratorium Period)." }
          ]
        },
        {
          id: "m4u2",
          title: "Liability & Term Insurance",
          content: [
            { type: "heading", text: "Term vs Whole Life" },
            { type: "para", text: "Term insurance strictly covers risk over a set timeline with zero returns on survival, offering high cover at very low premiums. It is the most cost-effective way to protect dependents. Other products like ULIPs mix insurance and investment, often resulting in lower coverage and higher fees." },
            { type: "tip", text: "A thumb rule for term insurance is to have a sum assured of at least 10–15 times your annual income." }
          ]
        },
        {
          id: "m4u3",
          title: "Motor & Liability Laws",
          content: [
            { type: "heading", text: "Third-Party Liability" },
            { type: "para", text: "Under the Motor Vehicles Act, 1988, third-party insurance is a legal mandate. It covers the legal liability for death, bodily injury, or property damage to a third party. Driving without it is a punishable offense." }
          ]
        }
      ],
      quizzesData: [
        {
          title: "Insurance Quiz",
          xp: 200,
          questions: [
            { q: "Which regulatory body governs insurance in India?", opts: ["SEBI", "RBI", "IRDAI", "PFRDA"], ans: 2, exp: "IRDAI regulates the insurance sector in India." },
            { q: "What is the 'Moratorium Period' in health insurance?", opts: ["A period where you don't pay premiums", "A period after which claims cannot be contested by the insurer (except for fraud)", "The time you wait for a doctor", "The time taken to issue a policy"], ans: 1, exp: "After 8 years of continuous coverage, the insurer generally cannot contest claims on technical grounds." },
            { q: "Which insurance is legally mandatory for all vehicle owners in India?", opts: ["Comprehensive Insurance", "Zero Depreciation Cover", "Third-Party Liability Insurance", "Personal Accident Cover"], ans: 2, exp: "Third-party insurance is mandatory under the Motor Vehicles Act." },
            { q: "What is 'Co-pay' in a health insurance policy?", opts: ["A discount given by the hospital", "A fixed percentage of the claim amount the policyholder must pay", "Insurance for two people together", "The commission paid to the agent"], ans: 1, exp: "Co-pay is the portion of the medical bill that the insured person pays out of pocket." }
          ]
        }
      ],
      puzzleData: {
        title: "Claim Scenario",
        xp: 100,
        scenario: "Sumit had a health policy with a 2-year waiting period for pre-existing diseases. He claimed for diabetes treatment in the 1st year.",
        question: "Will his claim be approved?",
        opts: ["Yes, immediately", "No, due to the waiting period clause", "Yes, but only 50%", "Only if he files an FIR"],
        ans: 1,
        exp: "Waiting periods legally exempt insurers from honoring claims related to specific conditions until the period expires."
      }
    },
    {
      id: 5, emoji: "📈", unit: "Module 5", name: "The Financial Landscape", sub: "Markets, Regulation & Legal Rights", hrs: "~5 hrs", sections: 5,
      topics: [
        { head: "Advanced Market Understanding", items: ["Primary vs secondary markets; IPO process and legal disclosures", "Mutual fund regulations and NAV calculation"] },
        { head: "Regulatory Deep Dive", items: ["Functions and powers of RBI, SEBI, and IRDAI", "SEBI regulations on insider trading and market manipulation"] },
        { head: "Cyber Law & Digital Finance", items: ["Legal framework under Information Technology Act, 2000", "RBI guidelines on digital payments, UPI, wallets"] },
      ],
      unlockMsg: "Complete Module 4 to unlock this module.",
      unitsData: [
        {
          id: "m5u1",
          title: "Markets and Regulators",
          content: [
            { type: "heading", text: "The SEBI Mandate" },
            { type: "para", text: "The Securities and Exchange Board of India (SEBI) is the statutory body that regulates the Indian capital markets. Its primary functions are to protect the interests of investors and to promote the development of the securities market. SEBI has the power to investigate and penalize market manipulation and insider trading." },
            { type: "heading", text: "Primary vs Secondary Markets" },
            { type: "para", text: "The 'Primary Market' is where new securities (like IPOs) are issued for the first time. The 'Secondary Market' (Stock Exchange) is where already-issued securities are traded among investors. SEBI ensures that both operate with transparency and fair disclosure." }
          ]
        },
        {
          id: "m5u2",
          title: "Cyber Law & Digital Finance",
          content: [
            { type: "heading", text: "Information Technology Act, 2000" },
            { type: "para", text: "India's digital economy is governed by the IT Act, 2000. It provides legal recognition for electronic transactions, digital signatures, and electronic records. In financial disputes, digital records like email confirmations or bank SMS alerts carry significant evidentiary value in a court of law." },
            { type: "tip", text: "Under Section 66C and 66D, identity theft and cheating by personation using computer resources are strictly punishable crimes." }
          ]
        },
        {
          id: "m5u3",
          title: "RBI & Monetary Compliance",
          content: [
            { type: "heading", text: "The RBI as a Lender of Last Resort" },
            { type: "para", text: "The Reserve Bank of India (RBI) regulates the banking system and ensures monetary stability. It manages inflation through repo rates and ensures that banks maintain a Cash Reserve Ratio (CRR). For the average citizen, the RBI's most critical role is defining the guidelines for safe digital payments and grievance redressal." }
          ]
        }
      ],
      quizzesData: [
        {
          title: "SEBI & Law Quiz",
          xp: 200,
          questions: [
            { q: "Who regulates Capital Markets?", opts: ["RBI", "IRDAI", "SEBI", "CCI"], ans: 2, exp: "SEBI is the primary regulator for capital and securities markets." },
            { q: "What is the primary difference between Primary and Secondary markets?", opts: ["Primary market is for old shares", "Primary market is for new IPOs; Secondary is for subsequent trading", "Secondary market is only for government bonds", "There is no difference"], ans: 1, exp: "Primary market involves new issuances; secondary market involves trading existing securities." },
            { q: "Which law provides legal recognition to digital signatures in India?", opts: ["Indian Evidence Act", "Information Technology Act, 2000", "Companies Act, 2013", "RBI Act, 1934"], ans: 1, exp: "The IT Act, 2000 governs electronic records and digital signatures." },
            { q: "What is 'Insider Trading'?", opts: ["Trading shares while sitting inside an office", "Trading based on non-public, price-sensitive information", "Trading only in international stocks", "Trading only on weekends"], ans: 1, exp: "Insider trading occurs when someone uses non-public information to gain an unfair advantage in the stock market." }
          ]
        }
      ],
      puzzleData: {
        title: "Insider Trading",
        xp: 100,
        scenario: "Raj, a CFO, told his brother about an upcoming acquisition before it went public. His brother bought shares.",
        question: "Is this legal?",
        opts: ["Yes, sharing with family is permitted", "No, this constitutes illegal insider trading", "Yes, as long as it's below ₹1L", "Yes, if the brother didn't work there"],
        ans: 1,
        exp: "Trading based on Unpublished Price Sensitive Information (UPSI) is strictly prohibited by SEBI."
      }
    },
    {
      id: 6, emoji: "🏆", unit: "Module 6", name: "Capstone Project", sub: "The LexFin Budget Simulator", hrs: "~2 hrs", sections: 1,
      isGame: true,
      topics: [
        { head: "Interactive Simulation", items: ["Real-world budget allocation", "Emergency fund management", "Debt vs Investment tradeoffs"] },
      ],
      unlockMsg: "Complete all previous modules to access the Capstone Project.",
      unitsData: [],
      quizzesData: [],
      puzzleData: { title: "Budget Simulator", xp: 500, scenario: "", question: "", opts: [], ans: 0, exp: "" }
    }
  ]
};
