export function formatarCpfCnpj (valor, tolerancia = 5) {
  const valorLimpo = valor.replace(/\D/g, '').slice(0, 14);

  if (valorLimpo.length <= tolerancia) {
    return valor;
  }

  if (valorLimpo.length <= 11) {
    // Máscara CPF: 000.000.000-00
    valor = valorLimpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // Máscara CNPJ: 00.000.000/0000-00
    valor = valorLimpo
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  return valor;
}

