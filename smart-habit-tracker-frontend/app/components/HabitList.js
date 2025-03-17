"use client";

const HabitList = ({ habits = [], fetchHabits, error }) => {
  const deleteHabit = async (id) => {
    if (!id) {
      console.error("Error: Habit ID is undefined!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/habits/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete habit: ${response.status} ${response.statusText}`);
      }

      fetchHabits(); // ✅ Refresh habits after deleting
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Habits</h2>

      {error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : habits.length === 0 ? (
        <p className="text-gray-500 text-center">No habits yet. Add some!</p>
      ) : (
        <ul className="space-y-4">
          {habits.map((habit, index) => (
            <li
              key={habit.id || `fallback-${index}`}
              className="flex justify-between items-center p-4 bg-gray-50 shadow-md rounded-xl hover:shadow-lg transition-all"
            >
              <div>
                <span className="text-xl font-medium text-gray-700">{habit.name}</span>
                <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitList;
