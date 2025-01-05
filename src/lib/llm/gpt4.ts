import { BaseLLMProvider } from './base';
import { AnalysisResult, LLMConfig } from './types';

export interface GPT4Config extends LLMConfig {
  apiKey?: string;
  model?: string;
  organization?: string;
}

export class GPT4Provider extends BaseLLMProvider {
  private apiKey: string;
  private model: string;
  private organization?: string;

  constructor(config: GPT4Config = {}) {
    super(config);
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || '';
    this.model = config.model || 'gpt-4';
    this.organization = config.organization || process.env.OPENAI_ORGANIZATION;

    if (!this.apiKey) {
      throw new Error('OpenAI API key is required');
    }
  }

  async generateContent(prompt: string): Promise<string> {
    return this.retryOperation(async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      };

      if (this.organization) {
        headers['OpenAI-Organization'] = this.organization;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature
        })
      });

      if (!response.ok) {
        const error = await response.json();
        this.handleError(error, 'GPT-4');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    });
  }

  async analyzeContent(content: string): Promise<AnalysisResult> {
    const analysisPrompt = `
      Analyze the following content and provide a structured response in the exact format below:
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
      return this.handleError(error, 'GPT-4');
    }
  }

  async optimizeContent(content: string): Promise<string> {
    const optimizationPrompt = `
      Optimize the following content for clarity, engagement, and impact. 
      Maintain the core message but improve its delivery. 
      Return only the optimized content without any explanations or metadata.

      Content to optimize:
      ${content}
    `;

    return this.generateContent(optimizationPrompt);
  }
}