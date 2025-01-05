import { BaseLLMProvider } from './base';
import { AnalysisResult, LLMConfig } from './types';

export interface MistralConfig extends LLMConfig {
  apiKey?: string;
  model?: string;
}

export class MistralProvider extends BaseLLMProvider {
  private apiKey: string;
  private model: string;

  constructor(config: MistralConfig = {}) {
    super(config);
    this.apiKey = config.apiKey || process.env.MISTRAL_API_KEY || '';
    this.model = config.model || 'mistral-medium';

    if (!this.apiKey) {
      throw new Error('Mistral API key is required');
    }
  }

  async generateContent(prompt: string): Promise<string> {
    return this.retryOperation(async () => {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
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
        this.handleError(error, 'Mistral');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    });
  }

  async analyzeContent(content: string): Promise<AnalysisResult> {
    const analysisPrompt = `
      Analyze the following content and provide a structured response in exactly this format:
      Sentiment: [positive/negative/neutral]
      Toxicity: [0-1 score]
      Keywords: [comma-separated list]
      Summary: [brief summary]
      Language: [detected language]

      Content to analyze: ${content}
    `;

    const response = await this.generateContent(analysisPrompt);
    
    try {
      const lines = response.split('\n').filter(line => line.trim());
      const parseValue = (prefix: string) => {
        const line = lines.find(l => l.startsWith(prefix));
        return line ? line.split(':')[1].trim() : '';
      };

      const sentiment = parseValue('Sentiment').toLowerCase() as 'positive' | 'negative' | 'neutral';
      const toxicity = parseFloat(parseValue('Toxicity')) || 0;
      const keywords = parseValue('Keywords').split(',').map(k => k.trim());
      const summary = parseValue('Summary');
      const language = parseValue('Language');

      return {
        sentiment,
        toxicity,
        keywords,
        summary,
        language
      };
    } catch (error) {
      return this.handleError(error, 'Mistral');
    }
  }

  async optimizeContent(content: string): Promise<string> {
    const optimizationPrompt = `
      Optimize the following content for clarity, engagement, and impact.
      Maintain the core message but improve its delivery.
      Provide only the optimized content without any explanations.

      Content to optimize:
      ${content}
    `;

    return this.generateContent(optimizationPrompt);
  }
}