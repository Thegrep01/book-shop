import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
});

export interface IUser extends Document {
    readonly email: string;
    name: string;
    surname: string;
    password: string;
    phone: string;
    readonly accessToken: string;
}
