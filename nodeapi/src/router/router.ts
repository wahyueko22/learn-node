'use strict';

import { Router } from "express";

import usersRouter from "../controller/user";

const routes = Router();

routes.use('/user', usersRouter);

export default routes