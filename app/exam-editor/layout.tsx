import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exam Editor",
    description: "This page where you can maange your exam",
};

export default function ExamEditorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}
