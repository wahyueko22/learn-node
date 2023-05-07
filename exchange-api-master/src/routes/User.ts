import { Router } from 'express';
import { userController } from './main';

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/user', userController.createUser);

export default userRouter;

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: Endpoints de usuário
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       User:
 *         type: object
 *         required:
 *            - username
 *            - password
 *         properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *         example:
 *            username: bartsimpson
 *            password: secret_password
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       Login:
 *         type: object
 *         required:
 *            - username
 *            - password
 *         properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *         example:
 *            username: johnwick
 *            password: Daisy!123
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       UserResponse:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            username:
 *              type: string
 *            password:
 *              type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       LoginResponse:
 *         type: object
 *         properties:
 *            user:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *            token:
 *              type: string
 */

/**
 * @swagger
 *   /login:
 *      post:
 *        tags: [User]
 *        description: Login do usuário
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Login'
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/LoginResponse'
 */

/**
 * @swagger
 *   /user:
 *      post:
 *        tags: [User]
 *        description: Cadastro de usuário
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *        responses:
 *          201:
 *            description: CREATED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/UserResponse'
 */
