import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorController } from './debtor.controller';
import { DebtorService } from './debtor.service';
import { DebtorModel } from './debtor.model';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  controllers: [DebtorController],
  providers: [DebtorService],
  imports: [TypeOrmModule.forFeature([DebtorModel]), TelegramModule],
})
export class DebtorModule {}
