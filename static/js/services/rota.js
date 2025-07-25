import { API_BASE_URL } from "./config.js";

function sanitizarRotas(rotas) {
  return Array.isArray(rotas)
    ? rotas.filter(r =>
        ["string", "number"].includes(typeof r.id) &&
        String(r.id).trim().length > 0 &&
        typeof r.origem === "string" &&
        typeof r.destino === "string" &&
        typeof r.distancia_km === "number" &&
        typeof r.tempo_estimado_h === "number" &&
        Array.isArray(r.centros_intermediarios)
      )
    : [];
}

export async function getTodasRotas() {
  try {
    const resposta = await fetch(`${API_BASE_URL}rotas`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar rotas');
    }
    const rotas = await resposta.json();
    return sanitizarRotas(rotas);
  } catch (erro) {
    console.error('Erro na API de rotas:', erro.message);
    return [];
  }
}

export async function postNovaRota(rota) {
  try {
    const resposta = await fetch(`${API_BASE_URL}rotas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rota)
    });

    if (!resposta.ok) {
      throw new Error('Erro ao salvar rota');
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar rota:', erro.message);
    throw erro;
  }
}