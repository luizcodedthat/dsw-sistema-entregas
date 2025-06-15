const API_BASE = "http://127.0.0.1:55176/api";

export async function getEntregaPorId(id) {
  const response = await fetch(`${API_BASE}/entregas/${id}`);
  if (!response.ok) throw new Error("Entrega não encontrada");
  return await response.json();
}

export async function getHistoricoEntrega(id) {
  const response = await fetch(`${API_BASE}/historico?entregaId=${id}`);
  if (!response.ok) throw new Error("Histórico não encontrado");
  return await response.json();
}

export async function getTodasEntregas() {
  const response = await fetch(`${API_BASE}/entregas`);
  if (!response.ok) throw new Error("Erro ao buscar entregas");
  return await response.json();
}
