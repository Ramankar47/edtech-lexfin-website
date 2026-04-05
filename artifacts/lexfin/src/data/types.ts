export interface ContentBlock {
  type: "heading" | "para" | "tip" | "list";
  text: string;
}

export interface Unit {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface Quiz {
  title: string;
  xp: number;
  questions: QuizQuestion[];
}

export interface Puzzle {
  title: string;
  xp: number;
  scenario: string;
  question: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface Topic {
  head: string;
  items: string[];
}

export interface ModuleData {
  id: number;
  emoji: string;
  unit: string;
  name: string;
  sub: string;
  hrs: string;
  sections: number;
  topics: Topic[];
  unlockMsg: string;
  
  // Learning Content
  unitsData: Unit[];
  quizzesData: Quiz[];
  puzzleData: Puzzle;
  
  // Game Module support
  isGame?: boolean;
}

export interface Course {
  id: string; // e.g. "1" or "2"
  title: string;
  subtitle: string;
  description: string;
  duration: string;         // e.g. "6 Weeks"
  learningHours: string;    // e.g. "30 hrs"
  certificateStr: string;   // e.g. "SGT × LexFin"
  
  modules: ModuleData[];
  brochureUrl?: string;
}
