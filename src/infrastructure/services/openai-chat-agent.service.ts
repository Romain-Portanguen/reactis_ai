import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { IChatAgentService } from '../../domain/interfaces/chat-agent-service.interface';
import { ProcessUserInputUseCase } from '../../use-cases/process-user-input.use-case';

@Injectable()
export class OpenAIChatAgentService implements IChatAgentService {
  private openai: OpenAI;

  constructor(
    private readonly processUserInputUseCase: ProcessUserInputUseCase,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }

  public async processUserInput(userInput: string): Promise<string> {
    Logger.log(`Processing user input: ${userInput}`);
    return this.processUserInputUseCase.execute(userInput, this.openai);
  }
}
