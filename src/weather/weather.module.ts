import { HttpModule, Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [WeatherService],
  imports: [ConfigModule, HttpModule],
})
export class WeatherModule {}
