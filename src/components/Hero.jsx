import { ArrowRight, Check } from './Icons';
import SearchCard from './SearchCard';
import styles from './Hero.module.css';

export default function Hero({ cnpj, error, result, onInput, onSubmit }) {
  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true"></span>
            Dados empresariais sem complicacao
          </div>

          <h1>
            Consulte um CNPJ em{' '}
            <span className={styles.gradientText}>poucos segundos.</span>
          </h1>

          <p className={styles.heroCopy}>
            Encontre informacoes publicas de empresas brasileiras numa experiencia
            rapida, clara e feita para apoiar decisoes mais seguras.
          </p>

          <a className="button button-primary" href="#consulta">
            Fazer consulta gratuita
            <ArrowRight />
          </a>

          <ul className={styles.heroPoints}>
            <li><span className={styles.check} aria-hidden="true"><Check /></span>Consulta gratuita</li>
            <li><span className={styles.check} aria-hidden="true"><Check /></span>Sem cadastro</li>
            <li><span className={styles.check} aria-hidden="true"><Check /></span>Dados publicos</li>
          </ul>
        </div>

        <SearchCard cnpj={cnpj} error={error} result={result} onInput={onInput} onSubmit={onSubmit} />
      </div>
    </section>
  );
}
