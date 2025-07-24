export function formatarCpfCnpj (valor, tolerancia = 5) {

  if (!valor) return '';

  const valorLimpo = valor.replace(/\D/g, '').slice(0, 14);

  if (valorLimpo.length <= tolerancia) {
    return valor;
  }

  if (valorLimpo.length <= 11) {
    valor = valorLimpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    valor = valorLimpo
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  return valor;
}

