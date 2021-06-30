import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL } from './weather.constants';
import { WeatherResponse } from './weather.models';

@Injectable()
export class WeatherService {
  private token: string;

  // СДЕЛАТЬ ПО АНАЛОГИИ С ТЕЛЕГРАММОМ ИНЖЕКТ В СЕРВИС
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = configService.get('TOKEN') ?? '';
  }

  async getData() {
    try {
      const { data } = await this.httpService
        .get<WeatherResponse>(API_URL.weather)
        .toPromise();
    } catch (e) {
      Logger.error(e);
    }
  }
}
