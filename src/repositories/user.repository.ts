// ** User Repository: methods that call the database **

import User, { IUser } from '../models/user.model';

// New User
export const db_newUser = async (user: IUser) => {

    const newUser: IUser = new User(user);
    await newUser.save();

    return newUser;
};

// Return all users' data
export const db_allUsers = async (): Promise<[IUser]> => {
    const allUsers = await User.find({});

    return allUsers
};

// Returns one user filtered by _id
export const db_getUserById = async (id: string): Promise<IUser> => {
    const foundUser = await User.findById(id);

    return foundUser;
};

// Updates one user document
export const db_updateUser = async (newUser: IUser) => {
    const updatedUser = User.findByIdAndUpdate({ _id: newUser._id }, newUser, { new: true });

    return updatedUser;
};

// !Change to not visible(PENDING)
export const db_deleteUser = async (userID: string) => {
    const isDeleted = await User.deleteOne({ _id: userID});
    
    return isDeleted.n
}

// Checks if one user exists
export const db_userExists = async (userID: string) => {
    await User.countDocuments({ _id: userID }, function (err, count) {
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    });
}