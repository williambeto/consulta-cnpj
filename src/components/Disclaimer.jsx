import styles from './Disclaimer.module.css';

export default function Disclaimer() {
  return (
    <div className={styles.disclaimerBar}>
      <p><strong>Aviso:</strong> Este e um produto ficticio criado para fins de demonstracao. Os dados exibidos sao simulados e nao correspondem a informacoes reais da Receita Federal. "Consulta CNPJ" nao e uma empresa real nem um servico disponivel comercialmente. Nenhum dado de consulta e armazenado. Apenas a preferencia de tema (claro/escuro) e mantida localmente no seu navegador.</p>
    </div>
  );
}
