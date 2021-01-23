import Education, { IEducation } from './../models/education.model';

export const db_educationDataById = (userID: string): Promise<[IEducation]> => {
    const userEducation = Education.find({userID: userID});
    return userEducation;
}