const PRIORITY_STYLES: Record<string, string> = {
  HIGH:   "bg-red-500/20 text-red-400 border border-red-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  LOW:    "bg-green-500/20 text-green-400 border border-green-500/30",
};

export default function Badge({ priority }: { priority: "HIGH" | "MEDIUM" | "LOW" }) {
  return (
    <span
      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[priority]}`}
    >
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </span>
  );
}
