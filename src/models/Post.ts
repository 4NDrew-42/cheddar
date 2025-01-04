import mongoose, { Schema } from 'mongoose';

export interface IPost {
	_id: string;
	id: string;
	title: string;
	content: string;
	date: Date;
	scheduledAt: Date;
	timeZone: string;
	platforms: ('twitter' | 'linkedin' | 'facebook')[];
	status: 'draft' | 'scheduled' | 'published' | 'failed';
	createdAt: Date;
	updatedAt: Date;
	userId: string;
}

const PostSchema = new Schema<IPost>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		date: { type: Date, required: true },
		scheduledAt: { type: Date, required: true },
		timeZone: { type: String, required: true },
		platforms: [{ type: String, enum: ['twitter', 'linkedin', 'facebook'] }],
		status: {
			type: String,
			enum: ['draft', 'scheduled', 'published', 'failed'],
			default: 'draft',
		},
		userId: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
