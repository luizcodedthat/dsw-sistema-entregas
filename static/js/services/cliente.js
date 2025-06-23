import { API_BASE_URL } from "./config.js";

export async function getTodosClientes() {
  const response = await fetch(`${API_BASE_URL}clientes`);
  if (!response.ok) throw new Error("Erro ao buscar clientes");
  return await response.json();
}

export async function getClientePorId(id) {
  const response = await fetch(`${API_BASE_URL}clientes/${id}`);
  if (!response.ok) throw new Error("Cliente não encontrado");
  return await response.json();
}