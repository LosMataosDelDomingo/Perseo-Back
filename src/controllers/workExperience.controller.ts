import { Request, Response } from "express";

import { ID_ERROR } from "../constants/errors";
import { WORK_CREATED, WORK_DELETED } from "../constants/logs";

import { IUserWorkExperience } from './../interfaces/IUserWorkExperience.interface';
import { IWorkExperience } from './../models/work_experience.model';

import { serv_getUserWork, serv_updateWork } from "../services/work.service";

import { db_addWorkExperience, db_deleteWorkExperience } from "../repositories/workExperience.repository";
import { db_userExists } from "../repositories/user.repository";


// POST: Create new Work Experience document
export const addWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { workExperience, userID }: IUserWorkExperience = req.body;

        await db_userExists(userID);
        await db_addWorkExperience(workExperience, userID);

        return res.status(201).json({ result: WORK_CREATED });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

// DELETE: Delete one Work Experience document
export const deleteWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const isDeleted = await db_deleteWorkExperience(req.body.workExperienceID);
        if (!isDeleted)
            throw new Error(ID_ERROR);

        return res.status(200).json({ result: WORK_DELETED });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};

// PATCH: Update Work Experience document
export const updateWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { workExperience }: { workExperience: IWorkExperience } = req.body;

        const { status, msg } = await serv_updateWork(workExperience);

        return res.status(status).json({ result: msg });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// GET: Returns the work experience from a user
export const getWorkExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userID } = req.params;
        const { status, msg } = await serv_getUserWork(userID);

        return res.status(status).json({ result: msg });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};