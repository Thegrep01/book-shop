import { BookDto } from './../dtos/book.dto';
import { IBook } from './../schemas/book.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
    constructor(
        @Inject('BookModelToken')
        private readonly bookModel: Model<IBook>,
    ) { }

    public async createBook(post: BookDto): Promise<IBook> {
        return await this.bookModel.create(post);
    }

    public async getBooks(): Promise<IBook[]> {
        return await this.bookModel.find().lean().exec();
    }

    public async getByParams(
        name: string | undefined, author: string | undefined,
        genres: string[] | undefined, bookbider: string,
    ): Promise<IBook[]> {

        let query: any = { bookbider };

        if (name) {
            query = { ...query, name };
        }

        if (author) {
            query = { ...query, author };
        }

        if (genres) {
            query = { ...query, genres };
        }
        const getBooks = await this.bookModel.find(query).lean().exec();
        return getBooks;
    }
}
