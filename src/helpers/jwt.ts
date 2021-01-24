import jwt from "jsonwebtoken";
import config from "../constants/env";
import { IUserToken } from "../interfaces/IUserToken.interface";
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