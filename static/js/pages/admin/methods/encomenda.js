export default {
  getEncomenda(id) {
    const encomenda = this.encomendas.find(encomenda => encomenda.id === id);
    if (encomenda) {
      return encomenda;
    }
  },

}