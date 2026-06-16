import { useEffect, useRef } from 'react';
import { Search } from './Icons';
import styles from './SearchCard.module.css';

export default function SearchCard({ cnpj, error, result, onInput, onSubmit }) {
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);

  return (
    <div className={styles.searchCard} id="consulta">
      <span className={styles.cardKicker}>Consulta rapida</span>
      <h2>Qual empresa voce quer consultar?</h2>
      <p>Digite os 14 numeros do CNPJ para visualizar os dados cadastrais.</p>

      <form id="cnpjForm" noValidate onSubmit={onSubmit}>
        <label className={styles.fieldLabel} htmlFor="cnpj">CNPJ da empresa</label>

        <div className={styles.inputWrap}>
          <Search />
          <input
            id="cnpj"
            name="cnpj"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={18}
            placeholder="00.000.000/0000-00"
            aria-describedby="cnpjHelp"
            value={cnpj}
            onChange={onInput}
          />
          <button className="button button-primary" type="submit">Consultar</button>
        </div>

        <p className={`${styles.formHelp} ${error && !result ? styles.error : ''}`} id="cnpjHelp">
          {error || 'Exemplo: 12.345.678/0001-90'}
        </p>
      </form>

      {result && (
        <div className={`${styles.resultCard} ${styles.visible}`} ref={resultRef} aria-live="polite">
          <div className={styles.resultHead}>
            <div>
              <div className={styles.companyName}>{result.nome}</div>
              <div className={styles.companyDoc}>{cnpj}</div>
            </div>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true"></span>
              {result.situacao}
            </span>
          </div>

          <div className={styles.resultGrid}>
            <div className={styles.resultItem}><span>Nome fantasia</span><strong>{result.fantasia}</strong></div>
            <div className={styles.resultItem}><span>Abertura</span><strong>{result.abertura}</strong></div>
            <div className={styles.resultItem}><span>Municipio</span><strong>{result.municipio}</strong></div>
            <div className={styles.resultItem}><span>Atividade principal</span><strong>{result.atividade}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
