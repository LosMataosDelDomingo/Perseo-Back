import { NextFunction, Request, Response } from "express";
import { DATA_MISSING } from "../constants/errors";
import { IWorkExperience } from './../models/work_experience.model';

export const verifyNewWork = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { dateStart, dateEnd, position, company, isWorking }: IWorkExperience = req.body.workExperience;
        const { userID } = req.body;
        if (typeof userID == 'undefined' || typeof dateStart == 'undefined' || typeof dateEnd == 'undefined' || typeof position == 'undefined' || typeof company == 'undefined' || typeof isWorking == 'undefined')
            return res.status(400).json({ msg: DATA_MISSING });

        if (!(position.trim() && company.trim() && userID.trim()))
            return res.status(400).json({ msg: DATA_MISSING });

        next()
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}