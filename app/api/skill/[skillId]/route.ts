import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    const body = await req.json();

    const { title } = body;

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }

    const skill = await db.skill.update({
      where: {
        id: params.skillId,
      },
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

export async function DELETE(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    if (!params.skillId) {
      return new NextResponse("skill Id  required", { status: 400 });
    }

    await db.skill.delete({
      where: {
        id: params.skillId,
      },
    });

    return NextResponse.json("Skill deleted");
  } catch (error) {
    console.log("[SKILL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
