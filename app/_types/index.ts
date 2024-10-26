export type Exam = {
    title: string;
    description?: string;
    questions: Question[];
};

export type Question = {
    title: string;
    description?: string;
    answers: Answer[];
};

export type Answer = {
    title: string;
    description?: string;
    isCorrect: boolean;
};
