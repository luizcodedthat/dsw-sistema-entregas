
const listaBotoesHabilitar = [
    "botao-clientes",
    "botao-encomendas",
    "botao-rotas",
    "botao-entregas",
    "botao-centros",
];
const listaSecoes = [
    "secao-clientes",
    "secao-encomendas",
    "secao-rotas",
    "secao-entregas",
    "secao-centros",
];

export function inicializarSecoes() {

    listaBotoesHabilitar.forEach((botao, indice) => {
        const elemento = document.getElementById(botao);
        const secao = document.getElementById(listaSecoes[indice]);

        elemento.addEventListener("click", () => {
            const secaoAtiva = document.getElementsByClassName("secao-ativa")[0];
            const botaoSecaoAtiva = document.getElementsByClassName("botao-secao-ativa")[0];

            secaoAtiva.classList.value = "secao";
            secao.classList.add("secao-ativa");

            botaoSecaoAtiva.classList.value = "botao-secao";
            elemento.classList.add("botao-secao-ativa");
        });
    })
};


