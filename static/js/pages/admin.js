import { formatarCPFCNPJ } from '../utils/formatter.js';
import { getTodosClientes } from '../services/cliente.js';
import { getTodasEncomendas } from '../services/encomenda.js';


const { createApp } = Vue;

createApp({
  data() {
  return {
    filtroNome: '',
    filtroCPFCNPJ: '',
    clientes: [],
    encomendas: [],
    rotas: [],
    entregas: [],
    centros: [],

    // ADICIONADO para o modal
    mostrarModal: false,
    novaEntrega: {
      clienteId: '',
      encomendaId: '',
      rotaId: ''
    }
  };
},

  methods: {
  formatarCPFCNPJ,

  // NOVOS MÉTODOS DO MODAL
  abrirModal() {
    this.mostrarModal = true;
  },
  fecharModal() {
    this.mostrarModal = false;
    this.novaEntrega = {
      clienteId: '',
      encomendaId: '',
      rotaId: ''
    };
  },
  cadastrarEntrega() {
    console.log("Nova entrega:", this.novaEntrega);
    alert("Entrega cadastrada com sucesso!");
    this.fecharModal();
  }
},

  async mounted() {
    try {
      // aqui chamamos a função e atribuímos o resultado
      this.clientes = await getTodosClientes();
      this.encomendas = await getTodasEncomendas();
    } catch (error) {
      console.error('Erro ao carregar clientes:', error.message);
      alert('Não foi possível carregar os clientes.');
    }
  }
}).mount('#app');

// Mantém o restante do seu código de navegação por botões:
const listaBotoesHabilitar = ['botao-clientes', 'botao-encomendas', 'botao-rotas', 'botao-entregas', 'botao-centros'];
const listaSecoes = ['secao-clientes', 'secao-encomendas', 'secao-rotas', 'secao-entregas', 'secao-centros'];

listaBotoesHabilitar.forEach((botao, indice) => {
  const elemento = document.getElementById(botao);
  const secao = document.getElementById(listaSecoes[indice]);
  
  elemento.addEventListener('click', () => {
    const secaoAtiva = document.getElementsByClassName('secao-ativa')[0];
    const botaoSecaoAtiva = document.getElementsByClassName('botao-secao-ativa')[0];

    secaoAtiva.classList.value = 'secao';
    secao.classList.add('secao-ativa');

    botaoSecaoAtiva.classList.value = 'botao-secao';
    elemento.classList.add('botao-secao-ativa');
  });
});
