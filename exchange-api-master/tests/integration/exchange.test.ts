import chai from 'chai';
import app from '../../src/app';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ExchangeService from '../../src/services/Exchange';
import ExchangeController from '../../src/controllers/Exchange';
import JwtService from '../../src/services/jwtService';

chai.use(chaiHttp);
const { expect } = chai;

describe('Exchange Integration Tests', () => {
  let exchangeService: ExchangeService;
  let exchangeController: ExchangeController;
  let mockListExchanges: sinon.SinonStub;

  beforeEach(() => {
    mockListExchanges = sinon.stub();
    exchangeService = new ExchangeService(mockListExchanges);
    exchangeController = new ExchangeController(exchangeService);
  });

  describe('POST /exchange', () => {

    it('should create a transaction', async () => {
      const base = 'EUR';
      const originalValue = 1;
      const exchangeCoin = 'BRL';
      const userId = 1;

      const mockResponseSuccess = {
        date: "2023-03-15T21:15:12.606Z",
        id: 1,
        userId: 1,
        base: "EUR",
        originalValue: 1,
        exchangeCoin: "BRL",
        exchangedValue: 6.5,
        rate: 6.5
      };

      mockListExchanges.resolves({ rates: { BRL: 6.5 } });

      const token = JwtService.createToken({ id: 1, username: 'mocked_user' });
      const response = await chai.request(app)
        .post('/exchange')
        .set('Authorization', token)
        .send({ base, originalValue, exchangeCoin, userId });

      expect(response.status).to.equal(201);
      expect(response.body).to.equal(mockResponseSuccess);
    });
  });
});
