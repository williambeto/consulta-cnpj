import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div>
            <h2>Mais clareza antes de fechar negocio.</h2>
            <p>Consulte um CNPJ e confirme os dados essenciais da empresa antes de avancar.</p>
          </div>
          <a className={`button ${styles.ctaBtn}`} href="#consulta" style={{borderRadius: '14px', padding: '0 20px', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'}}>Consultar agora</a>
        </div>
      </div>
    </section>
  );
}
