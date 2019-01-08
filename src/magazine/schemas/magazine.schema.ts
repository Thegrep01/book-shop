import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const MagazineSchema = new mongoose.Schema({
    name: String,
    price: Number,
    date: String,
    category: [],
    url: String,
});

export interface IMagazine extends Document  {
    name: string;
    price: number;
    date: string;
    category: string[];
    url: string,
}
