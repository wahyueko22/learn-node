import UserService from '../services/User';
import UserController from '../controllers/User';
import ExchangeService from '../services/Exchange';
import ExchangeController from '../controllers/Exchange';

const userService = new UserService();
const userController = new UserController(userService);

const exchangeService = new ExchangeService();
const exchangeController = new ExchangeController(exchangeService);

export { userController, exchangeController };