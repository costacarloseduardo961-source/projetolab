"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import {
  Controller,
  FieldErrors,
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "../../../../componentes/header";
import Footer from "../../../../componentes/footer";
import { Button } from "../../../../componentes/ui/button";
import { Textarea } from "../../../../componentes/ui/textarea";
import { Curriculo, Formacao, Experiencia, loadCurriculos, saveCurriculos } from "../data";
import * as yup from "yup";

type FormValues = {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  habilidades: string;
  avatar: FileList | null | undefined;
  experiencias: Experiencia[];
  formacoes: Formacao[];
};

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "Nome precisa ter ao menos 3 caracteres."),
  cargo: yup.string().required("Cargo é obrigatório").min(3, "Cargo precisa ter ao menos 3 caracteres."),
  email: yup.string().required("E-mail é obrigatório").email("Digite um e-mail válido."),
  telefone: yup.string().required("Telefone é obrigatório").min(14, "Telefone incompleto."),
  cpf: yup.string().required("CPF é obrigatório").min(14, "CPF incompleto."),
  resumo: yup.string().required("Resumo profissional é obrigatório").min(30, "Resumo deve ter ao menos 30 caracteres."),
  habilidades: yup.string().required("Habilidades são obrigatórias").min(5, "Liste ao menos uma habilidade."),
  avatar: yup.mixed().nullable(),
  experiencias: yup
    .array()
    .of(
      yup.object({
        empresa: yup.string().required("Empresa é obrigatória."),
        cargo: yup.string().required("Cargo é obrigatório."),
        periodo: yup.string().required("Período é obrigatório."),
        descricao: yup.string().required("Descrição é obrigatória.").min(20, "Descrição muito curta."),
      }),
    )
    .min(1, "Adicione ao menos uma experiência profissional."),
  formacoes: yup
    .array()
    .of(
      yup.object({
        instituicao: yup.string().required("Instituição é obrigatória."),
        curso: yup.string().required("Curso é obrigatório."),
        periodo: yup.string().required("Período é obrigatório."),
      }),
    )
    .min(1, "Adicione ao menos uma formação acadêmica."),
});

function generateCurriculoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `curr-${Math.random().toString(36).slice(2, 10)}`;
}

const defaultValues: FormValues = {
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
  cpf: "",
  resumo: "",
  habilidades: "",
  avatar: null,
  experiencias: [{ empresa: "", cargo: "", periodo: "", descricao: "" }],
  formacoes: [{ instituicao: "", curso: "", periodo: "" }],
};

function extractErrorMessage(errors: FieldErrors<FormValues>): string {
  if (!errors) return "Erro na validação.";
  const error = Object.values(errors)[0];
  if (!error) return "Erro na validação.";
  if (typeof error === "string") return error;
  if (Array.isArray(error)) return extractErrorMessage(error as unknown as FieldErrors<FormValues>);
  return typeof error.message === "string" ? error.message : "Erro na validação.";
}

