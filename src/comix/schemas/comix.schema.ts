import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const ComixSchema = new mongoose.Schema({
    name: String,
    author: String,
    painter: String,
    price: Number,
    genres: [],
    bookbider: String,
    side: String,
    url: String,
});

export interface IComix extends Document  {
    name: string;
    author: string;
    painter: string;
    price: number;
    genres: [];
    bookbider: string;
    side: string;
    url: string;
}
