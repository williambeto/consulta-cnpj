# Prompt: Recriar o site CNPJ Fácil do zero com AI Workflow Kit

> Para referência, o resultado final está publicado em https://cnpj-facil.pages.dev/
> e o código fonte em https://github.com/williambeto/consulta-cnpj

---

## Instrução principal

Você vai criar uma landing page completa para um produto fictício chamado **CNPJ Fácil** — uma interface de consulta de dados cadastrais de CNPJ. O trabalho será feito em etapas, usando o **AI Workflow Kit v2.2.7** como orquestrador. Ao final, o site estará publicado no Cloudflare Pages.

---

## Regras absolutas (não negociáveis)

1. **Nunca commitar direto no `main`.** Use branch de feature (`feat/landing-page-cnpj`) e depois faça merge.
2. **Toda etapa com escrita deve ter validação observável** — build, teste, ou comando que confirme o resultado.
3. **Nunca reportar sucesso se a validação falhou.**
4. **Idioma:** todo o conteúdo visível do site em português (pt-BR). Código e documentação podem usar termos técnicos em inglês.
5. **Zero dependências externas em runtime** — apenas React e CSS Modules. Nada de Tailwind, Bootstrap, styled-components, Google Fonts, CDNs.
6. **Dados fictícios:** todas as empresas e CNPJs são simulados. Nenhum CNPJ real da Receita Federal.
7. **LGPD compliance:** páginas de privacidade, termos de uso e direitos do titular.

---

## Etapa 1: Inicialização do projeto

```bash
mkdir cnpj-facil && cd cnpj-facil
git init
npm init -y
npm install @williambeto/ai-workflow@2.2.7
npx ai-workflow init
```

O `package.json` deve ficar com:
```json
"name": "consulta-cnpj",
"version": "1.0.0",
"private": true,
"type": "module"
```

---

## Etapa 2: Single-file HTML (protótipo funcional)

Crie um arquivo `index.html` autossuficiente com:

### Seções obrigatórias
- **Nav:** logo "CNPJ Fácil" + links âncora (Benefícios, Como funciona, Planos) + botão "Consultar CNPJ"
- **Hero:** headline "Consulte um CNPJ em poucos segundos." + subtítulo + CTA "Fazer consulta gratuita" + 3 selos (Consulta gratuita, Sem cadastro, Dados públicos)
- **SearchCard:** input de 14 dígitos com label "CNPJ da empresa", placeholder "12.345.678/0001-90", botão "Consultar"
- **TrustStrip:** "50 mi+ CNPJs indexados", "< 1 s tempo médio de resposta", "100% foco em dados públicos"
- **Features:** 3 cards (Consulta objetiva, Experiência segura, Dados compreensíveis)
- **HowItWorks:** 3 passos numerados (01 Digite o CNPJ, 02 Validamos o formato, 03 Analise os dados)
- **Pricing:** 3 planos — Grátis (R$0/mês, 10 consultas/dia), Profissional (R$79/mês, 500 consultas/dia, destaque "MAIS POPULAR"), Empresarial (R$249/mês, ilimitado)
- **CTA Section:** "Mais clareza antes de fechar negócio." + botão "Consultar agora"
- **Disclaimer:** "Este é um produto fictício criado para fins de demonstração."
- **Footer:** © 2026 CNPJ Fácil + links Privacidade, Termos de uso, LGPD

### Funcionalidades obrigatórias
- **Validação de CNPJ** usando o algoritmo módulo-11 oficial (pesos 5,4,3,2,9,8,7,6,5,4,3,2 para o primeiro dígito e 6,5,4,3,2,9,8,7,6,5,4,3,2 para o segundo)
- **Mock database** com 7 empresas fictícias:

