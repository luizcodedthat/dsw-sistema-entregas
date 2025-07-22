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
    const todosClientes = await getTodosClientes();
    const cliente = todosClientes.find(cliente => cliente.id === id);
    return cliente || null;
  } catch (error) {
    console.error("Erro ao buscar entrega por ID:", error);
    return null;
  }
}

export async function postNovoCliente(cliente) {
  try {
    const resposta = await fetch(`${API_BASE_URL}clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    return await resposta.json();
  } catch (error) {
    console.error("Erro ao cadastrar novo cliente:", error);
    return null;
  }
}