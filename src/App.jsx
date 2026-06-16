import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import CtaSection from './components/CtaSection';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';
import useCnpjSearch from './hooks/useCnpjSearch';
import styles from './App.module.css';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { cnpj, error, result, handleInput, handleSubmit } = useCnpjSearch();

  // Frame-busting
  useEffect(() => {
    if (top !== self) top.location = self.location;
  }, []);

  return (
    <div className={styles.app}>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero cnpj={cnpj} error={error} result={result} onInput={handleInput} onSubmit={handleSubmit} />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaSection />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
}
