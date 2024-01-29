"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

import { SkillColumn, columns } from "./columns";

interface ProductsClientProps {
  data: SkillColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Skills (${data.length})`}
          description="Manage Skills for your portfolio"
        />
        <Button onClick={() => router.push(`/dashboard/skills/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
