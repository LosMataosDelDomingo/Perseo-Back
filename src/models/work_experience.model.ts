import { model, Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
    userID: string,
    dateStart: number,
    dateEnd: number,
    position: string,
    company: string,
    workday: string,
    location: string,
    isWorking: boolean,
    description: string,
    media: string
};

export const workExperienceSchema = new Schema({
    userID: {
        type: String
    },
    dateStart: {
        type: Number,
    },
    dateEnd: {
        type: Number
    },
    position: {
        type: String
    },
    company: {
        type: String
    },
    workday: {
        type: String
    },
    location: {
        type: String
    },
    isWorking: {
        type: Boolean
    },
    description: {
        type: String
    },
    media: {
        type: String
    }
});

export default model<IWorkExperience>("WorkExperience", workExperienceSchema);