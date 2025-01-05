export interface Post {
	_id: string;
	id: string;
	title: string;
	content: string;
	date: string | Date;
	scheduledAt: string | Date;
	timeZone: string;
	platforms: ('twitter' | 'linkedin' | 'facebook')[];
	status: 'draft' | 'scheduled' | 'published' | 'failed';
	createdAt: string | Date;
	updatedAt: string | Date;
	userId: string;
	metadata?: PostMetadata;
}

export interface PostMetadata {
	engagement?: number;
	reach?: number;
	platformData: {
		[key: string]: {
			characterLimit: number;
			mediaSupport: boolean;
			schedulingLimit?: Date;
		};
	};
}

export interface CalendarViewState {
	view: 'month' | 'week';
	currentDate: Date;
	selectedDate?: Date;
	draggedPost?: string;
}

export interface CalendarProps {
	posts: Post[];
	onPostUpdate: (post: Post) => Promise<void>;
	onDateChange: (date: Date) => void;
	onViewChange: (view: CalendarViewState['view']) => void;
}

export interface ControlProps {
	view: CalendarViewState['view'];
	currentDate: Date;
	onViewChange: (view: CalendarViewState['view']) => void;
	onDateChange: (date: Date) => void;
}

export interface PreviewProps {
	post: Post;
	isCompact?: boolean;
}

export interface IProvider {
	id: string;
	name: string;
	type: 'social' | 'ai' | 'storage';
	credentials: Record<string, string>;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	image?: string;
	emailVerified?: Date;
	createdAt: Date;
	updatedAt: Date;
	providers: IProvider[];
}
