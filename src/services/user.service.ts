// ** User's logic service **

import { INewUser } from './../interfaces/INewUser.interface';
import { IUserData } from './../interfaces/IUserData.interface';
import { IResponse } from './../interfaces/IResponse.interface';
import { IUser } from './../models/user.model';
import Education, { IEducation } from './../models/education.model';
import Work, { IWorkExperience } from './../models/work_experience.model';

import { db_allUsers, db_getUserById, db_newUser } from '../repositories/user.repository';
import { db_educationDataById } from './../repositories/education.repository';
import { db_getWorkExperience } from './../repositories/workExperience.repository';

import { USER_CREATED } from "../constants/logs";

// From all users, returns users' personal data, education and work experience
export const serv_getAllUsersData = async (): Promise<IResponse> => {
    try {
        const allUsers = await db_allUsers();

        let wrapperAllUserData: INewUser[] = [];

        for (const userData of allUsers) {
            const userEducation = await db_educationDataById(userData._id);
            const userWorkExperience = await db_getWorkExperience(userData._id);

            const wrappedUserData: INewUser = { user: userData, education: userEducation, work: userWorkExperience };

            wrapperAllUserData.push(wrappedUserData);
        };

        return { status: 200, msg: wrapperAllUserData };
    } catch (e) {
        return { status: 400, msg: e.message };
    }
};

// From one user, returns user's personal data, education and work experience
export const serv_getUserData = async (id: string, extended: boolean = false): Promise<IResponse> => {
    try {
        const foundUser = await db_getUserById(id);
        const userEducation = extended ? await db_educationDataById(foundUser._id) : undefined;
        const userWorkExperience = extended ? await db_getWorkExperience(foundUser._id) : undefined;

        const wrappedUserData: IUserData = extended ? { user: foundUser, education: userEducation, work: userWorkExperience } : { user: foundUser };

        return { status: 200, msg: wrappedUserData };
    } catch (e) {
        return { status: 400, msg: e.message };
    }
}

// Creates a new user (with education and work experience data)
export const serv_createUser = async (user: IUser): Promise<IResponse> => {
    try {
        const newUser = await db_newUser(user);

        // education.forEach(async educationData => {
        //     const newEducation = new Education(educationData)
        //     newEducation.userID = newUser._id
        //     await newEducation.save()
        // });

        // work.forEach(async workData => {
        //     const newWork = new Work(workData)
        //     newWork.userID = newUser._id
        //     await newWork.save()
        // });

        return { status: 201, msg: USER_CREATED }
    } catch (e) {
        return { status: 400, msg: e.message };
    }
};