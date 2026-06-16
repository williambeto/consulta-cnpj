# CNPJ Fácil — Especificação

## O que é

Uma landing page para um produto fictício chamado **CNPJ Fácil** — interface de consulta de dados cadastrais de empresas brasileiras por CNPJ.

O site de referência está publicado em https://cnpj-facil.pages.dev/ e o código em https://github.com/williambeto/consulta-cnpj.

---

## Requisitos de produto

### Conteúdo e seções

O site deve conter:

- **Navegação** com a marca "CNPJ Fácil", links internos para as seções principais e um botão de chamada para consulta.
- **Hero** com headline, subtítulo, botão de ação principal e três selos de confiança (consulta gratuita, sem cadastro, dados públicos).
- **Campo de busca de CNPJ** com input para 14 dígitos, label acessível, placeholder de exemplo e botão de consulta.
- **Faixa de confiança** com três indicadores numéricos (CNPJs indexados, tempo de resposta, foco em dados públicos).
- **Seção de funcionalidades** com três cards descrevendo os diferenciais do produto.
- **Seção "Como funciona"** com três passos numerados explicando o fluxo de uso.
- **Tabela de planos e preços** com três níveis (gratuito, profissional, empresarial), cada um com lista de recursos e botão de ação. O plano do meio deve ter destaque visual.
- **Chamada para ação final** com headline e botão.
- **Aviso legal** informando que o produto é fictício, criado para demonstração, e que dados de consulta não são armazenados. Deve mencionar o uso de armazenamento local apenas para preferência de tema.
- **Rodapé** com copyright, links para páginas legais e crédito de desenvolvimento.

### Funcionalidades

- **Validação de CNPJ** usando o algoritmo módulo-11 oficial da Receita Federal (dois dígitos verificadores com pesos específicos).
- **Busca em base de dados simulada** contendo exatamente 7 empresas fictícias. Nenhum CNPJ real.
- **Exibição do resultado** da busca mostrando: razão social, nome fantasia, situação cadastral, data de abertura, CNAE principal, município e UF.
- **Feedback de erro** acessível quando o CNPJ for inválido, vazio, com formato incorreto ou não encontrado.
- **Modo escuro/claro** com toggle persistente e respeito à preferência do sistema operacional.

### Empresas fictícias obrigatórias

| CNPJ | Razão Social | UF |
|------|-------------|-----|
| 12.345.678/0001-90 | Aurora Tecnologia Brasileira Ltda. | SP |
| 98.765.432/0001-10 | Construtora Nova Era S.A. | RJ |
| 45.678.901/0001-23 | Comercial Alimenta Brasil Ltda. | MG |
| 78.901.234/0001-56 | Transportes Rota Certa Eireli | PR |
| 32.165.498/0001-77 | Gráfica Expresso Digital Ltda. | RS |
| 65.498.732/0001-88 | Clínica Bem Estar S.S. Ltda. | BA |
| 14.725.836/0001-99 | Tech Solutions Nordeste S.A. | PE |

Dados completos (situação, data de abertura, CNAE, nome fantasia) disponíveis no repositório de referência.

---

## Restrições técnicas

- **Idioma:** todo conteúdo visível em português brasileiro (pt-BR).
- **Dependências de runtime:** React. Nada de Tailwind, Bootstrap, styled-components, Google Fonts, CDNs ou bibliotecas de componentes.
- **Build:** Vite.
- **Estilização:** CSS Modules com variáveis CSS (custom properties) para o design system.
- **Segurança:** sem `innerHTML` com dados dinâmicos. Política de Segurança de Conteúdo (CSP) restritiva. Proteção contra clickjacking.
- **Acessibilidade:** labels associadas a inputs, feedback com região live, atributos aria em controles interativos, respeito a `prefers-reduced-motion`.
- **LGPD:** páginas estáticas de política de privacidade, termos de uso e direitos do titular.
- **Dados:** todo CNPJ e empresa são fictícios. Nenhum dado da Receita Federal.
- **Branch:** nunca commitar direto em `main`. Usar branch de feature.
- **Git:** sem `--force`, sem amend de commits já publicados, sem commits vazios.

---

## Qualidade visual

- Design com glassmorphism (transparência com desfoque de fundo), sombras suaves, bordas arredondadas.
- Paleta clara: fundo `#f7f8fc`, texto `#101426`, cor primária `#2357ff`.
- Paleta escura: fundo `#080b14`, superfície translúcida, cor primária `#7593ff`.
- Tipografia system-ui com headings em peso elevado e letter-spacing negativo.
- Responsivo: funcionar corretamente em mobile (375px), tablet (768px) e desktop (1280px+).
- Ícones SVG inline sem bibliotecas externas.
- Transições suaves em hover (transform, sombra, cor).

---

## Validação

### Testes automatizados obrigatórios

O projeto deve incluir testes E2E executáveis com um único comando que cubram:

1. Renderização das seções principais (hero, features, pricing, confiança).
2. Busca de CNPJ: válido retorna dados, inválido mostra erro, vazio mostra validação, formato incorreto mostra erro.
3. Modo escuro: toggle funciona, persiste em localStorage, respeita preferência do sistema.
4. Acessibilidade: labels em inputs, aria-live em feedback, aria-label em controles.
5. Responsividade: três larguras de viewport sem quebra de layout.
6. Segurança: CSP presente, proteção contra iframe ativa.

### Critérios de aceitação

```bash
npm run build          # build de produção sem erros
npm test               # todos os testes E2E passando
```

---

## Entrega

- **Código:** repositório Git com histórico limpo, branch `main` limpa, tag `v1.0.0`.
- **Build:** diretório `dist/` funcional servido estaticamente.
- **Documentação:** README explicando como clonar, instalar, rodar e editar o projeto.
- **Deploy:** site acessível publicamente em URL estática (Cloudflare Pages ou equivalente).
- **Headers HTTP de segurança:** CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy.
- **Crédito:** link visível no rodapé apontando para https://ai-workflow-kit-site.pages.dev/ com o texto "Desenvolvido com AI Workflow Kit".
- **Evidência:** o projeto deve estar assinado com AI Workflow Kit (`ai-workflow doctor` passa em todos os checks).
- **Rastreabilidade:** documentação do processo de desenvolvimento (decisões, validações, auditoria de segurança).
