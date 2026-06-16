import { Search, Shield, Store } from './Icons';
import styles from './Features.module.css';

export default function Features() {
  return (
    <section className="section" id="beneficios">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Mais confianca na decisao</span>
          <h2>O essencial sobre uma empresa, sem ruido.</h2>
          <p>Uma interface pensada para transformar dados cadastrais em informacao util, legivel e facil de verificar.</p>
        </div>

        <div className={styles.features}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true"><Search /></div>
            <h3>Consulta objetiva</h3>
            <p>Veja situacao cadastral, razao social, nome fantasia, municipio e atividade principal num unico lugar.</p>
          </article>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true"><Shield /></div>
            <h3>Experiencia segura</h3>
            <p>Sem cadastro obrigatorio, sem exposicao desnecessaria e com mensagens claras em cada etapa da consulta.</p>
          </article>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true"><Store /></div>
            <h3>Dados compreensiveis</h3>
            <p>Campos organizados por relevancia para ajudar clientes, fornecedores e profissionais a interpretar o cadastro.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
