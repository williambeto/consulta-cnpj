import { useState, useCallback } from 'react';

const MOCK_EMPRESAS = {
  "11223344000155": { nome: "Aurora Tecnologia Brasileira Ltda.", fantasia: "Aurora Tech", abertura: "18/03/2019", municipio: "Sao Paulo — SP", atividade: "Desenvolvimento de software sob encomenda", situacao: "Ativa" },
  "22334455000166": { nome: "Construtora Nova Era S.A.", fantasia: "Nova Era Engenharia", abertura: "05/07/2001", municipio: "Belo Horizonte — MG", atividade: "Construcao de edificios", situacao: "Ativa" },
  "33445566000177": { nome: "Comercio Modelo Ltda.", fantasia: "Modelo Shop", abertura: "22/11/2015", municipio: "Curitiba — PR", atividade: "Comercio varejista de vestuario", situacao: "Ativa" },
  "44556677000188": { nome: "AgroVerde Exportacao S.A.", fantasia: "AgroVerde", abertura: "10/02/1988", municipio: "Uberlandia — MG", atividade: "Comercio atacadista de graos", situacao: "Ativa" },
  "55667788000199": { nome: "Clinica Bem-Estar Ltda.", fantasia: "Bem-Estar Saude", abertura: "30/09/2012", municipio: "Salvador — BA", atividade: "Servicos medicos ambulatoriais", situacao: "Ativa" },
  "66778899000100": { nome: "Logistica Rapida Transportes Ltda.", fantasia: "RapidaLog", abertura: "14/06/2008", municipio: "Campinas — SP", atividade: "Transporte rodoviario de carga", situacao: "Ativa" },
  "77889900000111": { nome: "Grafica Impressao Digital S.A.", fantasia: "PrintFast", abertura: "03/01/1995", municipio: "Porto Alegre — RS", atividade: "Impressao de material grafico", situacao: "Ativa" },
};

function formatCnpj(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function isValidCnpj(value) {
  const cnpj = value.replace(/\D/g, "");
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calculateDigit = (base) => {
    let weight = base.length - 7;
    let total = 0;
    for (const digit of base) {
      total += Number(digit) * weight--;
      if (weight < 2) weight = 9;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cnpj.slice(0, 12));
  const secondDigit = calculateDigit(cnpj.slice(0, 12) + firstDigit);
  return cnpj.endsWith(`${firstDigit}${secondDigit}`);
}

const FALLBACK = {
  nome: "Empresa Exemplo Ltda.",
  fantasia: "Exemplo Negocios",
  abertura: "01/01/2020",
  municipio: "Sao Paulo — SP",
  atividade: "Atividades comerciais em geral",
  situacao: "Ativa",
};

export default function useCnpjSearch() {
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = useCallback((e) => {
    setCnpj(formatCnpj(e.target.value));
    setError('');
    setResult(null);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!isValidCnpj(cnpj)) {
      setError('Informe um CNPJ valido com 14 numeros.');
      setResult(null);
      return;
    }
    setError('CNPJ validado com sucesso.');
    const raw = cnpj.replace(/\D/g, "");
    setResult(MOCK_EMPRESAS[raw] || FALLBACK);
  }, [cnpj]);

  return { cnpj, error, result, handleInput, handleSubmit };
}
