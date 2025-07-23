
# Frontend de um Sistema de Logística de Entregas

## 📁 Estrutura de Pastas
```
assets/
└── data/
    └── fake-api.json         # Arquivo JSON simulado para a API

static/
├── css/                      # Arquivos CSS gerais e específicos por página
│   ├── admin.css
│   ├── base.css
│   ├── componentes.css
│   ├── home.css
│   ├── layout.css
│   └── rastreamento.css
│
├── img/                      # Imagens do projeto
│
├── js/
│   ├── pages/                # Scripts organizados por páginas
│   │   ├── admin/
│   │   │   ├── methods/
│   │   │   │   ├── computed.js
│   │   │   │   ├── data.js
│   │   │   │   └── dom.js
│   │   │   └── app.js
│   │   │
│   │   └── rastreamento/
│   │       ├── methods/
│   │       │   ├── cliente.js
│   │       │   ├── encomenda.js
│   │       │   ├── entrega.js
│   │       │   ├── index.js
│   │       │   └── utils.js
│   │       ├── app.js
│   │       ├── data.js
│   │       └── home.js
│   │
│   ├── services/             # Funções para comunicação com a API (fetch)
│   │   ├── centro.js
│   │   ├── cliente.js
│   │   ├── config.js
│   │   ├── encomenda.js
│   │   ├── entrega.js
│   │   ├── index.js
│   │   └── rota.js
│   │
│   └── utils/                # Utilitários de formatação e validação
│       ├── formatter.js
│       └── validator.js
│
├── admin.html                # Página do Painel do Administrador
├── index.html                # Página inicial (menu principal)
├── rastreamento.html         # Página de Rastreamento de Entregas
└── paleta.md                 # Documento com a paleta de cores do projeto
```

## ⚙️ Funcionalidades

### 🔎 Página de Rastreamento (`rastreamento.html`)
- Busca por código da entrega
- Busca por CPF/CNPJ
- Exibição dos detalhes da encomenda
- Indicadores visuais de status

### 🛠 Painel do Administrador (`admin.html`)
- Listagem de entregas
- Cadastro e edição de:
  - Clientes
  - Centros de distribuição
  - Entregas
  - Rotas
- Atualização de status

### 🌐 Integração com API
- Uso de `fetch()` para leitura e escrita no `fake-api.json`
- Organização separada em `services/`

### 💡 Utilitários
- Formatação de CPF, datas e nomes
- Validação de campos obrigatórios
- Reutilização de métodos comuns

## 💻 Como Rodar o Projeto

### Pré-requisitos

- Editor de código [Visual Studio Code](https://code.visualstudio.com/)
- Extensão **Mock Server** do VS Code

### Passo a Passo

1. **Clone ou abra o projeto no VS Code**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repo.git
   cd nome-do-repo
   ```

2. **Instale a extensão _Mock Server_**
   - No VS Code, vá até a aba de extensões (ícone de blocos)
   - Busque por: `Mock Server` (por **phmcleod**)
   - Instale a extensão

3. **Inicie o servidor mock**
   - Clique com o botão direito sobre `fake-api.json` (em `assets/data/`)
   - Selecione **"Start Mock Server"**
   - A API estará disponível em algo como:  
     ```
     http://localhost:3000
     ```

4. **Abra o projeto no navegador**
   - Dê duplo clique em `index.html`, `rastreamento.html` ou `admin.html`
   - Ou use uma extensão como **Live Server** para servir os arquivos localmente

5. **Utilize o sistema normalmente**
   - Todas as requisições `fetch()` buscarão dados da API simulada

## 🧪 Simulação da API

O projeto **não depende de backend real**. Toda comunicação é feita com o `fake-api.json` via **Mock Server**, o que facilita testes e desenvolvimento offline.

## 👨‍💻 Autores

- [@LucasLins13](https://github.com/LucasLins13)
- [@luizcodedthat](https://github.com/luizcodedthat)
- [@PedroGuilhermeYS](https://github.com/PedroGuilhermeYS)
