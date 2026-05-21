"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "../../../componentes/header";
import Footer from "../../../componentes/footer";
import { Curriculo, loadCurriculos } from "./data";
import { FiArrowRight, FiSearch } from "react-icons/fi";

export default function CurriculosPage() {
  const [curriculos] = useState<Curriculo[]>(() => loadCurriculos());
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(query.trim().toLowerCase());
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredCurriculos = useMemo(
    () =>
      curriculos.filter((item) => {
        const term = search;
        if (!term) return true;
        return (
          item.nome.toLowerCase().includes(term) ||
          item.cargo.toLowerCase().includes(term)
        );
      }),
    [curriculos, search],
  );

  return (
    <div className="flex min-h-screen flex-col text-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="glass-panel overflow-hidden rounded-[2rem] px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="section-kicker">Currículos</span>
              <h1 className="section-title">Galeria de perfis cadastrados</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                A mesma lista continua disponível, agora apresentada como uma vitrine mais editorial,
                com busca destacada e cartões de leitura mais elegante.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative w-full min-w-[280px] sm:w-[340px]">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nome ou cargo"
                  className="field-shell w-full pl-11 pr-4"
                />
              </label>

              <Link
                href="/sistema/paginas/curriculos/novo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5"
              >
                Cadastrar novo
                <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="glass-card rounded-[1.5rem] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">Total visível</p>
              <p className="mt-3 text-3xl font-semibold">{filteredCurriculos.length}</p>
            </div>
            <div className="glass-card rounded-[1.5rem] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">Origem</p>
              <p className="mt-3 text-lg font-semibold">LocalStorage</p>
            </div>
            <div className="glass-card rounded-[1.5rem] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">Filtro</p>
              <p className="mt-3 text-lg font-semibold">Nome e cargo</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            {filteredCurriculos.length === 0 ? (
              <div className="glass-card rounded-[1.75rem] border-dashed p-10 text-center text-slate-300">
                Nenhum currículo encontrado. Tente outro termo de pesquisa.
              </div>
            ) : (
              filteredCurriculos.map((item) => (
                <article
                  key={item.id}
                  className="glass-card rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-300/30"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="badge-chip">{item.cargo}</span>
                        <span className="badge-chip">{item.email}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-white">{item.nome}</h2>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                          {item.resumo}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/sistema/paginas/curriculos/${item.id}`}
                      className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20"
                    >
                      Ver detalhes
                      <FiArrowRight />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
