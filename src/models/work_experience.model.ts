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
        required: true
    },
    dateEnd: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    workday: {
        type: String
    },
    location: {
        type: String
    },
    isWorking: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    },
    media: {
        type: String
    }
});

export default model<IWorkExperience>("WorkExperience", workExperienceSchema);