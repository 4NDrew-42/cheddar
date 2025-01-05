import { BaseLLMProvider } from './base';
import { AnalysisResult, LLMConfig } from './types';

export interface AnthropicConfig extends LLMConfig {
  apiKey?: string;
  model?: string;
}

export class AnthropicClaudeProvider extends BaseLLMProvider {
  private apiKey: string;
  private model: string;

  constructor(config: AnthropicConfig = {}) {
    super(config);
    this.apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.model = config.model || 'claude-2';

    if (!this.apiKey) {
      throw new Error('Anthropic API key is required');
    }
  }

  async generateContent(prompt: string): Promise<string> {
    return this.retryOperation(async () => {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature
        })
      });

      if (!response.ok) {
        const error = await response.json();
        await this.handleError({
          response,
          message: error.message || 'Anthropic API error',
          code: error.code || 'anthropic_error'
        }, 'Anthropic');
      }

      const data = await response.json();
      return data.content[0].text;
    });
  }

  async analyzeContent(content: string): Promise<AnalysisResult> {
    const analysisPrompt = `
      Analyze the following content and provide:
      1. Overall sentiment (positive/negative/neutral)
      2. Toxicity score (0-1)
      3. Key topics or themes
      4. Brief summary
      5. Detected language

      Content: ${content}
    `;

    const response = await this.generateContent(analysisPrompt);
    
    try {
      // Parse the response into structured format
      const lines = response.split('\n').filter(line => line.trim());
      const sentiment = lines[0].toLowerCase().includes('positive') ? 'positive' :
                       lines[0].toLowerCase().includes('negative') ? 'negative' : 'neutral';
      const toxicity = parseFloat(lines[1].match(/\d+\.?\d*/)?.[0] || '0');
      const keywords = lines[2].split(',').map(k => k.trim());
      const summary = lines[3];
      const language = lines[4].trim();

      return {
        sentiment,
        toxicity,
        keywords,
        summary,
        language
      };
    } catch (error) {
      return this.handleError(error, 'Anthropic');
    }
  }

  async optimizeContent(content: string): Promise<string> {
    const optimizationPrompt = `
      Please optimize the following content for clarity, engagement, and impact 
      while maintaining its core message and intent:

      ${content}

      Provide only the optimized content in your response, without any explanations.
    `;

    return this.generateContent(optimizationPrompt);
  }
}