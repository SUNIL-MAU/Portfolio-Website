"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

import { project } from "@prisma/client";
export type SkillColumn = {
  id: string;
  title: string;
  createdAt: Date;
  projectsId: string | null;
};

export const columns: ColumnDef<SkillColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
