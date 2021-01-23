import { IEducation } from './../models/education.model';
import { IWorkExperience } from './../models/work_experience.model';
import { IUser } from './../models/user.model';

export interface IUserData {
    user: IUser,
    education?: [IEducation],
    work?: [IWorkExperience]
}