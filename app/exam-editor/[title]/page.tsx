'use client';

import { use, useEffect, useState } from "react";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import { Exam } from "@/app/_types";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

interface Params {
    title: string;
}

interface IExamDetails {
    params: Promise<Params>;
}

const ExamDetails = ({ params }: IExamDetails) => {
    const [allExams, setAllExams] = useState<Exam[] | null>(null);
    const [exam, setExam] = useState<Exam | null>(null);
    const [examMode, setExamMode] = useState<'View' | 'Edit'>('View');
    const { title } = use(params);

    const fetchExams = () => {
        const storedExams = localStorage.getItem('exams');
        if (storedExams) {
            const exams = JSON.parse(storedExams);
            setAllExams(exams);
            const foundExam = exams.find((item: Exam) => item.title === decodeURIComponent(title));
            setExam(foundExam);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    if (!exam) {
        return <p>No exam data found.</p>
    }

    const updateExam = (updatedExam: Exam) => {
        setExam(updatedExam);
        setAllExams((prevExams) =>
            prevExams?.map((item) => (item.title === updatedExam.title ? updatedExam : item)) || []
        );
    };

    const deleteQuestion = (index: number) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.filter((_, i) => i !== index);
            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    }

    const deleteAnswer = (questionIndex: number, answerIndex: number) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    const updatedAnswers = question.answers.filter((_, aIndex) => aIndex !== answerIndex);
                    return { ...question, answers: updatedAnswers };
                }
                return question;
            });

            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    const handleQuestionChange = (index: number, newValue: string) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.map((question, qIndex) =>
                qIndex === index ? { ...question, title: newValue } : question
            );

            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number, newValue: string) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    const updatedAnswers = question.answers.map((answer, aIndex) =>
                        aIndex === answerIndex ? { ...answer, title: newValue } : answer
                    );
                    return { ...question, answers: updatedAnswers };
                }
                return question;
            });

            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    const addQuestion = () => {
        if (exam && allExams) {
            const newQuestion = { title: '', description: '', answers: [] };
            const updatedQuestions = [...exam.questions, newQuestion];
            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    const addAnswer = (questionIndex: number) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.map((question, qIndex) =>
                qIndex === questionIndex
                    ? { ...question, answers: [...question.answers, { title: '', isCorrect: false }] }
                    : question
            );

            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    const handleCheckboxChange = (questionIndex: number, answerIndex: number, isCorrect: boolean) => {
        if (exam && allExams) {
            const updatedQuestions = exam.questions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    const updatedAnswers = question.answers.map((answer, aIndex) =>
                        aIndex === answerIndex ? { ...answer, isCorrect } : { ...answer, isCorrect: false }
                    );
                    return { ...question, answers: updatedAnswers };
                }
                return question;
            });

            const updatedExam = { ...exam, questions: updatedQuestions };
            updateExam(updatedExam)
        }
    };

    return (
        <main className="container mx-auto h-screen py-6 flex flex-col gap-4">
            <Link href={'/'} className="text-xl underline">Home page</Link>
            <div className="flex items-center justify-between">
                <h1 className='text-2xl underline'>{exam.title}</h1>
                <Button
                    text={examMode === 'View' ? "Edit Exam" : "Finish Editing"}
                    onClick={() => {
                        if (examMode === 'View') {
                            setExamMode('Edit')
                        } else {
                            setExamMode('View')
                            localStorage.setItem('exams', JSON.stringify(allExams));
                        }
                    }}
                    color={examMode === 'View' ? '#f97316' : '#22c55e'}
                />
            </div>
            {exam.description && <p className='text-xl'>{exam.description}</p>}
            {exam.questions.length ? <h2 className='text-2xl'>Questions:</h2> : null}
            <div className="flex flex-col gap-6">
                {exam.questions.map((question, qIndex) => (
                    <div key={qIndex} className="flex flex-col gap-2">
                        {examMode === 'View' ?
                            <h3 className='text-2xl'>{question.title}</h3>
                            :
                            <div className="flex items-center gap-2">
                                <div className="w-1/3">
                                    <Input
                                        value={question.title}
                                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                        type={"text"}
                                        purpose="question"
                                    />
                                </div>
                                <MdDelete className="w-6 h-6 cursor-pointer text-red-500" onClick={() => deleteQuestion(qIndex)} />
                                <Button text="Add Answer" onClick={() => addAnswer(qIndex)} color="#06b6d4" />
                            </div>
                        }
                        {question.description && <p>{question.description}</p>}
                        <h4 className='text-lg'>Answers:</h4>
                        {question.answers.map((answer, aIndex) => (
                            <div key={aIndex} className="flex items-center gap-2">
                                <div className="flex flex-col gap-2 w-1/3">
                                    <Input
                                        value={answer.title}
                                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                        type={"text"}
                                        purpose="answer"
                                        color={answer.isCorrect ? '#22c55e' : '#ef4444'}
                                        disabled={examMode === 'View'}
                                        checked={answer.isCorrect}
                                        onCheckChange={(checked: boolean) => handleCheckboxChange(qIndex, aIndex, checked)}
                                    />
                                </div>
                                {examMode === 'Edit' && <MdDelete className="w-6 h-6 cursor-pointer text-red-500" onClick={() => deleteAnswer(qIndex, aIndex)} />}
                            </div>
                        ))}
                        {exam.questions.length - 1 !== qIndex && <hr className="my-1 border-black" />}
                    </div>
                ))}
            </div>

            {
                examMode === "Edit" && (
                    <div>
                        <Button text={"Add Question"} onClick={addQuestion} color='#06b6d4 ' />
                    </div>
                )
            }
        </main>

    )
}

export default ExamDetails