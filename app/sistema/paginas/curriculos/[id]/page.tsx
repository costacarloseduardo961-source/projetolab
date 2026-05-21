"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "../../../../componentes/header";
import Footer from "../../../../componentes/footer";
import { findCurriculo, loadCurriculos, saveCurriculos } from "../data";
import { FiBriefcase, FiMail, FiMapPin, FiTrash2 } from "react-icons/fi";

export default function CurriculoDetalhesPage() {
  const [curriculo, setCurriculo] = useState(() => null as null | ReturnType<typeof findCurriculo>);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const curriculoId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!curriculoId) {
        setCurriculo(null);
        setIsLoading(false);
        return;
      }

      const foundCurriculo = findCurriculo(curriculoId) ?? null;
      setCurriculo(foundCurriculo);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [curriculoId]);

  const handleDelete = () => {
    if (!curriculo) return;

    const current = loadCurriculos().filter((item) => item.id !== curriculo.id);
    saveCurriculos(current);
    toast.success("Currículo excluído com sucesso.");
    router.push("/sistema/paginas/curriculos");
  };

  return (
    <div className="flex min-h-screen flex-col text-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="glass-panel rounded-[2rem] px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="section-kicker">Detalhes do currículo</span>
              <h1 className="section-title">Detalhe completo do candidato</h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/sistema/paginas/curriculos"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-300/40 hover:bg-white/10"
              >
                Voltar à lista
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
              >
                <FiTrash2 />
                Excluir currículo
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="glass-card mt-8 rounded-[1.75rem] p-10 text-center text-slate-300">
              Carregando currículo...
            </div>
          ) : curriculo ? (
            <section className="mt-8 space-y-8">
              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900">
                      <Image
                        src={curriculo.avatar}
                        alt={curriculo.nome}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="section-kicker">{curriculo.cargo}</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{curriculo.nome}</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="badge-chip inline-flex items-center gap-2">
                          <FiMail />
                          {curriculo.email}
                        </span>
                        <span className="badge-chip inline-flex items-center gap-2">
                          <FiBriefcase />
                          {curriculo.cargo}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-[1.4rem] px-4 py-3 text-sm text-slate-300">
                    ID do registro: <span className="text-slate-100">{curriculo.id}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">Contato e resumo</h3>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[1.35rem] border border-white/8 bg-slate-950/65 p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-amber-200">
                        <FiMapPin /> Telefone
                      </p>
                      <p className="mt-2 text-slate-300">{curriculo.telefone}</p>
                    </div>
                    <div className="rounded-[1.35rem] border border-white/8 bg-slate-950/65 p-4">
                      <p className="text-sm font-semibold text-amber-200">CPF</p>
                      <p className="mt-2 text-slate-300">{curriculo.cpf}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">Resumo profissional</h3>
                  <p className="mt-5 leading-8 text-slate-300">{curriculo.resumo}</p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">Experiências profissionais</h3>
                  <div className="mt-5 space-y-4">
                    {curriculo.experiencias.map((item, index) => (
                      <div key={index} className="rounded-[1.35rem] border border-white/8 bg-slate-950/65 p-4">
                        <p className="font-semibold text-white">{item.empresa}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.cargo} • {item.periodo}
                        </p>
                        <p className="mt-3 leading-7 text-slate-300">{item.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">Formação acadêmica</h3>
                  <div className="mt-5 space-y-4">
                    {curriculo.formacoes.map((item, index) => (
                      <div key={index} className="rounded-[1.35rem] border border-white/8 bg-slate-950/65 p-4">
                        <p className="font-semibold text-white">{item.instituicao}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.curso}</p>
                        <p className="mt-3 text-slate-300">{item.periodo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <h3 className="text-xl font-semibold">Habilidades</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {curriculo.habilidades.map((skill) => (
                    <span key={skill} className="badge-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="glass-card mt-8 rounded-[1.75rem] p-10 text-center text-slate-300">
              Currículo não encontrado. Verifique se o ID está correto.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
