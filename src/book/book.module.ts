import { BookProviders } from './book.provider';
import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { DatabaseModule } from 'src/common/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    BookService,
    ...BookProviders,
  ],
  controllers: [BookController],
})
export class BookModule { }
