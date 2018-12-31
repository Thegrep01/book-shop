import { BookDto } from './../dtos/book.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Response } from 'express-serve-static-core';
import { IBook } from '../schemas/book.schema';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }

    @Post('new')
    public async newBook(
        @Body() bookDto: BookDto,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const book: IBook = await this.bookService.createBook(bookDto);
            return res.status(HttpStatus.OK).json({ data: book });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

    @Get('all')
    public async getBooks(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const posts = await this.bookService.getBooks();
            return res.status(HttpStatus.OK).json({ data: posts });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: error.message,
                });
        }
    }

    @Get('search')
    public async getBookByName(
        @Query() param: { name?: string, author?: string, genres?: string[], bookbider: string },
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { name, author, genres, bookbider } = param;
            const books = await this.bookService.getByParams(name, author, genres, bookbider);
            return res.status(HttpStatus.OK).json({ data: books });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }
}
