import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
  const session = await getServerSession();

  return { user: "mune" };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  console.log("file", file);

  return file;
  // const isFileExist = await db.file.findFirst({
  //   where: {
  //     url: file.key,
  //   },
  // });

  // if (isFileExist) return;

  // const createdFile = await db.file.create({
  //   data: {
  //     key: file.key,
  //     name: file.name,
  //     fileType: "nak",
  //     url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
  //     uploadStatus: "PROCESSING",
  //   },
  // });

  // try {
  //   const response = await fetch(
  //     `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
  //   );

  //   const blob = await response.blob();

  //   const loader = new PDFLoader(blob);

  //   const pageLevelDocs = await loader.load();

  //   const pagesAmt = pageLevelDocs.length;

  //   const { subscriptionPlan } = metadata;
  //   const { isSubscribed } = subscriptionPlan;

  //   const isProExceeded =
  //     pagesAmt > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;
  //   const isFreeExceeded =
  //     pagesAmt > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

  //   if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
  //     await db.file.update({
  //       data: {
  //         uploadStatus: "FAILED",
  //       },
  //       where: {
  //         id: createdFile.id,
  //       },
  //     });
  //   }

  //   // vectorize and index entire document
  //   const pinecone = await getPineconeClient();
  //   const pineconeIndex = pinecone.Index("quill");

  //   const embeddings = new OpenAIEmbeddings({
  //     openAIApiKey: process.env.OPENAI_API_KEY,
  //   });

  //   await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
  //     pineconeIndex,
  //     namespace: createdFile.id,
  //   });

  //   await db.file.update({
  //     data: {
  //       uploadStatus: "SUCCESS",
  //     },
  //     where: {
  //       id: createdFile.id,
  //     },
  //   });
  // } catch (err) {
  //   await db.file.update({
  //     data: {
  //       uploadStatus: "FAILED",
  //     },
  //     where: {
  //       id: createdFile.id,
  //     },
  //   });
  // }
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
