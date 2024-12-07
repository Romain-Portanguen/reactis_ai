import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { IChatAgentService } from '../domain/interfaces/chat-agent-service.interface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('agent')
@UseGuards(AuthGuard)
export class AgentController {
  constructor(
    @Inject('IChatAgentService')
    private readonly chatAgentService: IChatAgentService,
  ) {}

  @Post()
  async processInput(@Body() body: { userInput: string }) {
    try {
      const result = await this.chatAgentService.processUserInput(
        body.userInput,
      );
      return { result };
    } catch (error) {
      return { error: error.message };
    }
  }
}
