import { BookDto } from './../dtos/book.dto';
import { IBook } from './../schemas/book.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as util from 'util';
import * as fs from 'fs';

const unlinkAsync: any = util.promisify(fs.unlink);

@Injectable()
export class BookService {
    constructor(
        @Inject('BookModelToken')
        private readonly bookModel: Model<IBook>,
    ) { }

    public async createBook(post: BookDto): Promise<IBook> {
        return await this.bookModel.create(post);
    }

    public async createUrl(book: BookDto, file: any): Promise<BookDto> {
        if (book.url) {
            const numbers: number = book.url.lastIndexOf('/');
            const fileToRemove: string = book.url.slice(numbers);
            await unlinkAsync(`files/books${fileToRemove}`);
        }
        if (!file) {
            return book;
        }
        const rstream: fs.ReadStream = fs.createReadStream(file.path);
        const wstream: fs.WriteStream = fs.createWriteStream(
            `files/books/${file.originalname}`,
        );
        rstream.pipe(wstream);
        await unlinkAsync(file.path);
        book.url = `store/books/${file.originalname}`;
        return book;
    }

    public async getBooks(): Promise<IBook[]> {
        return await this.bookModel.find().lean().exec();
    }

    public async getBook(id: string): Promise<IBook> {
        return await this.bookModel.findOne({ _id: id }).lean().exec();
    }

    public async getByParams(
        name: string | undefined, author: string | undefined,
        price: string | undefined,
        genres: string[] | undefined, bookbider: string,
    ): Promise<IBook[]> {

        let query: any = { bookbider };

        if (name) {
            query = { ...query, name };
        }

        if (author) {
            query = { ...query, author };
        }

        if (price) {
            query = { ...query, price };
        }

        if (genres) {
            query = { ...query, genres };
        }

        const getBooks = await this.bookModel.find(query).lean().exec();
        return getBooks;
    }
}
