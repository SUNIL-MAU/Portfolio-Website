import { FileType } from "@/__global/type";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
  return { user: "noting" };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: FileType;
}) => {
  return file;
};

export const ourFileRouter = {
  pdfUpload: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const user = await getServerSession();
      console.log(user);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: "idklj" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
  imageUpload: f({ image: { maxFileSize: "32MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
