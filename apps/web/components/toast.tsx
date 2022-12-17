"use client";

import { cn } from "@lib/utils";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";

interface ToastOptions {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export const Toaster = HotToaster;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export const Toast = ({ visible, className, ...props }: ToastProps) => {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-md bg-white px-6 py-4 shadow-lg",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
};

interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={cn("", className)} {...props} />;
};

interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <p className={cn("text-sm opacity-80", className)} {...props} />;
};

export const toast = (options: ToastOptions) => {
  const { title, message, type = "default", duration = 3000 } = options;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn({
          "bg-red-500 text-white": type === "error",
          "bg-green-500 text-white": type === "success",
        })}
      >
        <Toast.Title>{title}</Toast.Title>
        {message && <Toast.Description>{message}</Toast.Description>}
      </Toast>
    ),
    { duration }
  );
};
