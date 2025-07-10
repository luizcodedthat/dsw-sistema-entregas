import { getTodasEntregas } from '../services/entrega.js';
import { getTodosClientes, getClienteId } from '../services/cliente.js';
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
    await this.buscarEntregas();
    await this.carregarClientes();
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
      const entregas = await getTodasEntregas()
        this.entregas = entregas;
      },

    async carregarClientes() {
      try {
        this.clientes = await getTodosClientes();
      } catch (error) {
        console.error('Erro ao carregar clientes:', error.message);
        alert('Não foi possível carregar os clientes.');
      }
    },
    getClienteId(id) {
      return this.clientes.find(cliente => cliente.id === id) || null;
    },

    formatarCPFCNPJ
  },

}).mount('#app');
