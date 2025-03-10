"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import NavbarMain from "@/components/Navbar";
import { Card, CardHeader } from "@/components/ui/card";
import Together from "together-ai";
import { FileUpload } from "@/components/ui/file-upload";

const together = new Together({
    apiKey: '8007d92ee12c57c8c20aa63b0fac071c789f7a46eaaba4547901b324f1c924e3',
});

export default function NotebookLM() {
    const [quizTopic, setQuizTopic] = useState<string>("");
    const [quizDifficulty, setQuizDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const generateQuiz = async () => {
        if (!quizTopic) {
            alert("Please enter a quiz topic.");
            return;
        }
        setLoading(true);
        try {
            const response = await together.chat.completions.create({
                messages: [{ "role": "user", "content": `Generate a ${quizDifficulty} quiz on the topic: ${quizTopic}` }],
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            });
            
            const aiGeneratedQuestions = response.choices?.[0]?.message?.content?.split("\n").filter(q => q.trim() !== "") || [];
            setQuizQuestions(aiGeneratedQuestions);
        } catch (error) {
            console.error("Error generating quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <NavbarMain />
            <div className="flex w-full h-full">
                <div className="flex-grow flex flex-col items-center justify-center w-full px-8 py-16 space-y-8">
                    <motion.h1 
                        className="text-5xl font-bold text-white" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >AI-Powered Quiz
                    </motion.h1>
                    <div className="w-full max-w-4xl p-6 rounded-xl shadow-md border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Generate a Quiz</h2>
                        <label className="block mb-2 text-gray-400">Enter Quiz Topic:</label>
                        <input
                            type="text"
                            className="bg-gray-800 p-2 rounded-md text-white w-full mb-4 focus:ring-2 focus:ring-gray-600"
                            value={quizTopic}
                            onChange={(e) => setQuizTopic(e.target.value)}
                            placeholder="e.g., Tech, Stocks, History, Pop Culture, etc."
                        />
                        <label className="block mb-2 text-gray-400">Select Difficulty:</label>
                        <select
                            className="bg-gray-800 p-2 rounded-md text-white w-full mb-4 focus:ring-2 focus:ring-gray-600"
                            value={quizDifficulty}
                            onChange={(e) => setQuizDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <button 
                            onClick={generateQuiz} 
                            className="w-full bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate Quiz"}
                        </button>
                    </div>
                    {quizQuestions.length > 0 && (
                        <Card className="w-full max-w-4xl p-6 rounded-xl border border-gray-700 shadow-md">
                            <CardHeader>
                                <h3 className="text-xl font-semibold mb-4">Generated Quiz</h3>
                                <ul className="space-y-2">
                                    {quizQuestions.map((question, index) => (
                                        <li key={index} className="bg-gray-800 p-3 rounded-md text-gray-300">{question}</li>
                                    ))}
                                </ul>
                            </CardHeader>
                        </Card>
                    )}
                </div>
                <FileUpload />
            </div>
        </div>
    );
}