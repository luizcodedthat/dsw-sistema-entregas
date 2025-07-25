import { API_BASE_URL } from "./config.js";

function sanitizarEntregas(entregas) {
  return Array.isArray(entregas)
    ? entregas.filter(e =>
      typeof e.id === "string" &&
      e.id.trim().length > 0 &&
      typeof e.codigo_rastreamento === "string" &&
      e.codigo_rastreamento.length > 0 &&
      ["number", "string"].includes(typeof e.clienteId) &&
      String(e.clienteId).trim().length > 0 &&
      ["number", "string"].includes(typeof e.encomendaId) &&
      String(e.encomendaId).trim().length > 0 &&
      ["string", "number"].includes(typeof e.rotaId) &&
      String(e.rotaId).trim().length > 0 &&
      typeof e.data_estimada === "string" &&
      typeof e.status === "string" &&
      Array.isArray(e.historico) &&
      e.historico.every(h =>
        typeof h.data === "string" &&
        typeof h.status === "string" &&
        typeof h.local === "string"
      )
    )
    : [];
}

export async function getTodasEntregas() {
  try {
    const response = await fetch(`${API_BASE_URL}entregas`);
    if (!response.ok) throw new Error("Erro ao buscar entregas");
    const entregas = await response.json();
    console.log(entregas);
    const entregasSanitizadas = sanitizarEntregas(entregas);
    console.log(entregasSanitizadas)
    return entregasSanitizadas;
  } catch (error) {
    console.error("Erro ao buscar entregas:", error);
    return [];
  }
}

export async function postNovaEntrega(entrega) {
  try {
    const resposta = await fetch(`${API_BASE_URL}entregas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrega)
    });

    if (!resposta.ok) {
      throw new Error('Erro ao salvar entrega');
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar entrega:', erro.message);
    throw erro;
  }
}
