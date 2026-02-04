// src/store/useExamStore.ts

import { create } from 'zustand';
import { Question, MarkingScheme } from '@/types';

interface ExamState {
  // State Variables
  questions: Question[];
  currentIdx: number;
  userAnswers: (string | null)[];  // ইউজারের দেওয়া উত্তর (A, B, C, D)
  reviewStatus: boolean[];          // রিভিউ মার্ক করা আছে কিনা
  timeLeft: number;                 // সেকেন্ডে সময়
  isRunning: boolean;
  marking: MarkingScheme;

  // Actions (Functions)
  startExam: (data: Question[], duration: number, marking: MarkingScheme) => void;
  setAnswer: (option: string) => void;
  toggleReview: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (idx: number) => void;
  tickTimer: () => void;
  submitExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  questions: [],
  currentIdx: 0,
  userAnswers: [],
  reviewStatus: [],
  timeLeft: 0,
  isRunning: false,
  marking: { correct: 1, wrong: 0.25 },

  startExam: (data, duration, marking) => set({
    questions: data,
    currentIdx: 0,
    userAnswers: new Array(data.length).fill(null),
    reviewStatus: new Array(data.length).fill(false),
    timeLeft: duration * 60, // মিনিটে ইনপুট আসবে, সেকেন্ডে কনভার্ট হবে
    isRunning: true,
    marking: marking
  }),

  setAnswer: (option) => {
    const { userAnswers, currentIdx } = get();
    const newAnswers = [...userAnswers];
    // যদি একই অপশনে ক্লিক করে তবে ডিসিলেক্ট হবে, নাহলে নতুন উত্তর
    newAnswers[currentIdx] = newAnswers[currentIdx] === option ? null : option;
    set({ userAnswers: newAnswers });
  },

  toggleReview: () => {
    const { reviewStatus, currentIdx } = get();
    const newReview = [...reviewStatus];
    newReview[currentIdx] = !newReview[currentIdx];
    set({ reviewStatus: newReview });
  },

  nextQuestion: () => set((state) => ({ 
    currentIdx: Math.min(state.currentIdx + 1, state.questions.length - 1) 
  })),

  prevQuestion: () => set((state) => ({ 
    currentIdx: Math.max(state.currentIdx - 1, 0) 
  })),

  jumpToQuestion: (idx) => set({ currentIdx: idx }),

  tickTimer: () => set((state) => {
    if (state.timeLeft <= 0) {
      return { isRunning: false, timeLeft: 0 };
    }
    return { timeLeft: state.timeLeft - 1 };
  }),

  submitExam: () => set({ isRunning: false })
}));
