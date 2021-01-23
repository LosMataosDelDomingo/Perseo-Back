import { Request, Response } from "express";
import { ID_ERROR } from "../constants/errors";
import { EDUCATION_CREATED, EDUCATION_DELETED } from "../constants/logs";
import { db_addEducation, db_deleteEducation, db_educationDataById, db_updateEducation } from "../repositories/education.repository";

// GET: Return the education from a user.
export const getEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userEducation = await db_educationDataById(req.params.userID);

        return res.status(200).json({result: userEducation});
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

// PATCH: Update an education document
export const updateEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const updatedEducation = await db_updateEducation(req.body.newEducation);

        return res.status(200).json({result: updatedEducation});
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

// POST: Insert an education document
export const addEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        await db_addEducation(req.body.newEducation);

        return res.status(201).json({ msg: EDUCATION_CREATED});
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}

// DELETE: Delete an education document
export const deleteEducation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const isDeleted = await db_deleteEducation(req.body.educationID);
        if (!isDeleted)
            throw new Error(ID_ERROR);

        return res.status(200).json({ msg: EDUCATION_DELETED });

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}