export interface AnalysisResult {
	sentiment: 'positive' | 'negative' | 'neutral';
	toxicity: number;
	keywords: string[];
	summary: string;
	language: string;
}

export interface ILLMProvider {
	generateContent(prompt: string): Promise<string>;
	analyzeContent(content: string): Promise<AnalysisResult>;
	optimizeContent(content: string): Promise<string>;
}

export class LLMError extends Error {
	constructor(message: string, public readonly provider: string, public readonly code?: string, public readonly details?: unknown) {
		super(message);
		this.name = 'LLMError';
	}
}

export interface LLMConfig {
	maxRetries?: number;
	timeout?: number;
	temperature?: number;
	maxTokens?: number;
	apiKey?: string;
	[key: string]: unknown; // Allow additional provider-specific config
}
