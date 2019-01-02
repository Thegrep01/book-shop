import { MagazineDto } from './../dtos/magazine.dto';
import { IMagazine } from './../schemas/magazine.schema';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MagazineService {
    constructor(
        @Inject('MagazineModelToken')
        private readonly magazineModel: Model<IMagazine>,
    ) { }

    public async createMagazine(post: MagazineDto): Promise<IMagazine> {
        return await this.magazineModel.create(post);
    }

    public async getMagazines(): Promise<IMagazine[]> {
        return await this.magazineModel.find().lean().exec();
    }

    public async getMagazine(id: string): Promise<IMagazine> {
        return await this.magazineModel.findOne({_id: id}).lean().exec();
    }

    public async getByParams(
        name: string | undefined, price: string | undefined,
        date: string | undefined, category: string[] | undefined,
    ): Promise<IMagazine[]> {

        let query: any = {};

        if (name) {
            query = { ...query, name };
        }

        if (price) {
            query = { ...query, price };
        }

        if (date) {
            query = { ...query, date };
        }

        if (category) {
            query = { ...query, category };
        }
        const getMagazines = await this.magazineModel.find(query).lean().exec();
        return getMagazines;
    }
}