export default function NovoCurriculoPage() {
  const router = useRouter();
  const [preview, setPreview] = useState("/next.svg");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues,
    resolver: yupResolver(schema) as Resolver<FormValues>,
  });

  const experiencias = useFieldArray({ control, name: "experiencias" });
  const formacoes = useFieldArray({ control, name: "formacoes" });

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setValue("avatar", files);

    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreview(url);
    } else {
      setPreview("/next.svg");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const skills = data.habilidades
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const novo: Curriculo = {
      id: generateCurriculoId(),
      nome: data.nome,
      cargo: data.cargo,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      resumo: data.resumo,
      experiencias: data.experiencias,
      formacoes: data.formacoes,
      habilidades: skills,
      avatar: preview || "/next.svg",
    };

    saveCurriculos([novo, ...loadCurriculos()]);
    toast.success("Currículo salvo com sucesso.");
    reset(defaultValues);
    router.push("/sistema/paginas/curriculos");
  };

  const onError = (formErrors: FieldErrors<FormValues>) => {
    toast.error(extractErrorMessage(formErrors));
  };

  return (
    <div className="flex min-h-screen flex-col text-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="glass-panel rounded-[2rem] px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="section-kicker">Cadastrar</span>
              <h1 className="section-title">Novo currículo com acabamento premium</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                O formulário continua igual em comportamento, porém apresentado com blocos mais limpos,
                contraste mais forte e uma hierarquia visual totalmente diferente da versão anterior.
              </p>
            </div>

            <Link
              href="/sistema/paginas/curriculos"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-300/40 hover:bg-white/10"
            >
              Voltar à lista
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-8 space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <div>
                    <p className="section-kicker">Perfil</p>
                    <h2 className="mt-2 text-xl font-semibold">Dados principais</h2>
                  </div>
                  <span className="metric-pill">Obrigatório</span>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Nome</label>
                    <input
                      {...register("nome")}
                      type="text"
                      placeholder="Nome completo"
                      className="field-shell w-full px-4 py-3"
                    />
                    {errors.nome && <p className="text-sm text-rose-300">{errors.nome.message?.toString()}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Cargo desejado</label>
                    <input
                      {...register("cargo")}
                      type="text"
                      placeholder="Cargo desejado"
                      className="field-shell w-full px-4 py-3"
                    />
                    {errors.cargo && <p className="text-sm text-rose-300">{errors.cargo.message?.toString()}</p>}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">E-mail</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="nome@exemplo.com"
                      className="field-shell w-full px-4 py-3"
                    />
                    {errors.email && <p className="text-sm text-rose-300">{errors.email.message?.toString()}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Telefone</label>
                    <Controller
                      name="telefone"
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          {...field}
                          mask="(00) 00000-0000"
                          placeholder="(99) 99999-9999"
                          className="field-shell w-full px-4 py-3"
                        />
                      )}
                    />
                    {errors.telefone && <p className="text-sm text-rose-300">{errors.telefone.message?.toString()}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">CPF</label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <IMaskInput
                          {...field}
                          mask="000.000.000-00"
                          placeholder="000.000.000-00"
                          className="field-shell w-full px-4 py-3"
                        />
                      )}
                    />
                    {errors.cpf && <p className="text-sm text-rose-300">{errors.cpf.message?.toString()}</p>}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <div>
                    <p className="section-kicker">Imagem</p>
                    <h2 className="mt-2 text-xl font-semibold">Foto do candidato</h2>
                  </div>
                  <span className="badge-chip">Opcional</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4 rounded-[1.5rem] border border-white/8 bg-slate-950/65 p-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                      <Image src={preview} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-100">Prévia da foto</p>
                      <p className="text-sm leading-6 text-slate-300">
                        O arquivo enviado continua sendo salvo normalmente, com pré-visualização instantânea.
                      </p>
                    </div>
                  </div>

                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          field.onChange(event.target.files);
                          handleAvatarChange(event);
                        }}
                        className="field-shell block w-full px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-amber-100"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
              <div className="space-y-2">
                <p className="section-kicker">Conteúdo</p>
                <h2 className="text-xl font-semibold">Resumo e habilidades</h2>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Resumo profissional</label>
                  <Textarea
                    {...register("resumo")}
                    placeholder="Descreva a experiência e principais competências"
                    className="bg-transparent"
                  />
                  {errors.resumo && <p className="text-sm text-rose-300">{errors.resumo.message?.toString()}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Habilidades</label>
                  <input
                    {...register("habilidades")}
                    type="text"
                    placeholder="React, Next.js, TypeScript"
                    className="field-shell w-full px-4 py-3"
                  />
                  <p className="text-xs text-slate-400">Separe as habilidades por vírgula.</p>
                  {errors.habilidades && <p className="text-sm text-rose-300">{errors.habilidades.message?.toString()}</p>}
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <h2 className="text-xl font-semibold">Experiências profissionais</h2>
                  <button
                    type="button"
                    onClick={() => experiencias.append({ empresa: "", cargo: "", periodo: "", descricao: "" })}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {experiencias.fields.map((field, index) => (
                    <div key={field.id} className="rounded-[1.5rem] border border-white/8 bg-slate-950/65 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-400">Experiência {index + 1}</p>
                        <button
                          type="button"
                          onClick={() => experiencias.remove(index)}
                          className="rounded-full border border-rose-400/40 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
                        >
                          Remover
                        </button>
                      </div>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">Empresa</label>
                          <input
                            {...register(`experiencias.${index}.empresa` as const)}
                            type="text"
                            placeholder="Nome da empresa"
                            className="field-shell w-full px-4 py-3"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">Cargo</label>
                          <input
                            {...register(`experiencias.${index}.cargo` as const)}
                            type="text"
                            placeholder="Cargo ocupado"
                            className="field-shell w-full px-4 py-3"
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">Período</label>
                          <input
                            {...register(`experiencias.${index}.periodo` as const)}
                            type="text"
                            placeholder="2021 - 2024"
                            className="field-shell w-full px-4 py-3"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">Descrição</label>
                          <Textarea
                            {...register(`experiencias.${index}.descricao` as const)}
                            placeholder="Descreva sua responsabilidade e resultados"
                            className="bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {errors.experiencias && (
                    <p className="text-sm text-rose-300">{extractErrorMessage(errors.experiencias)}</p>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <h2 className="text-xl font-semibold">Formação acadêmica</h2>
                  <button
                    type="button"
                    onClick={() => formacoes.append({ instituicao: "", curso: "", periodo: "" })}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  {formacoes.fields.map((field, index) => (
                    <div key={field.id} className="rounded-[1.5rem] border border-white/8 bg-slate-950/65 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-400">Formação {index + 1}</p>
                        <button
                          type="button"
                          onClick={() => formacoes.remove(index)}
                          className="rounded-full border border-rose-400/40 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
                        >
                          Remover
                        </button>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <input
                          {...register(`formacoes.${index}.instituicao` as const)}
                          type="text"
                          placeholder="Instituição"
                          className="field-shell w-full px-4 py-3"
                        />
                        <div className="grid gap-4 lg:grid-cols-2">
                          <input
                            {...register(`formacoes.${index}.curso` as const)}
                            type="text"
                            placeholder="Curso"
                            className="field-shell w-full px-4 py-3"
                          />
                          <input
                            {...register(`formacoes.${index}.periodo` as const)}
                            type="text"
                            placeholder="Período"
                            className="field-shell w-full px-4 py-3"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {errors.formacoes && (
                    <p className="text-sm text-rose-300">{extractErrorMessage(errors.formacoes)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Salvando..." : "Salvar currículo"}
              </Button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
