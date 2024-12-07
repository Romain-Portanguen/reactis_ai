export interface IChatAgentService {
  processUserInput(userInput: string): Promise<string>;
}
