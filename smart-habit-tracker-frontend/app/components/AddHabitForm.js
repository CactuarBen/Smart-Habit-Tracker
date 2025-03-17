"use client";

import { useState } from "react";

const AddHabitForm = ({ onHabitAdded }) => {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    const newHabit = { name: habitName, frequency };

    try {
      const response = await fetch("http://localhost:8080/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) throw new Error("Failed to add habit");

      setHabitName("");

      // ✅ Call onHabitAdded() to refresh the list
      if (onHabitAdded) {
        console.log("Habit added! Refreshing list...");
        onHabitAdded();
      }
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter habit name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabitForm;
