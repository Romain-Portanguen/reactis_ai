import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('The WeatherService class', () => {
  let weatherService: WeatherService;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    weatherService = new WeatherService(httpService);
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = { hourly: { apparent_temperature: [15] } };

    const mockAxiosResponse: AxiosResponse = {
      data: mockWeatherData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse));

    const weather = await weatherService.getCurrentWeather('48.8566', '2.3522');
    expect(weather).toEqual(mockWeatherData);
  });

  it('should throw an error if no data is returned', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(of(null));

    await expect(
      weatherService.getCurrentWeather('48.8566', '2.3522'),
    ).rejects.toThrow(
      "Error fetching weather data: Cannot read properties of null (reading 'data')",
    );
  });
});
