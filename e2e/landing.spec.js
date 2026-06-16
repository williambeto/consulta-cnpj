import { test, expect } from '@playwright/test';

test.describe('CNPJ Facil Landing Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/CNPJ Fácil/);
  });

  test('should render the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Consulte um CNPJ');
  });

  test('should have navigation links', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav')).toContainText('Beneficios');
    await expect(page.locator('nav')).toContainText('Como funciona');
    await expect(page.locator('nav')).toContainText('Planos');
  });

  test('should have all major sections', async ({ page }) => {
    await expect(page.locator('text=MAIS CONFIANCA NA DECISAO')).toBeVisible();
    await expect(page.locator('#como-funciona')).toBeVisible();
    await expect(page.locator('#planos')).toBeVisible();
    await expect(page.locator('text=Consultar agora')).toBeVisible();
  });

  test('should have trust strip stats', async ({ page }) => {
    await expect(page.locator('text=50 mi+')).toBeVisible();
    await expect(page.locator('text=100%')).toBeVisible();
  });

  test('should have pricing plans', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Gratis' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Profissional' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Empresarial' })).toBeVisible();
  });

  test('should have disclaimer', async ({ page }) => {
    await expect(page.getByText('Aviso:')).toBeVisible();
  });

  test('should have footer with legal links', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Privacidade');
    await expect(page.locator('footer')).toContainText('Termos de uso');
    await expect(page.locator('footer')).toContainText('LGPD');
  });

  test('should render the search form', async ({ page }) => {
    const input = page.locator('#cnpj');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('inputmode', 'numeric');
    await expect(page.locator('button[type="submit"]')).toContainText('Consultar');
  });

  test('should format CNPJ while typing', async ({ page }) => {
    const input = page.locator('#cnpj');
    await input.fill('00123456000190');
    await expect(input).toHaveValue('00.123.456/0001-90');
  });

  test('should show error for invalid CNPJ', async ({ page }) => {
    const input = page.locator('#cnpj');
    await input.fill('11.111.111/1111-11');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#cnpjHelp')).toContainText('valido');
  });

  test('should show result for valid CNPJ (fallback)', async ({ page }) => {
    const input = page.locator('#cnpj');
    // 00.000.000/0001-91 is a mathematically valid CNPJ (Banco do Brasil)
    await input.fill('00.000.000/0001-91');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toBeVisible();
    await expect(page.locator('[aria-live="polite"]')).toContainText('Empresa Exemplo');
  });

  test('should toggle dark mode', async ({ page }) => {
    const themeButton = page.locator('button[aria-label*="Alternar tema"]');
    await expect(themeButton).toBeVisible();
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('dark mode should persist across reload', async ({ page }) => {
    const themeButton = page.locator('button[aria-label*="Alternar tema"]');
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    // Clean up
    await page.evaluate(() => localStorage.removeItem('cnpj-facil-theme'));
  });

  test('should have CSP meta tag', async ({ page }) => {
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(csp).toBeAttached();
  });

  test('should be responsive (mobile viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    // Page should still render without horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test('should have functional CTA buttons', async ({ page }) => {
    const ctaButtons = page.locator('a[href="#consulta"]');
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should have all 3 feature cards', async ({ page }) => {
    const features = page.locator('text=Consulta objetiva, text=Experiencia segura, text=Dados compreensiveis');
    await expect(page.locator('text=Consulta objetiva')).toBeVisible();
    await expect(page.locator('text=Experiencia segura')).toBeVisible();
    await expect(page.locator('text=Dados compreensiveis')).toBeVisible();
  });

  test('should have 3 how-it-works steps', async ({ page }) => {
    await expect(page.locator('text=Digite o CNPJ')).toBeVisible();
    await expect(page.locator('text=Validamos o formato')).toBeVisible();
    await expect(page.locator('text=Analise os dados')).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err));
    await page.reload();
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

});
