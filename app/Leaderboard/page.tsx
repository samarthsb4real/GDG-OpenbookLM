"use client";
import { useState } from "react";
import NavbarMain from "@/components/Navbar";

const dummyData = [
    { rank: 1, name: "Alice", score: 1200 },
    { rank: 2, name: "Bob", score: 1150 },
    { rank: 3, name: "Charlie", score: 1100 },
    { rank: 4, name: "David", score: 1050 },
    { rank: 5, name: "Eve", score: 1000 },
];

export default function Leaderboard() {
    const [search, setSearch] = useState("");

    const filteredData = dummyData.filter((entry) =>
        entry.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <NavbarMain />
            <div className="p-16">
            <span>
      <h1 className="text-4xl font-bold text-neutral-900 text-center dark:text-neutral-100 pb-12">
        Leaderboard
      </h1>

      </span>
      <div className="max-w-2xl mx-auto ">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search player..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>
                <div className="bg-gray-900 shadow-lg rounded-lg p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-3">Rank</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((entry) => (
                                    <tr key={entry.rank} className="border-b border-gray-600 hover:bg-gray-800">
                                        <td className="p-3">{entry.rank}</td>
                                        <td className="p-3">{entry.name}</td>
                                        <td className="p-3">{entry.score}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-3 text-gray-500">No players found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
