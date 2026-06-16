# Deploy no Cloudflare Pages

Este documento descreve como publicar o projeto **CNPJ Fácil** no **Cloudflare Pages** (pages.dev).

---

## Pré-requisitos

- Conta no [Cloudflare](https://dash.cloudflare.com/)
- Repositório no GitHub: https://github.com/williambeto/consulta-cnpj
- Node.js 20+ (o build roda no ambiente da Cloudflare automaticamente)

---

## Configuração do projeto para Cloudflare Pages

O projeto já está pronto. Os arquivos de configuração estão em `public/` e são copiados para `dist/` durante o build:

### `public/_headers` — Headers de segurança

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Content-Security-Policy: default-src 'none'; style-src 'self' 'unsafe-inline'; ...

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Isso garante que:
- O site não pode ser em iframe (`X-Frame-Options: DENY`)
- MIME types não podem ser alterados (`X-Content-Type-Options: nosniff`)
- CSP aplicado como HTTP header (mais forte que meta tag)
- Arquivos estáticos em `/assets/` têm cache de 1 ano (fingerprint no nome)

### `index.html` — Entry point Vite + CSP meta tag

O CSP também está como `<meta>` tag no HTML como defesa em profundidade.

---

## Método 1: Deploy via dashboard (recomendado para primeira vez)

1. Acesse [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Clique em **Create application → Pages → Connect to Git**
3. Selecione o repositório `williambeto/consulta-cnpj`
4. Configure o build:

| Campo | Valor |
|-------|-------|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

5. Clique em **Save and Deploy**

O deploy leva ~1-2 minutos. Após concluído, o site estará disponível em:

```
https://cnpj-facil.pages.dev
```

> **Nota:** O subdomínio `cnpj-facil.pages.dev` será gerado automaticamente. Você pode configurar um domínio personalizado depois.

---

## Método 2: Deploy via Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Login na Cloudflare
wrangler login

# Deploy
npx wrangler pages deploy dist --project-name=cnpj-facil

# Ou criar o projeto primeiro (se for a primeira vez)
npx wrangler pages project create consulta-cnpj --production-branch=main
npx wrangler pages deploy dist --project-name=cnpj-facil
```

---

## Método 3: Deploy via GitHub Actions (CI/CD)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: cnpj-facil
          directory: dist
```

Configure os secrets no GitHub:
- `CLOUDFLARE_API_TOKEN`: crie em [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) com permissão `Cloudflare Pages — Edit`
- `CLOUDFLARE_ACCOUNT_ID`: encontre no dashboard da Cloudflare (Account ID)

---

## Verificações pós-deploy

Após o deploy, confirme que tudo funciona:

```bash
# 1. Site no ar
curl -I https://cnpj-facil.pages.dev

# 2. Headers de segurança
curl -I https://cnpj-facil.pages.dev | grep -E "x-frame-options|content-security-policy|x-content-type-options"

# 3. CSP ativo como HTTP header
curl -s https://cnpj-facil.pages.dev | grep "Content-Security-Policy"

# 4. Páginas estáticas acessíveis
curl -s -o /dev/null -w "%{http_code}" https://cnpj-facil.pages.dev/privacidade.html
curl -s -o /dev/null -w "%{http_code}" https://cnpj-facil.pages.dev/termos.html
curl -s -o /dev/null -w "%{http_code}" https://cnpj-facil.pages.dev/lgpd.html

# 5. Teste de frame-busting (deve bloquear iframe)
# Abra o console do navegador em outro site e tente:
# document.body.innerHTML = '<iframe src="https://cnpj-facil.pages.dev"></iframe>'
# O frame-busting deve redirecionar ou o X-Frame-Options deve bloquear
```

---

## Variáveis de ambiente (opcional)

Nenhuma variável de ambiente é necessária. O projeto é 100% estático e não consome APIs externas.

Se futuramente quiser adicionar uma API real de consulta CNPJ, configure em:
**Cloudflare Dashboard → Pages → cnpj-facil → Settings → Environment variables**

---

## Rollback

Para reverter um deploy problemático:

1. **Dashboard:** Cloudflare Pages → consulta-cnpj → Deployments → clique no deploy anterior → **Rollback to this deployment**
2. **Git:** `git revert <commit>` e push — o Cloudflare Pages fará deploy automático do novo commit

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Build falha no Cloudflare | Verifique se `npm run build` funciona localmente. O Cloudflare usa Node 18 por padrão — compatível. |
| Página em branco | Confira se o `dist/` contém `index.html`. O output directory deve ser `dist`, não `dist/assets`. |
| CSP bloqueia estilos | O `'unsafe-inline'` em `style-src` é necessário para CSS Modules do Vite. Já está configurado. |
| Legal pages 404 | Arquivos em `public/` são copiados para `dist/` pelo Vite. Confirme que `privacidade.html`, `termos.html` e `lgpd.html` existem em `public/`. |
| Domínio customizado | Cloudflare Pages → consulta-cnpj → Custom domains → Add domain |

---

*Documento gerado como parte da evidência do processo AI Workflow Kit. Última atualização: 2026-06-16.*
