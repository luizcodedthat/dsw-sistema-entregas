
export function formatarCPFCNPJ(e, tolerancia = 5) {
  let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
  value = value.slice(0, 14); // Limita a 14 dígitos

  if (value.length <= tolerancia) {
    return
  }

  if (value.length <= 11) {
    // Máscara CPF: 000.000.000-00
    value = value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // Máscara CNPJ: 00.000.000/0000-00
    value = value
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  e.target.value = value;
}
