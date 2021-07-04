import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorController } from './debtor.controller';
import { DebtorService } from './debtor.service';
import { DebtorModel } from './models/debtor.model';
import { TelegramModule } from '../telegram/telegram.module';
import { DebtorPassportModel } from './models/debtor-passport.model';
import { DebtModule } from '../debt/debt.module';

@Module({
  controllers: [DebtorController],
  providers: [DebtorService],
  imports: [
    TypeOrmModule.forFeature([DebtorModel, DebtorPassportModel]),
    TelegramModule,
    DebtModule,
  ],
  exports: [DebtorService],
})
export class DebtorModule {}
