import { ILLMProvider, LLMConfig } from './types';
import { AnthropicClaudeProvider, AnthropicConfig } from './anthropic';
import { GPT4Provider, GPT4Config } from './gpt4';
import { MistralProvider, MistralConfig } from './mistral';

export type ProviderType = 'anthropic' | 'gpt4' | 'mistral';

export interface ProviderConfig {
  type: ProviderType;
  config?: LLMConfig;
}

export class LLMProviderFactory {
  private static instance: LLMProviderFactory;
  private providers: Map<ProviderType, ILLMProvider>;

  private constructor() {
    this.providers = new Map();
  }

  public static getInstance(): LLMProviderFactory {
    if (!LLMProviderFactory.instance) {
      LLMProviderFactory.instance = new LLMProviderFactory();
    }
    return LLMProviderFactory.instance;
  }

  public getProvider(config: ProviderConfig): ILLMProvider {
    const existingProvider = this.providers.get(config.type);
    if (existingProvider) {
      return existingProvider;
    }

    const provider = this.createProvider(config);
    this.providers.set(config.type, provider);
    return provider;
  }

  private createProvider(config: ProviderConfig): ILLMProvider {
    switch (config.type) {
      case 'anthropic':
        return new AnthropicClaudeProvider(config.config as AnthropicConfig);
      case 'gpt4':
        return new GPT4Provider(config.config as GPT4Config);
      case 'mistral':
        return new MistralProvider(config.config as MistralConfig);
      default:
        throw new Error(`Unsupported provider type: ${config.type}`);
    }
  }

  public clearProviders(): void {
    this.providers.clear();
  }
}

// Export a convenience function to get a provider
export function createLLMProvider(config: ProviderConfig): ILLMProvider {
  return LLMProviderFactory.getInstance().getProvider(config);
}

// Example usage:
/*
const provider = createLLMProvider({
  type: 'anthropic',
  config: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    maxTokens: 1000,
    temperature: 0.7
  }
});

const response = await provider.generateContent('Hello, how are you?');
*/