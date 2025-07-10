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