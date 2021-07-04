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
import { DebtorModel } from './models/debtor.model';
import { CreateDebtorDto } from './dto/create-debtor.dto';
import { DebtorService } from './debtor.service';
import { DEBTOR_NOT_FOUND } from './debtor.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { FindDebtorDto } from './dto/find-debtor.dto';
import { UpdateDebtorDto } from './dto/update-debtor.dto';

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
    return this.debtorService.createDebtor(dto);
  }

  // @UsePipes(new ValidationPipe())
  // @Post('notify')
  // async notify(@Body() dto: CreateDebtorDto) {
  //   const message =
  //     `Имя: ${dto.firstName}\n` +
  //     `Заголовок: ${dto.lastName}` +
  //     `Описание: ${dto.dateOfBirth}`;

  //   return this.telegramService.sendMessage(message);
  // }

  @Get(':id')
  async get(@Param('id', UuidValidationPipe) id: string) {
    const debtor = await this.debtorService.findDebtorById(id);

    if (!debtor) {
      throw new HttpException(DEBTOR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return debtor;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', UuidValidationPipe) id: string) {
    const deletedDebtor = await this.debtorService.deleteDebtorById(id);

    if (!deletedDebtor.affected) {
      throw new HttpException(DEBTOR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return true;
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateDebtorDto,
  ) {
    return this.debtorService.updateDebtorById(id, dto);
  }

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindDebtorDto, @UserEmail() email: string) {
    console.log('email in findDebtor controller', email);
    //ПРОВЕРКА НА FIELD который есть у класса
    return this.debtorService.findDebtorByText(dto);
  }

  @Cron(CronExpression.EVERY_12_HOURS, { name: 'test' })
  async test() {
    const job = this.scheduleRegistry.getCronJob('test');
    Logger.log('test');
  }
}
