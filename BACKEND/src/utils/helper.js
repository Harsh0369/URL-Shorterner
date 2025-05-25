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
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
} 