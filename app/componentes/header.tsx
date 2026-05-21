import Link from "next/link";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="border-b border-fuchsia-950 bg-[#12071b] px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white shadow-[0_0_12px_rgba(184,77,255,0.35)]">
            PP
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">PurplePlay</div>
            <div className="text-base font-semibold text-white">Curriculos</div>
          </div>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
