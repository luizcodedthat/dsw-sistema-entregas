import { formatarCpfCnpj } from "../../../utils/formatter.js";

export default {
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
        dataEstimada: "",
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
        centros_intermediarios: [],
        distancia_km: 0,
        tempo_estimado_h: 0,
        id: ""
      };
    }

    if (tipo === "encomenda") {
      this.novaEncomenda = {
        tipo: "",
        descricao: "",
        endereco_entrega: "",
        peso: "",
      };
    }
  },

  fecharModalInfo(tipo) {
    this.infomodais[tipo] = false;
  },
};