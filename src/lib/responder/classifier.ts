import { SocialComment, ResponseTemplate, AutoResponderSettings } from './types';

export class CommentClassifier {
	private settings: AutoResponderSettings;
	private templates: ResponseTemplate[];

	constructor(settings: AutoResponderSettings, templates: ResponseTemplate[]) {
		this.settings = settings;
		this.templates = templates;
	}

	async classify(comment: SocialComment) {
		try {
			// Sentiment analysis
			const sentiment = this.analyzeSentiment(comment.content);

			// Intent detection
			const intent = this.detectIntent(comment.content);

			// Priority scoring
			const priority = this.calculatePriority(comment, sentiment);

			// Category matching
			const category = this.matchCategory(comment.content);

			// Response urgency
			const urgency = this.calculateUrgency(comment, priority);

			return {
				sentiment,
				intent,
				priority,
				category,
				urgency,
				isValid: this.validateComment(comment),
			};
		} catch (error) {
			console.error('Classification error:', error);
			throw new Error('Failed to classify comment');
		}
	}

	private analyzeSentiment(content: string): 'positive' | 'negative' | 'neutral' {
		// Basic sentiment analysis implementation
		const positiveWords = ['great', 'awesome', 'love', 'amazing'];
		const negativeWords = ['bad', 'hate', 'terrible', 'awful'];

		const positiveMatches = positiveWords.filter((word) => content.toLowerCase().includes(word)).length;

		const negativeMatches = negativeWords.filter((word) => content.toLowerCase().includes(word)).length;

		if (positiveMatches > negativeMatches) return 'positive';
		if (negativeMatches > positiveMatches) return 'negative';
		return 'neutral';
	}

	private detectIntent(content: string): string {
		// Basic intent detection
		if (content.includes('?')) return 'question';
		if (content.includes('!')) return 'exclamation';
		if (content.includes('help')) return 'support';
		return 'comment';
	}

	private calculatePriority(comment: SocialComment, sentiment: string): number {
		// Priority based on sentiment, metrics, and author status
		let priority = 0;

		if (sentiment === 'negative') priority += 2;
		if (comment.author.isFollower) priority += 1;
		if (comment.metrics?.likes && comment.metrics.likes > 10) priority += 1;
		if (comment.metrics?.replies && comment.metrics.replies > 5) priority += 1;

		return Math.min(priority, 5); // Max priority of 5
	}

	private matchCategory(content: string): string {
		// Match content to predefined categories
		for (const template of this.templates) {
			if (template.patterns.some((pattern) => content.toLowerCase().includes(pattern.toLowerCase()))) {
				return template.category;
			}
		}
		return 'general';
	}

	private calculateUrgency(comment: SocialComment, priority: number): number {
		// Calculate urgency based on priority and time
		const now = Date.now();
		const timeSinceComment = now - comment.timestamp;
		const hoursSinceComment = timeSinceComment / (1000 * 60 * 60);

		// Higher priority comments need faster response
		return priority * (1 / (hoursSinceComment + 1));
	}

	private validateComment(comment: SocialComment): boolean {
		// Safety checks
		if (!comment.content || comment.content.length < 2) return false;

		// Check against blacklisted terms
		if (this.settings.globalRules.blacklistedTerms.some((term) => comment.content.toLowerCase().includes(term.toLowerCase()))) {
			return false;
		}

		// Check working hours
		const commentDate = new Date(comment.timestamp);
		const commentHour = commentDate.getUTCHours();
		const startHour = parseInt(this.settings.globalRules.workingHours.start.split(':')[0]);
		const endHour = parseInt(this.settings.globalRules.workingHours.end.split(':')[0]);

		if (commentHour < startHour || commentHour > endHour) {
			return false;
		}

		return true;
	}
}
