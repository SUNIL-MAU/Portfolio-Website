"use client";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: "password requird",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const response = await signIn("credentials", {
      ...values,
      redirect: true,
      callbackUrl: "/dashboard/project",
    });
    console.log(response);
  }
  return (
    <Card className=" bg-white w-full mx-5 md:mx-0 pb-6 pt-4 md:w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-6xl text-center">🔐</CardTitle>
        <CardDescription className=" text-3xl text-center font-bold">
          Login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="m@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" mt-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" w-full mt-6  bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none   hover:bg-gray-950  transition"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
