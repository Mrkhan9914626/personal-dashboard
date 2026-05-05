import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.quotable.io/random", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json({ content: data.content, author: data.author });
  } catch {
    return NextResponse.json({
      content:
        "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    });
  }
}
