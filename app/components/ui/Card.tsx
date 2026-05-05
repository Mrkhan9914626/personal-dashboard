import { cn } from "@/lib/utils";

export default function Card({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-dashboard-card border border-dashboard-border rounded-xl p-5 shadow-sm",
        className
      )}
    >
      {title && (
        <h3 className="text-sm font-semibold text-dashboard-muted uppercase tracking-wider mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
