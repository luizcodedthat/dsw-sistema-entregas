import { getTodasEntregas } from '../services/entrega.js';
import { getTodosClientes } from '../services/cliente.js';
import { formatarCPFCNPJ } from '../utils/formatter.js';

const { createApp } = Vue;

createApp({
  data() {
    return {
      entregas: [],
      clientes: [],
      tipoFiltro: 'codigo',
      codigoRastreamento: '',
      cpfCNPJ: '',
      statusSelecionado: ''
    };
  },

  async mounted() {
    this.entregas = await getTodasEntregas();
    this.clientes = await getTodosClientes();
  },

  computed: {
    entregasFiltradas() {
      return this.entregas.filter(entrega => {
        if (this.tipoFiltro === 'codigo') {
          return entrega.id.toString().includes(this.codigoRastreamento);
        } else if (this.tipoFiltro === 'cpfCNPJ') {
          const cliente = this.clientes.find(c => c.id === entrega.clienteId);
          if (!cliente) return false;
          return cliente.cpfCnpj.replace(/\D/g, '').includes(this.cpfCNPJ.replace(/\D/g, ''));
        } else if (this.tipoFiltro === 'status') {
          return entrega.status === this.statusSelecionado;
        }
        return true;
      });
    }
  },

  methods: {
    async buscarEntregas() {
      this.entregas = await getTodasEntregas();
      this.clientes = await getTodosClientes();
    },

    formatarCPFCNPJ
  },

}).mount('#app');
