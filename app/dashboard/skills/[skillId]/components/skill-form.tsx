"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { skill } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  title: z.string().min(1),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  initialData: skill | null;
}

export const SkillForm: React.FC<ProjectFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Skill" : "Create Skill";
  const description = initialData ? "Edit a Skill." : "Add a new Skill";
  const toastMessage = initialData ? "Skill updated." : "Skill created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
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
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/Projects/${params.ProjectId}`, data);
      } else {
        await axios.post(`/api/skill`, data);
      }
      router.refresh();
      // router.push(`/`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.log("error", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
                      placeholder="Skill name"
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
