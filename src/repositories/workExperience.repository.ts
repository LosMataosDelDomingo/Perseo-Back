import Work, { IWorkExperience } from './../models/work_experience.model';

export const db_workExperienceDataById = (userID: string): Promise<[IWorkExperience]> => {
    const userWorkExperience = Work.find({ userID: userID });
    return userWorkExperience;
}