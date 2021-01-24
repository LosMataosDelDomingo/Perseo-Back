import { NextFunction, Request, Response } from "express";
import { DATA_MISSING, REQUIRED_DATA_MISSING } from "../constants/errors";
import { INewUser } from './../interfaces/INewUser.interface';
import IUpdatePassword from './../interfaces/IUpdatePassword.interface';

const emailValidator = (email: string): boolean => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
};

export const verifyNewUser = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user, education, work }: INewUser = req.body;


        const { name, surname, email, phone, birthAge, address, summary } = user;
        if (typeof name == 'undefined' || typeof surname == 'undefined' || typeof email == 'undefined' || typeof phone == 'undefined' || typeof birthAge == 'undefined')
            return res.status(400).json({ msg: DATA_MISSING });

        if (typeof education !== "undefined") {
            education.forEach(educationData => {
                const { dateStart, dateEnd, title, educationCenter, discipline } = educationData
                if (typeof dateStart == 'undefined' || typeof dateEnd == 'undefined' || typeof title == 'undefined' || typeof educationCenter == 'undefined' || typeof discipline == 'undefined')
                    throw new Error(DATA_MISSING);
            });
        }

        if (typeof work !== "undefined") {
            work.forEach(workData => {
                const { dateStart, dateEnd, position, company, isWorking } = workData;
                if (typeof dateStart == 'undefined' || typeof dateEnd == 'undefined' || typeof position == 'undefined' || typeof company == 'undefined' || typeof isWorking == 'undefined')
                    throw new Error(DATA_MISSING);
            });
        }

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }

    next();
};

export const verifyExtended = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.params.extended !== "undefined")
        if (req.params.extended !== "extended")
            return res.status(400).json({ msg: "Invalid URL" });

    next();

};


export const checkPasswordChangeRequest = (req: Request, res: Response, next: NextFunction) => {

    const { oldPwd, newPwd }: IUpdatePassword = req.body;

    if (!oldPwd.trim() || !newPwd.trim())
        return res.status(400).json({ msg: REQUIRED_DATA_MISSING });

    next();

};