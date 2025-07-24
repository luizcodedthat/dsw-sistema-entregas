import { getTodasRotas, postNovaRota } from "../../../services/rota.js";

function gerarNovoIdRota(rotas) {
  const numeros = rotas
    .map(r => {
      const match = String(r.id).match(/^rota-(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null);
  const maior = numeros.length ? Math.max(...numeros) : 0;
  const novoNumero = String(maior + 1).padStart(2, '0');
  return `rota-${novoNumero}`;
}

export default {

  getRota(id) {
    const rota = this.rotas.find(rota => rota.id === id);
    if (rota) {
      return rota;
    }
  },

  async cadastrarRota() {
    try {
      const novaRota = {
        id: gerarNovoIdRota(this.rotas),
        origem: this.novaRota.origem,
        destino: this.novaRota.destino,
        distancia_km: parseFloat(this.novaRota.distanciaKm),
        tempo_estimado_h: parseFloat(this.novaRota.tempoEstimadoH),
        centros_intermediarios: this.novaRota.centrosIntermediarios || [],
      };

      await postNovaRota(novaRota);
      alert("Rota cadastrada com sucesso!");
      this.fecharModal("rota");
      this.rotas = await getTodasRotas();
    } catch (error) {
      console.error("Erro ao cadastrar rota:", error);
      alert("Erro ao cadastrar rota.");
    }
  },
}