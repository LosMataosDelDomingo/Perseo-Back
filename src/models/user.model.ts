// ** User Model **

import { model, Schema, Document } from 'mongoose';
import { compareHash, encrypt } from '../helpers/bcrypt';

export interface IUser extends Document {
    _id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    birthAge: string,
    address: string,
    summary: string,
    password: string,
    admin: boolean
    comparePassword : (password:string, hash: string) => boolean
}


export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        maxlength: 9,
    },
    birthAge: {
        type: Number,
        maxlength: 12,
        required: true
    },
    address: {
        type: String,
    },
    summary: {
        type: String,
    },
    admin: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        required: true // Add to middleware
    }
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    // New user
    const hash = await encrypt(user.password);
    user.password = hash;

    next();
});

userSchema.methods.comparePassword = async function (password: string, hash: string): Promise<boolean> {
    return await compareHash(password, hash);
};


export default model<IUser>("User", userSchema);