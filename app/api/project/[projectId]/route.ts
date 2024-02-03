import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { FileType, OptionType } from "@/__global/type";

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    if (!params.projectId) {
      return new NextResponse("project id is required", { status: 400 });
    }

    await db.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json("project deleted!");
  } catch (error) {
    console.log("[PROJECT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();

    const { title, description, images, ProjectType, skills } = body;

    if (!title) {
      return new NextResponse("title  is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("description  is required", { status: 400 });
    }

    if (!images.length) {
      return new NextResponse("images  is required", { status: 400 });
    }
    if (!ProjectType) {
      return new NextResponse("ProjectType  is required", { status: 400 });
    }

    if (!skills.length) {
      return new NextResponse("skills  is required", { status: 400 });
    }

    const updatedProject = await db.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        title,
        description,
        images: [...images.map((u: FileType) => u.url)],
        ProjectType,
        tags: {
          connect: [
            ...skills.map((p: OptionType) => ({
              id: p.id,
            })),
          ],
        },
      },
    });

    return NextResponse.json("Project updated!");
  } catch (error: unknown) {
    console.log("[PROJECT_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
