import { format } from "date-fns";
import { ProductsClient } from "./components/client";
import { db } from "@/lib/db";
import { SkillColumn } from "./components/columns";

const SkillPage = async () => {
  const skills = await db.skill.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={skills} />
      </div>
    </div>
  );
};

export default SkillPage;
