import chai from "chai";
import sinon from "sinon";
import Exchange from "../../src/models/Exchange";
import ExchangeService from "../../src/services/Exchange";
import { mockFetchResponse } from "../mocks/exchangeMocks";

const { expect } = chai;


describe('Exchange unit tests', () => {

  describe('listExchanges', () => {

    it('should returns exchange data', async () => {
      const fetchApiStub = sinon.stub().resolves(mockFetchResponse);
      const exchageService = new ExchangeService(fetchApiStub);

      const exchanges = await exchageService.listExchanges();

      expect(exchanges).to.deep.equal(mockFetchResponse);
      sinon.assert.calledOnce(fetchApiStub);
    });
  });

  describe('createTransaction', () => {
    let exchangeService: ExchangeService;
    let mockListExchanges: sinon.SinonStub;
  
    beforeEach(() => {
      mockListExchanges = sinon.stub();
      exchangeService = new ExchangeService(mockListExchanges);
    });

    it('should create a transaction successfully', async () => {
      mockListExchanges.resolves({ rates: { BRL: 6.5 } });
      const base = 'EUR';
      const originalValue = 1;
      const exchangeCoin = 'BRL';
      const userId = 1;

      const result = await exchangeService.createTransaction(base, originalValue, exchangeCoin, userId);
      
      expect(result.userId).to.be.equal(userId);
      expect(result.base).to.be.equal(base);
      expect(result.originalValue).to.be.equal(originalValue);
      expect(result.exchangeCoin).to.be.equal(exchangeCoin);
      expect(result.rate).to.be.equal(6.5);
      expect(result.exchangedValue).to.be.equal(6.5);
      expect(mockListExchanges).to.have.been.calledOnce;
    });

    it('should throw an error if de parameters are invalid', async () => {
      mockListExchanges.resolves({ rates: { BRL: 6.5 } });
      const base = "EUR";
      const originalValue = -1;
      const exchangeCoin = "BRL";
      const userId = 1;

      await expect(exchangeService.createTransaction(base, originalValue, exchangeCoin, userId))
      .to.eventually.be.rejectedWith(Error, '"originalValue" must be a positive number');
    });
  });

  describe('listAllTransactions', () => {
    let exchangeService: ExchangeService;
    let mockFindAll: sinon.SinonStub;
  
    beforeEach(() => {
      mockFindAll = sinon.stub(Exchange, 'findAll');
      exchangeService = new ExchangeService();
    });
  
    afterEach(() => {
      mockFindAll.restore();
    });
  
    it('should return all transactions of the given user', async () => {
      const userId = 123;
      const mockTransactions = [
        {
          id: 1,
          userId,
          base: 'USD',
          originalValue: 100,
          exchangeCoin: 'BRL',
          exchangedValue: 500,
          rate: 5,
          date: 1647343801000
        },
        {
          id: 2,
          userId,
          base: 'EUR',
          originalValue: 50,
          exchangeCoin: 'JPY',
          exchangedValue: 7500,
          rate: 150,
          date: 1647343852000
        }
      ];
      mockFindAll.resolves(mockTransactions);
  
      const result = await exchangeService.listAllTransactions(userId);
  
      expect(result).to.deep.equal(mockTransactions);
      sinon.assert.calledOnce(mockFindAll);
      sinon.assert.calledWith(mockFindAll, { where: { userId } });
    });
  });
});