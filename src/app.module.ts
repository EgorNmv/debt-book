import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DebtModule } from './debt/debt.module';
import { DebtorModule } from './debtor/debtor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { FilesModule } from './files/files.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    AuthModule,
    StatisticsModule,
    AnalyticsModule,
    DebtModule,
    DebtorModule,
    FilesModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
