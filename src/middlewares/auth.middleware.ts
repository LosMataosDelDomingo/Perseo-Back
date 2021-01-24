import { NextFunction, Request, Response } from "express";
import { checkAdmin } from "../helpers/jwt";

export const verifyIfAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const checkIfAdmin = await checkAdmin(<string>req.headers.authorization);

    if(!checkIfAdmin){
        return res.status(403).json({message: "Forbidden"});
    }
    next();
}