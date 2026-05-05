import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const goals = await prisma.goal.findMany({
    where: { date: today },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(goals);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const count = await prisma.goal.count({ where: { date: today } });

  if (count >= 3) {
    return NextResponse.json(
      { error: "Maximum 3 goals per day" },
      { status: 400 }
    );
  }

  const goal = await prisma.goal.create({
    data: { title: title.trim(), date: today },
  });
  return NextResponse.json(goal, { status: 201 });
}
