// src/app/exam/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import MathText from '@/components/MathText';
import QuestionPalette from '@/components/exam/QuestionPalette';
import ResultView from '@/components/exam/ResultView'; // <--- [নতুন] এই লাইনটি যোগ হয়েছে
import { Timer, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function ExamPage({ params }: { params: { id: string } }) {
  const store = useExamStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // ১. ডামি ডেটা (আগের মতোই)
  useEffect(() => {
    const dummyData = [
      { 
        id: '1', q: "The value of $\\sqrt{25} + \\frac{10}{2}$ is:", 
        options: ["5", "10", "15", "20"], answer: "10", topic: "Math" 
      },
      { 
        id: '2', q: "What is the chemical formula of Water?", 
        options: ["$H_2O$", "$CO_2$", "$O_2$", "$NaCl$"], answer: "$H_2O$", topic: "Science" 
      },
      { 
        id: '3', q: "West Bengal shares its longest border with which country?", 
        options: ["Nepal", "Bhutan", "Bangladesh", "China"], answer: "Bangladesh", topic: "GK" 
      }
    ];
    store.startExam(dummyData, 10, { correct: 1, wrong: 0.25 });
  }, []);

  // ২. টাইমার (আগের মতোই)
  useEffect(() => {
    if (!store.isRunning) return;
    const interval = setInterval(() => store.tickTimer(), 1000);
    return () => clearInterval(interval);
  }, [store.isRunning]);

  // ৩. লোডিং বা রেজাল্ট লজিক (এখানেই পরিবর্তন হয়েছে)
  if (!store.questions.length) return <div className="flex h-screen items-center justify-center text-indigo-600">Loading Exam...</div>;

  // <--- [নতুন] আগে এখানে শুধু টেক্সট ছিল, এখন রেজাল্ট কম্পোনেন্ট
  if (!store.isRunning) {
    return <ResultView />;
  }

  const currentQ = store.questions[store.currentIdx];
  
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-900 overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm z-20 border-b">
        <div className="flex items-center gap-3">
          <div className={clsx("flex items-center gap-2 rounded-full px-4 py-1.5 font-mono font-bold border", 
            store.timeLeft < 60 ? "bg-red-100 text-red-600 border-red-200 animate-pulse" : "bg-indigo-50 text-indigo-700 border-indigo-100"
          )}>
            <Timer size={18} /> {formatTime(store.timeLeft)}
          </div>
        </div>
        
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition active:scale-95"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* --- MAIN BODY --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
        <div className="mx-auto max-w-2xl">
          
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100/50 border border-gray-100 min-h-[50vh]">
            <div className="mb-6 flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <span>Q. {store.currentIdx + 1} / {store.questions.length}</span>
              <span className="text-indigo-500 bg-indigo-50 px-2 py-1 rounded">{currentQ.topic || 'General'}</span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 leading-8">
                <MathText content={currentQ.q} />
              </h2>
              {currentQ.image && (
                <img src={currentQ.image} alt="Question" className="mt-4 max-h-52 rounded-lg border object-contain" loading="lazy" />
              )}
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt, i) => {
                const isSelected = store.userAnswers[store.currentIdx] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => store.setAnswer(opt)}
                    className={clsx(
                      "group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                      isSelected 
                        ? "border-indigo-600 bg-indigo-50/50 shadow-md" 
                        : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50"
                    )}
                  >
                    <span className={clsx(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                      isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900">
                      <MathText content={opt} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white px-4 py-3 border-t flex items-center justify-between gap-3 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={store.prevQuestion} disabled={store.currentIdx === 0}
          className="flex items-center gap-1 rounded-lg px-4 py-2.5 font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} /> <span className="hidden sm:inline">Prev</span>
        </button>
        
        <div className="flex gap-2">
           <button 
             onClick={store.toggleReview}
             className={clsx(
               "h-10 w-10 sm:w-auto sm:px-4 rounded-lg border font-medium flex items-center justify-center gap-2 transition-colors", 
               store.reviewStatus[store.currentIdx] 
                 ? "bg-yellow-100 text-yellow-700 border-yellow-300" 
                 : "border-gray-200 text-gray-500 hover:bg-gray-50"
             )}
           >
             <span className="hidden sm:inline">{store.reviewStatus[store.currentIdx] ? "Unmark" : "Review"}</span>
           </button>
        </div>

        <button 
          onClick={store.currentIdx === store.questions.length - 1 ? () => setSidebarOpen(true) : store.nextQuestion} 
          className="flex items-center gap-1 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          {store.currentIdx === store.questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
        </button>
      </footer>

      {/* --- SIDEBAR --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={clsx(
        "fixed right-0 top-0 z-40 h-full w-80 max-w-[85vw] transform bg-white transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <QuestionPalette onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}
