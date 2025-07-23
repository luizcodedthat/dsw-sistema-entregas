import { postNovaEncomenda } from "../../../services/index.js";

export default {
  getEncomenda(id) {
    const encomenda = this.encomendas.find(encomenda => encomenda.id === id);
    if (encomenda) {
      return encomenda;
    }
  },
  async cadastrarEncomenda() {
      try {
        const novaEncomenda = {
          tipo: this.novaEncomenda.tipo,
          descricao: this.novaEncomenda.descricao,
          endereco_entrega: this.novaEncomenda.endereco_entrega,
          peso: parseFloat(this.novaEncomenda.peso),
        };

        await postNovaEncomenda(novaEncomenda);
        alert("Encomenda cadastrado com sucesso!");
        this.fecharModal("encomenda");
      } catch (error) {
        console.error("Erro ao cadastrar encomenda:", error);
        alert("Erro ao cadastrar encomenda.");
      }
    },

}