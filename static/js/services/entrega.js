import { API_BASE_URL } from "./config.js";

export async function getTodasEntregas() {
  try {
    const response = await fetch(`${API_BASE_URL}entregas`);
    if (!response.ok) throw new Error("Erro ao buscar entregas");
    return await response.json();
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
