import { Heading } from "@/components/heading";
import React from "react";

import { db } from "@/lib/db";
import FileClient from "./components/file-client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UploadButton from "@/components/UploadButton";
import { FileType } from "@/__global/type";

const page = async ({
  searchParams,
}: {
  searchParams: { redirectTo: string };
}) => {
  const images = await db.file.findMany();

  return (
    <div>
      <div className=" flex justify-between items-center">
        <Heading title="Gallery" description="Select file from galery" />
        {searchParams.redirectTo && images.length ? (
          <Link
            href={searchParams.redirectTo}
            // className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
            className={cn(
              buttonVariants({ variant: "default" }),
              "active:scale-105 transition hover:scale-110"
            )}
          >
            Next{" "}
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>
        ) : (
          <UploadButton files={[]} label={"Upload Image"} fileType="image" />
        )}
      </div>

      <div>
        {images.length ? <FileClient files={images} /> : <NoDataFound />}
      </div>
    </div>
  );
};

export default page;

function NoDataFound() {
  return (
    <div
      className={cn(
        `bg-background flex justify-center h-[calc(100vh-8rem)] rounded border  dark:border-gray-300/25 mt-6 `
      )}
    >
      <div className=" flex flex-col  justify-center w-1/2">
        <div className="  max-w-xl ">
          <Image
            width={300}
            height={300}
            src="/No-data.svg"
            className=" max-w-[500px] w-full object-contain"
            alt="no-data"
          />
        </div>
        <h2 className=" text-2xl font-semibold text-center">No data Found</h2>
      </div>
    </div>
  );
}
