"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import Image from "next/image";
import { skill, project } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
// import ImageUpload from "@/components/ui/image-upload";

// import ImageUpload from "@/components/ui/image-upload";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

const formSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .max(160, {
      message: "description must not be longer than 30 characters.",
    }),
  images: z.string().min(1),
  tags: z.string().min(1),
  ProjectType: z.string().min(1),
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
        images: initialData.images.join(", "), // convert array to string
      }
    : {
        title: "",
        description: "",
        tags: "",
        ProjectType: "",
        images: "",
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { getValues, setValue } = form;

  const onSubmit = async (data: ProjectFormValues) => {
    console.log(data, "data");
    // try {
    //   setLoading(true);
    //   if (initialData) {
    //     await axios.patch(
    //       `/api/${params.storeId}/Projects/${params.ProjectId}`,
    //       data
    //     );
    //   } else {
    //     await axios.post(`/api/${params.storeId}/Projects`, data);
    //   }
    //   router.refresh();
    //   router.push(`/${params.storeId}/Projects`);
    //   toast.success(toastMessage);
    // } catch (error: any) {
    //   console.log("error", error);
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const onDelete = async () => {
    console.log("delete fire..");
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/Projects/${params.ProjectId}`);
    //   router.refresh();
    //   router.push(`/${params.storeId}/Projects`);
    //   toast.success("Project deleted.");
    // } catch (error: any) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
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
          {/* <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {getValues("image") ? (
                    <div className="mb-4 flex items-center gap-4 justify-center bg-slate-100 py-4 rounded-sm">
                      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <img
                          src={getValues("image")}
                          className="object-cover"
                          alt="preview-image"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <ImageUpload
                        onImageCompleteHandle={(data) => {
                          setValue("image", data);
                        }}
                        disabled={loading}
                      />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
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
                          placeholder="Skills"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
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
