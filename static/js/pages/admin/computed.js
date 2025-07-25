import { normalizarData } from '../../utils/formatter.js';


export default {
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

    rotasFiltradas() {
        const origemFiltro = this.filtroOrigem.toLowerCase().trim();
        const destinoFiltro = this.filtroDestino.toLowerCase().trim();
        return this.rotas.filter((rota) => {
            const origem = rota.origem.toLowerCase();
            const destino = rota.destino.toLowerCase();
            return (
                origem.includes(origemFiltro) && destino.includes(destinoFiltro)
            );
        });
    },
    
    entregasFiltradas() {
    return this.entregas.filter((entrega) => {
      const clienteOk = !this.filtroCliente || entrega.clienteId == this.filtroCliente;
      const rotaOk = !this.filtroRota || entrega.rotaId == this.filtroRota;
      const statusOk = !this.filtroStatus || entrega.status === this.filtroStatus;

      
      const dataEntrega = normalizarData(entrega.data_estimada);
      const dataOk = !this.filtroData || dataEntrega === this.filtroData;

      return clienteOk && rotaOk && statusOk && dataOk;
    });
  },





}