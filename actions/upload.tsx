"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const uploadFile = async (file: {
  key: string;
  name: string;
  url: string;
}) => {
  if (!file) return;
  console.log(file);
  try {
    await db.file.create({
      data: {
        key: file.key,
        name: file.name,
        url: file.url,
      },
    });
    revalidatePath("/dashboard/media");
  } catch (error) {
    console.log(error);
    return { Error: error };
  }
};
