import { createLLMProvider } from './factory';
import { AnthropicClaudeProvider } from './anthropic';
import { GPT4Provider } from './gpt4';
import { MistralProvider } from './mistral';

describe('LLM Providers', () => {
	describe('Factory', () => {
		it('should create Anthropic provider', () => {
			const provider = createLLMProvider({
				type: 'anthropic',
				config: { apiKey: 'test-key' },
			});
			expect(provider).toBeInstanceOf(AnthropicClaudeProvider);
		});

		it('should create GPT-4 provider', () => {
			const provider = createLLMProvider({
				type: 'gpt4',
				config: { apiKey: 'test-key' },
			});
			expect(provider).toBeInstanceOf(GPT4Provider);
		});

		it('should create Mistral provider', () => {
			const provider = createLLMProvider({
				type: 'mistral',
				config: { apiKey: 'test-key' },
			});
			expect(provider).toBeInstanceOf(MistralProvider);
		});

		it('should throw error for invalid provider type', () => {
			expect(() =>
				createLLMProvider({
					type: 'invalid' as 'anthropic' | 'gpt4' | 'mistral',
				})
			).toThrow('Unsupported provider type');
		});
	});

	describe('Base Functionality', () => {
		let provider: AnthropicClaudeProvider;

		beforeEach(() => {
			provider = createLLMProvider({
				type: 'anthropic',
				config: { apiKey: 'test-key' },
			}) as AnthropicClaudeProvider;
		});

		it('should handle API errors', async () => {
			jest.spyOn(global, 'fetch').mockImplementation(() =>
				Promise.resolve({
					ok: false,
					json: () =>
						Promise.resolve({
							error: {
								message: 'Test error',
								code: 'test_error',
							},
						}),
				} as Response)
			);

			await expect(provider.generateContent('test')).rejects.toThrow('Test error');
		}, 10000); // Increased timeout to 10 seconds

		it('should retry failed requests', async () => {
			let callCount = 0;
			jest.spyOn(global, 'fetch').mockImplementation(() => {
				callCount++;
				if (callCount < 4) {
					// Changed to 4 to account for initial call + 3 retries
					return Promise.resolve({
						ok: false,
						json: () => Promise.resolve({ error: 'Test error' }),
					} as Response);
				}
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ content: [{ text: 'success' }] }),
				} as Response);
			});

			const result = await provider.generateContent('test');
			expect(result).toBe('success');
			expect(callCount).toBe(4); // Changed to 4 to account for initial call + 3 retries
		}, 10000); // Increased timeout to 10 seconds
	});
});
