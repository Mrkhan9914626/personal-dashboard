import prisma from "@/lib/prisma";
import ClockWidget from "@/app/components/widgets/ClockWidget";
import GreetingWidget from "@/app/components/widgets/GreetingWidget";
import WeatherWidget from "@/app/components/widgets/WeatherWidget";
import TodoWidget from "@/app/components/widgets/TodoWidget";
import QuickLinksWidget from "@/app/components/widgets/QuickLinksWidget";
import DailyGoalsWidget from "@/app/components/widgets/DailyGoalsWidget";
import QuoteWidget from "@/app/components/widgets/QuoteWidget";
import ThemeToggle from "@/app/components/ui/ThemeToggle";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const today = new Date().toISOString().slice(0, 10);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tasks: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let links: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let goals: any[] = [];

  try {
    [tasks, links, goals] = await Promise.all([
      prisma.task.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.quickLink.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.goal.findMany({
        where: { date: today },
        orderBy: { createdAt: "asc" },
      }),
    ]);
  } catch {
    // DB not connected yet — render empty widgets
  }

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 bg-dashboard-bg">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dashboard-text tracking-tight">
          My Dashboard
        </h1>
        <ThemeToggle />
      </div>

      {/* Responsive grid: 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

        {/* Row 1: Clock | Greeting | Weather */}
        <ClockWidget />
        <GreetingWidget />
        <WeatherWidget />

        {/* Row 2: Todo (2 cols) | Daily Goals */}
        <div className="md:col-span-2 xl:col-span-2">
          <TodoWidget initialTasks={tasks} />
        </div>
        <DailyGoalsWidget initialGoals={goals} today={today} />

        {/* Row 3: Quick Links (2 cols) | Quote */}
        <div className="md:col-span-2 xl:col-span-2">
          <QuickLinksWidget initialLinks={links} />
        </div>
        <QuoteWidget />

      </div>
    </main>
  );
}
