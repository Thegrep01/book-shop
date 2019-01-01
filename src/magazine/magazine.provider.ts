import { Connection } from 'mongoose';
import { MagazineSchema } from './schemas/magazine.schema';
import { Provider } from '@nestjs/common';

export const MagazineProviders: Provider[] = [
    {
      provide: 'MagazineModelToken',
      useFactory: (connection: Connection) => connection.model('magazines', MagazineSchema),
      inject: ['DbConnectionToken'],
    },
  ];
