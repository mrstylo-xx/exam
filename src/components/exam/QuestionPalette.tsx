// src/components/exam/QuestionPalette.tsx

'use client';
import { useExamStore } from '@/store/useExamStore';
import clsx from 'clsx'; // কন্ডিশনাল ক্লাস এর জন্য

interface PaletteProps {
  onClose: () => void; // মোবাইলে প্যালেট বন্ধ করার জন্য
}

export default function QuestionPalette({ onClose }: PaletteProps) {
  const store = useExamStore();
  const { questions, currentIdx, userAnswers, reviewStatus, jumpToQuestion, submitExam } = store;

  // প্রশ্নের সংখ্যা অনুযায়ী গ্রিড তৈরি
  return (
    <div className="flex h-full flex-col bg-white p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-bold text-gray-800">Question Palette</h3>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 md:hidden">
          ✕
        </button>
      </div>

      {/* নির্দেশিকা (Legend) */}
      <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-green-500"></span> Answered</div>
        <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-yellow-400"></span> Review</div>
        <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-indigo-600"></span> Current</div>
        <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-gray-200"></span> Not Visited</div>
      </div>

      {/* নাম্বারের গ্রিড */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-5 gap-3">
          {questions.map((_, i) => {
            const isAnswered = userAnswers[i] !== null;
            const isReview = reviewStatus[i];
            const isCurrent = currentIdx === i;

            return (
              <button
                key={i}
                onClick={() => {
                  jumpToQuestion(i);
                  // মোবাইলে প্রশ্ন সিলেক্ট করলে প্যালেট অটো বন্ধ হবে না, ইউজার ম্যানুয়ালি করবে
                }}
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all border",
                  isCurrent ? "ring-2 ring-indigo-600 border-indigo-600 z-10" : "border-transparent",
                  isReview ? "bg-yellow-400 text-white shadow-md" :
                  isAnswered ? "bg-green-500 text-white shadow-md" :
                  "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* সাবমিট বাটন */}
      <div className="mt-4 border-t pt-4">
        <button
          onClick={() => {
            if(confirm("Are you sure you want to submit?")) {
              submitExam();
              onClose();
            }
          }}
          className="w-full rounded-xl bg-red-600 py-3 font-bold text-white shadow-lg shadow-red-200 transition-transform active:scale-95"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
