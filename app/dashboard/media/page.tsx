import { Heading } from "@/components/heading";
import React from "react";

import { db } from "@/lib/db";
import FileClient from "./components/file-client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";

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
        {searchParams.redirectTo ? (
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
        ) : null}
      </div>

      <div>
        <FileClient files={images} />
      </div>
    </div>
  );
};

export default page;
