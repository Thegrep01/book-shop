import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ComixModule } from './comix/comix.module';
import { MagazineModule } from './magazine/magazine.module';

@Module({
  imports: [BookModule, ComixModule, MagazineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
