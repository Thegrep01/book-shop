import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express-serve-static-core';
import { IUser } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signUp')
    public async newUser(
        @Body() user: any,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            user.email = user.email.trim();
            const newUser: Response | IUser = await this.authService.signUpWithEmail(user, res);
            return res.status(HttpStatus.OK).json({ data: newUser });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

    @Post('signIn')
    public async signIn(
        @Body() loginUser: any,
        @Res() res: Response,
    ): Promise<Response> {
        try {
            const { email, password } = loginUser;
            const user = await this.authService.getUser({ email });
            if (!user || user && !await bcrypt.compare(password, user.password as string)) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    data: null,
                    error: 'Invalid credentials or you are blocked',
                });
            }
            delete user.password;
            return res.status(HttpStatus.OK).json(user);
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

}
