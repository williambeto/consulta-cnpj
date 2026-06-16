# Changelog

All notable changes to the Consulta CNPJ landing page project.

## [1.0.0] — 2026-06-16

### Added
- React 18 + Vite 5 project setup with CSS Modules
- 10 components: Nav, Hero, SearchCard, TrustStrip, Features, HowItWorks, Pricing, CtaSection, Disclaimer, Footer
- Custom hooks: `useTheme` (dark/light mode + localStorage + prefers-color-scheme), `useCnpjSearch` (modulo-11 validation + mock data)
- 7 inline SVG icon components (Sun, Moon, Building, Search, Shield, Check, ArrowRight, Store)
- 20 Playwright E2E tests covering rendering, search, dark mode, a11y, responsiveness
- Content Security Policy (CSP) meta tag with frame-ancestors, script-src, base-uri
- Anti-clickjacking frame-busting script
- LGPD compliance: privacy policy, terms of use, and data rights pages

### Security
- Replaced all `innerHTML` usage with safe DOM (`createTextNode`, `textContent`) — XSS mitigation
- `frame-ancestors 'none'` CSP directive + frame-busting script — clickjacking protection
- Zero external dependencies at runtime — no CDN, no third-party scripts, no tracking

### Changed
- Mock database: all entries are 100% fictional (7 companies). No real CNPJs or company names.
- Footer links now point to real legal pages instead of dead `#` anchors
- Disclaimer includes localStorage disclosure

### Infrastructure
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/` (55 modules, ~52 KB gzipped JS)
- `npm test` — Playwright E2E suite (20 tests)
- Semantic versioning: 1.0.0

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** — breaking changes to the public API or visual behavior
- **MINOR** — new features, backward-compatible
- **PATCH** — bug fixes, security patches, dependency updates
