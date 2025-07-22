import { getTodasEntregas } from "../../../services/index.js";

export default {
    buscarEntregas() {
        if (this.tipoFiltro === 'codigo') {
            this.entregasFiltradas = this.entregas.filter(entrega => entrega.codigo_rastreamento.toUpperCase() === this.codigoRastreamento.toUpperCase()) || [];
        } else if (this.tipoFiltro === 'cliente') {
            const cliente = this.clientes.find(cliente => cliente.cpfCnpj === this.cpfCnpj.replace(/\D/g, ''));
            console.log(cliente)
            if (cliente) {
                let entregasCliente = this.entregas.filter(entrega => entrega.clienteId === cliente.id);

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
        // Ordena os historicos de entrega por data, do mais recente para o mais antigo
        this.entregas.forEach(entrega => entrega.historico.sort((ent1, ent2) => new Date(ent2.data) - new Date(ent1.data)));
    },
}