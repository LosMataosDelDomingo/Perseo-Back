// ** Work's logic service **

import { IWorkExperience } from './../models/work_experience.model';
import { IResponse } from './../interfaces/IResponse.interface';

import { db_userExists } from "../repositories/user.repository";
import { db_updateWorkExperience, db_getWorkExperience } from "../repositories/workExperience.repository";

// Returns the work experience from an user
export const serv_getUserWork = async (userID: string): Promise<IResponse> => {
    try {
        await db_userExists(userID);
        const foundWorkExperience = await db_getWorkExperience(userID);

        return { status: 200, msg: foundWorkExperience };
    } catch (e) {
        return { status: 400, msg: e.message };
    }
};


// Returns a work document updated
export const serv_updateWork = async (workExperience: IWorkExperience): Promise<IResponse> => {
    try {
        await db_userExists(workExperience.userID);
        const updatedWorkExp = await db_updateWorkExperience(workExperience);

        return { status: 200, msg: updatedWorkExp };
    } catch (e) {
        return { status: 400, msg: e.message };
    }
};