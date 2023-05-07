# Conversor de moedas

Essa aplicação é uma API Rest capaz de realizar a conversão entre duas moedas utilizando taxas de conversões atualizadas de um serviço externo [(API Free)](https://apilayer.com/marketplace/exchangerates_data-api?utm_source=apilayermarketplace&utm_medium=featured), para consumir dessa API é necessário fazer um cadastro e gerar uma API_KEY.

Para realizar a conversão é necessário o ID do usuário que deseja realizar a conversão. Por isso, é preciso estar logado para poder realizar uma transação de conversão de moeda.</br>
A API registra cada transação de conversão com todas as informações relacionadas e também disponibilizar um endpoint para consulta das transações realizadas por um usuário.

## Ferramentas utilizadas

A aplicação foi desenvolvida no modelo de camadas MSC (Model-Service-Conntroller) em Node.js, utilizando Typescript, Express.js, banco de dados SQLite, ORM Sequelize e Swagger para a documentação. Tem autenticação de usuário dom Json Web Token (JWT). Além disso, é possível radar a aplicação pelo Docker.</br>
Para os testes unitários e de integração, foi utilizado Mocha, Chai e Sinon.</br>
Para deploy da aplicação, foi utilizado o [Railway](https://exchange-api.up.railway.app/).

## Inicialização da Aplicação

### Inicialização via Docker 🐳

1. Clone o repositório `git@github.com:trkotovicz/exchange-api.git`.
2. Na raíz do repositório, abra o terminal e rode o comando `npm run compose:up` e aguarde a alicação subir (esse passo pode demorar um pouco).
3. Para encerrar a aplicação, rode o comando `npm run compose:down`.

### Inicialização local 🖥

1. Clone o repositório `git@github.com:trkotovicz/exchange-api.git`.
2. Na raíz do repositório instale as dependências e inicialize o projeto com o comando `npm start`.
3. Abra o navegador no endereço `http://localhost:3001/docs/#/` para testar a API.

## Testes

Para testar a aplicação, depois de ter instalado as dependências, basta abrir o terminal na raíz do repositório e rodar o comando `npm test` ou `npm run test`.

## API

Com a aplicação rodando acesse a [documentação da API](http://localhost:3001/docs/#/). </br>

## Utilização da Aplicação

1. Crie o arquivo `.env` na pasta raíz e informe a sua `API_KEY`.
2. Para utilizar a aplicação, e necessário criar um novo usuário. Para isso, acesse a rota `/user` e informe `username` e `password`.
3. Acesse a rota `/login` e informe os dados de usuário criados anteriormente.
4. Para acessar as rotas de conversão `/exchange`, é necessário informar no headers da sua requisição o token gerado no login.
5. Para acessar todas as transações feitas pelo usuário,  acesse a rota `/exchange/user` informando o token.

*Nota: A sua primeira requisição de conversão pode demorar um pouquinho para retornar, pois ele busca as taxas de todas as moedas disponíveis na API externa.

## Melhorias Futuras

- Corrigir o erro de deploy no Railway (está retornando um erro de token inválido ao tentar acessar a aplicação).
- Adicionar um fluxo de entrega contínua (CI/CD).
- Melhorar os testes unitários e de integração da aplicação.

## Itens desejáveis

 - [x]  Logs
 - [x] Tratamento de exceções
 - [x]  Documentação
 - [x]  Coesão de commits
 - [x]  Mensagens de commits claras
 - [x]  Configuração de lint
 - [x]  Testes unitários
 - [x] Testes de integração
 - [x] Documentação dos endpoints
 - [x] Estar rodando e disponível (Ex: Heroku, ou similar)
 - [ ] CI/CD
 
 ---

Projeto desenvolvido por [Thais R Kotovicz](https://www.linkedin.com/in/thaiskotovicz/).
</br>
