import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('store/:path/:imgId')
  public test(
    @Param('imgId') imgId: string,
    @Param('path') path: string,
    @Res() res: Response): void {
    return res.sendFile(`${path}/${imgId}`, { root: 'files' });
  }
}
