import { API_BASE_URL } from "./config.js";

export async function getTodasEncomendas() {
  try {
    const resposta = await fetch(`${API_BASE_URL}encomendas`);
    if (!resposta.ok) {
      throw new Error('Erro ao buscar encomendas');
    }
    const encomendas = await resposta.json();
    return encomendas;
  } catch (erro) {
    console.error('Erro na API de encomendas:', erro.message);
    return [];
  }
}

export async function postNovaEncomenda(encomenda) {
  try {
        const resposta = await fetch(`${API_BASE_URL}encomendas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(encomenda)
        });
        return await resposta.json();
      } catch (error) {
        console.error("Erro ao cadastrar nova encomenda:", error);
        return null;
      }
    }
