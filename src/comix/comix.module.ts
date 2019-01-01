import { Module } from '@nestjs/common';
import { ComixController } from './controllers/comix.controller';
import { DatabaseModule } from 'src/common/db.module';
import { ComixService } from './services/comix.service';
import { ComixProviders } from './comix.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ComixController],
  providers: [
    ComixService,
    ...ComixProviders
  ]
})
export class ComixModule { }
