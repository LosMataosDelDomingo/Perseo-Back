// ** Education Model **

import { model, Schema, Document } from 'mongoose';

export interface IEducation extends Document {
    userID: string,
    dateStart: Number,
    dateEnd: Number,
    title: string,
    educationCenter: string,
    discipline: string,
    description: string,
    media: string
};

export const educationSchema = new Schema({
    userID: {
        type: String
    },
    dateStart: {
        type: Number,
    },
    dateEnd: {
        type: Number
    },
    title: {
        type: String
    },
    educationCenter: {
        type: String
    },
    discipline: {
        type: String
    },
    description: {
        type: String
    },
    media: {
        type: String
    }
});

export default model<IEducation>("Education", educationSchema);