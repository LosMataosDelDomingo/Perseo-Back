// ** Auth Repository: methods that call the database **
import User from '../models/user.model';
import { IProfile } from './../interfaces/IAuth.interface';
import { IUser } from './../models/user.model';


export const emailInDB = async (email: string): Promise<IUser> => {

    const user = <IUser>await User.findOne({ email: email });

    return user;
};

export const checkPassword = async (userFound: IUser , password: string): Promise<boolean> => {

    const isValidPassword: boolean = await userFound.comparePassword(password, userFound.password);

    return isValidPassword;
};

export const getUserById = async (id: string): Promise<IUser> => {

    const userFound = <IUser>await User.findById(id);
    
    return userFound;
};

export const updatePassword = async (userFound: IUser, newPwd: string) => {
    
    userFound.password = newPwd;
    
    await userFound.save();
    
    return userFound;
};

export const updateProfile = async (userFound: IUser, updatedData: IProfile) => {
    
    const updatedUser: IUser = User.findOneAndUpdate({_id: userFound._id}, updatedData);
    // console.log(updatedUser.);
    
    // await updatedUser.save();

    return updatedUser;
};