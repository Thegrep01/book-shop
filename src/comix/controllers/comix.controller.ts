import { IComix } from 'src/comix/schemas/comix.schema';
import { ComixDto } from './../dtos/comix.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Query, Param, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';
import { ComixService } from '../services/comix.service';
import { Response } from 'express-serve-static-core';

@Controller('commixes')
export class ComixController {
    constructor(private comixService: ComixService) { }

    @Post('new')
    @UseInterceptors(FileInterceptor('file', { dest: `files/comixs/` }))
    public async newcomix(
        @Body() data: { comix: string },
        @Res() res: Response,
        @UploadedFile() file,
    ): Promise<Response> {
        try {
            const comixDto = JSON.parse(data.comix);
            let newcomix: ComixDto | null = null;
            let comix: IComix;
            if (file) {
                newcomix = await this.comixService.createUrl(comixDto, file);
            }
            if (newcomix) {
                comix = await this.comixService.createComix(newcomix);
            } else {
                comix = await this.comixService.createComix(comixDto);
            }
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
    public async getcomix(
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Response> {
        try {
            const comix = await this.comixService.getComix(id);
            return res.status(HttpStatus.OK).json({ data: comix });
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
        @Query() param: { name?: string, author?: string, painter?: string, price?: string, genres?: string[], comixbider: string, side: string },
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { name, author, painter, price, genres, comixbider, side } = param;
            const comixes = await this.comixService.getByParams(name, author, painter, price, genres, comixbider, side);
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
