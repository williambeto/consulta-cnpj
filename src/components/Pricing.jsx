import styles from './Pricing.module.css';

const plans = [
  {
    title: 'Gratis',
    price: '0',
    desc: 'Para uso pessoal e testes',
    features: ['10 consultas por dia', 'Dados cadastrais basicos', 'Acesso via navegador', 'Suporte por e-mail'],
    cta: 'Comecar Gratis',
    variant: 'secondary',
  },
  {
    title: 'Profissional',
    price: '79',
    desc: 'Para profissionais e pequenas empresas',
    features: ['500 consultas por dia', 'Dados completos + quadro societario', 'Acesso a API REST', 'Exportacao CSV e JSON', 'Suporte prioritario'],
    cta: 'Assinar Profissional',
    variant: 'primary',
    featured: true,
  },
  {
    title: 'Empresarial',
    price: '249',
    desc: 'Para grandes volumes e integracoes',
    features: ['Consultas ilimitadas', 'Relatorios em lote', 'Webhooks personalizados', 'Exportacao PDF', 'Gerente de conta dedicado', 'SLA 99,9%'],
    cta: 'Falar com Vendas',
    variant: 'secondary',
  },
];

export default function Pricing() {
  return (
    <section className="section" id="planos">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Planos</span>
          <h2>Escolha o plano ideal para o seu negocio.</h2>
          <p>Comece gratuitamente e escale conforme sua necessidade. Cancele quando quiser.</p>
        </div>

        <div className={styles.pricing}>
          {plans.map((plan) => (
            <div key={plan.title} className={`${styles.pricingCard} ${plan.featured ? styles.featured : ''}`}>
              {plan.featured && <span className={styles.pricingBadge}>Mais popular</span>}
              <h3>{plan.title}</h3>
              <div className={styles.pricingPrice}>R$ {plan.price}<span>/mes</span></div>
              <p className={styles.pricingDesc}>{plan.desc}</p>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a className={`button button-${plan.variant}`} href="#consulta">{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
