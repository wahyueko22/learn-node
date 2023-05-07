import chai from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';
import UserService from '../../src/services/User';
import { userMock } from '../mocks/userMocks';
import JwtService from '../../src/services/jwtService';
import { ErrorTypes } from '../../src/errors/catalog';

const { expect } = chai;

chai.use(chaiHttp);

describe('User integration tests', () => {

  describe('POST /user', () => {

    describe('on success', () => {
      let stub: sinon.SinonSpy<any, any>;
  
      beforeEach(() => {
        const createdUser = new User(userMock.reponseSuccess);
        return stub = sinon.stub(User, 'create').resolves(createdUser);
      });
  
      afterEach(() => stub.restore());
  
      it('should return user data', async () => {
        const { bodySuccess: { username, password } } = userMock;
        const userService = new UserService();
        const data = await userService.createUser(username, password);
        expect(data.dataValues).to.deep.eq(userMock.reponseSuccess);
        sinon.assert.calledOnce(stub);
      });
    });
  
    describe('on failure', () => {
      let stub: sinon.SinonSpy<any, any>;
  
      beforeEach(() => {
        stub = sinon.stub(User, 'create').rejects(new Error('Mocked error'));
      });

      afterEach(() => stub.restore());
  
      it('should return 409 ConflictError if user already exists', async () => {
        const createdUser = new User(userMock.reponseSuccess);
        const existingUserStub = sinon.stub(User, 'findOne').resolves(createdUser);
  
        const newUser = userMock.bodyConflictFailure;
        const response = await request(app).post('/user').send(newUser);
  
        expect(response.status).to.equal(409);
        expect(response.body).to.deep.equal({ error: 'Entity already exists' });
  
        existingUserStub.restore(); 
      });
    });
  });

  describe ('POST /login', () => {
    const userService = new UserService();
    let sandbox: SinonSandbox;

    beforeEach(() => sandbox = sinon.createSandbox());
  
    afterEach(() => sandbox.restore());

    it('should return a valid JWT Token', async () => {
      const username = 'mocked_user';
      const password = 'mocked_password';
      const mockUserData = { id: 1, username: 'mocked_user' };

      const userServiceLoginMock = sandbox.stub(userService, 'login').resolves(mockUserData);
      const jwtServiceCreateTokenSpy = sandbox.spy(JwtService, 'createToken');

      const res = await request(app)
        .post('/login')
        .send({ username, password });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.deep.equal(mockUserData);
      expect(res.body).to.have.property('token');

      sinon.assert.calledWith(jwtServiceCreateTokenSpy, { id: 1, username: 'mocked_user' });
    });

    it('should return 401 if login fails', async () => {
      sandbox.stub(userService, 'login').throws(new Error(ErrorTypes.UnauthorizedError));

      const res = await request(app)
        .post('/login')
        .send({ username: 'mocked_user', password: 'wrong_password' });
      
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Invalid username or password');
    });
  });
});