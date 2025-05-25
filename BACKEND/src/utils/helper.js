import { cookieOptions } from "../config/config.js";
import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '1h' // Token expiration time
        }
    );
}

export const verifyToken = (token) => {
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log(decoded.id);
  return decoded.id;
};