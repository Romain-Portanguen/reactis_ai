import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AgentController } from './controllers/agent.controller';
import { ProcessUserInputUseCase } from './use-cases/process-user-input.use-case';
import { LocationService } from './infrastructure/services/location.service';
import { WeatherService } from './infrastructure/services/weather.service';
import { OpenAIChatAgentService } from './infrastructure/services/openai-chat-agent.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AgentController],
  providers: [
    ProcessUserInputUseCase,
    { provide: 'ILocationService', useClass: LocationService },
    { provide: 'IWeatherService', useClass: WeatherService },
    { provide: 'IChatAgentService', useClass: OpenAIChatAgentService },
    AuthGuard,
  ],
})
export class AppModule {}
