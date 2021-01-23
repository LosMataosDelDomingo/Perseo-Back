import Work, { IWorkExperience } from './../models/work_experience.model';

export const db_workExperienceDataById = async (userID: string): Promise<[IWorkExperience]> => {
    const userWorkExperience = await Work.find({ userID: userID });
    return userWorkExperience;
}

export const db_addWorkExperience = async (newWorkExperience: IWorkExperience, userID: string) => {
    const addedWorkExperience = new Work(newWorkExperience);
    addedWorkExperience.userID = userID;

    await addedWorkExperience.save();

    return addedWorkExperience;
}