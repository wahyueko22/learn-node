import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { exchangeController } from './main';

const exchangeRouter = Router();

exchangeRouter.use(authMiddleware);

exchangeRouter.post('/exchange', exchangeController.createTransaction);
exchangeRouter.get('/exchange/user', exchangeController.listAllTransactions);

export default exchangeRouter;

/**
 * @swagger
 *  tags:
 *    name: Exchange
 *    description: Endpoints de conversão de moedas
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       Exchange:
 *         type: object
 *         required:
 *            - base
 *            - originalValue
 *            - exchangeCoin
 *         properties:
 *            base:
 *              type: string
 *            originalValue:
 *              type: number
 *            exchangeCoin:
 *              type: string
 *         example:
 *            base: EUR
 *            originalValue: 100
 *            exchangeCoin: BRL
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       ExchangeResponse:
 *         type: object
 *         properties:
 *            date:
 *              type: date
 *            id:
 *              type: integer
 *            userId:
 *              type: integer
 *            base:
 *              type: string
 *            originalValue:
 *              type: number
 *              format: float
 *            exchangeCoin:
 *              type: string
 *            exchangedValue:
 *              type: number
 *              format: float
 *            rate:
 *              type: number
 *              format: float
 */

/**
 * @swagger
 *   /exchange:
 *      post:
 *        tags: [Exchange]
 *        description: Faz a conversão de uma moeda
 *        security:
 *          - apiKey: []
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Exchange'
 *        responses:
 *          201:
 *            description: CREATED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/ExchangeResponse'
 */

/**
 * @swagger
 *   /exchange/user:
 *      get:
 *        tags: [Exchange]
 *        description: Lista todas as conversões feitas pelo usuário
 *        security:
 *          - apiKey: []
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  $ref: '#/components/schemas/ExchangeResponse'
 */
