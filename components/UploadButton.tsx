"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heading } from "./heading";
import { uploadFile } from "@/actions/upload";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSelectFile } from "@/context/select-file-context";
import { FileType } from "@/__global/type";

const UploadDropzone = ({
  onUploadCompleteHandler,
}: {
  onUploadCompleteHandler: (e: FileType[]) => void;
}) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("imageUpload", {
    onClientUploadComplete: async (file) => {
      console.log("skdlskj", file);
      const { url, name, key } = file[0];
      await uploadFile({ url, name, key });
      onUploadCompleteHandler([{ url, name, key }]);
      setUploadProgress(100);
      toast.success("file upload succesfully!");
    },
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <div className=" w-full">
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          console.log("acceptedFile", acceptedFile);
          setIsUploading(true);

          const progressInterval = startSimulatedProgress();

          const res = await startUpload(acceptedFile);

          if (!res) {
            return toast.error("Something went wrong");
          }

          const [fileResponse] = res;
          const key = fileResponse?.key;
          if (!key) {
            return toast.error("Something went wrong");
          }

          clearInterval(progressInterval);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">PDF 16MB</p>
                </div>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                    <div className="px-3 py-2 h-full grid place-items-center">
                      <File className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="px-3 py-2 h-full text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}

                {isUploading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      indicatorColor={
                        uploadProgress === 95 ? "bg-green-500" : ""
                      }
                      value={uploadProgress}
                      className="h-1 w-full bg-zinc-200"
                    />
                    {uploadProgress === 95 ? (
                      <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Almost there...
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <input
                  {...getInputProps()}
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

const UploadButton = ({
  files,
  onChange,
  label,
  fileType,
}: {
  files: FileType[];
  onChange: (e: FileType[]) => void;
  label: string;
  fileType: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { removeFile, selectedFile } = useSelectFile();

  const onUploadComplete = (files: FileType[]) => {
    setIsOpen(!open);
    onChange(files);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <div className=" flex flex-col ">
        {files.length ? (
          <div className=" grid grid-cols-12 gap-4">
            {files.map((file) => (
              <div
                key={file.key}
                className="relative w-[200px] col-span-12 sm:col-span-6 md:col-span-4 h-[200px] border  border-gray-200 rounded-md overflow-hidden"
              >
                <Image
                  src={file.url}
                  alt="product-image"
                  fill
                  className="object-cover"
                />

                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => removeFile(file.key)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className=" flex gap-4 my-6">
          <Link
            href={{
              pathname: "/dashboard/media",
              query: { redirectTo: "/dashboard/project/new" },
            }}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            From Gallery
          </Link>

          <DialogTrigger onClick={() => setIsOpen(true)} asChild>
            <div className=" flex gap-4">
              <Button type="button" variant={"default"}>
                {label}
              </Button>
            </div>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-2xl w-full">
          <Heading
            title={`Select ${fileType}`}
            description={`Choose ${fileType} either from pre-uploaded or upload new one`}
          />

          <UploadDropzone onUploadCompleteHandler={onUploadComplete} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UploadButton;
