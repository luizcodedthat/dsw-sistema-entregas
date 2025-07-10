import { API_BASE_URL } from "./config.js";

export async function getTodosCentros() {
  try {
    const response = await fetch(`${API_BASE_URL}centros`);
    if (!response.ok) throw new Error("Erro ao buscar centros");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar centros:", error);
    return [];
  }
}