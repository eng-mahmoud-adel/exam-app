"use client";

import { useState, useEffect } from 'react';
import { Exam } from './_types';
import Link from 'next/link';
import Button from './_components/Button';
import { useRouter } from 'next/navigation'

export default function Exams() {
  const router = useRouter();

  const [examsList, setExamsList] = useState<Exam[] | null>(null);

  useEffect(() => {
    const storedExams = localStorage.getItem('exams');
    if (storedExams) {
      setExamsList(JSON.parse(storedExams));
    }
  }, []);

  if (!examsList || !examsList.length) {
    return (
      <>
        <p>No exam data found.</p>
        <Button
          text="Add Exam"
          onClick={() => router.push('exam-editor')}
          color='#22c55e'
        />
      </>
    )
  }

  return (
    <main className="container mx-auto h-screen py-6">
      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-bold mb-12'>List of Exams</h1>
        <Button
          text="Add Exam"
          onClick={() => router.push('exam-editor')}
          color='#22c55e'
        />
      </div>
      <div className='flex flex-col gap-2'>
        {examsList.map((exam, index) => (
          <div key={exam.title}>
            <Link href={`exam-editor/${exam.title}`} className='text-xl hover:text-blue-500'>{exam.title}</Link>
            {examsList.length - 1 !== index && <hr className='my-1 border-black' />}
          </div>
        ))}
      </div>
    </main>
  );
}
