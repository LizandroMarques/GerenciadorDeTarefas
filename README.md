# README

# PROJETO 1: Gerenciador de Tarefas (BACKEND)

## Sobre o projeto

Projeto desenvolvido em **Node.js + Express** que gerencia tarefas armazenadas em um arquivo **JSON**.  
Possui estrutura organizada em **controllers, services, routes e middlewares**:

- As routes são ligadas aos controllers que tratam as requisições.
- Em alguns casos, como criar uma tarefa ou atualizá-la, é utilizada **middleware** como forma de validação dos dados da requisição.
- A **service** utilizada é um arquivo responsável por manipular a base de dados, que nesse caso é um arquivo JSON.

Possui testes automatizados usando **Jest**.

## Versão do Node

v22.19.0

## Tecnologias Backend

- Node.js v22.19.0
- Express 5.1.0
- Babel-jest
- EsLint
- Prettier
- VSCode

## Observação importante

Nesse repositório existem 2 projetos:

1. Backend: API responsável por manipular a base de dados (arquivo JSON), localizado na pasta `Backend`.
2. Frontend: Projeto frontend disponível no diretório `Frontend`.
   **O projeto backend deverá ser executado primeiro e, em outro terminal, o projeto frontend.**

---

## Executando o projeto backend

1. Instale o VSCode pelo link https://code.visualstudio.com/Download
2. A versão do Node necessária é v22.19.0. Caso não tenha instalado, baixe [aqui](https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi).
3. Clone o repositório:
   - Caso não tenha o git instalado:
     - [windows](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/Git-2.51.0-64-bit.exe).
     - [Demais SOs](https://git-scm.com/downloads)
   - git clone https://github.com/LizandroMarques/GerenciadorDeTarefas.git
4. Abra o terminal, entre na pasta backend e instale as dependências:
   - cd Backend
   - npm install
5. Execute o projeto:
   - node server.js
   - Aparecerá no console a mensagem:  
     `"Servidor rodando em http://localhost:3000"`.

---

## Testes

Foi utilizada a biblioteca **Jest** para criar uma suite de testes para a API.

### Para executar os testes:

1. Estar dentro da pasta `Backend`.
2. Executar:
   - npm test
3. Após finalizar, deverá aparecer o resultado de **1 suite executada com 6 testes passados com sucesso** (conforme print no diretório `Backend/testes/imagens`).

**Observação:**  
Dentro do diretório `Backend/testes/postman` está a **collection do Postman** contendo testes das rotas da API Gerenciador de Tarefas.

---

## Rotas principais

- `GET /api/tasks` → lista todas as tarefas
- `POST /api/tasks` → cria nova tarefa
- `GET /api/tasks/:id` → busca tarefa por ID
- `PUT /api/tasks/:id` → atualiza tarefa
- `DELETE /api/tasks/:id` → exclui tarefa

---

## Estrutura do projeto

GerenciadorDeTarefas/
│
├─ **testes**/
│ ├─ imagens/
│ ├─ postman/
│ └─ tarefasController.test.js
│
├─ src/
│ ├─ controllers/tarefasController.js
│ ├─ json/tarefas.json
│ ├─ middlewares/validateData.js
│ ├─ routes/tarefas.js
│ ├─ services/tarefasServices.js
│ └─ utils/
│
├─ app.js
├─ package.json
└─ server.js

---

# PROJETO 2: Gerenciador de Tarefas (FRONTEND)

# Sobre o projeto

Projeto desenvolvido em **Reack** e framework **Material UI**.

## Executando o projeto backend

1. Após clonar o projeto entrar na pasta frontend
2. npm install
3. npm run dev (vai rodar no endereço http://localhost:5173/)

OBS.: Par funcionar primeiro deverá rodar a api backend para em outro terminar rodar o projeto frontend.

# PROMPTS UTILIZADOS:

1. instalando e configurando o prettier em projeto node
2. Como criar uma suite de teste com jest
3. Alguns prompts de ajustes de layout utilizando o Material UI
4. Outros referente a erros que tive no decorrer do projeto
