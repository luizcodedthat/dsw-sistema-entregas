import { getTodasEncomendas } from '../../../services/index.js';

export default {

    async carregarEncomendas() {
        try {
            this.encomendas = await getTodasEncomendas();
        } catch (error) {
            console.error('Erro ao carregar encomendas:', error.message);
            alert('Não foi possível carregar as encomendas.');
        }
    },

    getEncomendaDetalhes(id) {
        const encomenda = this.encomendas.find(encomenda => encomenda.id === id);

        if (encomenda) {
            return encomenda.descricao;
        } else {
            return 'Detalhes não disponíveis';
        }
    },
}