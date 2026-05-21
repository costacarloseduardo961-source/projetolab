"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Curriculos", href: "/sistema/paginas/curriculos" },
  { label: "Cadastrar", href: "/sistema/paginas/curriculos/novo" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 text-sm">
      {links.map((link) => {
        const isActive =
          pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl px-4 py-2 ${
              isActive
                ? "bg-fuchsia-600 text-white shadow-[0_0_12px_rgba(184,77,255,0.35)]"
                : "border border-fuchsia-900 text-fuchsia-200"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
