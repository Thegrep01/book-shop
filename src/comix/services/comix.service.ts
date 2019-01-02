import { ComixDto } from './../dtos/comix.dto';
import { IComix } from './../schemas/comix.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ComixService {
    constructor(
        @Inject('ComixModelToken')
        private readonly comixModel: Model<IComix>,
    ) { }

    public async createComix(post: ComixDto): Promise<IComix> {
        return await this.comixModel.create(post);
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
        bookbider: string, side: string,
    ): Promise<IComix[]> {

        let query: any = { bookbider , side};

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
