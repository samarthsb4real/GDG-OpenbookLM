"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import NavbarMain from "@/components/Navbar";
import { Card, CardHeader } from "@heroui/card";

export default function NotebookLM() {
    const [documents, setDocuments] = useState<string[]>([]);
    const [quizDifficulty, setQuizDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [sessionCode, setSessionCode] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);
    const [quizStarted, setQuizStarted] = useState(false);

    const handleFileUpload = (event: { target: { files: any[] } }) => {
        const file = event.target.files[0];
        if (file) {
            setDocuments([...documents, file.name]);
        }
    };

    const generateQuiz = () => {
        const difficultyLevels: { [key in "Easy" | "Medium" | "Hard"]: string[] } = {
            Easy: ["What is the main topic of the document?"],
            Medium: ["Explain the key points of the document in your own words."],
            Hard: ["Analyze and compare the document's themes with another source."],
        };
        setQuizQuestions(difficultyLevels[quizDifficulty] || []);
    };

    const generateSummary = () => {
        alert("Summary generation feature coming soon!");
    };

    const createSession = () => {
        const code = Math.random().toString(36).substr(2, 6).toUpperCase();
        setSessionCode(code);
        setPlayers([]);
    };

    const joinSession = () => {
        if (playerName) {
            setPlayers([...players, playerName]);
            setPlayerName("");
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <NavbarMain />
            <div className="flex w-full h-full">
                {/* Left Sidebar */}
                <motion.aside 
                    className="w-1/5 bg-gray-900 p-6 flex flex-col space-y-4 border-r border-gray-700 min-h-screen"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-lg font-semibold">Uploaded Documents</h2>
                    <input type="file" className="bg-gray-800 p-2 text-white rounded-md cursor-pointer" onChange={handleFileUpload} />
                    <ul className="space-y-2 overflow-y-auto max-h-60">
                        {documents.map((doc, index) => (
                            <li key={index} className="bg-gray-800 p-2 rounded-md text-sm truncate">{doc}</li>
                        ))}
                    </ul>
                    <button 
                        onClick={generateSummary} 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                    >
                        Generate Summary
                    </button>
                </motion.aside>

                {/* Main Content - NotebookLM Interaction */}
                <div className="flex-grow flex flex-col w-full px-8 py-16 space-y-8 bg-gray-950 border-x border-gray-700 min-h-screen">
                    <motion.h1 
                        className="text-5xl font-bold text-white text-center" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }}
                    >
                        Spyder Quiz
                    </motion.h1>
                    <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 min-h-[400px] flex items-center justify-center">
                        <p className="text-gray-400 text-center">Start a discussion or summarize key concepts here...</p>
                    </div>
                </div>

                {/* Right Sidebar - Quiz Section */}
                <motion.aside 
                    className="w-1/5 bg-gray-900 p-6 flex flex-col space-y-4 border-l border-gray-700 min-h-screen"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-lg font-semibold">Quiz Generator</h2>
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
                        className="w-full bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Generate Quiz
                    </button>
                    
                    <button onClick={createSession} className="w-full bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 transition">Create Quiz Session</button>
                    {sessionCode && (
                        <div className="text-center mt-4">
                            <p className="text-gray-400">Session Code: <span className="text-white font-bold">{sessionCode}</span></p>
                            <input 
                                type="text" 
                                placeholder="Enter Name" 
                                className="bg-gray-800 p-2 rounded-md text-white w-full mt-2" 
                                value={playerName} 
                                onChange={(e) => setPlayerName(e.target.value)}
                            />
                            <button onClick={joinSession} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition">Join Session</button>
                            <ul className="text-white mt-4">
                                {players.map((player, index) => <li key={index}>{player}</li>)}
                            </ul>
                            <button onClick={startQuiz} className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition">Start Quiz</button>
                        </div>
                    )}
                </motion.aside>
            </div>
        </div>
    );
}
