// src/app/page.tsx

import Link from 'next/link';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

// ডামি এক্সাম ডেটা (পরে Firebase থেকে আসবে)
const exams = [
  { id: 'math-101', title: 'Math Mock Test 01', category: 'Math', questions: 30, time: 25 },
  { id: 'sci-202', title: 'General Science Live', category: 'Science', questions: 50, time: 45 },
  { id: 'gk-daily', title: 'Daily GK Dose', category: 'GK', questions: 15, time: 10 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      
      {/* ১. হিরো সেকশন */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 pt-12 pb-20 text-white rounded-b-[2.5rem] shadow-xl">
        <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl font-bold">Mr. Stylo Academy</h1>
           <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">👤</div>
        </div>
        <h2 className="text-3xl font-bold leading-tight mb-2">Master Your <br/> Preparation</h2>
        <p className="text-indigo-100 text-sm">Attempt premium mock tests for free.</p>
        
        {/* সার্চ বার */}
        <div className="mt-6">
          <input 
            type="text" 
            placeholder="Search exams..." 
            className="w-full rounded-2xl border-none bg-white/10 py-3 px-5 text-white placeholder-indigo-200 backdrop-blur-md focus:bg-white/20 outline-none"
          />
        </div>
      </div>

      {/* ২. এক্সাম লিস্ট কন্টেইনার */}
      <div className="px-5 -mt-10">
        
        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {['All', 'Math', 'Science', 'English', 'GK'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold shadow-sm transition-transform active:scale-95 ${i===0 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* এক্সাম কার্ডস */}
        <div className="space-y-4 mt-2">
          {exams.map((exam) => (
            <Link href={`/exam/${exam.id}`} key={exam.id} className="block group">
              <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-indigo-100">
                
                <div className="flex justify-between items-start mb-3">
                  <span className="rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {exam.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                  {exam.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><BookOpen size={14}/> {exam.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {exam.time} Mins</span>
                </div>

                {/* Start Button Icon */}
                <div className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
