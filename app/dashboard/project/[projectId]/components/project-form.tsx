"use client";

import * as z from "zod";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import Image from "next/image";
import { skill, project } from "@prisma/client";
import MultiSelect from "react-select";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import UploadButton from "@/components/UploadButton";
import { useSelectFile } from "@/context/select-file-context";
import { FileType } from "@/__global/type";
import Link from "next/link";
import { cn } from "@/lib/utils";

// import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1, {
    message: "description is required",
  }),

  images: z.array(
    z.object({
      key: z.string(),
      url: z.string(),
      name: z.string(),
    })
  ),
  ProjectType: z.string().min(1),
  skills: z
    .array(
      z.object({
        value: z.string(),
        label: z.string().min(1),
        id: z.string().min(1),
      })
    )
    .refine((phones) => phones.length >= 1, {
      message: "At least one phone number is required",
    }),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  initialData: project | null;
  skills: skill[];
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  skills,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Project" : "Create Project";
  const description = initialData ? "Edit a Project." : "Add a new Project";
  const toastMessage = initialData ? "Project updated." : "Project created.";
  const action = initialData ? "Save changes" : "Create";
  const defaultValues = initialData
    ? {
        ...initialData,
        images: initialData.images.map((imgUrl) => ({
          url: imgUrl,
        })),
        skills: skills.map((p) => ({
          value: p.title,
          label: p.title,
          id: p.id,
        })),
      }
    : {
        title: "",
        description: "",
        ProjectType: "",
        images: [],
        skills: [],
      };

  console.log("defaultValues", defaultValues);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { setValue, getValues } = form;
  const { selectedFile, setSelectedFile } = useSelectFile();

  useEffect(() => {
    if (selectedFile.length > 0) {
      setValue("images", [...selectedFile.map((p) => p)]);
    }
  }, [selectedFile, setValue, setSelectedFile]);

  const onSubmit = async (data: ProjectFormValues) => {
    console.log("data", data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/project/${params.projectId}`, data);
      } else {
        await axios.post(`/api/project`, data);
      }
      router.refresh();
      router.push(`/dashboard/project`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/project/${params.projectId}`);
      router.refresh();
      router.push(`/dashboard/project`);
      toast.success("Project deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <div className=" flex gap-4 my-6 items-center">
                    <div className=" my-4 flex gap-2">
                      <UploadButton
                        files={field.value}
                        label={"Upload Image"}
                        onChange={(files: FileType[]) => {
                          files.map((p) => getValues("images").push(p));
                        }}
                        fileType="image"
                      />
                    </div>
                    <Link
                      href={{
                        pathname: "/dashboard/media",
                        query: { redirectTo: "/dashboard/project/new" },
                      }}
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      From Gallery
                    </Link>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <MultiSelect
                      isMulti
                      {...field}
                      unstyled
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={field.value}
                      options={skills.map((p) => ({
                        value: p.title,
                        label: p.title,
                        id: p.id,
                      }))}
                      placeholder={"choose skills"}
                      onChange={(e) => {
                        setValue(
                          "skills",
                          e.map((p) => p)
                        );
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="ProjectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ProjectType</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Individual"}>
                        {"Individual"}
                      </SelectItem>
                      <SelectItem value={"Organization"}>
                        {"Organization"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Discribe about the project"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
