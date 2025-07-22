import { API_BASE_URL } from "./config.js";

export async function getTodasRotas() {
  try {
    const resposta = await fetch(`${API_BASE_URL}rotas`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar rotas');
    }
    const rotas = await resposta.json();
    return rotas;
  } catch (erro) {
    console.error('Erro na API de rotas:', erro.message);
    return [];
  }
}

export async function postNovaRota(rota) {
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