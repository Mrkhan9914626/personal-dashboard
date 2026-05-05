"use client";
import { useState } from "react";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";

type Priority = "HIGH" | "MEDIUM" | "LOW";
type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
};

export default function TodoWidget({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks]       = useState<Task[]>(initialTasks);
  const [title, setTitle]       = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [loading, setLoading]   = useState(false);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    });
    const newTask = await res.json();
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setLoading(false);
  }

  async function toggleTask(id: string, completed: boolean) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }

  async function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  }

  const pending   = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) =>  t.completed);

  return (
    <Card title="To-Do List">
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-2 text-sm text-dashboard-text placeholder-dashboard-muted focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="bg-dashboard-bg border border-dashboard-border rounded-lg px-2 py-2 text-sm text-dashboard-text focus:outline-none"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="bg-dashboard-accent text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {pending.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-dashboard-bg group transition-colors"
          >
            <input
              type="checkbox"
              checked={false}
              onChange={() => toggleTask(task.id, true)}
              className="accent-dashboard-accent cursor-pointer"
            />
            <span className="flex-1 text-sm text-dashboard-text">
              {task.title}
            </span>
            <Badge priority={task.priority} />
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 text-xs hover:text-red-300 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}

        {completed.length > 0 && (
          <>
            <p className="text-xs text-dashboard-muted mt-3 mb-1">
              Completed ({completed.length})
            </p>
            {completed.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-2 rounded-lg opacity-50 group"
              >
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => toggleTask(task.id, false)}
                  className="accent-dashboard-accent cursor-pointer"
                />
                <span className="flex-1 text-sm line-through text-dashboard-muted">
                  {task.title}
                </span>
                <Badge priority={task.priority} />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </>
        )}

        {tasks.length === 0 && (
          <p className="text-center text-dashboard-muted text-sm py-8">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </Card>
  );
}
