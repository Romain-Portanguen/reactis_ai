import { ProcessUserInputUseCase } from './process-user-input.use-case';
import { ILocationService } from '../domain/interfaces/location-service.interface';
import { IWeatherService } from '../domain/interfaces/weather-service.interface';
import OpenAI from 'openai';

describe('The ProcessUserInputUseCase class', () => {
  let useCase: ProcessUserInputUseCase;
  let mockLocationService: ILocationService;
  let mockWeatherService: IWeatherService;
  let mockOpenAI: OpenAI;

  beforeEach(() => {
    mockLocationService = {
      getLocation: jest.fn().mockResolvedValue({
        latitude: '48.8566',
        longitude: '2.3522',
      }),
    };

    mockWeatherService = {
      getCurrentWeather: jest.fn().mockResolvedValue({
        hourly: { apparent_temperature: [20] },
      }),
    };

    mockOpenAI = {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              { message: { content: 'It is sunny, you can go for a walk!' } },
            ],
          }),
        },
      },
    } as unknown as OpenAI;

    useCase = new ProcessUserInputUseCase(
      mockLocationService,
      mockWeatherService,
    );
  });

  it('should process user input and return a valid response', async () => {
    const response = await useCase.execute(
      'What should I do today?',
      mockOpenAI,
    );
    expect(response).toEqual('It is sunny, you can go for a walk!');
  });

  it('should throw an error if location fetching fails', async () => {
    jest
      .spyOn(mockLocationService, 'getLocation')
      .mockRejectedValue(new Error('Location service failed'));

    await expect(
      useCase.execute('What should I do today?', mockOpenAI),
    ).rejects.toThrow('Failed to process user input.');
  });
});
