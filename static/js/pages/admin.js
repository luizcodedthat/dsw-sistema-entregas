import { formatarCpfCnpj } from "../utils/formatter.js";
import { getTodosClientes, postNovoCliente } from "../services/cliente.js";
import { getTodosCentros } from "../services/centro.js";
import { getTodasEncomendas } from "../services/encomenda.js";
import { getTodasRotas, postNovaRota } from "../services/rota.js";
import { getTodasEntregas, postNovaEntrega } from "../services/entrega.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      filtroNome: '',
      filtroCPFCNPJ: '',

      entregaSelecionada: null,

      filtroTipo: 'nenhum',
      pesoMin: null,
      pesoMax: null,

      clientes: [],
      encomendas: [],
      rotas: [],
      entregas: [],
      centros: [],

      modais: {
        entrega: false,
        cliente: false,
        rota: false,
      },

      infomodais: {
        entrega: false,
        cliente: false,
        rota: false,
      },

      novaEntrega: {
        clienteId: "",
        encomendaId: "",
        rotaId: "",
        status: "",
      },

      novaRota: {
        origem: "",
        destino: "",
        centrosIntermediarios: [],
        distanciaKm: "",
        tempoEstimadoH: "",
      },

      novoCliente: {
        nome: "",
        cpfCnpj: "",
        email: "",
        endereco: "",
        telefone: "",
      },
    };
  },

  methods: {
    async carregarCentros() {
      try {
        this.centros = await getTodosCentros();
      } catch (error) {
        console.error("Erro ao carregar centros:", error.message);
        alert("Não foi possível carregar os centros.");
      }
    },

    formatarCpfCnpj,

    formatar() {
      this.filtroCPFCNPJ = formatarCpfCnpj(this.filtroCPFCNPJ);
    },

    abrirModal(tipo) {
      this.modais[tipo] = true;
    },

    abrirModalInfo(tipo, entidade) {
      this.infomodais[tipo] = true;

      this.entregaSelecionada = entidade;
    },

    fecharModal(tipo) {
      this.modais[tipo] = false;
      if (tipo === "entrega") {
        this.novaEntrega = {
          clienteId: "",
          encomendaId: "",
          rotaId: "",
          status: "",
        };
      }

      if (tipo === "cliente") {
        this.novoCliente = {
          nome: "",
          cpfCnpj: "",
          email: "",
          endereco: "",
          telefone: "",
        };
      }

      if (tipo === "rota") {
        this.novaRota = {
          origem: "",
          destino: "",
          centrosIntermediarios: [],
          distanciaKm: "",
          tempoEstimadoH: "",
        };
      }
    },

    fecharModalInfo(tipo) {
      this.infomodais[tipo] = false;

    },

    // Código que gera id incremental para entrega, encomenda, rota, etc
    // Modelo: "rotaId": "rota-01",

    gerarId(tipo) {
      const prefixo = tipo.toLowerCase();
      const ultimoId = this[tipo].length > 0 ? this[tipo][this[tipo].length - 1].id : null;
      const numero = ultimoId ? parseInt(ultimoId.split('-')[1]) + 1 : 1;
      return `${prefixo}-${numero.toString().padStart(2, '0')}`;
    },

    async cadastrarEntrega() {
      try {
        const nova = {
          clienteId: parseInt(this.novaEntrega.clienteId),
          encomendaId: parseInt(this.novaEntrega.encomendaId),
          rotaId: parseInt(this.novaEntrega.rotaId),
          dataEstimada: this.novaEntrega.dataEstimada,
          status: this.novaEntrega.status,
          historico: [
            {
              dataHora: new Date().toISOString(),
              status: this.novaEntrega.status,
            },
          ],
        };

        await postNovaEntrega(nova);
        alert("Entrega cadastrada com sucesso!");
        this.fecharModalEntrega();
      } catch (e) {
        console.error("Erro ao cadastrar entrega:", e);
        alert("Erro ao cadastrar entrega.");
      }
    },

    async cadastrarRota() {
      try {
        const novaRota = {
          origem: this.novaRota.origem,
          destino: this.novaRota.destino,
          centrosIntermediarios: this.novaRota.centrosIntermediarios || [],
          distanciaKm: parseFloat(this.novaRota.distanciaKm),
          tempoEstimadoH: parseFloat(this.novaRota.tempoEstimadoH),
        };

        await postNovaRota(novaRota);
        alert("Rota cadastrada com sucesso!");
        this.fecharModalRota(); // ainda vou implementar
      } catch (error) {
        console.error("Erro ao cadastrar rota:", error);
        alert("Erro ao cadastrar rota.");
      }
    },

    async cadastrarCliente() {
      try {
        const novoCliente = {
          nome: this.novoCliente.nome,
          cpfCnpj: this.novoCliente.cpfCnpj,
          email: this.novoCliente.email,
          endereco: this.novoCliente.endereco,
          telefone: this.novoCliente.telefone,
        };

        await postNovoCliente(novoCliente);
        alert("Cliente cadastrado com sucesso!");
        this.fecharModalCliente();
      } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente.");
      }
    },

    getCliente(id) {
      const cliente = this.clientes.find(cliente => cliente.id === id)
      if (cliente) {
        return cliente;
      }
    },

    getEncomenda(id) {
      const encomenda = this.encomendas.find(encomenda => encomenda.id === id);
      if (encomenda) {
        return encomenda;
      }
    },

    getRota(id) {
      const rota = this.rotas.find(rota => rota.id === id);
      if (rota) {
        return rota;
      }
    },

    formatarData(data) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(data).toLocaleDateString('pt-BR', options);
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

    getEmojiStatus(status) {
      switch (status) {
        case 'em_preparo':
          return '⏳';
        case 'a_caminho':
          return '🚚';
        case 'entregue':
          return '✅';
        default:
          return '❓';
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

  },

  computed: {
    encomendasFiltradas() {
      const tipoFiltro = this.filtroTipo?.trim().toLowerCase();
      const pesoMin = this.pesoMin === '' ? null : this.pesoMin;
      const pesoMax = this.pesoMax === '' ? null : this.pesoMax;

      return this.encomendas.filter((encomenda) => {
        const tipoOk =
          tipoFiltro === 'nenhum' || tipoFiltro === '' || encomenda.tipo === tipoFiltro;

        const peso = parseFloat(encomenda.peso);
        const pesoMinOk = pesoMin === null || peso >= pesoMin;
        const pesoMaxOk = pesoMax === null || peso <= pesoMax;

        return tipoOk && pesoMinOk && pesoMaxOk;
      });
    },

    clientesFiltrados() {
      const nomeFiltro = this.filtroNome.toLowerCase().trim();
      const cpfCnpjFiltro = this.filtroCPFCNPJ.replace(/\D/g, "");

      return this.clientes.filter((cliente) => {
        const nome = cliente.nome.toLowerCase();
        const cpfCnpj = cliente.cpfCnpj.replace(/\D/g, "");
        return nome.includes(nomeFiltro) && cpfCnpj.includes(cpfCnpjFiltro);
      });
    },
  },

  async mounted() {
    try {
      this.clientes = await getTodosClientes();
      this.encomendas = await getTodasEncomendas();
      this.rotas = await getTodasRotas();
      this.entregas = await getTodasEntregas();
      this.centros = await getTodosCentros();
    } catch (error) {
      console.error("Erro ao carregar clientes:", error.message);
      alert("Não foi possível carregar os clientes.");
    }
  },
}).mount("#app");

const listaBotoesHabilitar = [
  "botao-clientes",
  "botao-encomendas",
  "botao-rotas",
  "botao-entregas",
  "botao-centros",
];
const listaSecoes = [
  "secao-clientes",
  "secao-encomendas",
  "secao-rotas",
  "secao-entregas",
  "secao-centros",
];

listaBotoesHabilitar.forEach((botao, indice) => {
  const elemento = document.getElementById(botao);
  const secao = document.getElementById(listaSecoes[indice]);

  elemento.addEventListener("click", () => {
    const secaoAtiva = document.getElementsByClassName("secao-ativa")[0];
    const botaoSecaoAtiva =
      document.getElementsByClassName("botao-secao-ativa")[0];

    secaoAtiva.classList.value = "secao";
    secao.classList.add("secao-ativa");

    botaoSecaoAtiva.classList.value = "botao-secao";
    elemento.classList.add("botao-secao-ativa");
  });
});


