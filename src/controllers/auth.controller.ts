import { Request, Response } from "express";

import User, { IUser } from "../models/user.model";
import { checkPassword, emailInDB } from '../repositories/auth.repository';
import { DATABASE_ERROR, INVALID_TOKEN, REQUIRED_DATA_MISSING, SIGNIN_CREDENTIALS_ERROR, SIGNUP_EMAIL_REGISTERED } from "../constants/errors";
import { createToken, getIdFromPayload } from '../helpers/jwt';
import IUpdatePassword from './../interfaces/IUpdatePassword.interface';
import { getUserById, updatePassword, updateProfile } from './../repositories/auth.repository';
import ISignUp from './../interfaces/ISignUp.interface';
import ISignIn from './../interfaces/ISignIn.interface';
import { IProfile } from './../interfaces/IAuth.interface';

// Register
export const signUp = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { body }: { body: ISignUp } = req;

        const userFound: IUser = await emailInDB(body.email);
        if (userFound)
            throw new Error(SIGNUP_EMAIL_REGISTERED);
            
        // Revisar redirect to user controller
        const newUser = new User(body);
        await newUser.save();

        return res.status(201).json(newUser);

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

// Login
export const signIn = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { body }: { body: ISignIn } = req;

        const userFound: IUser = await emailInDB(body.email);
        if (!userFound)
            throw new Error(SIGNIN_CREDENTIALS_ERROR);

        const isMatch: boolean = await checkPassword(userFound, body.password);
        if (!isMatch)
            throw new Error(SIGNIN_CREDENTIALS_ERROR);

        const userToken: string = createToken(userFound);

        return res.status(200).json({ token: userToken });

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

//Change Password
export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { body }: { body: IUpdatePassword } = req;

        // Get id from jwt token
        const id: string = getIdFromPayload(<string>req.headers.authorization);
        if (!id)
            throw new Error(INVALID_TOKEN);

        // Get user's data ()
        //! Falta filtro de salida
        const userFound: IUser = await getUserById(id);
        if (!userFound)
            throw new Error(REQUIRED_DATA_MISSING);

        // Is Password correct?
        const isMatch: boolean = await checkPassword(userFound, body.oldPwd);
        if (!isMatch)
            throw new Error(REQUIRED_DATA_MISSING);

        const updatedUser = await updatePassword(userFound, body.newPwd);
        if (!updatedUser)
            throw new Error(DATABASE_ERROR);

        return res.status(200).json(updatedUser);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

export const changeProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { phone, email, name, surname, birthAge }: IProfile = req.body;

        // Get id from jwt token
        const id: string = getIdFromPayload(<string>req.headers.authorization);
        if (!id)
            throw new Error(INVALID_TOKEN);

        // Get user's data
        const userFound: IUser = await getUserById(id);
        if (!userFound)
            throw new Error(REQUIRED_DATA_MISSING);

        const updatedUser: IUser = await updateProfile(userFound, { phone: phone, email: email, name: name, surname: surname, birthAge: birthAge });
        if (!updatedUser)
            throw new Error(DATABASE_ERROR);

        return res.status(200).json({ msg: "Successfully updated." });

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};