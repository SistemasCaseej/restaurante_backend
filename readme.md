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
npm install dotenv
```

### 3. Configurar o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto para configurar as variáveis de ambiente necessárias para o servidor. Um exemplo de conteúdo para o arquivo:

```env
# Porta onde o servidor vai rodar
PORT=

```

- **PORT**: Define a porta que o servidor irá usar. Pode ser ajustada conforme necessário.

### 4. Rodar o Servidor
Para iniciar o servidor, execute o comando:
```bash
node app.js
```

O servidor será iniciado e exibirá uma mensagem de confirmação no console.

## Estrutura do Projeto
```bash
restaurante_backend/
├── src/
│   ├── index.js            # Define as rotas da aplicação
│   ├── controllers/
│   │   └── serverController.js  # Controlador com a lógica de resposta da rota
│   ├── models/
│   │   └── DBModel.js       # Modelos de dados (sem configuração adicional por enquanto)
└── index.js                 # Arquivo principal que inicia o servidor
```
