import { SkillForm } from "./components/skill-form";
import { db } from "@/lib/db";

const SkillPage = async ({ params }: { params: { skillId: string } }) => {
  let skill = null;
  if (params.skillId !== "new") {
    skill = await db.skill.findUnique({
      where: {
        id: params.skillId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SkillForm initialData={skill} />
      </div>
    </div>
  );
};

export default SkillPage;
