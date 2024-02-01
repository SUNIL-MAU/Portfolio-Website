"use client";

import { File } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSelectFile } from "@/context/select-file-context";
import { cn } from "@/lib/utils";
import { FileType } from "@/__global/type";

const FileCard = ({ file }: { file: File }) => {
  const { selectedFile, addFile, removeFile } = useSelectFile();

  const isFileExist = useMemo(() => {
    return selectedFile.some((tempFile: FileType) => tempFile.key === file.key);
  }, [selectedFile, file.key]);

  return (
    <div
      className={cn(
        ` col-span-12 sm:col-span-6 md:col-span-4 cursor-pointer w-full border py-4 px-2  border-gray-200 rounded-md shadow-md`,
        isFileExist ? "bg-[#d3e3fd]" : ""
      )}
      onClick={() => (isFileExist ? removeFile(file.key) : addFile(file))}
    >
      <Image
        src={file.url}
        height={200}
        width={300}
        alt={file.name || "alt-file"}
        className=" w"
      />
      {file.key}
    </div>
  );
};

export default FileCard;
