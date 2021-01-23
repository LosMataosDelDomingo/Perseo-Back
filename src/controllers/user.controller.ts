import { Request, Response } from "express";
import User from "../models/user.model";
import Education from "../models/education.model";
import { IUser } from './../models/user.model';
import { INewUser } from './../interfaces/INewUser.interface';
import { IEducation } from './../models/education.model';

export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
    const {user, education, work}: INewUser = req.body;
    
    
    // education.forEach(()=> console.log("ds"))
    // const e = new Education(education[0])
    const newUser = new User(user);
    console.log( newUser);
    // const user = new User(body)
    // user.save()



    return res.status(200).json({ res: "data" });
}