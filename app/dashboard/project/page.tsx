import { format } from "date-fns";
import { ProductsClient } from "./components/client";
import { db } from "@/lib/db";
import { ProjectColumn } from "./components/columns";

const ProjectPage = async () => {
  const products = await db.project.findMany({
    include: {
      tags: true,
    },
  });

  const formattedProject: ProjectColumn[] = products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    images: item.images,
    tags: item.tags,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    ProjectType: item.ProjectType,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProject} />
      </div>
    </div>
  );
};

export default ProjectPage;
