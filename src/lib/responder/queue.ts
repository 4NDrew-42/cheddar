import { ResponseTask, AutoResponderSettings, SocialComment } from './types';
import { CommentClassifier } from './classifier';
import { ResponseGenerator } from './generator';

export class ResponseQueue {
	private settings: AutoResponderSettings;
	private classifier: CommentClassifier;
	private generator: ResponseGenerator;
	private queue: ResponseTask[] = [];
	private processing = false;
	private rateLimits: Map<string, number> = new Map(); // platform -> count

	constructor(settings: AutoResponderSettings, classifier: CommentClassifier, generator: ResponseGenerator) {
		this.settings = settings;
		this.classifier = classifier;
		this.generator = generator;
	}

	async addComment(comment: SocialComment) {
		try {
			// Classify the comment
			const classification = await this.classifier.classify(comment);

			// Create response task
			const task: ResponseTask = {
				type: 'response',
				input: {
					comment,
					context: {
						previousResponses: [],
						userHistory: {
							commentCount: 0,
							averageSentiment: 0,
						},
					},
				},
				output: {
					response: '',
					template: classification.category,
					confidence: 0.9,
				},
			};

			// Add to queue with priority
			this.enqueue(task, classification.priority);

			// Process queue if not already processing
			if (!this.processing) {
				this.processQueue();
			}
		} catch (error) {
			console.error('Error adding comment to queue:', error);
		}
	}

	private enqueue(task: ResponseTask, priority: number) {
		// Insert task based on priority
		const index = this.queue.findIndex((t) => (t.output.confidence || 0) < priority);

		if (index === -1) {
			this.queue.push(task);
		} else {
			this.queue.splice(index, 0, task);
		}
	}

	private async processQueue() {
		this.processing = true;

		while (this.queue.length > 0) {
			const task = this.queue.shift();
			if (!task) continue;

			try {
				// Check rate limits
				if (!this.checkRateLimits(task.input.comment.platform)) {
					// Requeue if rate limited
					this.enqueue(task, task.output.confidence || 0);
					await this.delay(1000);
					continue;
				}

				// Generate response
				const response = await this.generator.generateResponse(task);

				// Send response (implementation would depend on platform API)
				await this.sendResponse(task, response);

				// Update rate limits
				this.updateRateLimits(task.input.comment.platform);

				// Add delay based on settings
				const delay = this.settings.platforms[task.input.comment.platform]?.responseDelay || 1000;
				await this.delay(delay);
			} catch (error) {
				console.error('Error processing task:', error);
			}
		}

		this.processing = false;
	}

	private checkRateLimits(platform: string): boolean {
		const platformSettings = this.settings.platforms[platform];
		if (!platformSettings) return false;

		const currentCount = this.rateLimits.get(platform) || 0;
		return currentCount < platformSettings.maxResponsesPerDay;
	}

	private updateRateLimits(platform: string) {
		const currentCount = this.rateLimits.get(platform) || 0;
		this.rateLimits.set(platform, currentCount + 1);
	}

	private async sendResponse(task: ResponseTask, response: string) {
		// Implementation would depend on platform API
		console.log(`Sending response to ${task.input.comment.platform}:`, response);
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public getQueueLength() {
		return this.queue.length;
	}

	public clearQueue() {
		this.queue = [];
	}
}
