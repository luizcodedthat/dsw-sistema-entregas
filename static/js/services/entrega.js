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
