import bcrypt from 'bcrypt';
import { ConflictError } from '../utils/errorHandler.js';
import * as helper from '../utils/helper.js';
import * as userDao from '../dao/user.dao.js';


export const RegisterUser = async (name, email, password) => {
    const user = await userDao.getUserByEmail(email);
    if (user) throw new ConflictError('User already exists with this email');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userDao.createUser(name, email, hashedPassword);


    const token = helper.signToken({ id: newUser._id });
    return token;
}

export const LoginUser = async (email, password) => {
    const user = await userDao.getUserByEmail(email);
    if (!user) throw new ConflictError('User does not exist with this email');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ConflictError('Invalid password');

    const token = await helper.signToken({ id: user._id });
    return token;
}