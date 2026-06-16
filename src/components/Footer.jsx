import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div className={`container ${styles.footerRow}`}>
        <span>&copy; 2026 Consulta CNPJ. Produto ficticio para demonstracao.</span>
        <div className={styles.footerLinks}>
          <a href="/privacidade.html">Privacidade</a>
          <a href="/termos.html">Termos de uso</a>
          <a href="/lgpd.html">LGPD</a>
        </div>
      </div>
      <div className={`container ${styles.badgeRow}`}>
        <a
          href="https://ai-workflow-kit-site.pages.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.badge}
          aria-label="Desenvolvido com AI Workflow Kit"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Desenvolvido com AI Workflow Kit
        </a>
      </div>
    </footer>
  );
}
