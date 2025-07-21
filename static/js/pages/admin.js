import { formatarCpfCnpj } from "../utils/formatter.js";
import { getTodosClientes, postNovoCliente } from "../services/cliente.js";
import { getTodosCentros } from "../services/centro.js";
import { getTodasEncomendas } from "../services/encomenda.js";
import { getTodasRotas, postNovaRota } from "../services/rota.js";
import { postNovaEntrega } from "../services/entrega.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      filtroNome: '',
      filtroCPFCNPJ: '',
      
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
    } catch (error) {
      console.error("Erro ao carregar clientes:", error.message);
      alert("Não foi possível carregar os clientes.");
    }

    await this.carregarCentros();
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


