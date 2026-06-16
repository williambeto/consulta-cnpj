// Validation suite for the polished CNPJ landing page
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { console.log(`  PASS: ${message}`); passed++; }
  else           { console.error(`  FAIL: ${message}`); failed++; }
}

function run() {
  console.log('=== CNPJ Fácil — Landing Page Validation ===\n');

  // ---- 1. File integrity ----
  assert(fs.existsSync(filePath), 'index.html exists');
  const html = fs.readFileSync(filePath, 'utf-8');
  assert(html.length > 2000, 'index.html has substantial content (>2KB)');

  // ---- 2. HTML structure ----
  assert(/<!DOCTYPE html>/i.test(html), 'contains DOCTYPE');
  assert(/<html[^>]*lang=["']pt-BR["']/.test(html), 'html lang="pt-BR"');
  assert(/<meta[^>]*charset=["']UTF-8["']/.test(html), 'charset UTF-8');
  assert(/<meta[^>]*viewport/.test(html), 'viewport meta');
  assert(/<meta[^>]*description/.test(html), 'meta description for SEO');
  assert(/<title[^>]*>CNPJ Fácil/.test(html), 'title contains brand name');

  // ---- 3. Semantic landmarks ----
  assert(/<header\b[^>]*class="site-header"/.test(html), '<header> with site-header class');
  assert(/<nav\b[^>]*aria-label/.test(html), '<nav> has aria-label');
  assert(/<main\b/.test(html), '<main> landmark');
  assert(/<footer\b/.test(html), '<footer> landmark');
  assert(/<section\b/.test(html), 'uses <section> elements');

  // ---- 4. Dark/light mode ----
  assert(/data-theme/.test(html), 'uses data-theme attribute');
  assert(/"dark"/.test(html) && /"light"/.test(html), 'supports both dark and light themes');
  assert(/prefers-color-scheme/.test(html), 'respects system color-scheme preference');
  assert(/localStorage/.test(html), 'persists theme choice via localStorage');
  assert(/color-mix\(/.test(html), 'uses color-mix() for modern theming');
  assert(/transition:.*background.*color/.test(html), 'smooth theme transition');

  // ---- 5. Branding ----
  assert(/CNPJ Fácil/.test(html), 'brand name present');
  assert(/CNPJ/.test(html), 'CNPJ keyword present');

  // ---- 6. Glassmorphism & visual polish ----
  assert(/backdrop-filter:.*blur/.test(html), 'glassmorphism (backdrop-filter blur)');
  assert(/linear-gradient\(/.test(html), 'uses gradients');
  assert(/radial-gradient\(/.test(html), 'uses radial gradients');
  assert(/box-shadow/.test(html), 'uses box shadows');
  assert(/transition:.*transform/.test(html), 'uses transform transitions for interactivity');

  // ---- 7. Typography ----
  assert(/font-family:.*Inter/.test(html), 'uses Inter font with system-ui fallback');
  assert(/clamp\(/.test(html), 'uses clamp() for fluid typography');
  assert(/letter-spacing:.*-0\.0/.test(html), 'uses negative letter-spacing for headings');

  // ---- 8. SVG icons (no emojis) ----
  assert(html.match(/<svg/g).length >= 5, 'uses 5+ inline SVG icons');
  assert(!/[\u{1F300}-\u{1F9FF}]/u.test(html.replace(/<svg[\s\S]*?<\/svg>/g, '')), 'no emojis outside SVGs');

  // ---- 9. Hero section ----
  assert(/<h1\b/.test(html), 'contains h1 heading');
  assert(/gradient-text/.test(html), 'gradient text class for heading');
  assert(/hero-points/.test(html), 'hero bullet points with check icons');

  // ---- 10. Search card ----
  assert(/search-card/.test(html), 'search card component');
  assert(/id="cnpjForm"/.test(html), 'CNPJ search form');
  assert(/id="cnpj"/.test(html), 'CNPJ input field');
  assert(/inputmode="numeric"/.test(html), 'numeric inputmode for CNPJ field');
  assert(/type="submit"/.test(html), 'submit button');
  assert(/aria-describedby/.test(html), 'input has aria-describedby for help text');
  assert(/aria-live="polite"/.test(html), 'result area has aria-live for screen readers');

  // ---- 11. Real CNPJ validation (modulo 11) ----
  assert(/function\s+isValidCnpj/.test(html), 'isValidCnpj validation function');
  assert(/calculateDigit/.test(html), 'CNPJ modulo-11 digit calculation');
  assert(/weight\s*--/.test(html), 'weight variable in digit calculation');
  assert(/%\s*11/.test(html), 'modulo 11 operation');
  assert(/length\s*!==\s*14/.test(html), 'validates 14-digit CNPJ length');

  // ---- 12. Mock database (all entries fictional) ----
  assert(/empresas\s*=/.test(html) || /empresas\s*:\s*\{/.test(html), 'mock company database');
  assert(/Aurora Tecnologia Brasileira/.test(html), 'fictional company 1: Aurora Tech');
  assert(/Construtora Nova Era/.test(html), 'fictional company 2: Nova Era');
  assert(!/Banco do Brasil/.test(html), 'no real company names (Banco do Brasil removed)');
  assert(!/Petrobras/.test(html), 'no real company names (Petrobras removed)');
  assert(!/Magazine Luiza/.test(html), 'no real company names (Magazine Luiza removed)');

  // ---- 13. Trust strip ----
  assert(/trust-strip/.test(html), 'trust strip section');
  assert(/50\s*mi\+/.test(html) || /50 mi\+/.test(html), '50M+ CNPJs stat');
  assert(/&lt;\s*1\s*s/.test(html) || /<\s*1\s*s/.test(html), 'response time stat (< 1 s)');

  // ---- 14. Features section ----
  assert(/section.*id="beneficios"/.test(html) || /id="beneficios"/.test(html), 'benefits section anchor');
  assert(/Consulta objetiva/.test(html), 'feature: consulta objetiva');
  assert(/Experiencia segura/.test(html), 'feature: experiencia segura');
  assert(/Dados compreensiveis/.test(html), 'feature: dados compreensiveis');

  // ---- 15. How it works ----
  assert(/id="como-funciona"/.test(html), 'how-it-works section anchor');
  assert(/Digite o CNPJ/.test(html), 'step 1: digite');
  assert(/Validamos/.test(html), 'step 2: validamos');
  assert(/Analise/.test(html), 'step 3: analise');

  // ---- 16. Pricing ----
  assert(/id="planos"/.test(html), 'pricing section anchor');
  assert(/Gr[aá]tis/.test(html), 'free plan');
  assert(/Profissional/.test(html), 'professional plan');
  assert(/Empresarial/.test(html), 'enterprise plan');

  // ---- 17. CTA & footer ----
  assert(/cta-card/.test(html), 'CTA card component');
  assert(/Mais clareza/.test(html), 'CTA heading');
  assert(/Consultar agora/.test(html), 'CTA button text');

  // ---- 18. Disclaimer ----
  assert(/fict[ií]cio/.test(html) || /fictional/.test(html), 'fictional product disclaimer');
  assert(/demonstra[çc][aã]o/.test(html), 'demonstration disclaimer');

  // ---- 19. Footer links ----
  assert(/Privacidade/.test(html), 'privacy link');
  assert(/Termos de uso/.test(html), 'terms link');
  assert(/LGPD/.test(html), 'LGPD link');
  assert(/href="privacidade\.html"/.test(html), 'privacy link points to real page');
  assert(/href="termos\.html"/.test(html), 'terms link points to real page');
  assert(/href="lgpd\.html"/.test(html), 'LGPD link points to real page');

  // ---- 20. Responsive design ----
  assert(/@media/.test(html), 'responsive media queries');
  assert(/max-width:\s*960px/.test(html), 'tablet breakpoint');
  assert(/max-width:\s*680px/.test(html), 'mobile breakpoint');
  assert(/grid-template-columns:\s*1fr/.test(html), 'responsive grid collapsing');

  // ---- 21. Accessibility ----
  assert(/prefers-reduced-motion/.test(html), 'respects reduced-motion preference');
  assert(/aria-label/.test(html), 'uses aria-label attributes');
  assert(/aria-hidden="true"/.test(html), 'hides decorative elements from screen readers');

  // ---- 22. No external dependencies ----
  assert(!/href="https?:\/\//.test(html.replace(/<svg[\s\S]*?<\/svg>/g, '')), 'no external HTTP dependencies (self-contained)');

  // ---- 23. Security: CSP meta tag ----
  assert(/Content-Security-Policy/.test(html), 'CSP meta tag present');
  assert(/frame-ancestors\s+'none'/.test(html), 'CSP: frame-ancestors none (anti-clickjacking)');
  assert(/script-src\s+'self'\s+'unsafe-inline'/.test(html), 'CSP: script-src restricted');

  // ---- 24. Security: XSS mitigation ----
  assert(!/resultStatus\.innerHTML\s*=/.test(html), 'no innerHTML assignment on resultStatus');
  assert(/updateResultStatus/.test(html), 'XSS-safe updateResultStatus function exists');
  assert(/Node\.TEXT_NODE/.test(html), 'uses text node for safe content insertion');
  assert(/createTextNode/.test(html), 'uses createTextNode for safe DOM construction');

  // ---- 25. Security: localStorage disclosure ----
  assert(/localStorage/i.test(html) && /preferencia de tema/.test(html) || /armazenad[ao] localmente/.test(html), 'localStorage theme usage disclosed');

  // ---- 26. Legal pages exist ----
  assert(fs.existsSync(path.join(__dirname, 'privacidade.html')), 'privacidade.html exists');
  assert(fs.existsSync(path.join(__dirname, 'termos.html')), 'termos.html exists');
  assert(fs.existsSync(path.join(__dirname, 'lgpd.html')), 'lgpd.html exists');

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  return failed === 0;
}

const result = run();
process.exit(result ? 0 : 1);
