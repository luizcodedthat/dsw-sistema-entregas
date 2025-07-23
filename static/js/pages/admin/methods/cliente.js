import { postNovoCliente } from "../../../services/index.js";

export default {
  getCliente(id) {
    const cliente = this.clientes.find(cliente => cliente.id === id)
    if (cliente) {
      return cliente;
    } else {
      return null;
    }
  },

  async cadastrarCliente() {
    try {
      const novoCliente = {
        nome: this.novoCliente.nome,
        cpfCnpj: this.novoCliente.cpfCnpj,
        email: this.novoCliente.email,
        endereco: this.novoCliente.endereco,
        telefone: this.novoCliente.telefone,
      };

      await postNovoCliente(novoCliente);
      alert("Cliente cadastrado com sucesso!");
      this.fecharModal("cliente");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente.");
    }
  },

}