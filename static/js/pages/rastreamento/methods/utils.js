import { formatarCpfCnpj } from '../../../utils/formatter.js';

export default {
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

    getDataEstimadaFormatada(data) {
        return new Date(data).toLocaleDateString('pt-BR', {
            year: undefined,
            month: 'long',
            day: '2-digit'
        }) || 'Data não disponível';
    },

    formatarCpfCnpj,

    formatar() {
        console.log(this.cpfCnpj)
        this.cpfCnpj = formatarCpfCnpj(this.cpfCnpj, 0);
    },
}