const listaBotoesHabilitar = ['botao-clientes', 'botao-encomendas', 'botao-rotas', 'botao-entregas', 'botao-centros'];
const listaSecoes = ['secao-clientes', 'secao-encomendas', 'secao-rotas', 'secao-entregas', 'secao-centros']

listaBotoesHabilitar.forEach( (botao, indice) => {
    const elemento = document.getElementById(botao);
    const secao = document.getElementById(listaSecoes[indice]);

    console.log(elemento, indice)
    
    elemento.addEventListener('click', () => {
        const secaoAtiva = document.getElementsByClassName('secao-ativa')[0]
        console.log(secaoAtiva)
        secaoAtiva.classList.value = 'secao'
        secao.classList.add('secao-ativa')

    } )
    
} )

