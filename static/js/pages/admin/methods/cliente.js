import { getTodosClientes, postNovoCliente } from "../../../services/index.js";

function gerarNovoIdCliente(clientes) {
  const numeros = clientes
    .map(c => {
      const n = parseInt(c.id, 10);
      return Number.isFinite(n) ? n : null;
    })
    .filter(n => n !== null);
  const maior = numeros.length ? Math.max(...numeros) : 0;
  return String(maior + 1);
}

export default {
  getCliente(id) {
    const cliente = this.clientes.find(cliente => cliente.id == id)
    if (cliente) {
      return cliente;
    } else {
      return null;
    }
  },

  async cadastrarCliente() {
    const novoID = gerarNovoIdCliente(this.clientes)
    try {
      const novoCliente = {
        id: novoID,
        nome: this.novoCliente.nome,
        cpfCnpj: this.novoCliente.cpfCnpj.replace(/\D/g, ''),
        email: this.novoCliente.email,
        endereco: this.novoCliente.endereco,
      };

      await postNovoCliente(novoCliente);
      alert("Cliente cadastrado com sucesso!");
      this.fecharModal("cliente");
      this.clientes = await getTodosClientes();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente.");
    }
  },

}