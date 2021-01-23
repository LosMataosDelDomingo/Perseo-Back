import User, { IUser } from '../models/user.model';

export const db_newUser = async (user: IUser) => {

    const newUser: IUser = new User(user);
    await newUser.save();

    return newUser;
};

export const db_allUsers = async (): Promise<[IUser]> => {
    const allUsers = await User.find({});

    return allUsers
};

export const db_getUserById = async (id: string): Promise<IUser> => {
    const foundUser = await User.findById(id);

    return foundUser;
};

export const db_updateUser = async (newUser: IUser) => {
    const updatedUser = User.findByIdAndUpdate({ _id: newUser._id }, newUser, { new: true });

    return updatedUser;
};

//Change to not visible(PENDING)
export const db_deleteUser = async (userID: string) => {
    const isDeleted = await User.deleteOne({ _id: userID});
    
    return isDeleted.n
}


export const db_userExists = async (userID: string) => {
    await User.countDocuments({ _id: userID }, function (err, count) {
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    });
}