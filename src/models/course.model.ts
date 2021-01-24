import { model, Schema, Document } from 'mongoose';

export interface ICourse extends Document{
    _id: string,
    name: string,
    description: string,
    picture: string,
    price: string,
    is_active: Boolean,
}

export const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: String,
        required: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
});

export default model<ICourse>("Course", courseSchema);