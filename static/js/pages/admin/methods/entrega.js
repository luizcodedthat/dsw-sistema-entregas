import { getTodasEntregas, postNovaEntrega } from "../../../services/index.js";

function gerarNovoIdEntrega(entregas) {
  const numeros = entregas
    .map(e => {
      const match = String(e.id).match(/^ent-(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n !== null);
  const maior = numeros.length ? Math.max(...numeros) : 0;
  const novoNumero = String(maior + 1).padStart(3, '0');
  return `ent-${novoNumero}`;
}

function gerarCodigoRastreamentoUnico(entregas, estado = "PE") {
  let codigo;
  let existe;

  do {
    const prefixo = "BR";
    const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    const sufixo = estado.toUpperCase();
    codigo = `${prefixo}${numeros}${sufixo}`;

    existe = entregas.some(e => e.codigo_rastreamento === codigo);
  } while (existe);

  return codigo;
}

export default {
  async cadastrarEntrega() {
    try {
      const origem = this.rotas.find(r => r.id === this.novaEntrega.rotaId)?.origem;
      const nova = {
        id: gerarNovoIdEntrega(this.entregas),
        codigo_rastreamento: gerarCodigoRastreamentoUnico(this.entregas),
        clienteId: this.novaEntrega.clienteId,
        encomendaId: this.novaEntrega.encomendaId,
        rotaId: this.novaEntrega.rotaId,
        data_estimada: this.novaEntrega.dataEstimada,
        status: this.novaEntrega.status,
        historico: [
          {
            data: new Date().toISOString(),
            local: "CD " + origem,
            status: this.novaEntrega.status,
          },
        ],
      };
      
      await postNovaEntrega(nova);
      alert("Entrega cadastrada com sucesso!");
      this.fecharModal("entrega");
      this.entregas = await getTodasEntregas();
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
