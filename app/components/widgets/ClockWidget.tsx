"use client";
import { useState, useEffect } from "react";
import Card from "@/app/components/ui/Card";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return (
      <Card>
        <div className="h-24 animate-pulse bg-dashboard-border rounded" />
      </Card>
    );
  }

  const hours   = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return (
    <Card>
      <p className="text-sm text-dashboard-muted mb-2">
        {DAYS[now.getDay()]}, {MONTHS[now.getMonth()]} {now.getDate()},{" "}
        {now.getFullYear()}
      </p>
      <p className="text-5xl font-mono font-bold text-dashboard-accent tracking-wider">
        {hours}:{minutes}
        <span className="text-3xl text-dashboard-muted">:{seconds}</span>
      </p>
    </Card>
  );
}
