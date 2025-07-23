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
        origem: this.novaRota.origem,
        destino: this.novaRota.destino,
        centrosIntermediarios: this.novaRota.centrosIntermediarios || [],
        distanciaKm: parseFloat(this.novaRota.distanciaKm),
        tempoEstimadoH: parseFloat(this.novaRota.tempoEstimadoH),
      };

      await postNovaRota(novaRota);
      alert("Rota cadastrada com sucesso!");
      this.fecharModal("rota");
    } catch (error) {
      console.error("Erro ao cadastrar rota:", error);
      alert("Erro ao cadastrar rota.");
    }
  },
}