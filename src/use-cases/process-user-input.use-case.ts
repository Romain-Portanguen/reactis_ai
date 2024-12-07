import { Inject, Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ILocationService } from '../domain/interfaces/location-service.interface';
import { IWeatherService } from '../domain/interfaces/weather-service.interface';

@Injectable()
export class ProcessUserInputUseCase {
  constructor(
    @Inject('ILocationService')
    private readonly locationService: ILocationService,
    @Inject('IWeatherService')
    private readonly weatherService: IWeatherService,
  ) {}

  public async execute(userInput: string, openai: OpenAI): Promise<string> {
    try {
      const { latitude, longitude } = await this.locationService.getLocation();
      Logger.log(`Location: ${latitude}, ${longitude}`);

      const weather = await this.weatherService.getCurrentWeather(
        latitude,
        longitude,
      );
      Logger.log(`Weather: ${JSON.stringify(weather)}`);

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
              You are a weather assistant. Use the user's location and weather 
              data to suggest activities.`,
          },
          { role: 'user', content: userInput },
          {
            role: 'system',
            content: `Location: (${latitude}, ${longitude}). Weather: ${JSON.stringify(
              weather.hourly.apparent_temperature[0],
            )}.`,
          },
        ],
      });

      return (
        response.choices[0]?.message?.content || 'Unable to fetch a response.'
      );
    } catch (error) {
      Logger.error(`Error processing user input: ${error.message}`);
      throw new Error('Failed to process user input.');
    }
  }
}
