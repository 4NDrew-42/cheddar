# LLM Implementation Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Provider Setup](#provider-setup)
3. [Configuration Management](#configuration-management)
4. [Error Handling](#error-handling)
5. [Performance Optimization](#performance-optimization)
6. [Testing](#testing)

## Getting Started

### Prerequisites
- Node.js 18+
- Redis (for queue management)
- API keys for desired providers (GPT-4, Anthropic, or Mistral)

### Installation

```bash
# Install required dependencies
npm install bullmq ioredis
```

### Environment Setup

Create or update your `.env` file:

```env
# LLM Provider API Keys
GPT4_API_KEY=your_gpt4_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
MISTRAL_API_KEY=your_mistral_api_key

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# Queue Configuration
QUEUE_PREFIX=llm
MAX_CONCURRENT_JOBS=5
```

## Provider Setup

### Basic Provider Implementation

1. Create a new provider class:

```typescript
// src/lib/llm/custom-provider.ts
import { BaseLLMProvider } from './base';
import { AnalysisResult, LLMConfig } from './types';

export interface CustomConfig extends LLMConfig {
  modelName?: string;
}

export class CustomProvider extends BaseLLMProvider {
  private modelName: string;

  constructor(config: CustomConfig) {
    super(config);
    this.modelName = config.modelName || 'default-model';
  }

  async generateContent(prompt: string): Promise<string> {
    return this.retryOperation(async () => {
      // Implementation
      const response = await fetch('api-endpoint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: this.modelName,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.text;
    });
  }

  // Other required method implementations...
}
```

2. Register the provider in the factory:

```typescript
// src/lib/llm/factory.ts
import { CustomProvider, CustomConfig } from './custom-provider';

export type ProviderType = 'gpt4' | 'anthropic' | 'mistral' | 'custom';

private createProvider(config: ProviderConfig): ILLMProvider {
  switch (config.type) {
    // Existing cases...
    case 'custom':
      return new CustomProvider(config.config as CustomConfig);
    default:
      throw new Error(`Unsupported provider type: ${config.type}`);
  }
}
```

## Configuration Management

### Provider Configuration

Example configuration setup:

```typescript
// Configuration types
interface ProviderConfig {
  type: ProviderType;
  config?: LLMConfig;
}

// Usage example
const config: ProviderConfig = {
  type: 'gpt4',
  config: {
    apiKey: process.env.GPT4_API_KEY,
    maxTokens: 2048,
    temperature: 0.7,
    timeout: 30000,
    maxRetries: 3
  }
};

// Create provider instance
const provider = createLLMProvider(config);
```

### Environment Variables

Example environment variable validation:

```typescript
// src/lib/llm/config.ts
import { z } from 'zod';

const envSchema = z.object({
  GPT4_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  MISTRAL_API_KEY: z.string().min(1),
  REDIS_URL: z.string().url(),
  QUEUE_PREFIX: z.string().default('llm'),
  MAX_CONCURRENT_JOBS: z.coerce.number().positive().default(5),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment configuration');
  }
  return result.data;
}
```

## Error Handling

### Implementation Examples

1. Custom error types:

```typescript
// src/lib/llm/errors.ts
export class RateLimitError extends LLMError {
  constructor(provider: string, retryAfter?: number) {
    super(
      `Rate limit exceeded for provider ${provider}`,
      provider,
      'RATE_LIMIT',
      { retryAfter }
    );
  }
}

export class TokenLimitError extends LLMError {
  constructor(provider: string, tokenCount: number, limit: number) {
    super(
      `Token limit exceeded: ${tokenCount}/${limit}`,
      provider,
      'TOKEN_LIMIT',
      { tokenCount, limit }
    );
  }
}
```

2. Error handling middleware:

```typescript
// src/middleware/llm-error-handler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { LLMError } from '@/lib/llm/types';

export function llmErrorHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (error instanceof LLMError) {
    return res.status(400).json({
      error: {
        message: error.message,
        code: error.code,
        provider: error.provider,
        details: error.details,
      },
    });
  }

  console.error('Unhandled error:', error);
  return res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}
```

## Performance Optimization

### Caching Implementation

```typescript
// src/lib/llm/cache.ts
import { Redis } from 'ioredis';

export class LLMCache {
  private redis: Redis;
  private prefix: string;

  constructor(redisUrl: string, prefix = 'llm:cache:') {
    this.redis = new Redis(redisUrl);
    this.prefix = prefix;
  }

  private getKey(prompt: string, config: object): string {
    const hash = crypto
      .createHash('sha256')
      .update(`${prompt}${JSON.stringify(config)}`)
      .digest('hex');
    return `${this.prefix}${hash}`;
  }

  async get(prompt: string, config: object): Promise<string | null> {
    const key = this.getKey(prompt, config);
    return this.redis.get(key);
  }

  async set(
    prompt: string,
    config: object,
    result: string,
    ttl = 3600
  ): Promise<void> {
    const key = this.getKey(prompt, config);
    await this.redis.set(key, result, 'EX', ttl);
  }
}
```

### Rate Limiting

```typescript
// src/lib/llm/rate-limit.ts
import { RateLimitError } from './errors';

export class RateLimiter {
  private redis: Redis;
  private prefix: string;

  constructor(redisUrl: string, prefix = 'llm:ratelimit:') {
    this.redis = new Redis(redisUrl);
    this.prefix = prefix;
  }

  async checkLimit(
    provider: string,
    limit: number,
    window: number
  ): Promise<void> {
    const key = `${this.prefix}${provider}`;
    const count = await this.redis.incr(key);
    
    if (count === 1) {
      await this.redis.expire(key, window);
    }

    if (count > limit) {
      const ttl = await this.redis.ttl(key);
      throw new RateLimitError(provider, ttl);
    }
  }
}
```

## Testing

### Unit Tests

Example test suite:

```typescript
// src/lib/llm/__tests__/provider.test.ts
import { CustomProvider } from '../custom-provider';
import { LLMError } from '../types';

describe('CustomProvider', () => {
  let provider: CustomProvider;

  beforeEach(() => {
    provider = new CustomProvider({
      apiKey: 'test-key',
      maxTokens: 100,
    });
  });

  it('should generate content successfully', async () => {
    const prompt = 'Hello, world!';
    const result = await provider.generateContent(prompt);
    expect(result).toBeDefined();
  });

  it('should handle rate limiting', async () => {
    expect.assertions(2);
    try {
      // Simulate rate limit error
      await provider.generateContent('test');
    } catch (error) {
      expect(error).toBeInstanceOf(LLMError);
      expect(error.code).toBe('RATE_LIMIT');
    }
  });
});
```

### Integration Tests

```typescript
// src/lib/llm/__tests__/integration.test.ts
import { createLLMProvider } from '../factory';
import { validateEnv } from '../config';

describe('LLM Integration', () => {
  beforeAll(() => {
    validateEnv();
  });

  it('should process end-to-end request', async () => {
    const provider = createLLMProvider({
      type: 'gpt4',
      config: {
        apiKey: process.env.GPT4_API_KEY,
        maxTokens: 100,
      },
    });

    const result = await provider.generateContent('Test prompt');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});