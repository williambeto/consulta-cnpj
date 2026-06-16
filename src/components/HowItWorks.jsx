import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section className={`section ${styles.how}`} id="como-funciona">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Como funciona</span>
          <h2>Da busca ao resultado em tres passos.</h2>
        </div>

        <div className={styles.steps}>
          <article className={styles.step}>
            <h3>Digite o CNPJ</h3>
            <p>Informe os 14 numeros do cadastro da empresa que deseja consultar.</p>
          </article>
          <article className={styles.step}>
            <h3>Validamos o formato</h3>
            <p>O sistema verifica a estrutura e os digitos verificadores do CNPJ usando o algoritmo oficial da Receita Federal.</p>
          </article>
          <article className={styles.step}>
            <h3>Analise os dados</h3>
            <p>Receba uma visao limpa dos principais dados cadastrais da empresa com dicas de interpretacao.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
