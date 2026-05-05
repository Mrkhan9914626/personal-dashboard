"use client";
import { useState } from "react";
import Card from "@/app/components/ui/Card";

type Goal = { id: string; title: string; completed: boolean; date: string };

export default function DailyGoalsWidget({
  initialGoals,
  today,
}: {
  initialGoals: Goal[];
  today: string;
}) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [input, setInput] = useState("");

  const canAdd         = goals.length < 3;
  const completedCount = goals.filter((g) => g.completed).length;

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !canAdd) return;
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    });
    const newGoal = await res.json();
    if (!newGoal.error) {
      setGoals((prev) => [...prev, newGoal]);
      setInput("");
    }
  }

  async function toggleGoal(id: string, completed: boolean) {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed } : g))
    );
    await fetch(`/api/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }

  async function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
  }

  return (
    <Card title="Daily Goals">
      <div className="mb-4">
        <div className="flex justify-between text-xs text-dashboard-muted mb-1">
          <span>Today&apos;s Progress</span>
          <span>{completedCount}/{goals.length}</span>
        </div>
        <div className="w-full bg-dashboard-border rounded-full h-2">
          <div
            className="bg-dashboard-accent h-2 rounded-full transition-all duration-500"
            style={{
              width: goals.length
                ? `${(completedCount / goals.length) * 100}%`
                : "0%",
            }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {goals.map((goal, i) => (
          <div key={goal.id} className="flex items-center gap-3 group">
            <span className="text-dashboard-muted text-xs w-4">{i + 1}.</span>
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoal(goal.id, !goal.completed)}
              className="accent-dashboard-accent cursor-pointer"
            />
            <span
              className={`flex-1 text-sm ${
                goal.completed
                  ? "line-through text-dashboard-muted"
                  : "text-dashboard-text"
              }`}
            >
              {goal.title}
            </span>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 text-xs transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
        {goals.length === 0 && (
          <p className="text-dashboard-muted text-sm text-center py-2">
            Set up to 3 goals for today
          </p>
        )}
      </div>

      {canAdd && (
        <form onSubmit={addGoal} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Goal ${goals.length + 1}...`}
            className="flex-1 bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-1.5 text-sm text-dashboard-text placeholder-dashboard-muted focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-dashboard-accent text-white px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            +
          </button>
        </form>
      )}

      {!canAdd && completedCount === 3 && (
        <p className="text-center text-green-400 text-sm font-medium mt-2">
          All goals achieved today! 🎉
        </p>
      )}
    </Card>
  );
}
