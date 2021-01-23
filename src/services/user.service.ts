import { db_allUsers, db_getUserById } from '../repositories/user.repository';
import { INewUser } from './../interfaces/INewUser.interface';
import { db_educationDataById } from './../repositories/education.repository';
import { db_workExperienceDataById } from './../repositories/workExperience.repository';
import { IUserData } from './../interfaces/IUserData.interface';

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

        return wrapperAllUserData;

    } catch (e) {
        console.log(e);
    }
};

export const serv_getUserData = async (id: string, extended: boolean = false): Promise<IUserData> => {
    const foundUser = await db_getUserById(id);
    const userEducation = extended ? await db_educationDataById(foundUser._id): undefined;
    const userWorkExperience = extended ? await db_workExperienceDataById(foundUser._id): undefined;

    const wrappedUserData: IUserData = extended ? { user: foundUser, education: userEducation, work: userWorkExperience }: {user: foundUser};

    return wrappedUserData
}