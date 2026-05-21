import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        "field-shell min-h-[120px] w-full px-4 py-3 text-sm outline-none placeholder:text-slate-500 " +
        className
      }
      {...props}
    />
  );
}
