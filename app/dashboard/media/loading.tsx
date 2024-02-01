import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className=" grid grid-cols-12 gap-4 ">
      {[...new Array(6)].map((_, index) => (
        <div className=" col-span-12 sm:col-span-6 md:col-span-4" key={index}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default loading;
