// ** Work Experience Repository: methods that call the database **

import Work, { IWorkExperience } from './../models/work_experience.model';

// Creates a new work experience document
export const db_addWorkExperience = async (newWorkExperience: IWorkExperience, userID: string): Promise<IWorkExperience> => {
    const addedWorkExperience = new Work(newWorkExperience);
    addedWorkExperience.userID = userID;

    await addedWorkExperience.save();

    return addedWorkExperience;
}

// Deletes a work experience document
export const db_deleteWorkExperience = async (workExperienceID: string): Promise<boolean> => {
    const isDeleted = await Work.deleteOne({ _id: workExperienceID })

    return isDeleted.n;
}

// Updates a work experience document
export const db_updateWorkExperience = async (workExperience: IWorkExperience): Promise<IWorkExperience> => {
    const newWorkExp: IWorkExperience = await Work.findByIdAndUpdate({_id: workExperience._id}, workExperience, {new: true});

    return newWorkExp;
}

// Returns work experience from an user
export const db_getWorkExperience = async (userID: string): Promise<IWorkExperience[]> => {
    const workExperienceUser: IWorkExperience[] = await Work.find({userID: userID});

    return workExperienceUser;
}