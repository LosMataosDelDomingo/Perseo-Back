import { Request, Response } from "express";
import User from "../models/user.model";
import Education from "../models/education.model";
import Work from "../models/work_experience.model"
import { IUser } from './../models/user.model';
import { INewUser } from './../interfaces/INewUser.interface';
import { IEducation } from './../models/education.model';

export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user, education, work }: INewUser = req.body;

        const newUser = new User(user);
        await newUser.save()

        education.forEach( educationData => {
            const newEducation = new Education(educationData)
            newEducation.userID = newUser._id
            newEducation.save()
            console.log(newEducation);            
        });

        work.forEach( workData => {
            const newWork = new Work(workData)
            newWork.userID = newUser._id
            newWork.save()
            console.log(newWork);            
        });

        return res.status(200).json({ res: "data" });
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}