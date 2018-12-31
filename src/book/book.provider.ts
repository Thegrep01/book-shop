import { Connection } from 'mongoose';
import { BookSchema } from './schemas/book.schema';
import { Provider } from '@nestjs/common';

export const BookProviders: Provider[] = [
    {
      provide: 'BookModelToken',
      useFactory: (connection: Connection) => connection.model('books', BookSchema),
      inject: ['DbConnectionToken'],
    },
  ];
