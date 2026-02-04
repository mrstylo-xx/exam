// src/components/exam/ResultView.tsx

'use client';
import { useExamStore } from '@/store/useExamStore';
import MathText from '@/components/MathText';
import { CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function ResultView() {
  const { questions, userAnswers, marking } = useExamStore();

  // ১. স্কোর ক্যালকুলেশন
  let correct = 0;
  let wrong = 0;
  
  questions.forEach((q, i) => {
    if (!userAnswers[i]) return; // উত্তর না দিলে স্কিপ
    if (userAnswers[i] === q.answer) correct++;
    else wrong++;
  });

  const score = (correct * marking.correct) - (wrong * marking.wrong);
  const totalMarks = questions.length * marking.correct;
  const percentage = ((score / totalMarks) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-3xl p-4 pb-20">
      
      {/* ১. স্কোর কার্ড */}
      <div className="mb-8 rounded-2xl bg-white p-8 text-center shadow-xl border border-indigo-50">
        <h2 className="text-2xl font-bold text-gray-800">Exam Result</h2>
        <div className="my-6 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-indigo-500 bg-indigo-50 shadow-inner">
            <div>
              <span className="block text-3xl font-bold text-indigo-700">{score}</span>
              <span className="text-xs text-gray-500">out of {totalMarks}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="rounded-lg bg-green-50 p-2 text-green-700">
            <span className="block font-bold text-lg">{correct}</span> Correct
          </div>
          <div className="rounded-lg bg-red-50 p-2 text-red-700">
            <span className="block font-bold text-lg">{wrong}</span> Wrong
          </div>
          <div className="rounded-lg bg-gray-50 p-2 text-gray-700">
            <span className="block font-bold text-lg">{questions.length - (correct + wrong)}</span> Skipped
          </div>
        </div>
      </div>

      {/* ২. প্রশ্ন বিশ্লেষণ (Answer Key) */}
      <h3 className="mb-4 text-xl font-bold text-gray-800 px-2">Detailed Analysis</h3>
      <div className="space-y-4">
        {questions.map((q, i) => {
          const userAnswer = userAnswers[i];
          const isCorrect = userAnswer === q.answer;
          const isSkipped = userAnswer === null;

          return (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="mb-2 flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800"><MathText content={q.q} /></h4>
                </div>
                {isSkipped ? (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-500">Skipped</span>
                ) : isCorrect ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </div>

              {/* অপশন এবং ব্যাখ্যা */}
              <div className="mt-3 ml-9 space-y-2 text-sm">
                <p className="text-gray-600">
                  Your Answer: <span className={clsx("font-bold", isCorrect ? "text-green-600" : "text-red-500")}>
                    <MathText content={userAnswer || "None"} />
                  </span>
                </p>
                <p className="text-green-700">
                  Correct Answer: <span className="font-bold"><MathText content={q.answer} /></span>
                </p>
                {q.explanation && (
                  <div className="mt-2 rounded bg-indigo-50 p-3 text-indigo-800 text-xs">
                    <strong>Explanation:</strong> <MathText content={q.explanation} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ৩. ফুটার অ্যাকশন */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex gap-3">
        <Link href="/" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-bold text-gray-700 hover:bg-gray-50">
          <Home size={18} /> Home
        </Link>
        <button onClick={() => window.location.reload()} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-200">
          <RotateCcw size={18} /> Retry
        </button>
      </div>
    </div>
  );
}
