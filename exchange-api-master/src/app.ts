import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './docs/swagger.config';
import errorHandler from './middlewares/error';
import userRouter from './routes/User';
import exchangeRouter from './routes/Exchange';

const app = express();

app.use(express.json());
app.use(cors());

const swaggerDoc = swaggerJSDoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(userRouter);
app.use(exchangeRouter);

app.use(errorHandler);

export default app;
