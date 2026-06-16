# Processo de desenvolvimento — Consulta CNPJ

Este documento descreve o processo completo de desenvolvimento da landing page **Consulta CNPJ** utilizando o **AI Workflow Kit v2.2.7** como orquestrador de fluxo de trabalho, agentes especializados e validação automatizada.

O objetivo é servir como **evidência reprodutível** de que o AI Workflow Kit entrega software funcional, testado e auditado seguindo um fluxo proporcional e seguro.

---

## Visão geral

| Item | Valor |
|------|-------|
| Produto | Landing page de consulta fictícia de CNPJ |
| Stack final | React 18 + Vite 5 + CSS Modules |
| Testes | 20 testes E2E com Playwright |
| Modo AI Workflow | `full` (especificação → implementação → validação independente → release) |
| Repositório | https://github.com/williambeto/consulta-cnpj |
| Site do AI Workflow Kit | https://ai-workflow-kit-site.pages.dev/ |

---

## Pré-requisitos para reproduzir

```bash
# Node.js 20+ e npm
node --version   # ≥20
npm --version    # ≥10

# AI Workflow Kit (instalado como dependência do projeto)
npm install @williambeto/ai-workflow@2.2.7

# Git
git --version    # ≥2.40

# Playwright (para testes E2E)
npx playwright install chromium
```

---

## Etapa 1: Single-file HTML inicial

**Modo:** `standard`  
**Agentes:** Atlas (roteador), Astra (implementação)

Criado um arquivo `index.html` autossuficiente (zero dependências externas) contendo:

- Hero section com headline e CTA
- Campo de busca de CNPJ com validação módulo-11
- Seções: Features, Pricing, Trust Strip, How It Works, Disclaimer
- Footer com links para páginas legais

**Comando equivalente:**
```bash
# O agente Atlas classificou a requisição e delegou ao Astra
# Resultado: 1 arquivo HTML autossuficiente (~8KB)
```

---

## Etapa 2: Polimento visual e acessibilidade

**Modo:** `standard`

Adicionado ao HTML estático:

- **Dark/light mode** com `localStorage` + `prefers-color-scheme`
- **Glassmorphism** nos cards (backdrop-filter + transparência)
- **Ícones SVG inline** (sol, lua, prédio, busca, escudo, check, seta)
- **Validação real de CNPJ** (algoritmo módulo-11 da Receita Federal)
- **Acessibilidade:** `aria-live` para feedback de busca, `aria-label` em todos os controles, `prefers-reduced-motion`
- **Mock database:** 7 empresas fictícias com CNPJs válidos

---

## Etapa 3: Auditoria de segurança e LGPD

**Modo:** `full`  
**Agentes:** Sage (QA-Engineer — auditoria independente), Phoenix (remediação)

### 12 achados identificados pelo Sage

| Severidade | Achado | Remediação |
|-----------|--------|------------|
| CRITICAL | `innerHTML` com input do usuário | Substituído por `createTextNode` / DOM API |
| CRITICAL | CSP ausente | Adicionado meta tag CSP |
| HIGH | CNPJs reais no mock | Substituídos por 7 CNPJs fictícios |
| HIGH | Clickjacking sem proteção | `frame-ancestors 'none'` + frame-busting JS |
| MEDIUM | Páginas legais ausentes | Criado `privacidade.html`, `termos.html`, `lgpd.html` |
| MEDIUM | localStorage sem aviso | Adicionado disclosure no disclaimer |
| LOW | Labels de formulário | Adicionado `<label>` explícito |
| LOW | Contraste em dark mode | Ajustado paleta de cores |
| LOW | Foco de teclado | Estilizado `:focus-visible` |
| LOW | Meta viewport | Adicionado `viewport` meta tag |
| LOW | Lang attribute | Adicionado `lang="pt-BR"` |
| LOW | Alt text em ícones | Adicionado `aria-hidden` + texto alternativo |

**Validação:** Todas as 12 remediações foram verificadas pelo Sage em segunda rodada — `PASS`.

---

## Etapa 4: Migração para React + Vite

**Modo:** `standard`  
**Agentes:** Atlas (roteador), Astra (implementação)

### Arquitetura

```
src/
├── main.jsx                    # Entry point
├── App.jsx + App.module.css    # Root component
├── components/
│   ├── Nav.jsx + Nav.module.css
│   ├── Hero.jsx + Hero.module.css
│   ├── SearchCard.jsx + SearchCard.module.css
│   ├── TrustStrip.jsx + TrustStrip.module.css
│   ├── Features.jsx + Features.module.css
│   ├── HowItWorks.jsx + HowItWorks.module.css
│   ├── Pricing.jsx + Pricing.module.css
│   ├── CtaSection.jsx + CtaSection.module.css
│   ├── Disclaimer.jsx + Disclaimer.module.css
│   ├── Footer.jsx + Footer.module.css
│   └── Icons.jsx               # 7 SVG icon components
├── hooks/
│   ├── useTheme.js             # Dark/light mode
│   └── useCnpjSearch.js        # CNPJ validation + mock DB
└── styles/
    └── global.css              # Custom properties, reset, buttons
```

### Decisões técnicas

