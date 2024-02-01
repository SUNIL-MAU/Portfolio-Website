"use client";

import { FileType } from "@/__global/type";
import React, { useState, createContext, useContext, useCallback } from "react";

type SelectFileProviderProps = {
  children: React.ReactNode;
};

type SelectFileProviderPropsType = {
  selectedFile: FileType[];
  addFile: (file: FileType) => void;
  removeFile: (file: string) => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileType[]>>;
};

export const ActiveSectionContext =
  createContext<SelectFileProviderPropsType | null>(null);

export default function SelectFileProvider({
  children,
}: SelectFileProviderProps) {
  const [selectedFile, setSelectedFile] = useState<FileType[]>([]);
  console.log("ActiveSectionContext", selectedFile);

  const addFile = useCallback(
    (file: FileType) => {
      setSelectedFile([...selectedFile, file]);
    },
    [selectedFile, setSelectedFile]
  );

  const removeFile = useCallback(
    (key: string) => {
      const remainFile = selectedFile.filter(
        (tempFile) => tempFile.key !== key
      );
      setSelectedFile([...remainFile]);
    },
    [selectedFile, setSelectedFile]
  );

  return (
    <ActiveSectionContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        addFile,
        removeFile,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useSelectFile() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "ActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
