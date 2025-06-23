import { API_BASE_URL } from "./config.js";

export async function getTodosClientes() {
  try {
    const response = await fetch(`${API_BASE_URL}clientes`);
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
}