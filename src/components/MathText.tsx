// src/components/MathText.tsx

'use client';
import 'katex/dist/katex.min.css'; // স্টাইল ইম্পোর্ট
import Latex from 'react-latex-next';

// প্রপস টাইপ
interface MathProps {
  content: string;
  className?: string;
}

export default function MathText({ content, className = '' }: MathProps) {
  if (!content) return null;

  // লজিক: যদি $ চিহ্ন না থাকে, তবে ভারী লাইব্রেরি ব্যবহার করার দরকার নেই
  if (!content.includes('$')) {
    return <span className={`text-gray-800 leading-relaxed ${className}`}>{content}</span>;
  }

  // যদি $ থাকে, তবে Latex কম্পোনেন্ট কল হবে
  return (
    <span className={`math-content text-gray-800 leading-relaxed ${className}`}>
      <Latex>{content}</Latex>
    </span>
  );
}
