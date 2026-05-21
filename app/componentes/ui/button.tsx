import type { ButtonHTMLAttributes } from "react";

function buttonClassName(disabled?: boolean, className?: string) {
  const base = ["inline-flex","items-center","justify-center","rounded-xl","px-5","py-3","text-sm","font-semibold","transition-all","focus-visible:outline-none","disabled:cursor-not-allowed","disabled:opacity-60"];
  const color = disabled
    ? ["bg-slate-700", "text-slate-400"]
    : ["bg-fuchsia-600", "text-white", "hover:bg-fuchsia-500"];
  return [...base, ...color, className ?? ""].join(" ").trim();
}

export function Button({ className, disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClassName(disabled, className)} disabled={disabled} {...props} />;
}
