"use client";
import { useState, useEffect } from "react";
import Card from "@/app/components/ui/Card";
import { USER_NAME } from "@/lib/constants";

function getGreeting(hour: number): string {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getGreetingEmoji(hour: number): string {
  if (hour < 12) return "☀️";
  if (hour < 17) return "🌤️";
  return "🌙";
}

export default function GreetingWidget() {
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji]       = useState("");

  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      setGreeting(getGreeting(h));
      setEmoji(getGreetingEmoji(h));
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex items-center gap-4">
      <span className="text-4xl">{emoji}</span>
      <div>
        <p className="text-dashboard-muted text-sm">Welcome back</p>
        <h2 className="text-xl font-semibold text-dashboard-text">
          {greeting}, {USER_NAME}!
        </h2>
      </div>
    </Card>
  );
}
