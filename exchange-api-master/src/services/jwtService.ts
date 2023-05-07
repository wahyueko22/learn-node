import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';

interface IUserJwt {
  id: number
  username: string
}

const secret = process.env.JWT_SECRET;
    
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class JwtService {
  static createToken(data: IUserJwt): string {
    const token = jwt.sign({ data }, secret as string, jwtConfig as object);
    return token;
  }

  static validateToken = (token: string) => {
    try {
      const { data } = jwt.verify(token, secret as string) as jwt.JwtPayload;
      return data;
    } catch (error) {
      if (error) throw new Error(ErrorTypes.InvalidToken)
    }
  };
}

export default JwtService;