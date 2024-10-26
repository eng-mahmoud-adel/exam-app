'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Exam } from "../_types";
import Button from "../_components/Button";
import Input from "../_components/Input";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ExamEditor() {
    const router = useRouter()
    const [allExams, setAllExams] = useState<Exam[] | null>(null);
    const [exam, setExam] = useState<Exam>({ title: "", description: "", questions: [] });

    const fetchExams = () => {
        const storedExams = localStorage.getItem('exams');
        if (storedExams) {
            const exams = JSON.parse(storedExams);
            setAllExams(exams);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const updateExam = (updatedExam: Exam) => {
        setAllExams((prevExams) => {
            const updatedExams = prevExams ? [...prevExams, updatedExam] : [updatedExam];
            localStorage.setItem('exams', JSON.stringify(updatedExams));
            return updatedExams;
        });
    };

    const saveExam = () => {
        if (allExams?.some(item => item.title === exam.title)) {
            toast.error("An exam with this title already exists.")
            return;
        }

        if (exam) {
            updateExam(exam);
            toast.success("Exam added successfully!")
            router.push('/')
        }
    };

    const handleChangeExamInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExam((prevExam) => ({
            ...prevExam,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <main className="container mx-auto h-screen py-6">
            <Link href={'/'} className="text-xl underline">Home page</Link>
            <div className="flex items-center justify-between">
                <h1 className='text-3xl font-bold mb-12'>Exam Details</h1>
                <Button
                    text="Save Exam"
                    onClick={saveExam}
                    color='#22c55e'
                    disabled={!exam?.title || !exam.description}
                />
            </div>

            <div className="flex flex-col gap-2 w-1/3">
                <Input
                    id="title"
                    name="title"
                    label="Title"
                    value={exam?.title || ""}
                    onChange={(e) => handleChangeExamInputs(e)}
                    type={"text"}
                />

                <Input
                    id="description"
                    name="description"
                    label="Description"
                    value={exam?.description || ""}
                    onChange={(e) => handleChangeExamInputs(e)}
                    type={"text"}
                />
            </div>
        </main>
    );
}
