# Backend do Projeto

Este é o backend de uma API REST para gerenciamento de dados de um restaurante. O projeto foi desenvolvido utilizando Node.js.

## Como Rodar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/SistemasCaseej/restaurante_backend.git
cd restaurante_backend
```

### 2. Instalar Dependências
```bash
npm install express
```

### 3. Rodar o Servidor
Para iniciar o servidor, execute o comando:
```bash
node index.js
```

O servidor será iniciado em [http://localhost:8080](http://localhost:8080) e exibirá uma mensagem de confirmação no console.

## Estrutura do Projeto
```bash
restaurante_backend/
├── src/
│   ├── index.js            # Define as rotas da aplicação
│   ├── controllers/
│   │   └── serverController.js  # Controlador com a lógica de resposta da rota
│   ├── models/
│   │   └──    # Modelos de dados (sem configuração adicional por enquanto)
└── index.js                 # Arquivo principal que inicia o servidor
```
