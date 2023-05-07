import md5 from 'md5';
import { ErrorTypes } from '../errors/catalog';
import User from '../models/User';
import { userSchema } from '../utils/validations';

export default class UserService {
  createUser = async (username: string, password: string): Promise<User> => {
    userSchema({ username, password });
    
    const alreadyExists = await User.findOne({ where: { username } });
    if (alreadyExists) throw new Error(ErrorTypes.ConflictError);
    
    const user = await User.create({ username, password: md5(password) });
    return user;
  }

  getUserByUsername = async (username: string): Promise<User> => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }

  login = async (username: string, password: string) => {
    const user = await this.getUserByUsername(username);
    if (!user || user.password !== md5(password)) {
      throw new Error(ErrorTypes.UnauthorizedError);
    }
    return { id: user.id, username: user.username }
  }
}
