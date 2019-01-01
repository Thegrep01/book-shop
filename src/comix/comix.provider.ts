import { Connection } from 'mongoose';
import { Provider } from '@nestjs/common';
import { ComixSchema } from './schemas/comix.schema';

export const ComixProviders: Provider[] = [
    {
      provide: 'ComixModelToken',
      useFactory: (connection: Connection) => connection.model('comix', ComixSchema),
      inject: ['DbConnectionToken'],
    },
  ];
