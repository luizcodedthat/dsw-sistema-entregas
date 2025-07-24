import { getTodasEncomendas, postNovaEncomenda } from "../../../services/index.js";

function gerarNovoIdEncomenda(encomendas) {
  const numeros = encomendas
    .map(e => {
      const n = parseInt(e.id, 10);
      return Number.isFinite(n) ? n : null;
    })
    .filter(n => n !== null);
  const maior = numeros.length ? Math.max(...numeros) : 100; // começa em 101
  return String(maior + 1);
}

export default {
  getEncomenda(id) {
    const encomenda = this.encomendas.find(encomenda => encomenda.id == id);
    if (encomenda) {
      return encomenda;
    }
  },
  async cadastrarEncomenda() {
    
    try {
      const novaEncomenda = {
        id: gerarNovoIdEncomenda(this.encomendas),
        tipo: this.novaEncomenda.tipo,
        descricao: this.novaEncomenda.descricao,
        endereco_entrega: this.novaEncomenda.endereco_entrega,
        peso: parseFloat(this.novaEncomenda.peso),
      };

      await postNovaEncomenda(novaEncomenda);
      alert("Encomenda cadastrado com sucesso!");
      this.fecharModal("encomenda");
      this.encomendas = await getTodasEncomendas();
    } catch (error) {
      console.error("Erro ao cadastrar encomenda:", error);
      alert("Erro ao cadastrar encomenda.");
    }
  },

}