```js
const MOCK_DATABASE = [
  { cnpj: '12345678000190', razao_social: 'Aurora Tecnologia Brasileira Ltda.', nome_fantasia: 'Aurora Tech', situacao: 'ATIVA', data_abertura: '2010-03-15', cnae_principal: '62.01-5-00 - Desenvolvimento de software', municipio: 'São Paulo', uf: 'SP' },
  { cnpj: '98765432000110', razao_social: 'Construtora Nova Era S.A.', nome_fantasia: 'Nova Era Engenharia', situacao: 'ATIVA', data_abertura: '2005-07-22', cnae_principal: '41.20-4-00 - Construcao de edificios', municipio: 'Rio de Janeiro', uf: 'RJ' },
  { cnpj: '45678901000123', razao_social: 'Comercial Alimenta Brasil Ltda.', nome_fantasia: 'Alimenta Brasil', situacao: 'ATIVA', data_abertura: '2018-01-10', cnae_principal: '46.39-7-01 - Comercio atacadista de alimentos', municipio: 'Belo Horizonte', uf: 'MG' },
  { cnpj: '78901234000156', razao_social: 'Transportes Rota Certa Eireli', nome_fantasia: 'Rota Certa Logistica', situacao: 'ATIVA', data_abertura: '2012-09-05', cnae_principal: '49.30-2-02 - Transporte rodoviario de carga', municipio: 'Curitiba', uf: 'PR' },
  { cnpj: '32165498000177', razao_social: 'Grafica Expresso Digital Ltda.', nome_fantasia: 'Expresso Digital', situacao: 'SUSPENSA', data_abertura: '2016-04-18', cnae_principal: '18.12-6-01 - Impressao de material grafico', municipio: 'Porto Alegre', uf: 'RS' },
  { cnpj: '65498732000188', razao_social: 'Clinica Bem Estar S.S. Ltda.', nome_fantasia: 'Bem Estar Saude', situacao: 'ATIVA', data_abertura: '2019-11-30', cnae_principal: '86.30-5-03 - Atividade medica ambulatorial', municipio: 'Salvador', uf: 'BA' },
  { cnpj: '14725836000199', razao_social: 'Tech Solutions Nordeste S.A.', nome_fantasia: 'TS Nordeste', situacao: 'ATIVA', data_abertura: '2014-06-20', cnae_principal: '62.09-1-00 - Suporte tecnico em TI', municipio: 'Recife', uf: 'PE' }
];
```

- Resultado da busca exibido em card com: Razão Social, Nome Fantasia, Situação, Data de Abertura, CNAE, Município/UF
- Feedback de erro com `aria-live="polite"` para CNPJ inválido, vazio ou não encontrado

### Estilo visual
- Design system com variáveis CSS custom properties no `:root`
- Paleta: fundo claro `#f7f8fc`, texto `#101426`, primary `#2357ff`, secondary `#00a878`
- **Glassmorphism:** cards com `backdrop-filter: blur(18px)`, `background: rgba(255,255,255,0.84)`, bordas sutis
- **Dark mode** com `[data-theme="dark"]` — fundo `#080b14`, superfície `rgba(19,24,41,0.82)`, primary `#7593ff`
- Toggle de tema com localStorage + `prefers-color-scheme`
- Tipografia: Inter ou system-ui, headings com `letter-spacing: -0.055em`
- Responsivo: container `max-width: 1180px`, breakpoints em 960px e 680px

### SVG Icons inline (sem bibliotecas)
Sol, Lua, Prédio, Busca, Escudo, Check, Seta direita — todos `stroke="currentColor"`, `fill="none"`, `viewBox="0 0 24 24"`

---

## Etapa 3: Segurança e LGPD

Antes de continuar, o Sage (QA-Engineer) deve auditar o HTML e encontrar vulnerabilidades. Corrija **todas** antes de prosseguir:

1. **CRITICAL:** Zero `innerHTML` — usar `createTextNode` ou `Node.TEXT_NODE`
2. **CRITICAL:** CSP via `<meta>` tag: `default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'`
3. **HIGH:** Substituir qualquer CNPJ real por fictício (mock database acima)
4. **HIGH:** Frame-busting: `<script>if (top !== self) top.location = self.location;</script>`
5. **MEDIUM:** Criar `privacidade.html`, `termos.html`, `lgpd.html` (páginas estáticas em `public/`)
6. **MEDIUM:** Disclaimer mencionando uso de localStorage para tema

---

## Etapa 4: Migração para React 18 + Vite 5

```bash
npm install react@18 react-dom@18
npm install -D vite@5 @vitejs/plugin-react@4
```

### Estrutura de arquivos
```
src/
├── main.jsx
├── App.jsx + App.module.css
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
│   └── Icons.jsx
├── hooks/
│   ├── useTheme.js
│   └── useCnpjSearch.js
└── styles/
    └── global.css
```

