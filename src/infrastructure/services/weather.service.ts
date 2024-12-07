import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IWeatherService } from '../../domain/interfaces/weather-service.interface';

@Injectable()
export class WeatherService implements IWeatherService {
  constructor(private readonly httpService: HttpService) {}

  public async getCurrentWeather(
    latitude: string,
    longitude: string,
  ): Promise<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;

    try {
      Logger.log(`Fetching weather data from URL: ${url}`);
      const response = await firstValueFrom(this.httpService.get(url));

      if (
        !response.data ||
        !response.data.hourly ||
        !Array.isArray(response.data.hourly.apparent_temperature)
      ) {
        Logger.error('Invalid weather data');
        throw new Error('Invalid weather data');
      }

      return response.data;
    } catch (error) {
      Logger.error(`Error fetching weather data: ${error.message}`);
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }
}
