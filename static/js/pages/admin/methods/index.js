import entregaMethods from './entrega.js';
import clienteMethods from './cliente.js';
import rotaMethods from './rota.js';
import encomendaMethods from './encomenda.js';
import utilsMethods from './utils.js';

const methods = {
    ...entregaMethods,
    ...clienteMethods,
    ...rotaMethods,
    ...encomendaMethods,
    ...utilsMethods
}

export default methods;