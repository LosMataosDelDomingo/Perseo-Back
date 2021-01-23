import { IWorkExperience } from './../models/work_experience.model';

export interface IUserWorkExperience {
    userID: string,
    workExperience: IWorkExperience
}