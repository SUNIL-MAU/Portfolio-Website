import { File } from "@prisma/client";
import FileCard from "./file-card";

export default function FileClient({ files }: { files: File[] }) {
  return (
    <div className=" grid grid-cols-12 mt-6 gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
