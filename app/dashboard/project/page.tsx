import { format } from "date-fns";
import { ProductsClient } from "./components/client";
import { db } from "@/lib/db";
import { ProjectColumn } from "./components/columns";
import nextAuth, { getServerSession } from "next-auth";
import { AuthHandler } from "next-auth/core";

const ProjectPage = async () => {
  const products = await db.project.findMany({
    include: {
      tags: true,
    },
  });
  const session = await getServerSession();
  console.log(session, "session slfsljl");
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