- **CSS Modules** sobre styled-components — mantém zero dependências de runtime e usa suporte nativo do Vite
- **`localsConvention: 'camelCase'`** no `vite.config.js` — permite `styles.footerRow`
- **`base: './'`** no build — caminhos relativos no `dist/`
- **Sem `dangerouslySetInnerHTML`** — todo texto dinâmico usa DOM API segura

**Comando de build:**
```bash
npm run build
# vite build → 55 módulos → ~52KB gzip (JS + CSS)
```

---

## Etapa 5: Testes E2E com Playwright

**Modo:** `standard`  
**Validação:** Playwright test runner

### 20 cenários de teste em `e2e/landing.spec.js`

| Categoria | Testes |
|-----------|--------|
| Renderização | Hero, Features, Pricing, Trust Strip, CTA visíveis |
| Busca de CNPJ | CNPJ válido, inválido, vazio, formato incorreto |
| Dark mode | Toggle, persistência localStorage, `prefers-color-scheme` |
| Acessibilidade | `aria-live` feedback, `aria-label`, contraste |
| Responsividade | Mobile (375px), tablet (768px), desktop (1280px) |
| Segurança | CSP meta tag presente, frame-busting ativo |

**Comando:**
```bash
npm test
# npx playwright test → 20 passed (0 flaky)
```

**Configuração:** `playwright.config.js` com `webServer` apontando para `npm run dev` (Vite HMR).

---

## Etapa 6: Release v1.0.0

**Modo:** `full`

- `CHANGELOG.md` com notas da versão
- `npm version 1.0.0` — tag `v1.0.0`
- `npm pack` — tarball `consulta-cnpj-1.0.0.tgz`
- Commit `chore: set version 1.0.0 with changelog`

---

## Etapa 7: Assinatura AI Workflow Kit

**Agente:** Atlas executou `npx ai-workflow collect-evidence`

O projeto foi registrado com:

```json
// .ai-workflow.json
{
  "package": "@williambeto/ai-workflow",
  "kitVersion": "2.2.7",
  "profile": "full",
  "mode": "standalone"
}
```

**Doctor check:**
```bash
npx ai-workflow doctor
# PASS 11/11 — sem problemas de integridade
```

---

## Etapa 8: Badge no rodapé

Adicionado ao `Footer.jsx` um selo com link para o site do AI Workflow Kit:

```
Desenvolvido com AI Workflow Kit  →  https://ai-workflow-kit-site.pages.dev/
```

---

## Evidências coletadas

| Evidência | Ferramenta | Resultado |
|-----------|-----------|-----------|
| Build de produção | `vite build` | 55 módulos, 52KB gzip |
| Testes E2E | `playwright test` | 20/20 passando |
| Auditoria de segurança | Sage (QA-Engineer) | 12 achados → 12 resolvidos |
| Validação CSP | Chrome DevTools | `Content-Security-Policy` presente |
| Frame-busting | Chrome DevTools | `top !== self` ativo |
| Modo escuro | Playwright + snapshots | Alternância + persistência OK |
| Responsividade | Playwright viewport | 3 breakpoints funcionais |
| CNPJ módulo-11 | `useCnpjSearch` hook | 7 CNPJs fictícios válidos |
| AI Workflow doctor | `ai-workflow doctor` | 11/11 PASS |
| Assinatura | `.ai-workflow.json` | v2.2.7, profile full |

---

## Como rodar localmente

```bash
# 1. Clonar
git clone https://github.com/williambeto/consulta-cnpj.git
cd consulta-cnpj

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
# Abrir http://localhost:5173

# 4. Build de produção
npm run build
npm run preview

# 5. Testes E2E
npx playwright install chromium
npm test

# 6. Validação AI Workflow
npx ai-workflow doctor
```

---

## Por que isso prova que o AI Workflow Kit funciona

1. **Fluxo proporcional:** O Atlas selecionou o modo correto (`quick` → `standard` → `full`) conforme o risco de cada etapa, sem burocracia desnecessária.

2. **Segurança real:** O Sage encontrou vulnerabilidades concretas (`innerHTML`, CSP ausente, clickjacking) que foram todas remediadas e revalidadas.

3. **Testes automatizados:** 20 cenários E2E executáveis com um comando, sem scripts falsos ou checklists manuais vazios.

4. **Rastreabilidade:** Cada etapa gerou evidência persistente (commits, logs de build, relatórios de teste, auditoria de segurança).

5. **Zero dependências externas em runtime:** O bundle final é React puro + CSS, sem bibliotecas de terceiros no carregamento da página.

6. **Processo documentado e reproduzível:** Este arquivo `PROCESS.md` permite que qualquer pessoa refaça o caminho e obtenha o mesmo resultado.

---

## Agentes do AI Workflow Kit utilizados

| Agente | Função | Etapas |
|--------|--------|--------|
| **Atlas** | Roteador e coordenador | Todas — classificação, seleção de modo, branch safety |
| **Astra** | Implementação | HTML inicial, migração React, componentes |
| **Sage** | Validação independente | Auditoria de segurança (12 achados), revalidação pós-remediação |
| **Phoenix** | Remediação | Correção dos 12 achados de segurança |

---

*Documento gerado como evidência do processo. Última atualização: 2026-06-16.*
