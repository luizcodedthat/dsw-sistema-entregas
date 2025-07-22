export default function () {
    return {
        filtroNome: '',
        filtroCPFCNPJ: '',

        filtroOrigem: '',
        filtroDestino: '',

        entregaSelecionada: null,

        filtroTipo: 'nenhum',
        pesoMin: null,
        pesoMax: null,

        clientes: [],
        encomendas: [],
        rotas: [],
        entregas: [],
        centros: [],

        modais: {
            entrega: false,
            cliente: false,
            rota: false,
        },

        infomodais: {
            entrega: false,
            cliente: false,
            rota: false,
        },

        novaEntrega: {
            clienteId: "",
            encomendaId: "",
            rotaId: "",
            status: "",
        },

        novaRota: {
            origem: "",
            destino: "",
            centrosIntermediarios: [],
            distanciaKm: "",
            tempoEstimadoH: "",
        },

        novoCliente: {
            nome: "",
            cpfCnpj: "",
            email: "",
            endereco: "",
            telefone: "",
        },
    };
}