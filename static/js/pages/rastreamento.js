import { getTodasEntregas } from '../services/entrega.js';
import { getTodosClientes, getClienteId } from '../services/cliente.js';
import { getTodasEncomendas } from '../services/encomenda.js';
import { formatarCpfCnpj } from '../utils/formatter.js';

const url_query = new URLSearchParams(window.location.search);
const query_codigo = url_query.get('codigo') || '';
const query_cpfCnpj = url_query.get('cpfCnpj') || '';

const { createApp } = Vue;

createApp({
  data() {
    return {
      entregas: [],
      entregasFiltradas: [],
      clientes: [],
      encomendas: [],
      tipoFiltro: 'codigo',
      codigoRastreamento: '',
      cpfCnpj: '',
      statusSelecionado: ''
    };
  },

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
  },

  methods: {

    formatar () {
      console.log(this.cpfCnpj)
      this.cpfCnpj = formatarCpfCnpj(this.cpfCnpj, 0);
    },

    buscarEntregas() {
      if (this.tipoFiltro === 'codigo') {
        this.entregasFiltradas = this.entregas.filter(entrega => entrega.codigo_rastreamento.toUpperCase() === this.codigoRastreamento.toUpperCase()) || [];
      } else if (this.tipoFiltro === 'cliente') {
        const cliente = this.clientes.find(cliente => cliente.cpfCnpj === this.cpfCnpj.replace(/\D/g, ''));
        console.log(cliente)
        if (cliente) {
          let entregasCliente = this.entregas.filter(entrega => entrega.clienteId === cliente.id);
          
          /// Filtra por status se selecionado
          if (this.statusSelecionado) {
            entregasCliente = entregasCliente.filter(entrega => entrega.status === this.statusSelecionado);
          }

          this.entregasFiltradas = entregasCliente;

        } else {
          this.entregasFiltradas = [];
        }
      }
    },
  

  async carregarEntregas() {
    const entregas = await getTodasEntregas()
    this.entregas = entregas;
    this.entregas.forEach(entrega => entrega.historico.sort((ent1, ent2) => new Date(ent2.data) - new Date(ent1.data)));
  },

  async carregarClientes() {
    try {
      this.clientes = await getTodosClientes();
    } catch (error) {
      console.error('Erro ao carregar clientes:', error.message);
      alert('Não foi possível carregar os clientes.');
    }
  },

  async carregarEncomendas() {
    try {
      this.encomendas = await getTodasEncomendas();
    } catch (error) {
      console.error('Erro ao carregar encomendas:', error.message);
      alert('Não foi possível carregar as encomendas.');
    }
  },

  getClienteNome(id) {
    const cliente = this.clientes.find(cliente => cliente.id === id)
    if (cliente) {
      return cliente.nome;
    }
  },

  getEncomendaDetalhes(id) {
    const encomenda = this.encomendas.find(encomenda => encomenda.id === id);

    if (encomenda) {
      return encomenda.descricao;
    } else {
      return 'Detalhes não disponíveis';
    }
  },

  getStatusText(status) {
    const statusMap = {
      'em_preparo': 'Em preparo',
      'a_caminho': 'A caminho',
      'entregue': 'Entregue'
    };
    return statusMap[status] || status;
  },

  getDataFormatada(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  getDataEstimadaFormatada(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
      year: undefined,
      month: 'long',
      day: '2-digit'
    }) || 'Data não disponível';
  },

  formatarCpfCnpj
},

}).mount('#app');
