import createData from './data.js';
import computed from './computed.js';
import methods from './methods/index.js';
import { inicializarSecoes } from './dom.js';

import {
  getTodosClientes,
  getTodasEncomendas,
  getTodasRotas,
  getTodasEntregas,
  getTodosCentros
} from '../../services/index.js';

const { createApp } = Vue;

createApp({
  data: createData,
  methods,
  computed,
  async mounted() {
    try {
      this.clientes = await getTodosClientes();
      this.encomendas = await getTodasEncomendas();
      this.centros = await getTodosCentros();
      this.rotas = await getTodasRotas();
      this.entregas = await getTodasEntregas();
      this.entregas.forEach(entrega => entrega.historico.sort((ent1, ent2) => new Date(ent2.data) - new Date(ent1.data)))
    } catch (error) {
      console.error("Erro ao carregar clientes:", error.message);
      alert("Não foi possível carregar os clientes.");
    }
  }
}).mount("#app");

inicializarSecoes();