import { formatarCPFCNPJ } from '../utils/formatter.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            codigo: ''
        };
    },
    methods: {
        redirecionarBuscaPorStatus (evento) {
            evento.preventDefault();

            const codigoTratado = this.codigo.replace(/\D/g, "");

            if (codigoTratado.length < 11) {
                window.location.assign(window.location.href + `rastreamento.html?codigo=${codigoTratado}`)
            } else {
                window.location.assign(window.location.href + `rastreamento.html?cpfcnpj=${this.codigo}`)
            } 
        },
        formatarCPFCNPJ
    }
}).mount('#app');
