import { Module } from '@nestjs/common';
import { MagazineController } from './controllers/magazine.controller';
import { DatabaseModule } from 'src/common/db.module';
import { MagazineService } from './services/magazine.service';
import { MagazineProviders } from './magazine.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MagazineController],
  providers: [
    MagazineService,
    ...MagazineProviders,
  ]
})
export class MagazineModule {}
