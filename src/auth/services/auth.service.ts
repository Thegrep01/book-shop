import { UserDto } from './../dtos/user.dto';
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
// import * as bcrypt from 'simplecrypt';
import { Response } from 'express-serve-static-core';
import { IUser } from '../schemas/user.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UserModelToken')
        private readonly userModel: Model<IUser>,
    ) { }

    public async getUser<T>(query: T): Promise<IUser | null> {
        let user: IUser | null;
        try {
            user = await this.userModel
                .findOne(query)
                .lean()
                .exec();
        } catch (err) {
            user = null;
        }
        return user;
    }

    public async signupWithEmail(
        createUserDto: UserDto,
        res: Response,
    ): Promise<IUser | Response> {
        const secret: string = '1dasdqwe';
        const { email, password } = createUserDto;
        const user: IUser | null = await this.getUser({ email });
        if (user) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ data: null, error: 'Email already exists' });
        }
        const accessToken: string = jwt.sign(email, secret);
        const hash = await bcrypt.hash(password, 10);
        return await this.userModel.create({
            ...createUserDto,
            password: hash,
            accessToken,
        });

    }
}
