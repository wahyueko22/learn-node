import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../services/jwtService';
import UserService from '../services/User';

export default class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.createUser(username, password);
    res.status(StatusCodes.CREATED).json(user);
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.login(username, password);
    const token = JwtService.createToken(user);
    res.status(StatusCodes.OK).json({ user, token });
  }
}
