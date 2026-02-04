// src/app/admin/login/page.tsx

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // আপাতত হার্ডকোড করা পাসওয়ার্ড: "admin123" (পরে Firebase থেকে চেক করা যাবে)
    if (pass === 'admin123') {
      localStorage.setItem('isAdmin', 'true'); // লোকাল স্টোরেজে সেভ রাখা
      router.push('/admin'); // ড্যাশবোর্ডে পাঠানো
    } else {
      alert('ভুল পাসওয়ার্ড! ❌');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-80 rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-indigo-100 p-4 text-indigo-600">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">Admin Login</h2>
        
        <input
          type="password"
          placeholder="Enter Password"
          className="mb-4 w-full rounded-lg border bg-gray-50 p-3 outline-none focus:border-indigo-500"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        
        <button className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-lg hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}
