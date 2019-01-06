import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { Provider } from '@nestjs/common';

export const AuthProviders: Provider[] = [
    {
      provide: 'UserModelToken',
      useFactory: (connection: Connection) => connection.model('usersmodel', UserSchema),
      inject: ['DbConnectionToken'],
    },
  ];
