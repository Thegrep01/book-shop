import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    genres: [String],
    bookbider: String,
    url: String,

});

export interface IBook extends Document  {
    name: string;
    author: string;
    price: number;
    genres: string[];
    bookbider: string;
    url: string;
}
