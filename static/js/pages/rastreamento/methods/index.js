import entregaMethods from './entrega.js';
import clienteMethods from './cliente.js';
import encomendaMethods from './encomenda.js';
import utilsMethods from './utils.js';

const methods = {
    ...entregaMethods,
    ...clienteMethods,
    ...encomendaMethods,
    ...utilsMethods
}

export default methods;