import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.setting.findMany();
  return NextResponse.json(
    Object.fromEntries(settings.map((s: { key: string; value: string }) => [s.key, s.value]))
  );
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const updates = await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )
  );
  return NextResponse.json(updates);
}
