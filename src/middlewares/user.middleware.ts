import { NextFunction, Request, Response } from "express";
import { DATA_MISSING } from "../constants/errors";
import { INewUser } from './../interfaces/INewUser.interface';

const emailValidator = (email: string): boolean => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
};

export const verifyNewUser = (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user, education, work }: INewUser = req.body;
        const { name, surname, email, phone, birthAge, address, summary } = user;


        if (typeof name == 'undefined' || typeof surname == 'undefined' || typeof email == 'undefined' || typeof phone == 'undefined')
            return res.status(400).json({ msg: DATA_MISSING });


        education.forEach(educationData => {
            const { dateStart, dateEnd, educationCenter, discipline } = educationData
            if (typeof dateStart == 'undefined' || typeof dateEnd == 'undefined' || typeof educationCenter == 'undefined' || typeof discipline == 'undefined')
                throw new Error(DATA_MISSING);

        });


        work.forEach(workData => {
            const { dateStart, dateEnd, position, company, isWorking } = workData;
            if (typeof dateStart == 'undefined' || typeof dateEnd == 'undefined' || typeof position == 'undefined' || typeof company == 'undefined' || typeof isWorking == 'undefined')
                throw new Error(DATA_MISSING);
        });

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }


    // if (!(email.trim() && emailValidator(email) && password.trim() && telf.trim()))
    //     return res.status(400).json({ msg: err.SIGNUP_DATA_ERROR });

    next();
};