import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { title } = body;

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }
    const skill = await db.skill.create({
      data: {
        title,
      },
    });

    return NextResponse.json("skill");
  } catch (error) {
    console.log("[SKILL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
