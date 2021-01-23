// ** Education Repository: methods that call the database **

import Education, { IEducation } from './../models/education.model';

// Returns education data from an user
export const db_educationDataById = async (userID: string): Promise<[IEducation]> => {
    const userEducation = await Education.find({userID: userID});

    return userEducation;
}

// Creates an education document (new Education object as param)
export const db_addEducation = async(newEducation: IEducation) => {
    const addedEducation = new Education(newEducation);

    await addedEducation.save()

    return addedEducation;
}

// Deletes an education document (id from education as param)
export const db_deleteEducation = async (educationID: string) => {
    const isDeleted = await Education.deleteOne({_id: educationID});

    return isDeleted.n
}

// Updates and education document (updated Education object as param)
export const db_updateEducation = async (newEducation: IEducation) => {
    const updatedEducation = await Education.findByIdAndUpdate({_id: newEducation._id}, newEducation, {new: true});

    return updatedEducation;
}