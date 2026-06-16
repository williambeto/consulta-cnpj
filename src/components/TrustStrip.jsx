import styles from './TrustStrip.module.css';

export default function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-label="Indicadores de confianca">
      <div className="container">
        <div className={styles.trustPanel}>
          <p>Informacao empresarial apresentada com clareza e contexto.</p>
          <div className={styles.trustStat}><strong>50 mi+</strong><span>CNPJs indexados</span></div>
          <div className={styles.trustStat}><strong>&lt; 1 s</strong><span>tempo medio de resposta</span></div>
          <div className={styles.trustStat}><strong>100%</strong><span>foco em dados publicos</span></div>
        </div>
      </div>
    </section>
  );
}
