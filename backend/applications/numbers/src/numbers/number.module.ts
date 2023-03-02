import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { NumberController } from './controllers/number.controller';
import { NumberService } from './services/number.service';
import { Number } from './entities/number.entity';
import { NumberUser } from './entities/number-user.entity';

@Module({
  imports: [DatabaseModule.forFeature([Number, NumberUser])],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
