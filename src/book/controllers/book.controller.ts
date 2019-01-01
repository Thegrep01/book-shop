import { BookDto } from './../dtos/book.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Query, Param } from '@nestjs/common';
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
            const books = await this.bookService.getBooks();
            return res.status(HttpStatus.OK).json({ data: books });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: error.message,
                });
        }
    }
    @Get('/:id')
    public async getBook(
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Response> {
        try {
            const book = await this.bookService.getBook(id);
            return res.status(HttpStatus.OK).json({ data: book });
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
        @Query() param: { name?: string, author?: string, price?:string, genres?: string[], bookbider: string },
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { name, author, price, genres, bookbider } = param;
            const books = await this.bookService.getByParams(name, author, price, genres, bookbider);
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
