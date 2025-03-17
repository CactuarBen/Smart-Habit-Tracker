"use client";

import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";

export default function Home() {
  const [habits, setHabits] = useState([]); 
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/habits");
      if (!response.ok) {
        throw new Error("Failed to fetch habits");
      }
      const data = await response.json();
      console.log("Fetched habits:", data);
      setHabits(data);
    } catch (error) {
      console.error("Error fetching habits:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center space-y-6 p-4">
      <AddHabitForm onHabitAdded={fetchHabits} />
      <HabitList habits={habits} fetchHabits={fetchHabits} error={error} />
    </div>
  );
}
