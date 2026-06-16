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
    </footer>
  );
}
