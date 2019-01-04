import { ComixDto } from './../dtos/comix.dto';
import { IComix } from './../schemas/comix.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as util from 'util';
import * as fs from 'fs';

const unlinkAsync: any = util.promisify(fs.unlink);

@Injectable()
export class ComixService {
    constructor(
        @Inject('ComixModelToken')
        private readonly comixModel: Model<IComix>,
    ) { }

    public async createComix(post: ComixDto): Promise<IComix> {
        return await this.comixModel.create(post);
    }

    public async createUrl(comix: ComixDto, file: any): Promise<ComixDto> {
        if (comix.url) {
            const numbers: number = comix.url.lastIndexOf('/');
            const fileToRemove: string = comix.url.slice(numbers);
            await unlinkAsync(`files/comics${fileToRemove}`);
        }
        if (!file) {
            return comix;
        }
        const rstream: fs.ReadStream = fs.createReadStream(file.path);
        const wstream: fs.WriteStream = fs.createWriteStream(
            `files/comics/${file.originalname}`,
        );
        rstream.pipe(wstream);
        await unlinkAsync(file.path);
        comix.url = `store/comics/${file.originalname}`;
        return comix;
    }

    public async getCommixes(): Promise<IComix[]> {
        return await this.comixModel.find().lean().exec();
    }

    public async getComix(id: string): Promise<IComix> {
        return await this.comixModel.findOne({_id: id}).lean().exec();
    }

    public async getByParams(
        name: string | undefined, author: string | undefined,
        painter: string | undefined,
        price: string| undefined, genres: string[] | undefined,
        comixbider: string, side: string,
    ): Promise<IComix[]> {

        let query: any = { comixbider , side};

        if (name) {
            query = { ...query, name };
        }

        if (author) {
            query = { ...query, author };
        }

        if (painter) {
            query = { ...query, painter };
        }

        if (price) {
            query = { ...query, price };
        }

        if (genres) {
            query = { ...query, genres };
        }
        const getComixes = await this.comixModel.find(query).lean().exec();
        return getComixes;
    }
}
