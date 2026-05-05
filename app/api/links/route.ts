import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const links = await prisma.quickLink.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const { name, url } = await req.json();
  if (!name?.trim() || !url?.trim()) {
    return NextResponse.json({ error: "Name and URL required" }, { status: 400 });
  }
  const link = await prisma.quickLink.create({
    data: { name: name.trim(), url: url.trim() },
  });
  return NextResponse.json(link, { status: 201 });
}
