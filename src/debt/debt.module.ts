import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorModule } from 'src/debtor/debtor.module';
import { DebtController } from './debt.controller';
import { DebtModel } from './debt.model';
import { DebtService } from './debt.service';

@Module({
  controllers: [DebtController],
  imports: [TypeOrmModule.forFeature([DebtModel]), DebtorModule],
  providers: [{ provide: DebtService, useValue: DebtService }],
  exports: [DebtService],
})
export class DebtModule {}
