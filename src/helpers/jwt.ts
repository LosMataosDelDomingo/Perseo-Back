import jwt from "jsonwebtoken";
import config from "../constants/env";
import { IUserToken } from "../interfaces/IUserToken.interface";
import { db_getUserById } from "../repositories/user.repository";
import { IUser } from './../models/user.model';


export interface IPayload extends Object {
    id: string,
    email: string,
    iat: number,
    exp: number
}

export const createToken = (user: IUser): string => {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: 86400 });
};

export const getIdFromPayload = (token: string) => {
    const tokenWithoutBearer = token.split(" ")[1];

    const payload =<IPayload> jwt.verify(tokenWithoutBearer, config.JWT_SECRET);

    return payload.id;
};

export const checkAdmin  = async (token: string) => {
    if (token !== undefined){
        console.log('dentro')
        const tokenWithoutBearer = token.split(" ")[1];
        const payload =<IPayload> jwt.verify(tokenWithoutBearer, config.JWT_SECRET);
        const userData = await db_getUserById(payload.id);
        console.log(userData);
        if(userData.admin === true){
            return true;
        }
        return false;
    }
    return false;
};