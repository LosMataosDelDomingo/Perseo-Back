import { db_allUsers, db_getUserById } from '../repositories/user.repository';
import { INewUser } from './../interfaces/INewUser.interface';
import { db_educationDataById } from './../repositories/education.repository';
import { db_workExperienceDataById } from './../repositories/workExperience.repository';
import { IUserData } from './../interfaces/IUserData.interface';
import { IWorkExperience } from './../models/work_experience.model';
import { IEducation } from './../models/education.model';
import { IUser } from './../models/user.model';
import { db_newUser } from './../repositories/user.repository';
import Education from "../models/education.model";
import Work from "../models/work_experience.model"

export const serv_getAllUsersData = async () => {
    try {
        const allUsers = await db_allUsers();

        let wrapperAllUserData: INewUser[] = [];

        for (const userData of allUsers) {
            const userEducation = await db_educationDataById(userData._id);
            const userWorkExperience = await db_workExperienceDataById(userData._id);

            const wrappedUserData: INewUser = { user: userData, education: userEducation, work: userWorkExperience };

            wrapperAllUserData.push(wrappedUserData);

        };

        return {status: 200, msg: wrapperAllUserData};

    } catch (e) {
        return {status: 400, msg: e.message};
    }
};

export const serv_getUserData = async (id: string, extended: boolean = false) => {
    try {
        const foundUser = await db_getUserById(id);
        const userEducation = extended ? await db_educationDataById(foundUser._id): undefined;
        const userWorkExperience = extended ? await db_workExperienceDataById(foundUser._id): undefined;
    
        const wrappedUserData: IUserData = extended ? { user: foundUser, education: userEducation, work: userWorkExperience }: {user: foundUser};
    
        return {status: 200, msg: wrappedUserData}
    } catch (e) {
        return {status: 400, msg: e.message};
    }
}

export const serv_createUser = async (user: IUser, education: [IEducation], work: [IWorkExperience]) => {
    try {
        const newUser: IUser = await db_newUser(user)

        education.forEach(async educationData => {
            const newEducation = new Education (educationData)
            newEducation.userID = newUser._id
            await newEducation.save()
        });

        work.forEach(async workData => {
            const newWork = new Work(workData)
            newWork.userID = newUser._id
            await newWork.save()
        });

        return {status: 201, msg: "User created successfully"}
    } catch (e) {
        return {status: 400, msg: e.message};
    }
};