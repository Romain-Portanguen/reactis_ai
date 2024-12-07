import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from './agent.controller';
import { IChatAgentService } from '../domain/interfaces/chat-agent-service.interface';

describe('The AgentController', () => {
  let controller: AgentController;
  let mockChatAgentService: IChatAgentService;

  beforeEach(async () => {
    mockChatAgentService = {
      processUserInput: jest.fn().mockResolvedValue('Sample response'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [
        {
          provide: 'IChatAgentService',
          useValue: mockChatAgentService,
        },
      ],
    }).compile();

    controller = module.get<AgentController>(AgentController);
  });

  it('should return the processed input result', async () => {
    const response = await controller.processInput({ userInput: 'Hello!' });
    expect(response).toEqual({ result: 'Sample response' });
  });

  it('should handle errors gracefully', async () => {
    jest
      .spyOn(mockChatAgentService, 'processUserInput')
      .mockRejectedValue(new Error('Service failed'));

    const response = await controller.processInput({ userInput: 'Hello!' });
    expect(response).toEqual({ error: 'Service failed' });
  });
});
