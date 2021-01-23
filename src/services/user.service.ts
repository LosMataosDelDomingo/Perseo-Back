import { db_allUsers } from '../repositories/user.repository';
import { INewUser } from './../interfaces/INewUser.interface';
import { db_educationDataById } from './../repositories/education.repository';
import { db_workExperienceDataById } from './../repositories/workExperience.repository';

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
