"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

import { project } from "@prisma/client";
export type ProjectColumn = {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  ProjectType: project["ProjectType"];
  createdAt: Date;
};

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "ProjectType",
    header: "ProjectType",
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
