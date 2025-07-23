import { postNovaEntrega } from "../../../services/index.js";

export default {
  async cadastrarEntrega() {
    try {
      const nova = {
        id: this.gerarId("entregas"),
        clienteId: parseInt(this.novaEntrega.clienteId),
        encomendaId: parseInt(this.novaEntrega.encomendaId),
        rotaId: parseInt(this.novaEntrega.rotaId),
        data_estimada: this.novaEntrega.dataEstimada,
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
      this.fecharModal("entrega");
    } catch (e) {
      console.error("Erro ao cadastrar entrega:", e);
      alert("Erro ao cadastrar entrega.");
    }
  },

  getEmojiStatus(status) {
    switch (status) {
      case 'em_preparo': return '⏳';
      case 'a_caminho': return '🚚';
      case 'entregue': return '✅';
      default: return '❓';
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

  formatarData(data) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  },
};
