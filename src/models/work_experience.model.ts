import { model, Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
    dateStart: number,
    dateEnd: number,
    position: string,
    companie: string,
    workday: string,
    location: string,
    isWorking: boolean,
    description: string,
    media: string
};

export const workExperienceSchema = new Schema({
    dateStart: {
        type: Number,
    },
    dateEnd: {
        type: Number
    },
    position: {
        type: String
    },
    companie: {
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