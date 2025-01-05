export interface AutoResponderSettings {
	enabled: boolean;
	platforms: {
		[key: string]: {
			enabled: boolean;
			responseDelay: number;
			maxResponsesPerDay: number;
			tone: 'professional' | 'casual' | 'support';
			customTemplates: ResponseTemplate[];
		};
	};
	globalRules: {
		minFollowers: number;
		minEngagement: number;
		blacklistedTerms: string[];
		workingHours: {
			start: string;
			end: string;
			timezone: string;
		};
	};
}

export interface SocialComment {
	id: string;
	platform: 'twitter' | 'instagram' | 'facebook';
	content: string;
	author: {
		id: string;
		name: string;
		isFollower: boolean;
	};
	sentiment: 'positive' | 'negative' | 'neutral';
	postId: string;
	timestamp: number;
	metrics?: {
		likes: number;
		replies: number;
	};
}

export interface ResponseTemplate {
	id: string;
	category: string;
	patterns: string[];
	response: string;
	variables: string[];
	tone: 'professional' | 'casual' | 'support';
	conditions: {
		sentiment?: string[];
		followers?: boolean;
		metrics?: {
			minLikes?: number;
			minReplies?: number;
		};
	};
}

export interface ResponseTask {
	type: 'response';
	input: {
		comment: SocialComment;
		context: {
			previousResponses: string[];
			userHistory: {
				commentCount: number;
				averageSentiment: number;
			};
		};
	};
	output: {
		response: string;
		template?: string;
		confidence: number;
	};
}
