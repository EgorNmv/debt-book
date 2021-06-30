import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DebtModel } from './debt.model';
import { FindDebtDto } from './dto/find-debt.dto';

@Controller('debt')
export class DebtController {
  @Post('create')
  async create(@Body() dto: Omit<DebtModel, 'id'>) {}

  @Get(':id')
  async get(@Param('id ') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: DebtModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindDebtDto) {}

  @Get('byDebtor/:debtorId')
  async getByDebtor(@Param('debtorId') debtorId: string) {}
}
