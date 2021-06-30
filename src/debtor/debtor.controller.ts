import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DebtorModel } from './debtor.model';
import { FindDebtDto } from '../debt/dto/find-debt.dto';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { DebtorService } from './debtor.service';
import { DEBTOR_NOT_FOUND } from './debtor.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Controller('debtor')
export class DebtorController {
  constructor(
    private readonly debtorService: DebtorService,
    private readonly telegramService: TelegramService,
    private readonly scheduleRegistry: SchedulerRegistry,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDebtorDto) {
    return this.debtorService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateDebtorDto) {
    const message =
      `Имя: ${dto.firstName}\n` +
      `Заголовок: ${dto.lastName}` +
      `Описание: ${dto.dateOfBirth}`;

    return this.telegramService.sendMessage(message);
  }

  @Get(':id')
  async get(@Param('id ', UuidValidationPipe) id: string) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', UuidValidationPipe) id: string) {
    const deletedDebtor = await this.debtorService.delete(id);

    if (!deletedDebtor.affected) {
      throw new HttpException(DEBTOR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return true;
  }

  @Patch(':id')
  async patch(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: DebtorModel,
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindDebtDto, @UserEmail() email: string) {
    console.log('email in findDebtor controller', email);
    return this.debtorService.findDebtorByText(dto);
  }

  @Cron(CronExpression.EVERY_12_HOURS, { name: 'test' })
  async test() {
    const job = this.scheduleRegistry.getCronJob('test');
    Logger.log('test');
  }
}
