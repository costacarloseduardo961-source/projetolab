# Sistema de Gestão de Currículos

Uma aplicação web moderna para criar, gerenciar e validar currículos com experiência de usuário aprimorada. Desenvolvida com Next.js, Tailwind CSS e formulários dinâmicos com validação rigorosa.

## ✨ Funcionalidades Principais

- **Landing Page**: Apresentação dos benefícios do sistema com interface moderna
- **Lista de Currículos**: Exibição de cards com resumos (Nome, Cargo, Resumo)
- **Busca em Tempo Real**: Filtro instantâneo por nome ou cargo com debounce (200ms)
- **Formulário Dinâmico**: Adicionar/remover campos de experiências profissionais e formações acadêmicas
- **Validação Rigorosa**: Esquema de validação com Yup para todos os campos
- **Feedback Visual**: Notificações de sucesso/erro com Sonner mostrando erros específicos
- **Detalhes do Currículo**: Visualização completa com todas as informações do candidato
- **Persistência em localStorage**: Dados mockados salvos localmente
- **Upload de Imagem Simulado**: Prévia de imagem com armazenamento em URL.createObjectURL()
- **Dark Mode**: Suporte completo a tema escuro
- **Responsivo**: Adaptação fluida para mobile, tablet e desktop

## 🛠️ Stack Tecnológico

### Framework & Estilização
- **Next.js 16.2.4** - App Router
- **React 19.2.4** - Biblioteca UI
- **Tailwind CSS 4** - Estilização com design system
- **TypeScript 5** - Type safety

### Formulários & Validação
- **React Hook Form 7.75** - Gerenciamento de formulários
- **Yup 1.7.1** - Validação de esquemas
- **react-input-mask 2.0.4** - Máscaras de entrada (CPF, Telefone)

### Componentes & UI
- **shadcn/ui** - Componentes reutilizáveis (Button, Input, Textarea)
- **React Icons 5.6** - Ícones SVG
- **Sonner 2.0** - Notificações toast

## 📁 Estrutura do Projeto

```
app/
├── page.tsx                          # Landing page
├── layout.tsx                        # Root layout com Toaster
├── globals.css                       # Estilos globais
├── componentes/
│   ├── header.tsx                    # Header com navegação
│   ├── footer.tsx                    # Footer
│   ├── nav.tsx                       # Navegação com active state
│   ├── toaster.tsx                   # Provider Sonner
│   └── ui/                           # Componentes shadcn/ui
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
└── sistema/paginas/
    └── curriculos/
        ├── page.tsx                  # Lista com busca em tempo real
        ├── data.ts                   # Mock data + localStorage
        ├── [id]/
        │   └── page.tsx              # Detalhes dinâmicos
        └── novo/
            └── page.tsx              # Formulário de cadastro
```

## 🚀 Como Começar

### Instalação

```bash
# Clonar repositório
git clone <url-do-repositorio>
cd trabalho

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build

```bash
npm run build
npm start
```

