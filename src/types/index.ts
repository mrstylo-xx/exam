// src/types/index.ts

export interface Question {
  id?: string;
  q: string;             // প্রশ্ন (LaTeX সহ)
  options: string[];     // ৪টি অপশন
  answer: string;        // সঠিক উত্তর (যেমন: "Option A")
  explanation?: string;  // ব্যাখ্যা
  image?: string;        // যদি ছবি থাকে
  topic?: string;        // বিষয় (যেমন: Math, GK)
}

export interface MarkingScheme {
  correct: number;       // সঠিক উত্তরের নম্বর (যেমন: 1)
  wrong: number;         // ভুল উত্তরের নম্বর (যেমন: 0.25)
}

export interface Exam {
  id: string;
  title: string;
  duration: number;      // মিনিট
  totalMarks: number;
  passMark: number;
  questions: Question[];
  marking: MarkingScheme;
  createdBy: string;
  category: string;
}

export interface ExamResult {
  id?: string;
  examId: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  date: any; // Firebase Timestamp
}
