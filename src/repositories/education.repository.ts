import Education, { IEducation } from './../models/education.model';

export const db_educationDataById = async (userID: string): Promise<[IEducation]> => {
    const userEducation = await Education.find({userID: userID});

    return userEducation;
}

export const db_addEducation = async(newEducation: IEducation) => {
    const addedEducation = new Education(newEducation);

    await addedEducation.save()

    return addedEducation;
}

export const db_deleteEducation = async (educationID: string) => {
    const isDeleted = await Education.deleteOne({_id: educationID});

    return isDeleted.n
}

export const db_updateEducation = async (newEducation: IEducation) => {
    const updatedEducation = await Education.findByIdAndUpdate({_id: newEducation._id}, newEducation, {new: true});

    return updatedEducation;
}