const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Exchanges Transactions',
      description: `API Rest que realiza a conversão entre duas moedas utilizando taxas de conversões atualizadas de um serviço externo.\n
        A API consome dados de taxas de câmbio na Exchange Rates Data API (https://apilayer.com/marketplace/exchangerates_data-api?utm_source=apilayermarketplace&utm_medium=featured) \n
          - Para poder consumir dessa API, é preciso fazer um cadastro (gratuito) e usar a API Key do usuário. \n
          - Basta incluir a chave de acesso no arquivo .env que se encontra na pasta raiz.
        API com autenticação JWT. \n
          - Para acessar rotas protegidas, fazer o login e usar o Token gerado. \n
          - Cada usuário tem um token único, portanto só pode acessar as transações realizadas por ele mesmo.`,
      version: '1.0.0',
    },
    servers: [{
      url: 'http://localhost:3001',
      description: 'servidor local',
    }],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  apis: [
    './src/routes/Exchange.ts',
    './src/routes/User.ts',
  ],
};

export default swaggerConfig;
