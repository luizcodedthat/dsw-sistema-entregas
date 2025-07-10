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
export async function getClienteId(id) {
  try {
    const cliente = await getTodosClientes();
    const TodosClientes = cliente.find(cliente => cliente.id === id);
    return TodosClientes || null;
  } catch (error) {
    console.error("Erro ao buscar entrega por ID:", error);
    return null;
  }
}