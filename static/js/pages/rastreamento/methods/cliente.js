import { getTodosClientes } from '../../../services/index.js';

export default {
    async carregarClientes() {
        try {
            this.clientes = await getTodosClientes();
        } catch (error) {
            console.error('Erro ao carregar clientes:', error.message);
            alert('Não foi possível carregar os clientes.');
        }
    },

    getClienteNome(id) {
        const cliente = this.clientes.find(cliente => cliente.id === id)
        if (cliente) {
            return cliente.nome;
        }
    },
}