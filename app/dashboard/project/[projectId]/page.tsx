import { ProjectForm } from "./components/project-form";
import { db } from "@/lib/db";

const ProductPage = async ({ params }: { params: { projectId: string } }) => {
  let projects = null;
  if (params.projectId !== "new") {
    projects = await db.project.findUnique({
      where: {
        id: params.projectId,
      },
      include: {
        tags: true,
      },
    });
  }

  const skills = await db.skill.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProjectForm skills={skills} initialData={projects} />
      </div>
    </div>
  );
};

export default ProductPage;
