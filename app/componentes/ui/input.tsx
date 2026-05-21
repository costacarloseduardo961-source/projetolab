import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={
        "field-shell w-full px-4 py-3 text-sm outline-none placeholder:text-slate-500 " +
        className
      }
      {...props}
    />
  );
}
