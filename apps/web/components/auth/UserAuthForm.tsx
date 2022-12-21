"use client";

import { Icons } from "@components/icons";
import { cn } from "@lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@lib/validation/userAuthSchema";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { toast } from "@components/toast";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    return toast({
      title: "Check your email",
      message: "We sent you a login link. Be sure to check your spam too.",
      type: "success",
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800/90 focus:outline-none focus:ring-4 focus:ring-slate-800/50 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <hr className="my-2" />
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-slate-100/90 focus:outline-none focus:ring-4 focus:ring-slate-800/50 disabled:opacity-50"
        disabled={isLoading}
        onClick={() => signIn("github")}
      >
        <Icons.github className="mr-2 w-4 h-4 fill-black" />
        Github
      </button>
    </div>
  );
};
