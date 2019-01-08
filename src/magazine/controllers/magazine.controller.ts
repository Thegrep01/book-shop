import { MagazineDto } from './../dtos/magazine.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Query, Param } from '@nestjs/common';
import { MagazineService } from '../services/magazine.service';
import { Response } from 'express-serve-static-core';
import { IMagazine } from '../schemas/magazine.schema';

@Controller('magazines')
export class MagazineController {
    constructor(private magazineService: MagazineService) { }

    @Post('new')
    public async newMagazine(
        @Body() magazineDto: MagazineDto,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const magazine: IMagazine = await this.magazineService.createMagazine(magazineDto);
            return res.status(HttpStatus.OK).json({ data: magazine });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

    @Get('all')
    public async getMagazine(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const posts = await this.magazineService.getMagazines();
            return res.status(HttpStatus.OK).json({ data: posts });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: error.message,
                });
        }
    }

    @Get('magazine/:id')
    public async getBook(
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Response> {
        try {
            const book = await this.magazineService.getMagazine(id);
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
    public async getMagazineByName(
        @Query() param: { name?: string, price?: string, date?: string, category?: string[] },
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { name, price, date, category} = param;
            const magazine = await this.magazineService.getByParams(name, price, date, category);
            return res.status(HttpStatus.OK).json({ data: magazine });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }
    @Get('date')
    public async getMagazineDates(
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const book = await this.magazineService.getMagazinesDates();
            return res.status(HttpStatus.OK).json({ data: book });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: error.message,
                });
        }
    }
}
