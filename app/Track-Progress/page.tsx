"use client";
import { useState, useEffect } from "react";
import NavbarMain from "@/components/Navbar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyProgress = [
    { task: "Learn React", progress: 80 },
    { task: "Build a Portfolio", progress: 60 },
    { task: "Master Next.js", progress: 50 },
    { task: "Explore Machine Learning", progress: 30 },
    { task: "Contribute to Open Source", progress: 20 },
];

export default function ProgressTracker() {
    const [search, setSearch] = useState("");
    const [suggestion, setSuggestion] = useState("Generating AI-based insights...");
    const [tasks, setTasks] = useState([
        "Complete Project Documentation",
        "Refactor Codebase",
        "Optimize API Calls",
        "Plan Next Features",
    ]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const randomSuggestion = [
            "Consider breaking larger tasks into smaller ones for better tracking.",
            "Try allocating specific hours in a day for uninterrupted learning.",
            "Focus on high-priority tasks first to maximize efficiency.",
            "Track your progress weekly and set realistic goals.",
            "Engage in community discussions to gain more insights."
        ];
        setTimeout(() => {
            setSuggestion(randomSuggestion[Math.floor(Math.random() * randomSuggestion.length)]);
        }, 2000);
    }, []);

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const removeTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const filteredProgress = dummyProgress.filter((entry) =>
        entry.task.toLowerCase().includes(search.toLowerCase())
    );

    const chartData = {
        labels: filteredProgress.map((entry) => entry.task),
        datasets: [
            {
                label: "Progress %",
                data: filteredProgress.map((entry) => entry.progress),
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <NavbarMain />
            <div className="flex flex-row w-full h-screen">
                {/* Left Sidebar */}
                <motion.aside className="w-1/6 bg-gray-900 p-6 flex flex-col" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-lg font-semibold mb-4">To-Do List</h2>
                    <div className="space-y-2 h-full overflow-y-auto">
                        {tasks.map((task, index) => (
                            <div key={index} className="flex items-center bg-gray-800 p-2 rounded-md">
                                <input type="checkbox" className="mr-2" />
                                <span className="flex-grow">{task}</span>
                                <button onClick={() => removeTask(index)} className="text-gray-400 hover:text-red-500">✖</button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            placeholder="Add new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="flex-grow p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none"
                        />
                        <button onClick={addTask} className="ml-2 px-4 py-2 bg-white text-black rounded-md">+</button>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center justify-center w-full px-8 py-16">
                    <motion.h1 className="text-center text-5xl font-bold mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        Progress Tracker
                    </motion.h1>
                    <div className="w-full max-w-4xl mb-8">
                        <input
                            type="text"
                            placeholder="Search task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-4 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <motion.div className="w-full max-w-6xl bg-gray-900 shadow-lg rounded-lg p-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} className="h-80" />
                    </motion.div>
                </div>

                {/* Right Sidebar with AI Suggestions */}
                <motion.aside className="w-1/6 bg-gray-900 p-6 flex flex-col" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
                    <p className="text-gray-400">{suggestion}</p>
                </motion.aside>
            </div>
        </div>
    );
}