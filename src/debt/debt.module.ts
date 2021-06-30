import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtController } from './debt.controller';
import { DebtModel } from './debt.model';

@Module({
  controllers: [DebtController],
  imports: [TypeOrmModule.forFeature([DebtModel])],
})
export class DebtModule {}
