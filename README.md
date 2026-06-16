# CNPJ Fácil

Landing page de consulta fictícia de CNPJ desenvolvida com **AI Workflow Kit v2.2.7** como prova de conceito de desenvolvimento orientado por agentes.

**[🌐 Site publicado](https://cnpj-facil.pages.dev/)** · **[📋 Release v1.0.0](https://github.com/williambeto/consulta-cnpj/releases/tag/v1.0.0)**

---

## Sobre o projeto

CNPJ Fácil é uma landing page fictícia que demonstra uma interface de consulta de CNPJ com:

- **Validação real** de CNPJ (algoritmo módulo-11 da Receita Federal)
- **Dark/light mode** com persistência local e `prefers-color-scheme`
- **Acessibilidade:** `aria-live`, `aria-label`, `prefers-reduced-motion`
- **Segurança:** CSP, anti-clickjacking, headers Hardened
- **LGPD:** páginas de privacidade, termos e direitos do titular
- **Zero dependências externas em runtime** — apenas React e CSS Modules

> ⚠️ **Aviso:** Este é um produto fictício. As empresas e CNPJs exibidos são simulados. Nenhum dado é enviado ou armazenado.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Estilos | CSS Modules |
| Testes | Playwright (20 cenários E2E) |
| Deploy | Cloudflare Pages |
| Orquestração | AI Workflow Kit v2.2.7 |

---

## Rodando localmente

```bash
# 1. Clone o repositório
git clone https://github.com/williambeto/consulta-cnpj.git
cd consulta-cnpj

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
# Abra http://localhost:5173

# 4. Ou faça o build de produção
npm run build
npm run preview
```

### Testes

```bash
# Instale o Chromium para Playwright (primeira vez)
npx playwright install chromium

# Execute os testes
npm test
```

Resultado esperado: `20 passed (20)`

---

## Estrutura do projeto

```
src/
├── main.jsx                     # Entry point
├── App.jsx + App.module.css     # Root component
├── components/
│   ├── Nav.jsx                  # Navegação + toggle tema
│   ├── Hero.jsx                 # Hero section
│   ├── SearchCard.jsx           # Busca de CNPJ
│   ├── TrustStrip.jsx           # Faixa de confiança
│   ├── Features.jsx             # Seção de features
│   ├── HowItWorks.jsx           # Como funciona (3 passos)
│   ├── Pricing.jsx              # Planos (Grátis/Profissional/Empresarial)
│   ├── CtaSection.jsx           # Chamada para ação
│   ├── Disclaimer.jsx           # Aviso de produto fictício
│   ├── Footer.jsx               # Rodapé + badge AI Workflow Kit
│   └── Icons.jsx                # Ícones SVG reutilizáveis
├── hooks/
│   ├── useTheme.js              # Dark/light mode
│   └── useCnpjSearch.js         # Validação CNPJ + mock database
└── styles/
    └── global.css               # Variáveis CSS, reset, botões
public/
├── _headers                     # Headers de segurança para Cloudflare
├── privacidade.html             # Política de privacidade
├── termos.html                  # Termos de uso
└── lgpd.html                    # Direitos LGPD
e2e/
└── landing.spec.js              # 20 testes E2E (Playwright)
```

---

## Como editar e criar sua própria versão

### 1. Mude o nome e identidade visual

```bash
# No arquivo index.html, altere o <title> e meta description
# Em src/components/Nav.jsx, altere o texto da marca
# Em src/components/Footer.jsx, altere o copyright
# Em src/styles/global.css, altere as variáveis :root para sua paleta
```

### 2. Substitua o banco de dados mock

Edite `src/hooks/useCnpjSearch.js`:

```js
// Troque os 7 CNPJs fictícios pelos seus dados:
const MOCK_DATABASE = [
  {
    cnpj: '12345678000190',
    razao_social: 'Sua Empresa Ltda.',
    // ...
  },
];
```

### 3. Conecte uma API real

No mesmo arquivo `useCnpjSearch.js`, substitua a busca no array por uma chamada fetch:

```js
const response = await fetch(`https://sua-api.com/cnpj/${cnpj}`);
return await response.json();
```

### 4. Personalize as páginas legais

Edite `public/privacidade.html`, `public/termos.html` e `public/lgpd.html` com suas políticas reais.

### 5. Build e deploy

```bash
npm run build   # Gera dist/
```

O `dist/` pode ser publicado em qualquer host estático (Cloudflare Pages, Vercel, Netlify, GitHub Pages, S3).

---

## Segurança

O projeto implementa defesa em profundidade:

| Camada | Mecanismo |
|--------|-----------|
| CSP (HTTP header) | Cloudflare `_headers` → `Content-Security-Policy` |
| CSP (meta tag) | `index.html` → `<meta http-equiv="Content-Security-Policy">` |
| Clickjacking | `X-Frame-Options: DENY` + `frame-ancestors 'none'` + frame-busting JS |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| HSTS | `Strict-Transport-Security` com preload |
| XSS | Zero `innerHTML` — apenas `createTextNode` e DOM API |

Todos os 12 achados da auditoria de segurança foram remediados. Veja [PROCESS.md](./PROCESS.md) para detalhes.

---

## AI Workflow Kit

Este projeto foi desenvolvido como evidência do funcionamento do **AI Workflow Kit**, um orquestrador de fluxo de trabalho com agentes especializados:

| Agente | Função no projeto |
|--------|------------------|
| **Atlas** | Roteador — classificação de tarefas e seleção de modo |
| **Astra** | Implementação — HTML, React, componentes |
| **Sage** | QA/Auditoria — 12 vulnerabilidades encontradas e validadas |
| **Phoenix** | Remediação — correção dos achados de segurança |

**Evidências do processo:**
- [PROCESS.md](./PROCESS.md) — Documento completo com 8 etapas reprodutíveis
- [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) — Guia de deploy
- [CHANGELOG.md](./CHANGELOG.md) — Histórico de versões
- Badge no rodapé do site → [ai-workflow-kit-site.pages.dev](https://ai-workflow-kit-site.pages.dev/)

---

## Licença

MIT — veja [package.json](./package.json).

---

*Desenvolvido com [AI Workflow Kit](https://ai-workflow-kit-site.pages.dev/)*