### Regras técnicas
- **CSS Modules** com `localsConvention: 'camelCase'` no `vite.config.js`
- **Sem `dangerouslySetInnerHTML`** — usar `document.createTextNode` onde necessário
- **Sem `useEffect` para o tema** — inicializar o estado com leitura síncrona de localStorage + matchMedia
- `vite.config.js` com `base: './'` para caminhos relativos no build
- `index.html` como entry point Vite com `<div id="root">` + CSP meta tag

---

## Etapa 5: Testes E2E com Playwright

```bash
npm install -D @playwright/test@1.45
npx playwright install chromium
```

Arquivo `playwright.config.js`:
```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'e2e',
  webServer: { command: 'npm run dev', port: 5173, reuseExistingServer: true },
  use: { baseURL: 'http://localhost:5173' },
});
```

Arquivo `e2e/landing.spec.js` com **20 testes:**

### Renderização (5)
1. Página carrega com título "CNPJ Fácil"
2. Hero section visível
3. Seção de Features visível
4. Seção de Pricing visível
5. TrustStrip com "50 mi+" visível

### Busca de CNPJ (4)
6. CNPJ válido (12345678000190) retorna dados da Aurora Tech
7. CNPJ inválido (dígito verificador errado) mostra mensagem de erro
8. CNPJ vazio mostra mensagem de validação
9. CNPJ com formato incorreto (letras) mostra erro

### Dark mode (3)
10. Botão de toggle alterna data-theme no `<html>`
11. Tema persiste no localStorage após toggle
12. Tema respeita `prefers-color-scheme: dark` na primeira visita

### Acessibilidade (3)
13. Campo de busca tem label associada
14. Resultado usa aria-live para feedback
15. Botão de tema tem aria-label

### Responsividade (3)
16. Layout mobile (375px) não quebra
17. Layout tablet (768px) funcional
18. Layout desktop (1280px) completo

### Segurança (2)
19. CSP meta tag presente no `<head>`
20. Script frame-busting presente no `<body>`

---

## Etapa 6: Release

```bash
npm run build        # Deve gerar dist/ com ~52KB gzip
npm test             # 20/20 passando
```

- Criar `CHANGELOG.md`
- Tag `v1.0.0`
- `npm pack` gera `consulta-cnpj-1.0.0.tgz`

---

## Etapa 7: Assinatura AI Workflow Kit

```bash
npx ai-workflow doctor          # Deve retornar PASS 11/11
npx ai-workflow collect-evidence --mode=full --task=cnpj-facil-landing
```

Adicionar no Footer o badge:
```html
<a href="https://ai-workflow-kit-site.pages.dev/" target="_blank" rel="noopener noreferrer">
  Desenvolvido com AI Workflow Kit
</a>
```

---

## Etapa 8: Cloudflare Pages

Criar `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Content-Security-Policy: default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none';

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Deploy no Cloudflare Pages:
- Conectar repositório GitHub
- Branch: `main`
- Build command: `npm run build`
- Output directory: `dist`

---

## Etapa 9: Documentação

Criar `README.md` com:
- Nome do projeto e link publicado
- Stack utilizada
- Como rodar localmente (clone, install, dev, build, test)
- Estrutura de diretórios
- Como editar e criar sua própria versão
- Badge AI Workflow Kit

---

## Exemplo visual de referência

O resultado final deve ser visualmente idêntico ao publicado em https://cnpj-facil.pages.dev/

Características visuais:
- Nav com glassmorphism, sticky no topo
- Hero com gradiente radial no fundo, headline grande (clamp 2.1rem → 3.7rem)
- Cards com borda sutil, sombra suave, cantos arredondados (16px a 32px)
- Input de busca com ícone, borda arredondada, foco com outline primary
- Tabela de preços com 3 colunas, destaque central "MAIS POPULAR" com badge
- Footer com linha separadora, links discretos, badge do AI Workflow Kit
- Transições suaves em hover (transform, box-shadow, color)
- Dark mode com cores invertidas mantendo contraste adequado

---

## Validação final

Antes de considerar concluído, todos estes comandos devem passar:

```bash
npm run build          # 0 erros
npm test               # 20 passed
npx ai-workflow doctor # 11/11 PASS
```

E o site deve estar acessível publicamente com:
- HTTP 200 em `/`, `/privacidade.html`, `/termos.html`, `/lgpd.html`
- Headers CSP, X-Frame-Options, HSTS presentes
- Badge "Desenvolvido com AI Workflow Kit" no rodapé
