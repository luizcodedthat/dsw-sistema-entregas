import { formatarCpfCnpj } from '../utils/formatter.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            codigo: ''
        };
    },
    methods: {
        redirecionarBuscaPorMetodo () {
            const codigoTratado = this.codigo.replace(/[.\-\/]/g, "");

            if (codigoTratado.length == 11 || codigoTratado.length == 14) {
                window.location.assign(window.location.href + `rastreamento.html?cpfCnpj=${this.codigo}`)
            } else {
                window.location.assign(window.location.href + `rastreamento.html?codigo=${codigoTratado}`)
            } 
        },

        formatarCpfCnpj,

        formatar() {
            if (/^[a-zA-Z]/.test(this.codigo[0])) {
                return;
            }
            else {
                this.codigo = formatarCpfCnpj(this.codigo, 0);
            }
        }       
    }
}).mount('#app');
