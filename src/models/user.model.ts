import { model, Schema, Document } from 'mongoose';
// import bcrypt from "bcrypt";

export interface IUser extends Document {
    _id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    birthAge: string,
    address: string,
    summary: string
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
    }
});

export default model<IUser>("User", userSchema);