import Link from "next/link";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <section className="glass-panel w-full rounded-3xl p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <span className="brand-badge">Site 4</span>
              <h1 className="page-title">Visual gamer em roxo e preto.</h1>
              <p className="soft-copy max-w-2xl text-base">
                Tudo segue funcional. O diferencial aqui e a identidade mais forte, com brilho e contraste escuro.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/sistema/paginas/curriculos" className="rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white">
                  Entrar na lista
                </Link>
                <Link href="/sistema/paginas/curriculos/novo" className="rounded-xl border border-fuchsia-900 px-5 py-3 text-sm font-semibold text-fuchsia-200">
                  Novo perfil
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4">
                <h2 className="font-semibold text-white">Glow leve</h2>
                <p className="mt-2 text-sm text-fuchsia-100/70">Tema mais chamativo, mas ainda simples.</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <h2 className="font-semibold text-white">Mesmo sistema</h2>
                <p className="mt-2 text-sm text-fuchsia-100/70">Cadastro, detalhes e exclusao continuam iguais.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
