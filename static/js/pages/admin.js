import { formatarCPFCNPJ } from '../utils/formatter.js';
import { getTodosClientes } from '../services/cliente.js';
import { getTodosCentros } from '../services/centro.js';

const { createApp } = Vue;

createApp({
  data() {
    return {
      filtroNome: '',
      filtroCPFCNPJ: '',
      clientes: [],    // vai receber os clientes da API
      encomendas: [],
      rotas: [],
      entregas: [],
      centros: []
    };
  },
  methods: {
    async carregarCentros() {
    try {
      this.centros = await getTodosCentros();
    } catch (error) {
      console.error('Erro ao carregar centros:', error.message);
      alert('Não foi possível carregar os centros.');
    }
  },
    formatarCPFCNPJ
  },
  async mounted() {
    try {
      // aqui chamamos a função e atribuímos o resultado
      this.clientes = await getTodosClientes();
    } catch (error) {
      console.error('Erro ao carregar clientes:', error.message);
      alert('Não foi possível carregar os clientes.');
    }
  
   await this.carregarCentros();
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
