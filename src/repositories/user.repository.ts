import User, {IUser} from '../models/user.model';

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