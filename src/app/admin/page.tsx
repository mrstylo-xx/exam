// src/app/admin/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Upload, FileJson, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ফর্ম স্টেট
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('20');
  const [category, setCategory] = useState('Math');
  const [jsonInput, setJsonInput] = useState(''); // এখানে JSON পেস্ট করবেন

  // সিকিউরিটি চেক
  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      router.push('/admin/login');
    }
  }, []);

  // এক্সাম আপলোড ফাংশন
  const handleUpload = async () => {
    if (!title || !jsonInput) return alert("সব তথ্য পূরণ করুন!");
    
    setLoading(true);
    try {
      // ১. JSON ভ্যালিডেট করা
      const questions = JSON.parse(jsonInput);
      if (!Array.isArray(questions)) throw new Error("ভুল ফরম্যাট! এটি অ্যারে হতে হবে।");

      // ২. ফায়ারবেসে পাঠানো
      await addDoc(collection(db, "exams"), {
        title,
        duration: Number(duration),
        category,
        questions, // আপনার জেনারেট করা প্রশ্নগুলো
        marking: { correct: 1, wrong: 0.25 },
        createdAt: serverTimestamp(),
        active: true
      });

      alert("✅ এক্সাম সফলভাবে তৈরি হয়েছে!");
      setTitle('');
      setJsonInput('');
    } catch (error: any) {
      alert("❌ এরর: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* হেডার */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={() => { localStorage.removeItem('isAdmin'); router.push('/'); }}
          className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-600 font-bold hover:bg-red-200"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* আপলোড ফর্ম */}
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
        <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-indigo-600">
          <Upload size={20} /> Create New Exam
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* নাম */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">Exam Title</label>
            <input 
              type="text" 
              className="w-full rounded-lg border p-3 focus:border-indigo-500 outline-none"
              placeholder="Ex: Math Mock Test 01"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* সময় */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">Duration (Mins)</label>
            <input 
              type="number" 
              className="w-full rounded-lg border p-3 focus:border-indigo-500 outline-none"
              value={duration} onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        {/* ক্যাটাগরি */}
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">Category</label>
          <select 
            className="w-full rounded-lg border p-3 outline-none"
            value={category} onChange={(e) => setCategory(e.target.value)}
          >
            <option>Math</option>
            <option>Science</option>
            <option>English</option>
            <option>GK</option>
          </select>
        </div>

        {/* JSON পেস্ট করার বক্স */}
        <div className="mt-6">
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1"><FileJson size={16}/> Paste Question JSON</span>
            <span className="text-xs text-indigo-500 cursor-pointer hover:underline">See Format Example</span>
          </label>
          <textarea 
            className="h-60 w-full rounded-xl border bg-slate-50 p-4 font-mono text-xs text-slate-700 focus:border-indigo-500 outline-none"
            placeholder='[ { "q": "What is 2+2?", "options": ["3","4","5","6"], "answer": "4" } ]'
            value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}
          ></textarea>
        </div>

        {/* সাবমিট বাটন */}
        <button 
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "🚀 Publish Exam"}
        </button>

      </div>
    </div>
  );
}
