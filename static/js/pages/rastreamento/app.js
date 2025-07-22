import createData from './data.js';
import methods from './methods/index.js';

const url_query = new URLSearchParams(window.location.search);
const query_codigo = url_query.get('codigo') || '';
const query_cpfCnpj = url_query.get('cpfCnpj') || '';

const { createApp } = Vue;

createApp({
  data: createData,
  methods,
  async mounted() {
    await this.carregarEntregas();
    await this.carregarClientes();
    await this.carregarEncomendas();

    this.codigoRastreamento = query_codigo;
    this.cpfCnpj = query_cpfCnpj;
    this.tipoFiltro = query_cpfCnpj ? 'cliente' : 'codigo';

    if (this.codigoRastreamento || this.cpfCnpj) {
      this.buscarEntregas();
    }
  }
}).mount("#app");