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

export const db_deleteWorkExperience = async (workExperienceID: string) => {
    const isDeleted = await Work.deleteOne({ _id: workExperienceID })

    return isDeleted.n;
}

export const db_updateWorkExperience = async (workExperience: IWorkExperience) => {
    const newWorkExp = await Work.findByIdAndUpdate({_id: workExperience._id}, workExperience, {new: true});

    return newWorkExp;
}

export const db_getWorkExperience = async (userID: string) => {
    const workExperienceUser = await Work.find({userID: userID});

    return workExperienceUser;
}