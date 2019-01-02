import { ComixDto } from './../dtos/comix.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Query, Param } from '@nestjs/common';
import { ComixService } from '../services/comix.service';
import { Response } from 'express-serve-static-core';
import { IComix } from '../schemas/comix.schema';

@Controller('commixes')
export class ComixController {
    constructor(private comixService: ComixService) { }

    @Post('new')
    public async newComix(
        @Body() comixDto: ComixDto,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const comix: IComix = await this.comixService.createComix(comixDto);
            return res.status(HttpStatus.OK).json({ data: comix });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

    @Get('all')
    public async getComix(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const posts = await this.comixService.getCommixes();
            return res.status(HttpStatus.OK).json({ data: posts });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: error.message,
                });
        }
    }

    @Get('comix/:id')
    public async getBook(
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Response> {
        try {
            const book = await this.comixService.getComix(id);
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
    public async getComixByName(
        @Query() param: { name?: string, author?: string, painter?: string, price?: string, genres?: string[], bookbider: string, side: string },
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { name, author, painter, price, genres, bookbider, side } = param;
            const comixes = await this.comixService.getByParams(name, author, painter, price, genres, bookbider, side);
            return res.status(HttpStatus.OK).json({ data: comixes });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }
}
