import { Sun, Moon, Building, GitHub } from './Icons';
import styles from './Nav.module.css';

export default function Nav({ theme, onToggleTheme }) {
  return (
    <header className={styles.siteHeader}>
      <div className="container">
        <nav className={styles.nav} aria-label="Navegacao principal">
          <a className={styles.brand} href="#inicio" aria-label="CNPJ Fácil — pagina inicial">
            <span className={styles.brandMark} aria-hidden="true">
              <Building />
            </span>
            <span>CNPJ Fácil</span>
          </a>

          <div className={styles.navLinks}>
            <a href="#beneficios">Beneficios</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#planos">Planos</a>
          </div>

          <div className={styles.navActions}>
            <a className={styles.iconButton} href="https://github.com/williambeto/consulta-cnpj" target="_blank" rel="noopener noreferrer" aria-label="Codigo fonte no GitHub">
              <GitHub />
            </a>
            <button className={styles.iconButton} onClick={onToggleTheme} type="button" aria-label="Alternar tema claro/escuro">
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <a className="button button-primary" href="#consulta">Consultar CNPJ</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
