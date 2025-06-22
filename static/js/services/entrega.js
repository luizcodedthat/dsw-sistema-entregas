import { API_BASE_URL } from "./config.js";

export async function getEntregaPorId(id) {
  const response = await fetch(`${API_BASE_URL}/entregas/${id}`);
  if (!response.ok) throw new Error("Entrega não encontrada");
  return await response.json();
}

export async function getHistoricoEntrega(id) {
  const response = await fetch(`${API_BASE_URL}/historico?entregaId=${id}`);
  if (!response.ok) throw new Error("Histórico não encontrado");
  return await response.json();
}

export async function getTodasEntregas() {
  const response = await fetch(`${API_BASE_URL}/entregas`);
  if (!response.ok) throw new Error("Erro ao buscar entregas");
  return await response.json();
}

export async function listarEntregas() {
  const resposta = await fetch("http://localhost:3000/entregas");
  return await resposta.json();
}
