import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/db.module';
import { AuthProviders } from './auth.provider';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthService,
    ...AuthProviders,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
