// ** Controller for User Model **

import { Request, Response } from "express";
import Education from "../models/education.model";
import Work from "../models/work_experience.model"
import { IUser } from './../models/user.model';
import { INewUser } from './../interfaces/INewUser.interface';
import { db_getUserById, db_newUser } from './../repositories/user.repository';
import { serv_getAllUsersData, serv_getUserData } from "../services/user.service";
import { db_addWorkExperience } from "../repositories/workExperience.repository";
import { IWorkExperience } from './../models/work_experience.model';
import { IUserWorkExperience } from './../interfaces/IUserWorkExperience.interface';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await serv_getAllUsersData()

        return res.status(200).json({ res: allUsers });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

// New User: Save personal data, education and work experience from the new user
export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, education, work }: INewUser = req.body;

        const newUser: IUser = await db_newUser(user)

        education.forEach(async educationData => {
            const newEducation = new Education(educationData)
            newEducation.userID = newUser._id
            await newEducation.save()
            console.log(newEducation);
        });

        work.forEach(async workData => {
            const newWork = new Work(workData)
            newWork.userID = newUser._id
            await newWork.save()
            console.log(newWork);
        });

        return res.status(200).json({ res: "data" });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {

        const foundUser = (req.params.extended) ? await serv_getUserData(req.params.idUser, true) : await serv_getUserData(req.params.idUser);

        return res.status(200).json({ user: foundUser });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

export const addWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { workExperience, userID }: IUserWorkExperience = req.body;
        const addedWorkExperience = await db_addWorkExperience(workExperience, userID);

        return res.status(200).json({ msg: "Work experience added" });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};