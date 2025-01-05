import { ResponseTemplate, ResponseTask, AutoResponderSettings } from './types';

export class ResponseGenerator {
	private settings: AutoResponderSettings;
	private templates: ResponseTemplate[];

	constructor(settings: AutoResponderSettings, templates: ResponseTemplate[]) {
		this.settings = settings;
		this.templates = templates;
	}

	async generateResponse(task: ResponseTask): Promise<string> {
		try {
			// Select appropriate template
			const template = this.selectTemplate(task);

			// Generate response text
			let response = this.replaceVariables(template.response, task);

			// Adjust tone
			response = this.adjustTone(response, template.tone);

			// Apply length constraints
			response = this.applyLengthConstraints(response);

			// Validate response
			if (!this.validateResponse(response)) {
				throw new Error('Generated response failed validation');
			}

			return response;
		} catch (error) {
			console.error('Response generation error:', error);
			throw new Error('Failed to generate response');
		}
	}

	private selectTemplate(task: ResponseTask): ResponseTemplate {
		// Find matching template based on category and conditions
		const matchingTemplates = this.templates.filter((template) => template.category === task.output.template && this.matchesConditions(template, task));

		if (matchingTemplates.length === 0) {
			throw new Error('No matching template found');
		}

		// Select template with highest priority
		return matchingTemplates.reduce((prev, current) => ((prev.conditions.metrics?.minLikes || 0) > (current.conditions.metrics?.minLikes || 0) ? prev : current));
	}

	private matchesConditions(template: ResponseTemplate, task: ResponseTask): boolean {
		// Check sentiment conditions
		if (template.conditions.sentiment && !template.conditions.sentiment.includes(task.input.comment.sentiment)) {
			return false;
		}

		// Check follower condition
		if (template.conditions.followers !== undefined && template.conditions.followers !== task.input.comment.author.isFollower) {
			return false;
		}

		// Check metrics conditions
		if (template.conditions.metrics) {
			if (template.conditions.metrics.minLikes && (task.input.comment.metrics?.likes || 0) < template.conditions.metrics.minLikes) {
				return false;
			}
			if (template.conditions.metrics.minReplies && (task.input.comment.metrics?.replies || 0) < template.conditions.metrics.minReplies) {
				return false;
			}
		}

		return true;
	}

	private replaceVariables(response: string, task: ResponseTask): string {
		// Replace variables in template with actual values
		return response.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
			switch (variable) {
				case 'username':
					return task.input.comment.author.name;
				case 'platform':
					return task.input.comment.platform;
				case 'postId':
					return task.input.comment.postId;
				case 'sentiment':
					return task.input.comment.sentiment;
				default:
					return match;
			}
		});
	}

	private adjustTone(response: string, tone: string): string {
		// Adjust response tone based on settings
		switch (tone) {
			case 'professional':
				return response.replace(/[\w']+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
			case 'casual':
				return response.toLowerCase();
			case 'support':
				return `Hi there! ${response}`;
			default:
				return response;
		}
	}

	private applyLengthConstraints(response: string): string {
		// Ensure response meets platform length requirements
		const maxLength = 280;
		if (response.length > maxLength) {
			return response.substring(0, maxLength - 3) + '...';
		}
		return response;
	}

	private validateResponse(response: string): boolean {
		// Basic response validation
		if (!response || response.length < 2) return false;

		// Check for blacklisted terms
		if (this.settings.globalRules.blacklistedTerms.some((term) => response.toLowerCase().includes(term.toLowerCase()))) {
			return false;
		}

		return true;
	}
}
