// ** Controller for User Model **

import { Request, Response } from "express";
import Education from "../models/education.model";
import Work from "../models/work_experience.model"
import { IUser } from './../models/user.model';
import { INewUser } from './../interfaces/INewUser.interface';
import { db_getUserById, db_newUser, db_updateUser, db_userExists } from './../repositories/user.repository';
import { serv_getAllUsersData, serv_getUserData } from "../services/user.service";
import { db_addWorkExperience, db_getWorkExperience, db_updateWorkExperience } from "../repositories/workExperience.repository";
import { IWorkExperience } from './../models/work_experience.model';
import { IUserWorkExperience } from './../interfaces/IUserWorkExperience.interface';
import { db_deleteWorkExperience } from './../repositories/workExperience.repository';
import { serv_createUser } from './../services/user.service';
import { db_deleteUser } from './../repositories/user.repository';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { status, msg } = await serv_getAllUsersData()

        return res.status(status).json(msg);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

// New User: Save personal data, education and work experience from the new user
export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, education, work }: INewUser = req.body;

        const { status, msg } = await serv_createUser(user, education, work);


        return res.status(status).json(msg);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { status, msg } = (req.params.extended) ? await serv_getUserData(req.params.idUser, true) : await serv_getUserData(req.params.idUser);

        return res.status(status).json(msg);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await db_updateUser(req.body.newUser);

        return res.status(200).json(updatedUser);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

export const addWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { workExperience, userID }: IUserWorkExperience = req.body;

        await db_userExists(userID);
        await db_addWorkExperience(workExperience, userID);

        return res.status(201).json({ msg: "Work experience added" });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

export const deleteWorkExperience = async (req: Request, res: Response) => {
    try {
        const isDeleted = await db_deleteWorkExperience(req.body.workExperienceID)
        if (!isDeleted)
            throw new Error("Invalid ID");
            
        return res.status(200).json({ msg: true });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

export const updateWorkExperience = async (req: Request, res: Response) => {
    try {

        await db_userExists(req.body.workExperience.userID);
        const updatedWorkExp = await db_updateWorkExperience(req.body.workExperience);

        return res.status(200).json({ msg: updatedWorkExp });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

export const getWorkExperience = async (req: Request, res: Response) => {
    try {
        await db_userExists(req.params.userID);
        const foundWorkExperience = await db_getWorkExperience(req.params.userID);

        return res.status(200).json(foundWorkExperience);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const isRemoved = await db_deleteUser(req.body.userID);
        if (!isRemoved)
            throw new Error("Invalid user");
            
        return res.status(200).json({msg: "User deleted successfully"});
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

