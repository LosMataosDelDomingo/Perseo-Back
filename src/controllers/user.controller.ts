// ** Controller for User Model **

import { Request, Response } from "express";

import { INewUser } from './../interfaces/INewUser.interface';

import { serv_getAllUsersData, serv_getUserData, serv_createUser } from "../services/user.service";

import { db_updateUser, db_deleteUser, db_getUserByEmail } from './../repositories/user.repository';


// GET: Returns all user's data
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { status, msg } = await serv_getAllUsersData()

        return res.status(status).json({ result: msg });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// POST: Save personal data, education and work experience from the new user
export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, education, work }: INewUser = req.body;

        const { status, msg } = await serv_createUser(user, education, work);

        return res.status(status).json({ result: msg });

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

//GET: One user by email
export const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log(req.body.email);
        const userData = await db_getUserByEmail(req.body.email);
        return res.status(200).json({result: userData});
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
}

// GET: One user by Id
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { status, msg } = (req.params.extended) ? await serv_getUserData(req.params.idUser, true) : await serv_getUserData(req.params.idUser);

        return res.status(status).json({ result: msg });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

// PATCH: Update user's data
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updatedUser = await db_updateUser(req.body.newUser);

        return res.status(200).json({ result: updatedUser });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}



//! DELETE: Delete a user document (TODO: Change to invisible)
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const isRemoved = await db_deleteUser(req.body.userID);
        if (!isRemoved)
            throw new Error("Invalid user");

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};