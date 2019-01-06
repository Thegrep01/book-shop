import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express-serve-static-core';
import { IUser } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

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
            const newUser: Response | IUser = await this.authService.signupWithEmail(user, res);
            return res.status(HttpStatus.OK).json({ data: newUser });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({
                    data: null,
                    error: err.message,
                });
        }
    }

}
