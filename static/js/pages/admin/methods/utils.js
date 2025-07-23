import { formatarCpfCnpj } from "../../../utils/formatter.js";

export default {
  // Código que gera id incremental para entrega, encomenda, rota, etc
  // Modelo: "rotaId": "rota-01",
  gerarId(tipo) {
    const prefixo = tipo.toLowerCase();
    const ultimoId = this[tipo].length > 0 ? this[tipo][this[tipo].length - 1].id : null;
    const numero = ultimoId ? parseInt(ultimoId.split('-')[1]) + 1 : 1;
    return `${prefixo}-${numero.toString().padStart(2, '0')}`;
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
}