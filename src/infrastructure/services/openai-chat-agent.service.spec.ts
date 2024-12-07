import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIChatAgentService } from './openai-chat-agent.service';
import { ProcessUserInputUseCase } from '../../use-cases/process-user-input.use-case';
import OpenAI from 'openai';

jest.mock('../../use-cases/process-user-input.use-case');

describe('The OpenAIChatAgentService class', () => {
  let service: OpenAIChatAgentService;
  let mockProcessUserInputUseCase: ProcessUserInputUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIChatAgentService, ProcessUserInputUseCase],
    }).compile();

    service = module.get<OpenAIChatAgentService>(OpenAIChatAgentService);
    mockProcessUserInputUseCase = module.get<ProcessUserInputUseCase>(
      ProcessUserInputUseCase,
    );

    jest
      .spyOn(mockProcessUserInputUseCase, 'execute')
      .mockResolvedValue('mocked response');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process user input correctly', async () => {
    const userInput = 'Hello, what is the weather like?';

    const result = await service.processUserInput(userInput);

    expect(mockProcessUserInputUseCase.execute).toHaveBeenCalledWith(
      userInput,
      expect.any(OpenAI),
    );

    expect(result).toBe('mocked response');
  });
});
