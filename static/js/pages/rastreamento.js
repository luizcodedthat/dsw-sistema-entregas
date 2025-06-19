// rastreamento.js
import { getEntregaPorId, getHistoricoEntrega, getTodasEntregas } from '../services/entrega.js';
import { formatarCPFCNPJ } from '../utils/formatter.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const codigoRastreamentoInformado = urlParams.get('codigo');
const cpfCNPJInformado = urlParams.get('cpfcnpj');

// Inicialização do Vue JS
const { createApp } = Vue;

createApp({
    data() {
        return {
          codigoRastreamento: codigoRastreamentoInformado || '',
          cpfCNPJ: cpfCNPJInformado || '',
          tipoFiltro: cpfCNPJInformado ? 'cliente' : 'codigo'
        };
    },
    methods: {
        formatarCPFCNPJ
    }
}).mount('#app');

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", buscarEntrega);
});

async function buscarEntrega() {
  const tipoBusca = document.getElementById("tipoBusca").value;
  const termoBusca = document.getElementById("termoBusca").value.trim();
  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = ""; 

  if (!termoBusca) {
    resultadoDiv.innerHTML = "<p style='color:red;'>Digite um termo para busca.</p>";
    return;
  }

  try {
    let entregas = [];

    if (tipoBusca === "codigo") {
      
      const entrega = await getEntregaPorId(termoBusca);
      if (entrega) {
        entrega.historico = await getHistoricoEntrega(termoBusca);
        entregas.push(entrega);
      }
    } else {
      
      const todas = await getTodasEntregas();
      entregas = todas.filter(entrega =>
        entrega[tipoBusca] !== undefined &&
        entrega[tipoBusca].toString().toLowerCase().includes(termoBusca.toLowerCase())
      );

      
      for (const entrega of entregas) {
        entrega.historico = await getHistoricoEntrega(entrega.id);
      }
    }

    if (entregas.length === 0) {
      resultadoDiv.innerHTML = "<p>Nenhuma entrega encontrada.</p>";
    } else {
      resultadoDiv.innerHTML = entregas.map(montarHtmlEntrega).join("");
    }

  } catch (err) {
    console.error(err);
    resultadoDiv.innerHTML = `<p style='color:red;'>Erro: ${err.message}</p>`;
  }
}

function montarHtmlEntrega(entrega) {
  const historicoHTML = (entrega.historico && entrega.historico.length > 0)
    ? entrega.historico.map(h => `<li>${h.data} - ${h.status}</li>`).join("")
    : "<li>Sem histórico disponível.</li>";

  return `
    <div style="border:1px solid #ccc; padding:10px; margin:10px;">
      <p><strong>Código:</strong> ${entrega.id}</p>
      <p><strong>Cliente:</strong> ${entrega.clienteId}</p>
      <p><strong>Status:</strong> ${entrega.status}</p>
      <p><strong>Histórico:</strong></p>
      <ul>${historicoHTML}</ul>
    </div>
  `;
}
